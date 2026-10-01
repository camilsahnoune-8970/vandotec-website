function lum(hex) {
  const c = hex.replace('#', '');
  const v = [0, 2, 4].map((i) => {
    let x = parseInt(c.substr(i, 2), 16) / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
function blend(fg, alpha, bg) {
  const p = (h) => [0, 2, 4].map((i) => parseInt(h.replace('#', '').substr(i, 2), 16));
  const f = p(fg), b = p(bg);
  const m = f.map((x, i) => Math.round(alpha * x + (1 - alpha) * b[i]));
  return '#' + m.map((x) => x.toString(16).padStart(2, '0')).join('');
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return ((x + 0.05) / (y + 0.05)).toFixed(2);
}
const INK = '#04091f', NAVY = '#00298f', RED = '#c30017', WHITE = '#ffffff', MUTED = '#6c757d';
const checks = [
  ['wit op navy-ink (titels donker)', WHITE, INK],
  ['muted-op-donker .68 op navy-ink (body donker)', blend(WHITE, 0.68, INK), INK],
  ['wit op rood (buttons)', WHITE, RED],
  ['navy op wit (titels licht)', NAVY, WHITE],
  ['muted op wit (body licht)', MUTED, WHITE],
  ['rood op navy-ink (rest-controle)', RED, INK],
];
let fail = 0;
for (const [n, f, b] of checks) {
  const r = ratio(f, b);
  const pass = parseFloat(r) >= 4.5;
  if (!pass) fail++;
  console.log((pass ? 'PASS' : 'FAIL') + ' ' + r + ':1 — ' + n);
}
process.exit(fail ? 1 : 0);
