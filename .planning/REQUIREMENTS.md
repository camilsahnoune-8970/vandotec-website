# Requirements: Vandotec.be v1.0 “Duurzaam live-waardig”

**Defined:** 2026-09-17
**Core Value:** De maker kan alles zelf aanpassen, previewen, publiceren en terugrollen — gratis, zonder breekbare handklusjes.

## v1 Requirements

### Fundering (grotendeels gebouwd — te verifiëren in Fase 1)

- [x] **FOUND-01**: Maker krijgt een groene build (`npm run build`, 18 pagina's, geen errors)
- [x] **FOUND-02**: Elke publieke pagina toont exact één unieke title/description/og-set + canonical
- [x] **FOUND-03**: Beheerpagina's (`/beheer/*`) zijn uitgesloten van indexatie (`noindex, nofollow`)
- [x] **FOUND-04**: Contactformulier stuurt geen output vóór headers (PHP-bug opgelost)
- [x] **FOUND-05**: Hostingkeuze is vastgelegd met consequenties (keuze A: PHP-hosting)

### Beeldintegratie (gebouwd + maker-preview — gesloten 2026-09-19)

- [x] **MEDIA-01**: Maker ziet eigen Vandotec-beelden op de juiste posities, met alt-teksten
- [x] **MEDIA-02**: Gratis stock staat alleen op gedocumenteerde gap-posities (bron + auteur in register)
- [x] **MEDIA-03**: Hero-foto is gekozen (optie 2, daarna PMO-bijlage) en de pagina blijft binnen prestatiebudget (sharp-compressie)
- [x] **MEDIA-04**: Elke beeldpositie heeft een vaste ratio + foto-plekken-documentatie voor latere echte foto's

### Beheer-garanties

- [ ] **MANAGE-01**: Maker past tekst/foto/vacature/SEO aan zonder in `dist/` te zitten (beheerlaag-keuze vastgelegd: JSON houden of gratis git-CMS)
- [ ] **MANAGE-02**: Maker previewt elke wijziging vóór publicatie
- [ ] **MANAGE-03**: Maker rolt een foute wijziging in één stap terug via git
- [ ] **MANAGE-04**: Maker ontvangt formulier-aanvragen zeker (bedank-melding `?sent=1` gebouwd 2026-09-19; mail-test op PHP-host nog open)

### Inhoud

- [x] **CONTENT-01**: Site toont uitsluitend geverifieerde informatie (`100+`/`10+` geschrapt, werkdag-claim afgezwakt)
- [x] **CONTENT-02**: FAQ-goedkeuring (geaccepteerd 2026-09-19 bij gebrek aan correctie)
- [x] **CONTENT-03**: Quote is woordelijk geverifieerd met bronvermelding (Voka Ondernemers, jan 2026)
- [ ] **CONTENT-04**: Jobs-pagina is zin-voor-zin goedgekeurd door de maker
- [x] **CONTENT-05**: Home toont een expertise-teaser met CTA (geen lege grid)

### Pre-live (expliciet zonder live-flip)

- [x] **GOLIVE-01**: Sitemap/robots dekken alle live-URL's; oude `/nl/`-URL's zijn gemapt naar nieuwe `/` (redirects + canonicals) — map in `tasks/redirects.md`, uitvoering bij live-gang
- [ ] **GOLIVE-02**: Site werkt zonder horizontale scroll op 360/390/768/1440, met toetsenbord, zichtbare focus en voldoende contrast
- [ ] **GOLIVE-03**: Security-review zonder open findings (headers, formulier-validatie, noindex admin, geen secrets)
- [ ] **GOLIVE-04**: Maker ontvangt een live-voorstel (repo/DNS-stappen) ter expliciete goedkeuring

## v2 Requirements

Toekomstig, niet in deze roadmap.

### Beheer-UI

- **CMSUI-01**: Maker bewerkt content via een beheerscherm i.p.v. JSON (gratis git-CMS, pas na live)
- **CMSUI-02**: Maker beheert media via een media-bibliotheek

### Meertaligheid

- **I18N-01**: FR-pagina's zijn echt vertaald (nu dummy-switcher)

### Media-v2

- **MED2-01**: Echte Vandotec-projectfoto's vervangen de stock 1:1
- **MED2-02**: Echte cijfers (`100+`/`10+`) zijn bevestigd en zichtbaar — alleen met bron van de maker

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live-flip naar vandotec.be | Vereist expliciete "ja"; is een autorisatie, geen bouwfase |
| Repo public maken / DNS wijzigen | Aparte goedkeuringen met eigen stappenplan (GOLIVE-04) |
| Betaalde hosting, diensten of accounts | Gratis is hard; betalen alleen bij bewezen vastlopen |
| Tracking/analytics-scripts | Geen externe scripts zonder expliciete goedkeuring (privacy) |
| Video-secties | Overgeslagen op verzoek van de maker |
| Powerland-inhoud | Zusterbedrijf blijft strikt gescheiden |
| Volledige CMS-ervaring (WYSIWYG/rollen) | v2; Pad A (JSON-in-git) volstaat voor solo-maker tot na live |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| CONTENT-01 | Phase 1 | Complete |
| CONTENT-03 | Phase 1 | Complete |
| CONTENT-05 | Phase 1 | Complete |
| MEDIA-01 | Phase 2 | Complete |
| MEDIA-02 | Phase 2 | Complete |
| MEDIA-03 | Phase 2 | Complete |
| MEDIA-04 | Phase 2 | Complete |
| MANAGE-01 | Phase 3 | Pending |
| MANAGE-02 | Phase 3 | Pending |
| MANAGE-03 | Phase 3 | Pending |
| MANAGE-04 | Phase 3 | Pending |
| CONTENT-02 | Phase 4 | Complete |
| CONTENT-04 | Phase 4 | Pending |
| GOLIVE-01 | Phase 5 | Complete |
| GOLIVE-02 | Phase 5 | Pending |
| GOLIVE-03 | Phase 5 | Pending |
| GOLIVE-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0 ✓

---
*Requirements defined: 2026-09-17*
*Last updated: 2026-09-17 after milestone v1.0 start*
