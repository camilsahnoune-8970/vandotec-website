const fs = require('fs'), path = require('path'), sharp = require('sharp');
const BLEED = ['mom-werf.jpg', 'mom-nacht.jpg', 'hero-expertises.jpg', 'hero-over.jpg', 'hero-contact.jpg', 'hero-service.jpg', 'hero-pmo.jpg', 'jobs-team.jpg'];
(async () => {
  for (const f of BLEED) {
    const base = f.replace(/\.(jpg|png)$/i, '');
    const out = `public/img/${base}-800.jpg`;
    const m = await sharp(`public/img/${f}`).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 80 }).toFile(out);
    console.log(out + ': ' + Math.round(fs.statSync(out).size / 1024) + 'KB ' + m.width + 'x' + m.height);
  }
  console.log('--- alle dimensies ---');
  const files = fs.readdirSync('public/img').filter((x) => /\.(jpe?g|png|webp|svg)$/i.test(x)).sort();
  for (const f of files) {
    if (f.endsWith('.svg')) { console.log(f + ': svg'); continue; }
    const m = await sharp(path.join('public/img', f)).metadata().catch(() => null);
    console.log(f + ': ' + (m ? m.width + 'x' + m.height : '?') + ' ' + Math.round(fs.statSync(path.join('public/img', f)).size / 1024) + 'KB');
  }
})();
