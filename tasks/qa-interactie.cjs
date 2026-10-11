// QA-interactie: referentie-modal, foto-lightbox, klanten-ticker en print van projectpagina's.
// Vereist: npx astro preview --port 4333. Gebruik: node tasks/qa-interactie.cjs (exit 0 = alles OK)
const { chromium } = require('playwright');
const BASE = 'http://localhost:4333';
let fails = 0;
const check = (label, ok, extra = '') => { console.log((ok ? 'OK   ' : 'FAAL ') + label + (extra ? ` (${extra})` : '')); if (!ok) fails++; };
// Dialoog horizontaal gecentreerd (de reset *{margin:0} schakelt de standaard margin:auto uit)
const centered = (pg, sel) => pg.locator(sel).evaluate((d) => { const r = d.getBoundingClientRect(); return Math.abs((r.left + r.right) / 2 - document.documentElement.clientWidth / 2) <= 2; });

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Modal op /expertises toont de extra foto's (alles uit photos behalve de hoofdfoto)
  await pg.goto(BASE + '/expertises', { waitUntil: 'load' });
  for (const [client, want] of [['Cools Avia', 5], ['D-Glas', 6], ['Demarol', 4], ['Van Assche', 2]]) {
    const btn = pg.locator(`.ref-more[data-client="${client}"]`);
    if ((await btn.count()) !== 1) { check(`modal ${client}: knop gevonden`, false); continue; }
    await btn.click();
    const n = await pg.locator('#refModalGal img').count();
    const hero = await pg.locator('#refModalImg').getAttribute('src');
    const dup = await pg.locator(`#refModalGal img[src="${hero}"]`).count();
    if (client === 'D-Glas') check('modal staat horizontaal gecentreerd', await centered(pg, '#refModal'));
    check(`modal ${client}: ${want} extra foto's, hoofdfoto niet dubbel`, n === want && dup === 0, `gezien ${n}, dubbel ${dup}`);
    await pg.keyboard.press('Escape');
  }

  // 2. Lightbox op een projectpagina: vorige/volgende, pijltjestoetsen, teller, Escape, focus terug
  await pg.goto(BASE + '/realisaties/d-glas-oostende', { waitUntil: 'load' });
  const zooms = pg.locator('.gal-rail .gal-zoom');
  const total = await zooms.count();
  const labels = await zooms.evaluateAll((els) => els.filter((e) => (e.getAttribute('aria-label') || '').startsWith('Vergroot foto')).length);
  check('zoomknoppen hebben aria-label "Vergroot foto: …"', total > 0 && labels === total, `${labels}/${total}`);
  await zooms.nth(0).click();
  const src = () => pg.locator('#galLightImg').getAttribute('src');
  const first = await src();
  check('lightbox staat horizontaal gecentreerd', await centered(pg, '#galLight'));
  const next = pg.locator('#galLight [data-gal-step="1"]');
  check('lightbox heeft een volgende-knop', (await next.count()) === 1);
  if (await next.count()) { await next.click(); }
  const second = await src();
  check('volgende-knop toont de tweede foto', second && second !== first, `${first} -> ${second}`);
  await pg.keyboard.press('ArrowRight');
  const third = await src();
  check('pijltje rechts gaat verder', third && third !== second);
  await pg.keyboard.press('ArrowLeft');
  check('pijltje links gaat terug', (await src()) === second);
  const counter = (await pg.locator('#galLightCount').count()) ? await pg.locator('#galLightCount').innerText() : '';
  check('teller toont positie', counter === `2 / ${total}`, counter);
  await pg.keyboard.press('Escape');
  const open = await pg.locator('#galLight').evaluate((d) => d.open);
  const focusIdx = await pg.evaluate(() => [...document.querySelectorAll('.gal-rail .gal-zoom')].indexOf(document.activeElement));
  check('Escape sluit, focus op de knop van de laatst bekeken foto (2e)', !open && focusIdx === 1, `open=${open} focus=${focusIdx}`);

  // 3. Ticker op home: pauzeerbaar met toetsenbord (WCAG 2.2.2)
  await pg.goto(BASE + '/', { waitUntil: 'load' });
  const pause = pg.locator('.ticker-pause');
  check('ticker heeft een pauzeknop', (await pause.count()) === 1);
  if (await pause.count()) {
    await pause.focus();
    await pg.keyboard.press('Enter');
    const state = await pg.locator('.ticker-track').evaluate((e) => getComputedStyle(e).animationPlayState);
    const pressed = await pause.getAttribute('aria-pressed');
    check('Enter op pauzeknop pauzeert de ticker', state === 'paused' && pressed === 'true', `${state} ${pressed}`);
    await pg.keyboard.press('Enter');
    const state2 = await pg.locator('.ticker-track').evaluate((e) => getComputedStyle(e).animationPlayState);
    check('nogmaals Enter speelt verder', state2 === 'running', state2);
  }

  // 4. Print van een projectpagina: geen pager/CTA-chrome, foto's niet afgekapt
  await pg.goto(BASE + '/realisaties/d-glas-oostende', { waitUntil: 'load' });
  await pg.emulateMedia({ media: 'print' });
  const pr = await pg.evaluate(() => {
    const vis = (s) => [...document.querySelectorAll(s)].some((e) => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0);
    const rail = document.querySelector('.gal-rail');
    return { pager: vis('.pager'), clipped: rail ? rail.scrollWidth > rail.clientWidth + 1 : false };
  });
  check('print: pager verborgen', !pr.pager);
  check('print: fotorail niet afgekapt', !pr.clipped);

  await b.close();
  console.log(fails ? `\n${fails} FAAL` : '\nALLES OK');
  process.exit(fails ? 1 : 0);
})();
