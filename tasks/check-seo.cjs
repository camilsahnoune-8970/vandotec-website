const fs = require('fs');
const path = require('path');
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}
let ok = true;
for (const f of walk('dist').sort()) {
  const html = fs.readFileSync(f, 'utf8');
  const head = html.split('</head>')[0];
  const titles = (head.match(/<title>/g) || []).length;
  const ogt = (head.match(/og:title/g) || []).length;
  const ogu = (head.match(/og:url" content="([^"]+)"/) || [])[1];
  const can = (head.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  const broken = head.includes('siteName=');
  const good = titles === 1 && ogt === 1 && !broken && ogu && can && ogu === can;
  if (!good) ok = false;
  console.log(f, '| title:', titles, '| og:title:', ogt, '| url:', ogu, '| canonical:', can, '| broken:', broken, '|', good ? 'OK' : 'CHECK');
}
console.log(ok ? 'ALL OK' : 'ISSUES FOUND');
