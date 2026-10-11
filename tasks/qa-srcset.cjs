// QA-srcset: kiest de browser per beeld de juiste variant? Per pagina, breedte (390/1024/1440) en
// pixeldichtheid (1x/2x) in een verse context (geen cache):
//  - scherp: gekozen bestand >= getoonde breedte x dpr, tenzij het al het grootste is;
//  - zuinig: volstaat de 800-variant, dan wordt niet het grote origineel geladen.
// Vereist: npx astro preview --port 4333. Gebruik: node tasks/qa-srcset.cjs (exit 0 = alles OK)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function pages(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? pages(f, o) : e.name === 'index.html' && o.push('/' + path.relative(path.join(ROOT, 'dist'), d).split(path.sep).join('/')); } return o; }
(async () => {
  const b = await chromium.launch(); const issues = new Set(); let checked = 0;
  for (const u of pages(path.join(ROOT, 'dist')).map((p) => p.replace(/(.)\/$/, '$1'))) {
    for (const w of [390, 1024, 1440]) for (const dpr of [1, 2]) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
      const pg = await ctx.newPage();
      await pg.goto('http://localhost:4333' + u, { waitUntil: 'load' });
      await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); } });
      await pg.waitForLoadState('networkidle');
      const rows = await pg.evaluate(() => [...document.images].filter((i) => i.srcset && i.currentSrc && i.offsetWidth > 0).map((i) => {
        const cands = i.srcset.split(',').map((c) => c.trim().split(/\s+/)).map(([url, d]) => ({ url: new URL(url, location.href).href, w: parseInt(d, 10) }));
        const chosen = cands.find((c) => c.url === i.currentSrc) || { w: i.naturalWidth };
        return { src: i.getAttribute('src'), shown: i.offsetWidth, /* layoutbreedte: een decoratieve transform:scale telt niet */ chosen: chosen.w, max: Math.max(...cands.map((c) => c.w)), min: Math.min(...cands.map((c) => c.w)) };
      }));
      for (const r of rows) {
        checked++;
        const need = r.shown * dpr;
        if (r.chosen < need - 1 && r.chosen < r.max) issues.add(`${u} ${w}px ${dpr}x ${r.src}: onscherp (${r.chosen}w voor ${Math.round(need)}px)`);
        if (r.chosen > r.min && r.min >= need) issues.add(`${u} ${w}px ${dpr}x ${r.src}: te zwaar (${r.chosen}w terwijl ${r.min}w volstaat voor ${Math.round(need)}px)`);
      }
      await ctx.close();
    }
  }
  await b.close();
  console.log(`${checked} beeldkeuzes gecontroleerd, ${issues.size} problemen`);
  [...issues].slice(0, 15).forEach((x) => console.log('  ' + x));
  // 0 gecontroleerde keuzes = lege of kapotte build: dat bewijst niets, dus FAAL
  if (!checked) console.log('FAAL: geen enkel beeld met srcset gevonden');
  const ok = !issues.size && checked > 0;
  console.log(ok ? 'ALLES OK' : 'FAAL');
  process.exit(ok ? 0 : 1);
})();
