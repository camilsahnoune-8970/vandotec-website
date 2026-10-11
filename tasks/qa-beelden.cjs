// QA-beelden: elke lokale rasterafbeelding in dist/ heeft width+height met de juiste verhouding
// (geen verspringende layout), en heeft een srcset zodra er een -800-variant bestaat en het origineel
// breder is dan 800 px. Gebruikt dezelfde helpers als integrations/img-dimensions.mjs.
// Gebruik: npm run build && node tasks/qa-beelden.cjs (exit 0 = alles OK)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), PUB = path.join(ROOT, 'public');
function files(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? files(f, o) : e.name.endsWith('.html') && o.push(f); } return o; }
(async () => {
  const { attr, isLocalRaster, srcToFile, displaySize, variant800 } = await import('../integrations/img-dimensions.mjs');
  let total = 0; const noDims = [], noSrcset = [], wrong = [], missing = [];
  for (const f of files(path.join(ROOT, 'dist'))) {
    for (const t of fs.readFileSync(f, 'utf8').match(/<img\b[^>]*>/g) || []) {
      const src = attr(t, 'src');
      if (!isLocalRaster(src)) continue;
      total++;
      const rel = path.relative(path.join(ROOT, 'dist'), f) + ' ' + src;
      const file = srcToFile(src, PUB);
      const s = file && (await displaySize(file));
      if (!s) { missing.push(rel); continue; }
      const w = attr(t, 'width'), h = attr(t, 'height');
      if (!w || !h) noDims.push(rel);
      else if (Math.abs(w / h - s.w / s.h) > 0.02) wrong.push(`${rel} attr ${w}x${h} vs getoond ${s.w}x${s.h}`);
      const small = srcToFile(variant800(src), PUB);
      if (!/-800\.\w+$/.test(src) && small && fs.existsSync(small) && !attr(t, 'srcset') && s.w > 800) noSrcset.push(rel);
    }
  }
  const ok = !noDims.length && !noSrcset.length && !wrong.length && !missing.length && total > 0;
  console.log(`${total} lokale rasterbeelden | zonder width/height: ${noDims.length} | verkeerde verhouding: ${wrong.length} | -800 bestaat maar geen srcset: ${noSrcset.length} | bestand ontbreekt: ${missing.length}`);
  [...noDims, ...wrong, ...noSrcset, ...missing].slice(0, 8).forEach((x) => console.log('  ' + x));
  console.log(ok ? 'ALLES OK' : 'FAAL');
  process.exit(ok ? 0 : 1);
})();
