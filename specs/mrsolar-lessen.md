# SPEC: lessen van mrsolar.be (advies-CTA, contactstrook, cijferband)

Status: uitgevoerd via PR #18 (2026-10-06), goedgekeurd door Camil (incl. stats-cijfers).

## 1. Doel (één zin)

Drie bewezen conversie-patronen van mrsolar.be vertaald naar onze huisstijl,
zonder nieuwe content of claims.

## 2. Context

Analyse-ronde 2026-10-06 (plan-modus): mrsolar.be gelezen; 3 direct overneembare
patronen, 4 alleen-met-echte-content (reviews, video’s, partnerlogo’s, socials —
geparkeerd tot Camil materiaal aanlevert). Skill `landing-page-conversion-audit`
toegepast op de ontwerpen (alleen URL-niveau beschikbaar → first-principles).

## 3. Scope

- Wél:
  1. Advies-CTA-blok op `/expertises` na de teaser-kaarten (“Weet u niet welke
     oplossing past?” + tel-tekstlink + “Vraag advies”-knop naar `/contact`).
  2. Slanke contactstrook boven de footer op alle pagina’s (`Layout.astro`):
     “Defect of storing? 24/7 bereikbaar” + tel-knop + mail-tekstlink.
  3. Cijferband (`stats-xl`) op home omhoog: direct na de about-sectie
     (alleen verplaatsen, cijfers ongewijzigd).
- Uitdrukkelijk níet: nieuwe teksten/claims, nieuwe kleuren/fonts, reviews,
  video’s, logo’s, nieuws/blog, shop-achtige elementen.

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] Advies-blok rendert op `/expertises` tussen teasers en domeinsecties
- [ ] Contactstrook rendert op alle 11 pagina’s, tel-link tapt op 390px
- [ ] Stats-band staat direct na about op home; cijfers identiek
- [ ] Max 1 rode knop per nieuw element; nooit blauw-op-blauw
- [ ] `npm run build` groen, `node tasks/check-seo.cjs` 11/11

## 5. Verificatie

Build + SEO-check, dist-grep op nieuwe elementen, screenshots 1440/390
(home, expertises), print-check (nieuwe CTA-blokken verborgen op papier).

## 6. Smaak-check

- [x] Nodig (zichtbare elementen → screenshots aan Camil)

## 7. Vrijstelling?

N.v.t. — volledige spec.
