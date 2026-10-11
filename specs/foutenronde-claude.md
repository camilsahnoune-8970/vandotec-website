# SPEC: foutenronde-claude (technische fouten uit REVIEW.md + nieuwe meting 2026-10-11)

Leeswijzer: geen goedgekeurde spec = geen PR. Camil keurt deze spec goed vóór er gebouwd wordt.
Rol: Claude Code controleert het werk van opencode (review roteert, AGENTS.md) en herstelt
alleen wat geen inhouds- of smaakbesluit vraagt. Claims, teksten en smaak blijven bij Camil.

## 1. Doel (één zin)

De technische fouten die nog open staan (REVIEW.md R2-code, R3, R4-opruim) plus twee nieuw
gevonden bugs zijn hersteld, elk met een test of meting die op de oude code faalt.

## 2. Context

Nulmeting 2026-10-11 op `main` = `614f4e5` (na PR #49/#50):

- `npm run build` groen (27 pagina's), `check-seo` ALL OK, `qa-a11y` 0 meldingen,
  `qa-browsers` Firefox + WebKit OK, `qa-print` contact OK.
- Eigen crawl: 26 pagina's × 5 breedtes (360/390/768/1024/1440) in Chromium:
  0 console-fouten, 0 paginafouten, 0 mislukte verzoeken, 0 kapotte beelden.
  **1 fout:** horizontale scroll op `/expertises` bij 360 en 390 px (pagina 403 px breed).
- `check-contrast`: 1 FAIL "rood op navy-ink" (3,13:1). Nagekeken: die combinatie komt
  alleen voor als decoratief aanhalingsteken (`style.css:366`, 3em) — geen tekst, geen fix nodig.
- REVIEW.md R1 is gedaan (o.a. blauw-op-blauw-override `style.css:38-39`). De rest is opnieuw
  nagemeten; hieronder alleen wat **vandaag nog open** staat.

## 3. Scope — in drie PR's

**PR 1 `claude/vertrouwen` — contactformulier (`public/contact.php`, `src/pages/contact.astro`)**

- A1 `From:` bevat het adres van de bezoeker (`contact.php:44`). Een server van vandotec.be die
  mailt "namens" `iemand@gmail.com` faalt op SPF/DMARC (controle of een mail echt van dat domein
  komt): de mail belandt in spam of wordt geweigerd. Fix: `From:` = vast adres op vandotec.be,
  bezoeker alleen in `Reply-To:`. **Aanname:** `info@vandotec.be` als afzender — Camil bevestigt.
- A2 `$email` zit niet in de regeleinde-controle (`:36`); naam staat ongecodeerd in een kop.
  Fix: e-mail mee in de controle; naam weg uit de kop (staat al in de body).
- A3 Onderwerp zonder `mb_encode_mimeheader` (`:57-59`): é/ë breken in de onderwerpregel.
  Onderwerp vrij invulbaar terwijl het formulier een vaste lijst heeft. Fix: codering + toetsen
  aan de lijst uit `contact.json`.
- A4 Geen lengtegrenzen (server en HTML). Fix: naam 100, e-mail 254, telefoon 30, bericht 5000;
  zelfde `maxlength` in `contact.astro`.

**PR 2 `claude/mobiel-a11y` — zichtbare gebruiksfouten**

- A5 Horizontale scroll `/expertises` op mobiel: kop "Infrastructuurwerken" is 379 px breed en
  `.content-grid` (`style.css:583`, `1fr`) kan niet krimpen. Fix: `minmax(0,1fr)` +
  `overflow-wrap:break-word; hyphens:auto` op `.section-title` (`lang="nl"` staat al).
- A6 Referentie-modal op `/expertises` leest `gallery` (`expertises.astro:240`), maar Cools (6),
  D-Glas (7) en Demarol (5) hebben hun foto's alleen in `photos`: hun modal toont geen extra
  foto's. Fix: modal leest `photos` (zonder de hoofdfoto die al bovenaan staat); `gallery` wordt
  overal `photos` (R4: één veldnaam).
- A7 Lightbox (`Layout.astro:208-234`): geen vorige/volgende. Fix: pijlknoppen + pijltjestoetsen
  binnen dezelfde rail, teller "3 / 7". Focus blijft in de dialoog (native `showModal`).
  `aria-label` op de `gal-zoom`-knoppen van projectpagina's (`[slug].astro:86`), zoals expertises.
- A8 Ticker (`index.astro:62`) pauzeert alleen bij muis (WCAG 2.2.2). Fix: ook pauze bij
  toetsenbordfocus + een kleine pauzeknop.
- A9 Print van projectpagina's: rail wordt afgekapt, pager/CTA printen mee. Fix: printregels +
  `qa-print` ook op één projectpagina.

**PR 3 `claude/beelden-opruim` — snelheid en dode code**

- A10 `width`/`height` ontbreken op de meeste beelden (bv. `/expertises` 30 van 35,
  `/realisaties` 16 van 20) → verspringende layout tijdens laden. Fix: afmetingen bij build uit de
  bestanden (sharp staat al in devDependencies); `srcset` waar een `-800`-variant bestaat.
- A11 Dode code, 0 verwijzingen gemeten: CSS `.card-icon`, `.section-header-img`,
  `.section-header-split`, `--light-blue`; beelden `exp-hoogspanning.jpg`, `ref-demarol.jpg`,
  `service-24-7.svg`, `service-onderhoud.svg`, `service-preventief.svg`; `icon`-veld in
  `expertises.json` + 3 `icon-*.svg`. Verwijderen (terug te halen via git).

**Uitdrukkelijk níet (bak B, besluit Camil — apart als genummerde vragen):**
tellers 45+/6.000+/5 landen, "24/7", "geen onderaannemers", superlatieven, certificaat- en
VCA/ISO-nummers, merknamen, groene luifel, rood-telling per viewport, identiteitsblok privacy,
dunne referenties, Google Fonts zelf hosten (zelfde Open Sans, maar wijzigt privacy-tekst).
Ook níet: Layout-splitsing en component-extractie (R4-groot) — geen zichtbare winst, wel risico;
apart voorstel als Camil dat wil.

## 4. Acceptatiecriteria

- [ ] Build groen, `check-seo` ALL OK, `qa-a11y` 0, `qa-browsers` ff+wk OK na elke PR.
- [ ] Crawl 26 × 5 breedtes: 0 horizontale scroll (nu 2), 0 console-/paginafouten.
- [ ] Modal Cools/D-Glas/Demarol toont 5/6/4 extra foto's (nu 0).
- [ ] Lightbox: pijltjes + toetsen werken, Escape sluit, focus terug op de knop.
- [ ] contact.php: regeleinde in e-mail/naam → 400; te lang → 400; onderwerp buiten lijst → 400;
      onderwerp "Offerte é" correct gecodeerd; `From:` bevat geen bezoekersadres.
- [ ] Beelden met `width`+`height`: ≥ 95 % van alle `<img>` in `dist/`.
- [ ] 0 verwijzingen naar verwijderde bestanden/klassen; 0 kapotte beelden.
- [ ] Per PR één journaalregel in `.planning/STATE.md`.

## 5. Verificatie

Elke nieuwe test faalt eerst op `main` (negatieve proef) en slaagt daarna.
`npm run build`, `node tasks/check-seo.cjs`, `qa-a11y`, `qa-browsers`, `qa-print`, plus nieuwe
`tasks/qa-crawl.cjs` (crawl hierboven) en `tasks/qa-lightbox.cjs`.
**contact.php:** PHP staat niet op deze pc. Test met PHP-CLI vraagt een installatie (akkoord
Camil); zonder dat blijft A1-A4 "niet geverifieerd" en de echte mailbezorging sowieso tot er
hosting is.

## 6. Smaak-check

- [x] Nodig voor PR 2: screenshots 390 + 1440 van `/expertises` (kop), modal, lightbox, ticker.
- [x] Niet nodig voor PR 1 en PR 3 (onzichtbaar), behalve de `maxlength`-meldingen.

## 7. Vrijstelling?

Geen: meerdere bestanden en gedrag.
