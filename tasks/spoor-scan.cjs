const fs = require('fs');
const files = ['dist/index.html', 'dist/expertises/index.html', 'dist/service-onderhoud/index.html', 'dist/over-vandotec/index.html', 'dist/contact/index.html', 'dist/jobs/index.html', 'dist/privacy/index.html', 'dist/cookies/index.html', 'dist/disclaimer/index.html', 'dist/algemenevoorwaarden/index.html'];
const patterns = [/carwash/i, /reiniging/i, /waterproject/i, /tank cleaning/i, /zes domeinen/i, /Zes expertises/i];
let bad = 0;
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const hits = [];
  for (const p of patterns) {
    const m = h.match(new RegExp(p.source, 'gi')) || [];
    m.forEach((x) => {
      const i = h.indexOf(x);
      const ctx = h.substring(Math.max(0, i - 60), i + 60);
      if (!/loadPageData|VCA|vca-logo/.test(ctx)) hits.push(x);
    });
  }
  if ([...new Set(hits)].length) { bad++; console.log('SPOOR in ' + f + ':', [...new Set(hits)].join(',')); }
}
console.log(bad === 0 ? 'SPOOR-SCAN SCHOON (10 paginas)' : bad + ' paginas met sporen');
