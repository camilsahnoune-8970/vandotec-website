// Astro-integratie: na de build krijgt elke <img> zonder afmetingen zijn echte width/height
// (geen verspringende layout tijdens het laden, CLS), en een srcset als er een -800-variant
// naast het bestand staat. Werkt op dist/, zodat ook hardgecodeerde <img>'s meedoen.
// Veilig omdat style.css `img{max-width:100%;height:auto}` zet: de attributen geven alleen
// de verhouding door, de CSS bepaalt de getoonde maat.
// tasks/qa-beelden.cjs en tasks/qa-srcset.cjs gebruiken dezelfde helpers (export hieronder).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export const RASTER = /\.(jpe?g|png|webp|avif)$/i;

// sizes per directe omhullende klasse, gemeten op 390/768/1024/1440 (2026-10-11).
// Onbekende plek = 100vw: nooit slechter dan zonder srcset, de browser kiest dan het origineel.
export const SIZES = {
  'gal-zoom': '(max-width: 1023px) 280px, 380px',
  'ref-card': '(max-width: 900px) 100vw, 370px',
  'service-photo': '(max-width: 900px) 100vw, 550px',
  'media-slot': '(max-width: 900px) 100vw, 550px',
};

export const attr = (tag, name) => {
  const m = tag.match(new RegExp('\\s' + name + '="([^"]*)"'));
  return m ? m[1] : null;
};

// src (URL-pad) -> bestand in publicDir; null bij een ongeldige %-reeks of een pad buiten publicDir
export function srcToFile(src, publicDir) {
  let p;
  try { p = decodeURI(src); } catch { return null; }
  const file = path.join(publicDir, p);
  return file.startsWith(path.resolve(publicDir)) ? file : null;
}

export const isLocalRaster = (src) => !!src && src.startsWith('/') && !src.startsWith('/_astro/') && RASTER.test(src.split('?')[0]);

// Getoonde afmetingen: sharp leest de opgeslagen pixels; bij EXIF-oriëntatie 5-8 (gsm-foto
// rechtop) draait de browser het beeld, dus breedte en hoogte wisselen.
export async function displaySize(file) {
  try {
    const m = await sharp(file).metadata();
    return (m.orientation || 1) >= 5 ? { w: m.height, h: m.width } : { w: m.width, h: m.height };
  } catch { return null; }
}

export const variant800 = (src) => src.replace(RASTER, (ext) => `-800${ext}`);

// Klasse van de directe ouder: het laatste openende element met class="…" vóór de <img>.
function parentClass(html, index) {
  const before = html.slice(Math.max(0, index - 600), index);
  const all = [...before.matchAll(/<(\w+)\b[^>]*\sclass="([^"]*)"[^>]*>/g)];
  return all.length ? all[all.length - 1][2].split(/\s+/)[0] : '';
}

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(f)));
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

export async function addDimensions(distDir, publicDir) {
  const cache = new Map();
  const size = async (file) => {
    if (!cache.has(file)) cache.set(file, await displaySize(file));
    return cache.get(file);
  };
  const exists = (file) => fs.access(file).then(() => true, () => false);
  const stats = { imgs: 0, dims: 0, srcset: 0, missing: [] };

  for (const file of await htmlFiles(distDir)) {
    const html = await fs.readFile(file, 'utf8');
    let out = '', last = 0;
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      stats.imgs++;
      const tag = m[0];
      const src = attr(tag, 'src');
      if (!isLocalRaster(src)) continue;
      const img = srcToFile(src, publicDir);
      let add = '';
      if (attr(tag, 'width') === null && attr(tag, 'height') === null) {
        const s = img && (await size(img));
        if (s) { add += ` width="${s.w}" height="${s.h}"`; stats.dims++; }
        else stats.missing.push(`${path.relative(distDir, file)}: ${src}`);
      }
      const small = img && srcToFile(variant800(src), publicDir);
      if (attr(tag, 'srcset') === null && !/-800\.\w+$/.test(src) && small && (await exists(small))) {
        const s = await size(img);
        if (s && s.w > 800) {
          const sizes = SIZES[parentClass(html, m.index)] || '100vw';
          add += ` srcset="${variant800(src)} 800w, ${src} ${s.w}w" sizes="${sizes}"`;
          stats.srcset++;
        }
      }
      out += html.slice(last, m.index) + (add ? tag.replace(/^<img\b/, `<img${add}`) : tag);
      last = m.index + tag.length;
    }
    out += html.slice(last);
    if (out !== html) await fs.writeFile(file, out);
  }
  return stats;
}

export default function imgDimensions() {
  let publicDir;
  return {
    name: 'img-dimensions',
    hooks: {
      'astro:config:done': ({ config }) => { publicDir = fileURLToPath(config.publicDir); },
      'astro:build:done': async ({ dir, logger }) => {
        const s = await addDimensions(fileURLToPath(dir), publicDir);
        logger.info(`${s.dims} beelden kregen width/height, ${s.srcset} kregen srcset (${s.imgs} <img> totaal)`);
        // Een ontbrekend beeld is een echte fout (kapotte afbeelding live): build laten falen.
        if (s.missing.length) throw new Error(`Beeld niet gevonden in ${publicDir}:\n${s.missing.join('\n')}`);
      },
    },
  };
}
