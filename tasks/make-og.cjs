const sharp = require('sharp');
const W = 1200, H = 630;
const arial = 'C:\\Windows\\Fonts\\arial.ttf';
const arialBold = 'C:\\Windows\\Fonts\\arialbd.ttf';
(async () => {
  const base = sharp({ create: { width: W, height: H, channels: 3, background: '#00298f' } }).jpeg({ quality: 85 });
  const red = Buffer.from(
    `<svg width="${W}" height="${H}"><rect x="100" y="120" width="72" height="6" fill="#C30017"/></svg>`
  );
  const title = Buffer.from(
    `<svg width="${W}" height="${H}"><text x="100" y="230" font-family="Arial" font-weight="bold" font-size="96" fill="#ffffff">Vandotec</text></svg>`
  );
  const subs = Buffer.from(
    `<svg width="${W}" height="${H}"><text x="100" y="310" font-family="Arial" font-size="42" fill="#ffffff" opacity="0.85">Tankstations &#183; EV-laadinfrastructuur &#183; Infrastructuurwerken</text><text x="100" y="450" font-family="Arial" font-size="30" fill="#ffffff" opacity="0.65">Sinds 1978 &#183; VCA-gecertificeerd &#183; 24/7 interventie</text></svg>`
  );
  await base
    .composite([{ input: red }, { input: title }, { input: subs }])
    .toFile('public/og-image.png');
  console.log('og-image.png vernieuwd');
})().catch((e) => { console.error('MISLUKT:', e.message); process.exit(1); });
