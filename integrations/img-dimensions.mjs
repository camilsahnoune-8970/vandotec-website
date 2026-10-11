// Astro-integratie: na de build krijgt elke <img> zonder afmetingen zijn echte width/height
// (geen verspringende layout tijdens het laden, CLS), en een srcset als er een -800-variant
// naast het bestand staat. Werkt op dist/, zodat ook hardgecodeerde <img>'s meedoen.
// Veilig omdat style.css `img{max-width:100%;height:auto}` zet: de attributen geven alleen
// de verhouding door, de CSS bepaalt de getoonde maat.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RASTER = /\.(jpe?g|png|webp|avif)$/i;

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(f)));
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : null;
};

export async function addDimensions(distDir, publicDir) {
  const sizes = new Map();
  const size = async (src) => {
    if (!sizes.has(src)) {
      const file = path.join(publicDir, decodeURI(src));
      sizes.set(src, await sharp(file).metadata().then((m) => ({ w: m.width, h: m.height }), () => null));
    }
    return sizes.get(src);
  };
  const exists = async (src) => fs.access(path.join(publicDir, src)).then(() => true, () => false);
  const stats = { imgs: 0, dims: 0, srcset: 0, missing: [] };

  for (const file of await htmlFiles(distDir)) {
    const html = await fs.readFile(file, 'utf8');
    const tags = html.match(/<img\b[^>]*>/g) || [];
    let out = html;
    for (const tag of new Set(tags)) {
      const src = attr(tag, 'src');
      if (!src || !src.startsWith('/') || !RASTER.test(src)) continue;
      let add = '';
      if (attr(tag, 'width') === null && attr(tag, 'height') === null) {
        const s = await size(src);
        if (s) { add += ` width="${s.w}" height="${s.h}"`; stats.dims++; }
        else stats.missing.push(`${path.relative(distDir, file)}: ${src}`);
      }
      const small = src.replace(RASTER, (ext) => `-800${ext}`);
      if (attr(tag, 'srcset') === null && !/-800\.\w+$/.test(src) && (await exists(small))) {
        const s = await size(src);
        if (s && s.w > 800) { add += ` srcset="${small} 800w, ${src} ${s.w}w" sizes="100vw"`; stats.srcset++; }
      }
      if (add) out = out.split(tag).join(tag.replace(/^<img\b/, `<img${add}`));
    }
    stats.imgs += tags.length;
    if (out !== html) await fs.writeFile(file, out);
  }
  return stats;
}

export default function imgDimensions() {
  return {
    name: 'img-dimensions',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const pub = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
        const s = await addDimensions(dist, pub);
        logger.info(`${s.dims} beelden kregen width/height, ${s.srcset} kregen srcset (${s.imgs} <img> totaal)`);
        // Een ontbrekend beeld is een echte fout (kapotte afbeelding live): build laten falen.
        if (s.missing.length) throw new Error(`Beeld niet gevonden in public/:\n${s.missing.join('\n')}`);
      },
    },
  };
}
