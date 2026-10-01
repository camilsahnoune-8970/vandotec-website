# Roadmap: Vandotec.be v1.0 “Duurzaam live-waardig”

**5 phases** | **22 requirements mapped** | All covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Fundering (audit) | Bewijs dat de gebouwde basis klopt | FOUND-01…05, CONTENT-01/03/05 | 3 |
| 2 | Beeldintegratie | Alle beeldposities gevuld of gedocumenteerd | MEDIA-01…04 | 4 |
| 3 | Beheer-garanties | Aanpassen → preview → publiceer → rollback bewezen; formulier komt zeker aan | MANAGE-01…04 | 3 |
| 4 | Content-final | Geen ongeverifieerde of ongekeurde zin meer | CONTENT-02, CONTENT-04 | 2 |
| 5 | Pre-live | Klaar-voor-live-voorstel, zonder te flippen | GOLIVE-01…04 | 3 |

### Phase Details

**Phase 1: Fundering (audit)**
Goal: Bewijs dat de gebouwde basis klopt (read-only verificatie + bewijs).
Requirements: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, CONTENT-01, CONTENT-03, CONTENT-05
Success criteria:
1. `npm run build` is groen en `dist/`-check bevestigt 1 unieke SEO-set per pagina + `noindex` op `/beheer/*`
2. Stats tonen nergens `100+`/`10+`; quote is woordelijk traceerbaar naar Voka-bron
3. Fase-rapport met bewijs ligt voor; geen code-wijzigingen nodig (of alsnog als bevinding)

**Phase 2: Beeldintegratie**
Goal: Alle beeldposities gevuld of gedocumenteerd.
Entry gates (maker-beslissingen eerst): hero-foto optie 1 of 2 · compressie-aanpak (`sharp`-dep ja/nee).
Requirements: MEDIA-01, MEDIA-02, MEDIA-03, MEDIA-04
Success criteria:
1. Eigen beelden staan in `public/img/` en renderen op de gemapte posities met alt-teksten
2. Stock staat alleen op register-gaten, met auteur + URL in `tasks/beelden.md`
3. Hero-pagina blijft binnen prestatiebudget (geen >500KB ongecomprimeerd boven de vouw)
4. Foto-plekken-doc beschrijft elke positie (ratio + wat een echte foto later vervangt)

**Phase 3: Beheer-garanties**
Goal: Aanpassen → preview → publiceer → rollback bewezen; formulier komt zeker aan.
Requirements: MANAGE-01, MANAGE-02, MANAGE-03, MANAGE-04
Success criteria:
1. Beheerlaag-keuze (JSON houden vs gratis git-CMS) is vastgelegd met rationale
2. Proefwijziging (tekst + foto + SEO-titel) gaat preview → publiceer → rollback zonder `dist/`-geknutsel
3. Formulier toont bedank-melding en de mail-test op PHP-host is geslaagd (geldig/leeg/spam)

**Phase 4: Content-final**
Goal: Geen ongeverifieerde of ongekeurde zin meer.
Requirements: CONTENT-02, CONTENT-04
Success criteria:
1. FAQ-correcties van de maker zijn verwerkt en afgevinkt
2. Jobs-pagina is zin-voor-zin goedgekeurd (of herschreven naar aangeleverde teksten)

**Phase 5: Pre-live**
Goal: Klaar-voor-live-voorstel, zonder te flippen.
Requirements: GOLIVE-01, GOLIVE-02, GOLIVE-03, GOLIVE-04
Success criteria:
1. Sitemap/robots dekken alle live-URL's; `/nl/`→`/`-map + canonicals liggen vast
2. 360/390/768/1440 zonder overflow; toetsenbord + focus + contrast akkoord; Lighthouse-basis genoteerd
3. `gsd-secure-phase` en `gsd-ui-review` zonder open blocking-findings
4. Live-voorstel (repo/DNS-stappen) ligt ter expliciete goedkeuring — de flip zelf is géén taak

---
*Roadmap created: 2026-09-17 (inline — geen roadmapper-subagent beschikbaar in deze runtime)*
