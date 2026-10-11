const { firefox, webkit } = require('playwright');
const PAGES = ['/', '/expertises', '/contact'];
const VIEWPORTS = [{ w: 1440, h: 900, n: '1440' }, { w: 390, h: 844, n: '390' }];
(async () => {
  let failures = 0;
  for (const [name, engine] of [['ff', firefox], ['wk', webkit]]) {
    let browser;
    try {
      browser = await engine.launch();
    } catch (e) {
      console.log(name + ' LAUNCH-FAIL: ' + e.message.slice(0, 200));
      failures++;
      continue;
    }
    let bads = 0;
    for (const url of PAGES) {
      for (const v of VIEWPORTS) {
        const pg = await browser.newPage({ viewport: { width: v.w, height: v.h } });
        const bad = [];
        pg.on('response', (r) => { if (r.status() >= 400) bad.push(r.status()); });
        await pg.goto('http://localhost:4333' + url, { waitUntil: 'networkidle', timeout: 30000 });
        await pg.waitForTimeout(1500);
        await pg.evaluate(() => { document.querySelectorAll('.cookie-bar').forEach((e) => e.remove()); window.scrollTo(0, 0); });
        const slug = url === '/' ? 'home' : url.slice(1);
        await pg.screenshot({ path: `__qa-${name}-${slug}-${v.n}.png` });
        if (bad.length) { bads++; console.log(`BAD ${name}${url}: ` + bad.join(',')); }
        await pg.close();
      }
    }
    await browser.close();
    // vroeger stond hier altijd "OK", ook na een BAD-regel
    console.log(name + (bads ? ` FAAL (${bads})` : ' OK'));
    failures += bads;
  }
  process.exit(failures ? 1 : 0);
})();
