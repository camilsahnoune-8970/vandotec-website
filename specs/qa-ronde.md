# SPEC: QA-ronde (Firefox/Safari, screenreader, print)

Status: goedgekeurd door Camil 2026-10-05 — in uitvoering.

## 1. Doel (één zin)

Alle 11 pagina’s bewezen werkend in Firefox en Safari, basis-screenreader-check gedaan, print-stylesheet aanwezig.

## 2. Context

Ronde D uit het A→E-akkoord (2026-10-05). Alles tot nu toe is alleen in headless
Chromium bekeken; screenreader en print zijn nooit gedaan (`STATE.md`: geblokkeerd/open).

## 3. Scope

- Wél: screenshots Firefox + Safari (home, expertises, contact op 1440/390),
  keyboard/screenreader-basics (koppenstructuur, alt-teksten, formulierlabels),
  `@media print`-stylesheet voor contentpagina’s.
- Uitdrukkelijk níet: visuele herontwerpen, nieuwe content, performance-fixes
  (dat was ronde B), het contactformulier zelf (ronde C, wacht op staging).

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] Screenshots Firefox + Safari nagekeken, geen layout-breuken vs. Chromium
- [ ] Koppenstructuur logisch (één h1 per pagina, geen niveaus overgeslagen)
- [ ] Alle formuliervelden hebben labels; foutmelding wordt voorgelezen (aria)
- [ ] Print van `/contact` toont adres, telefoon en e-mail leesbaar op één pagina
- [ ] Bevindingen als issues/PR’s verwerkt, geen open blocking-punten

## 5. Verificatie

`npm run build` groen, `node tasks/check-seo.cjs` 11/11, screenshots in PR,
screenreader-bevindingen als checklist in de PR-beschrijving.

## 6. Smaak-check

- [x] Nodig (alleen als er zichtbare browser-verschillen uitkomen → screenshots aan Camil)

## 7. Vrijstelling?

N.v.t. — volledige spec, dit is een echte ronde.
