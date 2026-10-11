// QA-print: verbergt de printweergave van /contact de schermelementen die op papier niets doen?
// Vereist: npx astro preview --port 4333. Gebruik: node tasks/qa-print.cjs (exit 0 = alles OK)
// Sinds 2026-10-11 Playwright i.p.v. puppeteer (geen aparte Chrome-download) en met echte controle:
// vroeger toonde het script alleen de waarden en eindigde het altijd met exit 0.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto('http://localhost:4333/contact', { waitUntil: 'networkidle', timeout: 30000 });
  await pg.waitForTimeout(1200);
  await pg.emulateMedia({ media: 'print' });
  await pg.waitForTimeout(600);
  await pg.screenshot({ path: '__qa-print-contact.png' });
  const state = await pg.evaluate(() => {
    const disp = (s) => { const el = document.querySelector(s); return el ? getComputedStyle(el).display : 'afwezig'; };
    const visible = (s) => [...document.querySelectorAll(s)].some((e) => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0);
    return {
      info: ['.contact-form', '.hero-photo', '.footer-quote', '.cookie-bar', '.header-nav'].map((s) => s + '=' + disp(s)),
      // op papier zinloos: navigatie, cookiebalk, formuliervelden en verzendknop (zie @media print in style.css)
      shown: ['.header-nav', '.cookie-bar', '.contact-form .form-group', '.contact-form button[type="submit"]', '.hero-photo'].filter(visible),
    };
  });
  await b.close();
  console.log('PRINT-DISPLAY:', state.info.join(' | '));
  if (state.shown.length) console.log('FAAL: zichtbaar in print: ' + state.shown.join(', '));
  else console.log('ALLES OK');
  process.exit(state.shown.length ? 1 : 0);
})();
