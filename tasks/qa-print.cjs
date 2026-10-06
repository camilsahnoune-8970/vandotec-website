const p = require('puppeteer');
(async () => {
  const b = await p.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 900 });
  await pg.goto('http://localhost:4333/contact', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));
  await pg.emulateMediaType('print');
  await new Promise((r) => setTimeout(r, 600));
  await pg.screenshot({ path: '__qa-print-contact.png' });
  const hidden = await pg.evaluate(() => {
    const gone = ['.contact-form', '.hero-photo', '.footer-quote', '.cookie-bar', '.header-nav'];
    return gone.map((s) => {
      const el = document.querySelector(s);
      return s + '=' + (el ? getComputedStyle(el).display : 'afwezig');
    });
  });
  console.log('PRINT-DISPLAY:', hidden.join(' | '));
  await b.close();
})();
