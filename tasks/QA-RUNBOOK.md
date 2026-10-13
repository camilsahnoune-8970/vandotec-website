# QA-RUNBOOK — de testen draaien (voor mens en AI)

Dit is de tekstversie van wat Claude Code als skill gebruikte (`vandotec-site-qa-run`, niet in de repo). Alles hier is op 2026-10-13 gecontroleerd tegen `.github/workflows/ci.yml` en de scripts in `tasks/`. Bij twijfel wint de CI-definitie.

## Regels

1. **Eerst bouwen.** De tests lezen `dist/`. Een run op een oude `dist/` test de oude site: draai `npm run build` vóór elke run.
2. **De hele set draaien**, niet één script. **De exitcode is leidend** (`$LASTEXITCODE` in PowerShell, `0` = groen). De slotregel verschilt per script: de meeste eindigen op `ALLES OK` (`check-seo`: `ALL OK`), `qa-crawl` toont `pagina's: 26, breedtes: …, meldingen: 0`, `qa-browsers` toont `ff OK` en `wk OK` (Firefox, WebKit), `check-contrast` toont `PASS`-regels. Noem bij een fout het script en de `FAAL`-regel, geen samenvatting.
3. **Een test die niets telt, moet falen.** Een crawl over 0 pagina's of een scan van een lege `dist/` mag nooit groen zijn. Controleer het aantal ("pagina's: 26") voor je groen meldt.
4. **Een test bewijst pas iets als hij eerst op de oude code faalt** (negatieve proef). Draai een nieuwe test dus eerst tegen de oude code (in je werkmap, zonder te committen, of met de fix tijdelijk teruggedraaid) en zet de rode uitvoer in de PR-tekst.
5. **Interactietests controleren dat de data er is**, niet alleen dat een knop opent (bv. `.gal-zoom`-aantal > 0). Astro evalueert geen `{}` in een `<script>`; zo bleven modal en lightbox ooit leeg.
6. **Verwachting van een check gewijzigd?** Bevestig eerst het brondocument en het besluit van Camil, pas dan de verwachting aan, en noem elke gewijzigde verwachting met bron in de PR. Nooit een check versoepelen om groen te krijgen. Voorbeeld: `verify-mediakit.cjs` verwachtte `+3.500` en een naam die Camil bewust had geschrapt (PR #64).

## Stand-check op een verse origin/main (zonder je werkmap te verliezen)

Je werkmap staat vaak op een andere branch. Test `origin/main` dan in een aparte worktree, buiten de repo-map. Dit is op 2026-10-13 gedraaid en geslaagd (zie PR-commentaar):

```
git fetch origin
git worktree add --detach ..\vandotec-main-check origin/main
Set-Location ..\vandotec-main-check
$env:PUPPETEER_SKIP_DOWNLOAD = 'true'
npm ci
npm run build
```

Draai daarna Set 1 in die map. Ruim op met `Set-Location` terug naar de repo en `git worktree remove ..\vandotec-main-check`. Een `npm ci` in je eigen werkmap kan door een oude preview falen (EPERM, zie valkuilen). Dan eerst die preview stoppen, of de worktree gebruiken.

## Set 1 — zonder server (CI-job "Build + tests zonder browser")

```
npm run build
node tasks/test-img-helpers.mjs
node tasks/qa-beelden.cjs
node tasks/check-seo.cjs
node tasks/qa-a11y.cjs
node tasks/check-contrast.cjs
php tasks/test-contact.php
```

- `check-contrast.cjs` toont één regel `VERBODEN 2.76:1 — rood op navy-ink`. Dat is bekend en bedoeld: het gaat om een decoratief aanhalingsteken zonder tekst (`public/style.css` `.quote-break`). Het script eindigt met exit 0. De kleuren in het script komen nu uit `public/style.css` (2026-10-13). Vóór die datum stonden er andere waarden in (`#04091f`, `#6c757d`) en gaf de regel 3,13:1. Alle AA-controles blijven groen met de echte kleuren (gemeten).
- PHP staat via winget: `%LOCALAPPDATA%\Microsoft\WinGet\Packages\PHP.PHP.8.4_*\php.exe`. `mbstring` staat daar niet aan, dus `public/contact.php` mag geen `mb_*`-functies gebruiken.

## Set 2 — met preview (CI-job "Browsertests")

**Alle scripts hebben poort 4333 vast ingebakken.** Is die poort bezet, dan kiest Astro stil 4334 en testen de scripts de verkeerde (oude) server.

1. Controleer eerst dat 4333 vrij is: `Get-NetTCPConnection -LocalPort 4333 -State Listen -ErrorAction SilentlyContinue` moet leeg zijn.
2. Start `npx astro preview --port 4333` (op de achtergrond) en lees in de log de regel `Local http://localhost:<poort>/`. Is dat niet 4333: stop, zoek wie 4333 vasthoudt (`Get-NetTCPConnection` + `Get-CimInstance Win32_Process`), begin opnieuw. Is het jouw eigen preview: stop hem. Is het van iemand anders: stop hem niet, meld het aan Camil en wacht.
3. Draai:

```
node tasks/qa-interactie.cjs
node tasks/qa-axe.cjs
node tasks/qa-crawl.cjs
node tasks/qa-srcset.cjs
node tasks/qa-browsers.cjs
node tasks/qa-print.cjs
```

4. Stop de server daarna met `taskkill /T /F /PID <pid>`, alleen je **eigen** PID. Nooit alle `node`-processen stoppen: er kan een opencode-sessie in draaien. Het procesgereedschap stopt `php -S` niet; gebruik `taskkill`.

Browsers installeren (eenmalig): `npx playwright install chromium firefox webkit`.

## Na een inhoudswijziging

`node tasks/verify-mediakit.cjs` (niet in CI): vergelijkt de cijfers, namen en waarden op de site met `docs/mediakit-2026.pdf`. Moet eindigen op `MEDIAKIT-RONDE OK`. De regel `huisstijl-tokens (navy, rood): true,true` controleert de twee kleuren uit AGENTS.md; het script faalt als er één ontbreekt. De mediakit (p. 13) noemt daarnaast middenblauw `#2680FF`, en de site gebruikt die kleur niet. Dat verschil ligt bij Camil (zie `.planning/STATE.md`, punt C8).

## Valkuilen op deze pc

- `npm ci` faalt met EPERM zolang een oude `astro preview` een bestand in `node_modules` vergrendelt. Controleer met `Get-CimInstance Win32_Process -Filter "Name='node.exe'"` en zoek `astro preview`. Valt er niets te stoppen: `npm install` werkt wel.
- Gebruik `$env:PUPPETEER_SKIP_DOWNLOAD='true'` bij `npm ci` (zoals de CI), anders probeert puppeteer een Chrome te downloaden. Puppeteer hoort alleen bij een paar handmatige scripts.
- Losse Playwright-scripts buiten de repo vinden `playwright` niet. Draai ze vanuit de repo-root met `$env:NODE_PATH = '.\node_modules'` (PowerShell), of zet ze in `tasks/`.
- `tasks/perf-meten.cjs` gebruikt puppeteer en een Chrome uit de puppeteer-cache (`~\.cache\puppeteer`). Dat draait op deze pc (2026-10-13). Op een verse installatie is het niet getest; het is niet in de CI.
- Een cookiebalk bedekt de hero op screenshots: klik eerst op "Accepteren" (`getByRole('button', { name: /accepteren/i })`).
- Zware browsertests na elkaar draaien, niet parallel: er is weinig vrij geheugen.
