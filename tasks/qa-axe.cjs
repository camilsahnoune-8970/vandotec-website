// QA-axe: WCAG-audit met axe-core op alle pagina's in dist/, op gsm (390) en desktop (1440).
// Regels: WCAG 2.0/2.1/2.2 niveau A en AA. Elke overtreding = FAAL (exit 1), gegroepeerd per regel.
// Vereist: npx astro preview --port 4333. Gebruik: node tasks/qa-axe.cjs [--json pad]
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function pages(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? pages(f, o) : e.name === 'index.html' && o.push('/' + path.relative(path.join(ROOT, 'dist'), d).split(path.sep).join('/')); } return o; }
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

(async () => {
  const urls = pages(path.join(ROOT, 'dist')).map((p) => p.replace(/(.)\/$/, '$1'));
  const b = await chromium.launch();
  const rules = new Map(); let checked = 0;
  for (const w of [390, 1440]) {
    for (const u of urls) {
      // axe-core/playwright eist een expliciete context (browser.newPage() wordt geweigerd)
      const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
      const pg = await ctx.newPage();
      await pg.goto('http://localhost:4333' + u, { waitUntil: 'load' });
      // animaties (fade-in bij scrollen) uitzetten, zodat axe de eindtoestand meet en geen halfdoorzichtige tekst
      await pg.emulateMedia({ reducedMotion: 'reduce' });
      await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
      await pg.waitForTimeout(400);
      const res = await new AxeBuilder({ page: pg }).withTags(TAGS).analyze();
      checked++;
      for (const v of res.violations) {
        const r = rules.get(v.id) || { id: v.id, impact: v.impact, help: v.help, url: v.helpUrl, hits: 0, where: new Map() };
        for (const n of v.nodes) {
          r.hits++;
          const key = n.target.join(' ');
          const e = r.where.get(key) || { target: key, html: n.html.slice(0, 140), pages: new Set(), summary: (n.failureSummary || '').split('\n').slice(0, 3).join(' ') };
          e.pages.add(`${u}@${w}`); r.where.set(key, e);
        }
        rules.set(v.id, r);
      }
      await ctx.close();
    }
  }
  await b.close();
  const list = [...rules.values()].sort((a, b) => b.hits - a.hits);
  console.log(`axe: ${checked} pagina-metingen (${urls.length} pagina's x 2 breedtes), ${list.length} regels overtreden, ${list.reduce((s, r) => s + r.hits, 0)} treffers`);
  for (const r of list) {
    console.log(`\n[${r.impact}] ${r.id} (${r.hits}x): ${r.help}`);
    for (const e of [...r.where.values()].slice(0, 6)) console.log(`   ${e.target}  | ${[...e.pages].slice(0, 3).join(', ')}${e.pages.size > 3 ? ` +${e.pages.size - 3}` : ''}\n     ${e.html}\n     ${e.summary}`);
  }
  const j = process.argv.indexOf('--json');
  if (j > 0) fs.writeFileSync(process.argv[j + 1], JSON.stringify(list.map((r) => ({ ...r, where: [...r.where.values()].map((e) => ({ ...e, pages: [...e.pages] })) })), null, 1));
  if (!checked) console.log('FAAL: geen pagina\'s gemeten');
  console.log(list.length || !checked ? '\nFAAL' : '\nALLES OK');
  process.exit(list.length || !checked ? 1 : 0);
})();
