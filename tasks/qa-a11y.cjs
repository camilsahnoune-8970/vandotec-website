const fs = require('fs'), path = require('path');
function files(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) files(f, out);
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}
for (const f of files('dist')) {
  const t = fs.readFileSync(f, 'utf8');
  const rel = path.relative('dist', f);
  const h1 = (t.match(/<h1[\s>]/g) || []).length;
  const heads = [...t.matchAll(/<(h[1-6])[\s>]/g)].map((m) => m[1]);
  let skip = 'ok';
  for (let i = 1; i < heads.length; i++) {
    if (+heads[i][1] - +heads[i - 1][1] > 1) { skip = `SPRONG ${heads[i - 1]}->${heads[i]}`; break; }
  }
  const imgsNoAlt = (t.match(/<img(?![^>]*alt=)[^>]*>/g) || []).length;
  const inputs = [...t.matchAll(/<(input|select|textarea)[^>]*>/g)];
  let unlabeled = 0;
  for (const m of inputs) {
    const tag = m[0];
    const id = (tag.match(/id="([^"]+)"/) || [])[1];
    const aria = /aria-label=|aria-labelledby=/.test(tag);
    if (!aria && (!id || !t.includes(`for="${id}"`))) unlabeled++;
  }
  console.log(`${rel} | h1:${h1} | koppen:${skip} | img-zonder-alt:${imgsNoAlt} | input-zonder-label:${unlabeled}`);
}
