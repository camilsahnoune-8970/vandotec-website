// Voor/na-screenshots voor Camil (AGENTS.md): 390 en 1440 px, volledige pagina, cookiebalk gesloten.
// Gebruik: node tasks/shot-pagina.cjs <basis-url> <pad> <uitvoer-prefix>
// Voorbeeld: node tasks/shot-pagina.cjs http://localhost:4333 /over-vandotec screenshots/claim-04-na
// Vereist een draaiende preview (npx astro preview --port 4333) en de Playwright-browsers.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [base, pagina, prefix] = process.argv.slice(2);
if (!base || !pagina || !prefix) {
  console.error('Gebruik: node tasks/shot-pagina.cjs <basis-url> <pad> <uitvoer-prefix>');
  process.exit(2);
}

(async () => {
  const browser = await chromium.launch();
  const uit = [];
  try {
    for (const [breedte, hoogte] of [[390, 844], [1440, 900]]) {
      const page = await browser.newPage({ viewport: { width: breedte, height: hoogte } });
      await page.goto(base + pagina, { waitUntil: 'networkidle', timeout: 30000 });
      const knop = page.getByRole('button', { name: /accepteren/i });
      if (await knop.count()) await knop.first().click().catch(() => {});
      await page.waitForTimeout(800);
      const bestand = `${prefix}-${breedte}.png`;
      fs.mkdirSync(path.dirname(bestand), { recursive: true });
      await page.screenshot({ path: bestand, fullPage: true });
      uit.push(bestand);
      await page.close();
    }
  } catch (e) {
    console.error('FOUT: ' + e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
  console.log(uit.join('\n'));
})();
