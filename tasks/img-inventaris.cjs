const fs = require('fs'), path = require('path'), sharp = require('sharp');
(async () => {
  const files = fs.readdirSync('public/img').filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const rows = [];
  for (const f of files) {
    const fp = path.join('public/img', f);
    const m = await sharp(fp).metadata().catch(() => null);
    rows.push({ f, kb: Math.round(fs.statSync(fp).size / 1024), dim: m ? m.width + 'x' + m.height : '?' });
  }
  rows.sort((a, b) => b.kb - a.kb);
  rows.slice(0, 20).forEach((r) => console.log(r.kb + 'KB ' + r.dim + ' ' + r.f));
  console.log('totaal-img-KB:', rows.reduce((s, r) => s + r.kb, 0));
})();
