// QA-beelden: elke lokale rasterafbeelding in dist/ heeft width+height (geen verspringende layout),
// en heeft een srcset zodra er een -800-variant bestaat en het origineel breder is dan 800 px.
// Gebruik: npm run build && node tasks/qa-beelden.cjs (exit 0 = alles OK)
const fs = require('fs'), path = require('path');
const sharp = require('sharp');
const ROOT = path.join(__dirname, '..');
function files(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? files(f, o) : e.name.endsWith('.html') && o.push(f); } return o; }
const attr = (t, n) => { const m = t.match(new RegExp('\\s' + n + '="([^"]*)"')); return m ? m[1] : null; };
(async () => {
  let total = 0, noDims = [], noSrcset = [], wrong = [];
  for (const f of files(path.join(ROOT, 'dist'))) {
    for (const t of fs.readFileSync(f, 'utf8').match(/<img\b[^>]*>/g) || []) {
      const src = attr(t, 'src');
      if (!src || !src.startsWith('/') || !/\.(jpe?g|png|webp|avif)$/i.test(src)) continue;
      total++;
      const rel = path.relative(path.join(ROOT, 'dist'), f) + ' ' + src;
      const w = attr(t, 'width'), h = attr(t, 'height');
      if (!w || !h) noDims.push(rel);
      else {
        const m = await sharp(path.join(ROOT, 'public', src)).metadata();
        if (Math.abs(w / h - m.width / m.height) > 0.02) wrong.push(`${rel} attr ${w}x${h} vs bestand ${m.width}x${m.height}`);
      }
      const small = path.join(ROOT, 'public', src.replace(/(\.\w+)$/, '-800$1'));
      if (!/-800\.\w+$/.test(src) && fs.existsSync(small) && !attr(t, 'srcset')) {
        const m = await sharp(path.join(ROOT, 'public', src)).metadata();
        if (m.width > 800) noSrcset.push(rel);
      }
    }
  }
  const ok = noDims.length === 0 && noSrcset.length === 0 && wrong.length === 0;
  console.log(`${total} lokale rasterbeelden | zonder width/height: ${noDims.length} | verkeerde verhouding: ${wrong.length} | -800 bestaat maar geen srcset: ${noSrcset.length}`);
  [...noDims.slice(0, 5), ...wrong.slice(0, 5), ...noSrcset.slice(0, 5)].forEach((x) => console.log('  ' + x));
  console.log(ok ? 'ALLES OK' : 'FAAL');
  process.exit(ok ? 0 : 1);
})();
