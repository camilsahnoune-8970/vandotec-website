// QA-crawl: alle dist-pagina's in Chromium op 5 breedtes: console-fouten, paginafouten,
// mislukte verzoeken, kapotte beelden, horizontale scroll. Vereist: npx astro preview --port 4333.
// Gebruik: node tasks/qa-crawl.cjs   (exit 0 = 0 meldingen)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), BASE = 'http://localhost:4333';
function pages(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) pages(f, out);
    else if (e.name === 'index.html') out.push('/' + path.relative(path.join(ROOT, 'dist'), path.dirname(f)).split(path.sep).join('/'));
  }
  return out;
}
const URLS = pages(path.join(ROOT, 'dist')).map((u) => (u === '/' ? '/' : u.replace(/\/$/, '')));
const WIDTHS = [360, 390, 768, 1024, 1440];
(async () => {
  const b = await chromium.launch();
  const issues = [];
  for (const w of WIDTHS) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    for (const u of URLS) {
      const pg = await ctx.newPage();
      pg.on('console', (m) => { if (m.type() === 'error') issues.push(`${w} ${u} CONSOLE ${m.text().slice(0, 160)}`); });
      pg.on('pageerror', (e) => issues.push(`${w} ${u} PAGEERROR ${e.message.slice(0, 160)}`));
      pg.on('response', (r) => { if (r.status() >= 400) issues.push(`${w} ${u} HTTP ${r.status()} ${r.url()}`); });
      pg.on('requestfailed', (r) => { if (!/fonts\.g/.test(r.url())) issues.push(`${w} ${u} FAILED ${r.url()} ${r.failure()?.errorText}`); });
      await pg.goto(BASE + u, { waitUntil: 'load' });
      await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
      await pg.waitForTimeout(300);
      const r = await pg.evaluate(() => {
        const sw = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
        const wide = [];
        if (sw > cw) document.querySelectorAll('body *').forEach((el) => { const x = el.getBoundingClientRect(); if (x.right > cw + 1 && x.width > 0 && getComputedStyle(el).position !== 'fixed') wide.push(el.tagName + '.' + String(el.className).slice(0, 40)); });
        const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.getAttribute('src'));
        return { sw, cw, wide: wide.slice(0, 4), broken };
      });
      if (r.sw > r.cw) issues.push(`${w} ${u} HSCROLL ${r.sw}>${r.cw} ${r.wide.join(' | ')}`);
      r.broken.forEach((s) => issues.push(`${w} ${u} BROKEN-IMG ${s}`));
      await pg.close();
    }
    await ctx.close();
  }
  await b.close();
  const uniq = [...new Set(issues)];
  console.log(`pagina's: ${URLS.length}, breedtes: ${WIDTHS.join(',')}, meldingen: ${uniq.length}`);
  uniq.forEach((x) => console.log(x));
  // 0 pagina's = lege of kapotte build: dat is een fout, geen groen licht
  if (!URLS.length) console.log("FAAL: geen pagina's gevonden in dist/");
  process.exit(uniq.length || !URLS.length ? 1 : 0);
})();
