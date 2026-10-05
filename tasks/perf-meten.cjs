const p = require('puppeteer');
const PAGES = ['/', '/expertises', '/service-onderhoud', '/over-vandotec', '/jobs', '/contact', '/cookies', '/privacy', '/disclaimer', '/algemenevoorwaarden', '/404'];
(async () => {
  const b = await p.launch({ headless: true, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 390, height: 844 });
  await pg.setCacheEnabled(false);
  console.log('pagina | KB-totaal | KB-img | reqs | LCP-ms | CLS');
  for (const url of PAGES) {
    let bytes = 0, imgBytes = 0, reqs = 0;
    pg.removeAllListeners('response');
    pg.on('response', async (r) => {
      try {
        const buf = await r.buffer();
        bytes += buf.length; reqs++;
        if ((r.headers()['content-type'] || '').startsWith('image')) imgBytes += buf.length;
      } catch (e) { /* genegeerd */ }
    });
    await pg.goto('http://localhost:4333' + url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    const m = await pg.evaluate(() => new Promise((res) => {
      let lcp = 0;
      try {
        new PerformanceObserver((l) => { l.getEntries().forEach((e) => { lcp = e.startTime; }); }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) { /* genegeerd */ }
      setTimeout(() => {
        let cls = 0;
        try {
          new PerformanceObserver((l) => { l.getEntries().forEach((e) => { if (!e.hadRecentInput) cls += e.value; }); }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) { /* genegeerd */ }
        setTimeout(() => res({ lcp: Math.round(lcp), cls: +cls.toFixed(3) }), 500);
      }, 500);
    }));
    console.log(`${url} | ${Math.round(bytes / 1024)} | ${Math.round(imgBytes / 1024)} | ${reqs} | ${m.lcp} | ${m.cls}`);
  }
  await b.close();
})();
