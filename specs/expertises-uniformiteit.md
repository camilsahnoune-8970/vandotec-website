# SPEC: expertises-uniformiteit (advice-band weg + één nummersysteem)

Leeswijzer: geen goedgekeurde spec = geen PR. Camil keurt deze spec goed vóór er gebouwd wordt.

## 1. Doel (één zin)

De expertises-pagina toont geen advice-band meer en presenteert nummers, media-ratio’s en
titels in alle drie de sectie-patronen identiek — bij gelijkblijvende structuur en inhoud.

## 2. Context

Direct verzoek Camil (screenshot-review 2026-10-08): blauw deel (advice-band) eruit; structuur
behouden maar cijfers/presentatie uniformeren. Keuzes via vragenronde: overal groot cijfer
(exp-num), stats-bar buiten schot. Valt onder REVIEW.md M4-gevoel (uniformiteit).

## 3. Scope

- Wél: `src/pages/expertises.astro` — advice-band (r. 65-73) verwijderen; `exp-num` naar patroon 1+2;
  `Expertise {num}`-eyebrows (r. 91, 141) verwijderen; patroon 3 media naar `ratio-16x9`;
  approach-`h3` overal `mt-15`; zo nodig lichte `exp-num`-variant in `public/style.css` voor donker.
- Wél: screenshots alle 3 patronen voor/na (6 beelden) ter smaak-check.
- Uitdrukkelijk níet: teksten/data wijzigen; stats-bar, cross-band, referenties, modal, teaser-grid
  of andere pagina’s aanraken; structuur-ritme (licht/donker/grijs) wijzigen.

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] Geen `advice-band` meer op `/expertises` (grep 0 hits in expertises.astro).
- [ ] Alle 3 patronen tonen `exp-num`; nergens nog `Expertise {num}`-eyebrow.
- [ ] Alle 3 patronen `ratio-16x9`; alle approach-`h3`’s met `mt-15`.
- [ ] `npm run build` groen (27 pagina’s), `node tasks/check-seo.cjs` ALL OK.
- [ ] 6 screenshots (3 patronen × voor/na) beoordeeld door Camil.

## 5. Verificatie

- `npm run build`, `node tasks/check-seo.cjs`, grep-checks op `advice-band`/`Expertise {num}`/`ratio-4x3`.
- Renderbewijs uitsluitend via `astro preview` + Playwright (nooit `file://`).
- Elke bewering in de PR met bestand:regel of screenshot.

## 6. Smaak-check

- [x] Nodig (zichtbare wijziging → screenshots ter beoordeling aan Camil)
- [ ] Niet nodig (onzichtbaar: techniek, tekstfix, tooling)

## 7. Vrijstelling?

N.v.t. — dit ís de spec.
