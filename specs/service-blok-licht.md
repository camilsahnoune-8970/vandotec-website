# SPEC: service-blok-licht (home service-overzicht van donker naar licht)

Leeswijzer: geen goedgekeurde spec = geen PR. Camil keurt deze spec goed vóór er gebouwd wordt.
Skills: `frontend-ui-engineering` (a11y, contrast), `design-taste-frontend` (design read),
`redesign-existing-projects` (geen donkere sectie midden in lichte pagina).

Design read: B2B trust-first service-overzicht (1 feature + 3 kaarten) voor storingsgevoelige
uitbaters, in huisstijl (navy/rood/wit, radius 0). Keuze Camil: variant A (licht omkeren).

## 1. Doel (één zin)

Het service-blok op home (`index.astro:157-184`) is licht (grijs sectie, witte kaarten, navy tekst)
zonder inhouds-, link- of structuurwijziging — blauw-op-blauw definitief weg.

## 2. Context

Screenshot-review Camil 2026-10-09: donkerblauw kaartenblok te zwaar; huisregel “blauw op blauw
doe je nooit meer”. Eerdere aanname dat het blok niet bestond was fout (het staat op home, niet
op service-pagina) — deze spec corrigeert dat. REVIEW.md R3-gevoel (rood-telling, contrast).

## 3. Scope

- Wél: `index.astro:157-164` (`section-dark` → `section-gray`, `.light` eraf, eyebrow navy);
  `public/style.css` lichte kaartvariant gescopeerd onder `.section-gray` (kaart wit, rand licht,
  `h3` navy, `p` donker, `service-num` navy-omlijnd, `service-link` navy/rode hover).
- Wél: voor/na-screenshots 1440 + 390 ter smaak-check.
- Uitdrukkelijk níet: inhoud, links, ankers, grid, ratio’s, breakpoints, hover-gedrag of andere
  pagina’s wijzigen; geen nieuwe kleuren (alleen bestaande tokens).

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] Geen `section-dark` meer op home (grep 0 hits in index.astro).
- [ ] Alle kaartteksten contrast AA op wit (navy/donker op wit; rood alleen voor links/accents).
- [ ] Max 2 rode accenten per viewport in het blok (titel-lijn + hover/CTA).
- [ ] `npm run build` groen (27 pagina’s), `node tasks/check-seo.cjs` ALL OK.
- [ ] Voor/na 1440 + 390 beoordeeld door Camil.

## 5. Verificatie

- `npm run build`, `node tasks/check-seo.cjs`, grep-checks (`section-dark`, `.light` in blok).
- Renderbewijs uitsluitend via `astro preview` + Playwright (nooit `file://`).
- Contrast-claim onderbouwd met screenshot + token-verwijzing (geen meting = “niet geverifieerd”).

## 6. Smaak-check

- [x] Nodig (zichtbare wijziging → screenshots ter beoordeling aan Camil)
- [ ] Niet nodig (onzichtbaar: techniek, tekstfix, tooling)

## 7. Vrijstelling?

N.v.t. — dit ís de spec.
