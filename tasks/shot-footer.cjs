const p = require('puppeteer');
(async () => {
  const b = await p.launch({ headless: true, args: ['--no-sandbox'] });
  for (const [url, n] of [['http://localhost:4333/', '__ft-home'], ['http://localhost:4333/contact', '__ft-contact']]) {
    const pg = await b.newPage();
    await pg.setViewport({ width: 1440, height: 900 });
    await pg.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200));
    await pg.evaluate(() => {
      document.querySelectorAll('.cookie-bar').forEach((e) => e.remove());
      const f = document.querySelector('footer.footer');
      if (f) f.scrollIntoView({ block: 'end' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await pg.screenshot({ path: n + '.png' });
    await pg.close();
  }
  await b.close();
  console.log('FOOTER-OK');
})();
