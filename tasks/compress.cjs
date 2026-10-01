// Eenmalige beeldcompressie Vandotec (sharp, dev-only). Staging -> public/img/.
// Hero: max 1920px breed, JPEG q70. Kaarten/content: max 1200px, JPEG q72. Logo: ongewijzigd.
const sharp = require('sharp');
const path = require('path');

const jobs = [
  { src: 'tasks/beelden-staging/hero-2.jpg', dest: 'public/img/hero-tankstation.jpg', width: 1920, quality: 70 },
  { src: 'tasks/beelden-staging/exp-tankstations.jpg', dest: 'public/img/exp-tankstations.jpg', width: 1200, quality: 72 },
  { src: 'tasks/beelden-staging/exp-ev-laadinstallaties.jpg', dest: 'public/img/exp-ev.jpg', width: 1200, quality: 72 },
  { src: 'tasks/beelden-staging/exp-infrastructuur.jpg', dest: 'public/img/exp-infrastructuur.jpg', width: 1200, quality: 72 },
  { src: 'tasks/beelden-staging/exp-hoogspanning.jpg', dest: 'public/img/exp-hoogspanning.jpg', width: 1200, quality: 72 },
  { src: 'tasks/beelden-staging/over-ons.jpg', dest: 'public/img/over-ons.jpg', width: 1200, quality: 72 },
];

(async () => {
  const fs = require('fs');
  for (const j of jobs) {
    const before = fs.statSync(j.src).size;
    await sharp(j.src).resize({ width: j.width, withoutEnlargement: true }).jpeg({ quality: j.quality, mozjpeg: true }).toFile(j.dest);
    const after = fs.statSync(j.dest).size;
    console.log(path.basename(j.dest), Math.round(before / 1024) + 'KB -> ' + Math.round(after / 1024) + 'KB');
  }
  fs.copyFileSync('tasks/beelden-staging/vca-logo.jpg', 'public/img/vca-logo.jpg');
  console.log('vca-logo.jpg gekopieerd (8KB, ongewijzigd)');
})().catch((e) => { console.error('MISLUKT:', e.message); process.exit(1); });
