# SPEC: review-ronde (kritische doorlichting hele site)

Leeswijzer: geen goedgekeurde spec = geen PR. Camil keurt deze spec goed vóór de audit start.
Skills: `spec-driven-development` (proces), `code-review-and-quality` (5 assen + ernst-labels),
`doubt-driven-development` (adversarial check per Critical-bewering).

## 1. Doel (één zin)

Alle 27 pagina’s zijn kritisch doorgelicht op 6 assen en elke bevinding staat als gelabelde,
bewijsgebonden rij klaar voor fix-rondes — zonder dat er al één regel site-code wijzigt.

## 2. Context

Na 33 PR’s (pilot, 4 contentrondes, ticker, V1-split) is er nooit een integrale review geweest;
STATE.md vermeldt alleen “fotorondgang loopt”. Besluit: volledige audit vóór verdere contentrondes,
zodat fixes op een schone basis landen. Valt onder AGENTS.md-regel “geen code zonder goedgekeurde spec”.

## 3. Scope

- Wél: 4 auditmodules (M1 structuur, M2 inhoud, M3 vertrouwen, M4 gevoel — zie plan),
  alle 27 pagina’s in `dist/`, `contact.php`, sitemap, register, JSON-data.
- Wél: tekstvoorstellen bij foute claims (beslisregel: voorstel + Camil beslist per regel).
- Uitdrukkelijk níet: code- of contentfixes (die volgen als aparte fix-rondes met eigen PR’s);
  geen DNS/hosting/staging; geen nieuwe entries of foto’s; geen PHP-mailtest (kan niet lokaal).

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] Bevindingenlijst dekt alle 27 pagina’s (11 + hub + 14 details + 404) + `contact.php`.
- [ ] Elke bevinding heeft: ernst-label (Critical/Required/Optional/Nit), as (M1–M4),
  bestand + regel, bewijs (dist-check, screenshot of commando-output).
- [ ] 0 beweringen zonder bewijs in het rapport; wat niet verifieerbaar is staat als “niet geverifieerd”.
- [ ] Per Critical-bewering is een adversarial check gedaan (“bewijs dat deze claim fout is”).
- [ ] Dode links/assets-telling in `dist/` = 0 óf elk item staat als bevinding gelabeld.
- [ ] Rapport staat in `tasks/REVIEW.md` en is via PR ingediend (geen directe push naar main).

## 5. Verificatie

Welke commando’s/checks bewijzen dat het werkt? (bv. `npm run build`,
`node tasks/check-seo.cjs`, screenshot 1440/390, renderproof)

- `npm run build` groen (27 pagina’s) vóór de audit als baseline.
- `node tasks/check-seo.cjs` = ALL OK als baseline.
- Renderbewijs uitsluitend via `astro preview` + Playwright (nooit `file://` — bewezen onbetrouwbaar).
- Elke bevinding herleidbaar tot commando-output, screenshot of `dist/`-bestand.

## 6. Smaak-check

- [ ] Nodig (zichtbare wijziging → screenshots ter beoordeling aan Camil)
- [x] Niet nodig (onzichtbaar: techniek, tekstfix, tooling)

Audit zelf wijzigt niets zichtbaars; smaak-check volgt per fix-ronde.

## 7. Vrijstelling?

N.v.t. — dit ís de spec. Fix-rondes nadien krijgen waar nodig hun eigen (kleine) spec of
vrijstellingsregel per PR.
