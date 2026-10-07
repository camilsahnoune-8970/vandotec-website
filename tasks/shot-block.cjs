const p = require('puppeteer');
const SEL = process.argv[2] || '[aria-label="Uitgelicht project"]';
const PREFIX = process.argv[3] || '__v1';
(async () => {
  const b = await p.launch({ headless: true, args: ['--no-sandbox'] });
  for (const [w, h, n] of [[1440, 900, PREFIX + '-1440'], [390, 844, PREFIX + '-390']]) {
    const pg = await b.newPage();
    await pg.setViewport({ width: w, height: h });
    await pg.goto('http://localhost:4333/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    await pg.evaluate(() => { document.querySelectorAll('.cookie-bar').forEach((e) => e.remove()); });
    await pg.evaluate((s) => { const el = document.querySelector(s); if (el) el.scrollIntoView({ block: 'center' }); }, SEL);
    await new Promise((r) => setTimeout(r, 800));
    await pg.screenshot({ path: n + '.png' });
    await pg.close();
  }
  await b.close();
  console.log('SHOTS-OK ' + PREFIX);
})();
