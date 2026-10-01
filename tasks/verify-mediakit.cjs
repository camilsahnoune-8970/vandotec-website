const fs = require('fs');
// 1. Cijfers 1-op-1 tegen mediakit
const pages = {
  'dist/index.html': ['45+', '6.000+', '+3.500', 'IJkingen per jaar', '5', 'Landen actief'],
  'dist/over-vandotec/index.html': ['45+', '6.000+', '1978', '2009', '2011', '2020', '2023', '2026', 'Benoit Goesaert', 'Kevin Bervoet', 'Marijn Louwagie', 'Fien Bothuyne', 'Oplossingsgericht', 'Betrokken', 'Voorbereid', 'Realistisch', 'Positief', 'ISO 17020', 'klasse 6/P2', 'Powerhub'],
  'dist/service-onderhoud/index.html': ['ijkingen', 'IJkingen', '+500'],
  'dist/expertises/index.html': ['Vanheede', 'Galloo', 'Maes Brandstoffen', 'Tradit Energie', 'Cools Avia', 'Voor wie wij werken', 'Brandstofbedrijven'],
  'dist/contact/index.html': ['brandstofpompen'],
};
let ok = true;
for (const [f, terms] of Object.entries(pages)) {
  const h = fs.readFileSync(f, 'utf8');
  const missing = terms.filter((t) => !h.includes(t));
  if (missing.length) { ok = false; console.log('MISSEND in ' + f + ':', missing.join(', ')); }
  else console.log('OK ' + f);
}
// 2. Oude cijfers weg
const all = ['dist/index.html', 'dist/over-vandotec/index.html', 'dist/expertises/index.html'].map((f) => fs.readFileSync(f, 'utf8')).join('');
console.log('oude 100+/10+ weg:', !all.includes('100+') && !all.includes('10+'));
// 3. Nieuwe palette-tokens live
const css = fs.readFileSync('dist/style.css', 'utf8');
console.log('nieuw palet:', ['#00298f', '#2680ff', '#c30017'].map((c) => css.includes(c)).join(','));
console.log(ok ? 'MEDIAKIT-RONDE OK' : 'ISSUES');
