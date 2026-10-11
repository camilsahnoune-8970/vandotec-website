// Unittest voor de helpers in integrations/img-dimensions.mjs (randgevallen uit de code-review).
// Gebruik: node tasks/test-img-helpers.mjs (exit 0 = alles OK)
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { displaySize, srcToFile, isLocalRaster, variant800, sizesFor } from '../integrations/img-dimensions.mjs';

let fails = 0;
const check = (label, ok, extra = '') => { console.log((ok ? 'OK   ' : 'FAAL ') + label + (extra ? ` (${extra})` : '')); if (!ok) fails++; };
const pub = path.resolve('public');

// EXIF-oriëntatie 6 (gsm rechtop): opgeslagen 400x300, getoond 300x400
const tmp = path.join(os.tmpdir(), `vd-exif-${process.pid}.jpg`);
await sharp({ create: { width: 400, height: 300, channels: 3, background: '#00298F' } }).jpeg().withMetadata({ orientation: 6 }).toFile(tmp);
const s = await displaySize(tmp);
check('EXIF-oriëntatie 6: breedte en hoogte gewisseld', s && s.w === 300 && s.h === 400, s ? `${s.w}x${s.h}` : 'null');
await fs.unlink(tmp);
check('onleesbaar bestand geeft null, geen crash', (await displaySize(path.join(os.tmpdir(), 'bestaat-niet.jpg'))) === null);

// Paden
check('%20 wordt een spatie', srcToFile('/img/werf%20oost.jpg', pub) === path.join(pub, 'img', 'werf oost.jpg'));
check('losse % gooit geen URIError maar geeft null', srcToFile('/img/100%.jpg', pub) === null);
check('pad buiten public/ wordt geweigerd', srcToFile('/../package.json', pub) === null);
check('-800-variant behoudt de %-codering', variant800('/img/werf%20oost.jpg') === '/img/werf%20oost-800.jpg');
check('/_astro/-beelden worden overgeslagen', !isLocalRaster('/_astro/foto.ab12.webp'));
check('svg wordt overgeslagen', !isLocalRaster('/logo-white.svg'));
check('gewone jpg doet mee', isLocalRaster('/img/ref-cools.jpg'));

// sizes: "auto" alleen bij lazy (de spec staat auto alleen toe bij loading=lazy)
check('lazy beeld krijgt sizes "auto, 100vw"', sizesFor('<img src="/img/a.jpg" loading="lazy">') === 'auto, 100vw');
check('eager beeld krijgt sizes "100vw"', sizesFor('<img src="/img/a.jpg" fetchpriority="high">') === '100vw');

console.log(fails ? `\n${fails} FAAL` : '\nALLES OK');
process.exit(fails ? 1 : 0);
