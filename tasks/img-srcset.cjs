const fs = require('fs'), path = require('path'), sharp = require('sharp');
const BLEED = ['mom-werf.jpg', 'mom-nacht.jpg', 'hero-expertises.jpg', 'hero-over.jpg', 'hero-contact.jpg', 'hero-service.jpg', 'hero-pmo.jpg', 'jobs-team.jpg'];
(async () => {
  // --ontbrekend (2026-10-11): maak een -800-variant voor ELK jpg breder dan 800px dat er nog geen heeft,
  // met de instellingen van de bronbeelden (tasks/compress.cjs: mozjpeg kwaliteit 72; hoger dan de bron voegt geen detail toe). integrations/img-dimensions.mjs geeft die beelden bij de build
  // automatisch een srcset, zodat een gsm de kleine versie laadt.
  if (process.argv.includes('--ontbrekend')) {
    const dir = 'public/img';
    for (const f of fs.readdirSync(dir).filter((x) => /\.jpe?g$/i.test(x) && !/-800\.jpe?g$/i.test(x)).sort()) {
      const out = path.join(dir, f.replace(/\.(jpe?g)$/i, '-800.jpg'));
      if (fs.existsSync(out)) continue;
      const src = await sharp(path.join(dir, f)).metadata();
      if (src.width <= 800) continue;
      // .rotate() = EXIF-oriëntatie toepassen, zodat de variant rechtop staat zoals het origineel in de browser
      const m = await sharp(path.join(dir, f)).rotate().resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true }).toFile(out);
      console.log(out + ': ' + Math.round(fs.statSync(out).size / 1024) + 'KB ' + m.width + 'x' + m.height + ' (origineel ' + Math.round(fs.statSync(path.join(dir, f)).size / 1024) + 'KB)');
    }
    return;
  }
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
