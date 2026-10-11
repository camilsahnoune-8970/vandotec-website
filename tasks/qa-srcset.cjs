// QA-srcset: kiest de browser per beeld de juiste variant? Per pagina, breedte (390/1024/1440) en
// pixeldichtheid (1x/2x) in een verse context (geen cache). Elk srcset-beeld wordt eerst in beeld
// gescrold en gedecodeerd: een lazy beeld dat niet laadt telt als fout, nooit als "overgeslagen".
//  - Chromium (kent sizes="auto"): scherp ÉN zuinig.
//      scherp = gekozen bestand >= getoonde breedte x dpr, tenzij het al het grootste is;
//      zuinig = volstaat de kleinste variant, dan wordt niet het grotere bestand geladen.
//  - Firefox (kent "auto" nog niet, gebruikt de terugval): alleen scherp.
// Vereist: npx astro preview --port 4333. Gebruik: node tasks/qa-srcset.cjs (exit 0 = alles OK)
const { chromium, firefox } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function pages(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? pages(f, o) : e.name === 'index.html' && o.push('/' + path.relative(path.join(ROOT, 'dist'), d).split(path.sep).join('/')); } return o; }

async function measure(pg) {
  return pg.evaluate(async () => {
    const imgs = [...document.images].filter((i) => i.srcset && i.offsetWidth > 0);
    for (const i of imgs) {
      i.scrollIntoView({ block: 'center' });
      // wachten tot het beeld echt geladen is (decode() weigert in Firefox meteen bij een lazy beeld
      // dat nog niet begonnen is); max 5 s, daarna telt het als "niet geladen"
      for (let t = 0; t < 100 && !(i.complete && i.currentSrc && i.naturalWidth); t++) await new Promise((r) => setTimeout(r, 50));
    }
    // Bestanden die de pagina toch al laadt: kiest de browser voor een beeld een groter bestand dat al
    // in het geheugen zit (bv. railfoto = hero-foto), dan is dat geen extra download.
    return imgs.map((i) => {
      const cands = i.srcset.split(',').map((c) => c.trim().split(/\s+/)).map(([url, d]) => ({ url: new URL(url, location.href).href, w: parseInt(d, 10) }));
      const chosen = cands.find((c) => c.url === i.currentSrc);
      // layoutbreedte: een decoratieve transform:scale (hero) telt niet
      const reused = [...document.images].some((o) => o !== i && o.currentSrc === i.currentSrc && o.offsetWidth > i.offsetWidth);
      return { src: i.getAttribute('src'), shown: i.offsetWidth, loaded: !!(i.currentSrc && i.naturalWidth), reused, chosen: chosen ? chosen.w : (i.currentSrc ? i.naturalWidth : 0), max: Math.max(...cands.map((c) => c.w)), min: Math.min(...cands.map((c) => c.w)) };
    });
  });
}

(async () => {
  const issues = new Set(); const counts = {};
  const urls = pages(path.join(ROOT, 'dist')).map((p) => p.replace(/(.)\/$/, '$1'));
  for (const [name, engine, zuinig] of [['chromium', chromium, true], ['firefox', firefox, false]]) {
    const b = await engine.launch(); counts[name] = 0;
    for (const u of urls) for (const w of [390, 1024, 1440]) for (const dpr of [1, 2]) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
      const pg = await ctx.newPage();
      await pg.goto('http://localhost:4333' + u, { waitUntil: 'load' });
      for (const r of await measure(pg)) {
        counts[name]++;
        const tag = `${name} ${u} ${w}px ${dpr}x ${r.src}`;
        const need = r.shown * dpr;
        if (!r.loaded) { issues.add(`${tag}: niet geladen`); continue; }
        if (r.chosen < need - 1 && r.chosen < r.max) issues.add(`${tag}: onscherp (${r.chosen}w voor ${Math.round(need)}px)`);
        if (zuinig && !r.reused && r.chosen > r.min && r.min >= need) issues.add(`${tag}: te zwaar (${r.chosen}w terwijl ${r.min}w volstaat voor ${Math.round(need)}px)`);
      }
      await ctx.close();
    }
    await b.close();
  }
  console.log(`beeldkeuzes gecontroleerd: chromium ${counts.chromium}, firefox ${counts.firefox}; ${issues.size} problemen`);
  [...issues].slice(0, 15).forEach((x) => console.log('  ' + x));
  // 0 gecontroleerde keuzes = lege of kapotte build: dat bewijst niets, dus FAAL
  if (!counts.chromium || !counts.firefox) console.log('FAAL: geen enkel beeld met srcset gecontroleerd');
  const ok = !issues.size && counts.chromium > 0 && counts.firefox > 0;
  console.log(ok ? 'ALLES OK' : 'FAAL');
  process.exit(ok ? 0 : 1);
})();
