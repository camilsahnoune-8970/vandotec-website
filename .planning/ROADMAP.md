# Roadmap: Vandotec.be

> **Status 2026-10-16:** de actieve milestone is **v1.1 "Inhoud-waarheid"** (fase 6 t/m 18, uitvoering door Claude Code in GSD-fases, één PR per fase). De v1.0-roadmap (17/09) staat onderaan: fase 1-2 zijn klaar, fase 3-5 liggen stil en zijn geparkeerd. Spec van v1.1: `specs/inhoud-waarheid.md`; requirements: `REQUIREMENTS.md`; milestone-afspraken: `MILESTONES.md`. Aantallen in de v1.0-tekst (bv. "18 pagina's") zijn verouderd (nu 27).

## Milestones

- 🚧 **v1.1 Inhoud-waarheid** - Phases 6-18 (in progress, gestart 2026-10-12)
- ⏸ **v1.0 Duurzaam live-waardig** - Phases 1-5 (fase 1-2 klaar; fase 3-5 geparkeerd, wachten op de hostingkeuze en op besluiten van Camil)

## Phases

### 🚧 v1.1 Inhoud-waarheid (In Progress)

**Milestone Goal:** elke bewering op vandotec.be is gedekt door een bron of een bevestiging van Camil, of is afgezwakt, en de C-lijst heeft geen open eindes meer.

- [x] **Phase 6: Herstel en rolwissel** - docs en GSD-inrichting op de nieuwe rolverdeling (Claude Code bouwt) (completed 2026-10-16)
- [x] **Phase 7: CLAIM-11** - Powerhub-tijdlijn afsluiten met bron (completed 2026-10-16)
- [x] **Phase 8: Absolute claims** - CLAIM-03 (24/7) en CLAIM-12 (eigen beheer) afzwakken (completed 2026-10-16)
- [x] **Phase 9: Stock-claim** - CLAIM-14 (uitgebreide stock onderdelen) (completed 2026-10-19)
- [x] **Phase 10: Superlatieven** - CLAIM-04 (completed 2026-10-19)
- [ ] **Phase 11: Certificaten** - CLAIM-05
- [ ] **Phase 12: Merknamen** - CLAIM-06
- [ ] **Phase 13: Klanten** - CLAIM-07
- [ ] **Phase 14: Identiteit en privacy** - CLAIM-08
- [ ] **Phase 15: Lettertype zelf hosten** - CLAIM-09
- [ ] **Phase 16: Voorwaarden** - CLAIM-13
- [ ] **Phase 17: Dunne referenties** - CLAIM-10
- [ ] **Phase 18: Afsluiten** - C-lijst, geparkeerde punten, docs en milestone-archief

## Phase Details

### Phase 6: Herstel en rolwissel

**Goal**: de repo, de docs en de GSD-instellingen kloppen met de nieuwe rolverdeling, en de basislijn is gemeten.
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: geen CLAIM (infrastructuur)
**Success Criteria** (what must be TRUE):
  1. `AGENTS.md`, `STATE.md`, `MILESTONES.md` en de spec zeggen dat Claude Code bouwt en dat opencode niet meer bouwt.
  2. `.planning/config.json` bestaat en `ROADMAP.md` is door GSD leesbaar (`roadmap.get-phase` vindt fase 6 t/m 18).
  3. Basislijn gemeten op `origin/main`: build en de testset zonder server groen, 27 pagina's.

**Plans**: 1/1 plans complete

Plans:
- [x] 06-01: rolwissel-docs, ROADMAP-omzetting en GSD-config in één PR

### Phase 7: CLAIM-11

**Goal**: de Powerhub-tijdlijn is afgesloten met een gecontroleerde bron.
**Depends on**: Phase 6
**Requirements**: CLAIM-11
**Success Criteria** (what must be TRUE):
  1. `tasks/REVIEW.md` heeft bij het Powerhub-punt "Afgehandeld" met de bron (mediakit p. 3, 4 en 10, gecontroleerd 16/10).
  2. CLAIM-11 staat afgevinkt in `REQUIREMENTS.md`.

**Plans**: 1/1 plans complete

Plans:
- [x] 07-01: documentatiewijziging (REVIEW, REQUIREMENTS, journaal)

### Phase 8: Absolute claims

**Goal**: "24/7" en "elk project/elke interventie in eigen beheer" staan niet meer als ongedekte bewering op de site.
**Depends on**: Phase 7
**Requirements**: CLAIM-03, CLAIM-12
**Success Criteria** (what must be TRUE):
  1. Na de wijziging staat "24/7" nergens meer in `dist/` en niet meer in de OG-afbeelding, tenzij Camil een wachtdienst bevestigt.
  2. De absolute "eigen beheer"-zinnen volgen dezelfde lijn als CLAIM-02; het Voka-citaat is onveranderd.
  3. Build, SEO-, a11y- en mediakit-controles groen; Camil keurde het voor/na goed.

**Plans**: 1/1 plans complete

Plans:
- [x] 08-01: teksten per regel afzwakken, OG-afbeelding opnieuw genereren

### Phase 9: Stock-claim

**Goal**: "uitgebreide stock veelgebruikte onderdelen" is bevestigd of geschrapt op alle vier de plaatsen.
**Depends on**: Phase 8
**Requirements**: CLAIM-14
**Success Criteria** (what must be TRUE):
  1. De stock-claim staat op geen enkele plaats meer, of is bevestigd door Camil.
  2. Camil keurde het voor/na goed.

**Plans**: 1/1 plans complete

Plans:
- [x] 09-01: vier plaatsen aanpassen in één PR

### Phase 10: Superlatieven

**Goal**: superlatieven op de site komen uit de mediakit of zijn afgezwakt.
**Depends on**: Phase 9
**Requirements**: CLAIM-04
**Success Criteria** (what must be TRUE):
  1. "op elke werf, bij elke opdrachtgever" is afgezwakt; teksten die letterlijk uit de mediakit komen blijven.
  2. De zin met "ISO 17020" en "klasse 6/P2" blijft heel; `verify-mediakit.cjs` is groen.

**Plans**: 1/1 plans complete

Plans:
- [x] 10-01: tekstwijziging met voor/na

### Phase 11: Certificaten

**Goal**: certificaten worden alleen getoond met wat Camil kan leveren; niets is verzonnen.
**Depends on**: Phase 10
**Requirements**: CLAIM-05
**Success Criteria** (what must be TRUE):
  1. "bewijst" is "toont dat"; "erkend in klasse 6/P2" is "klasse 6/P2" (zoals mediakit p. 3).
  2. Er staan geen certificaatnummers of geldigheidsdata die niet zijn aangeleverd.
  3. Het BELAC-logo is bevestigd of verwijderd.

**Plans**: 1 plan

Plans:
- [ ] 11-01: tekst en logo, met bron voor elke gewijzigde check-verwachting

### Phase 12: Merknamen

**Goal**: merknamen in alt-teksten en bijschriften zijn gedekt of geneutraliseerd.
**Depends on**: Phase 11
**Requirements**: CLAIM-06
**Success Criteria** (what must be TRUE):
  1. Klantnamen uit de mediakit blijven; overige merknamen zijn geneutraliseerd (opnieuw geteld met dezelfde regex).
  2. `disclaimer.astro` heeft één zin over merknamen en eigendom van derden.

**Plans**: 1 plan

Plans:
- [ ] 12-01: alt-teksten en bijschriften, disclaimerzin

### Phase 13: Klanten

**Goal**: klantnamen op de site (kaart, ticker, bestandsnamen) staan er alleen met toestemming.
**Depends on**: Phase 12
**Requirements**: CLAIM-07
**Success Criteria** (what must be TRUE):
  1. De naam Pessleux staat nergens meer, tenzij Camil toestemming bevestigt; `ref-pessleux*.jpg` is hernoemd inclusief `tasks/beelden.md`.
  2. Overige tickerklanten zijn bevestigd of weggehaald.

**Plans**: 1 plan

Plans:
- [ ] 13-01: kaart, ticker en bestandsnamen

### Phase 14: Identiteit en privacy

**Goal**: de privacyverklaring noemt wie de verwerkingsverantwoordelijke is, en de tijdelijke tekst op de privacypagina is weg.
**Depends on**: Phase 13
**Requirements**: CLAIM-08
**Success Criteria** (what must be TRUE):
  1. `privacy.astro` heeft een identiteitsblok met wettelijke naam, adres, BTW en e-mail; cookie- en disclaimerpagina verwijzen ernaar.
  2. De placeholder op `privacy.astro:39` (C9) is weg.
  3. Camil bevestigde de wettelijke naam en zag de nieuwe tekst letterlijk.

**Plans**: 1 plan

Plans:
- [ ] 14-01: identiteitsblok en verwijzingen

### Phase 15: Lettertype zelf hosten

**Goal**: Open Sans komt van de eigen server, niet van Google.
**Depends on**: Phase 14
**Requirements**: CLAIM-09
**Success Criteria** (what must be TRUE):
  1. `dist/` bevat 0 verwijzingen naar `fonts.googleapis` of `fonts.gstatic`.
  2. Screenshots 390 en 1440 voor/na tonen geen zichtbaar verschil.
  3. De OFL-licentietekst staat in `public/fonts/`; er is geen nieuwe npm-dependency.

**Plans**: 1 plan

Plans:
- [ ] 15-01: woff2-bestanden, `@font-face`, `Layout.astro` en `cookies.astro`

### Phase 16: Voorwaarden

**Goal**: de termijnen in de algemene voorwaarden zijn bevestigd door Camil of bewust ongemoeid gelaten.
**Depends on**: Phase 15
**Requirements**: CLAIM-13
**Success Criteria** (what must be TRUE):
  1. Camil bevestigde de termijnen (offerte 30 dagen, betaling 30 dagen) of het punt staat als "bewust gelaten (niet bevestigd, juridisch nakijken door Camil)".

**Plans**: 1 plan

Plans:
- [ ] 16-01: bevestiging of vastlegging

### Phase 17: Dunne referenties

**Goal**: referenties zonder tekst of foto's zijn aangevuld of verborgen.
**Depends on**: Phase 16
**Requirements**: CLAIM-10
**Success Criteria** (what must be TRUE):
  1. Zonder aangeleverde tekst en foto's zijn Iveco Maenhout, Decospan, MIG Motors en Cid Lines verborgen, met `sitemap.xml`, de paginatelling in `AGENTS.md` en de CI-stapnaam mee aangepast.
  2. De nieuwe paginatelling is vastgesteld en met een negatieve proef bewezen.

**Plans**: 1 plan

Plans:
- [ ] 17-01: `hidden`-vlag, sitemap en tellingen

### Phase 18: Afsluiten

**Goal**: de milestone is gesloten en er is geen open eind zonder eigenaar.
**Depends on**: Phase 17
**Requirements**: geen CLAIM (C-lijst en opruimen)
**Success Criteria** (what must be TRUE):
  1. C1 t/m C11 hebben een eindstatus in `STATE.md`; geparkeerde punten staan in `MILESTONES.md` met reden, eigenaar en trigger.
  2. `grep -i opencode` in de actuele docs zegt nergens dat opencode bouwt.
  3. `gsd-complete-milestone` heeft v1.1 gearchiveerd (via een PR); scratch-worktrees, venv, `jq` en processen van Claude zijn opgeruimd.

**Plans**: 2 plans

Plans:
- [ ] 18-01: C-lijst, geparkeerde punten, docs
- [ ] 18-02: milestone archiveren en opruimen

## Progress

**Execution Order:**
Phases execute in numeric order: 6 → 7 → 8 → … → 18

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Fundering (audit) | v1.0 | 1/1 | Complete | 2026-09-19 |
| 2. Beeldintegratie | v1.0 | 1/1 | Complete | 2026-09-19 |
| 3. Beheer-garanties | v1.0 | 0/0 | Deferred | - |
| 4. Content-final | v1.0 | 0/0 | Deferred | - |
| 5. Pre-live | v1.0 | 0/0 | Deferred | - |
| 6. Herstel en rolwissel | v1.1 | 1/1 | Complete    | 2026-10-16 |
| 7. CLAIM-11 | v1.1 | 1/1 | Complete    | 2026-10-16 |
| 8. Absolute claims | v1.1 | 1/1 | Complete    | 2026-10-16 |
| 9. Stock-claim | v1.1 | 1/1 | Complete    | 2026-10-19 |
| 10. Superlatieven | v1.1 | 1/1 | Complete    | 2026-10-19 |
| 11. Certificaten | v1.1 | 0/1 | Not started | - |
| 12. Merknamen | v1.1 | 0/1 | Not started | - |
| 13. Klanten | v1.1 | 0/1 | Not started | - |
| 14. Identiteit en privacy | v1.1 | 0/1 | Not started | - |
| 15. Lettertype zelf hosten | v1.1 | 0/1 | Not started | - |
| 16. Voorwaarden | v1.1 | 0/1 | Not started | - |
| 17. Dunne referenties | v1.1 | 0/1 | Not started | - |
| 18. Afsluiten | v1.1 | 0/2 | Not started | - |

## v1.0 Duurzaam live-waardig (gestart 2026-09-17, geparkeerd)

Van breekbare build naar platform-waardig beheren, zonder live te gaan. Fase 1-2 zijn klaar. Fase 3-5 liggen stil: ze hangen aan de hostingkeuze en aan besluiten van Camil, en staan in `MILESTONES.md` als geparkeerd (eigenaar Camil).

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Fundering (audit) | Bewijs dat de gebouwde basis klopt | FOUND-01…05, CONTENT-01/03/05 | 3 |
| 2 | Beeldintegratie | Alle beeldposities gevuld of gedocumenteerd | MEDIA-01…04 | 4 |
| 3 | Beheer-garanties | Aanpassen → preview → publiceer → rollback bewezen; formulier komt zeker aan | MANAGE-01…04 | 3 |
| 4 | Content-final | Geen ongeverifieerde of ongekeurde zin meer | CONTENT-02, CONTENT-04 | 2 |
| 5 | Pre-live | Klaar-voor-live-voorstel, zonder te flippen | GOLIVE-01…04 | 3 |

<details>
<summary>v1.0 fasedetails (originele tekst van 2026-09-17, ongewijzigd)</summary>

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
4. Live-voorstel (repo/DNS-stappen) ligt ter expliciete goedkeuring; de flip zelf is géén taak

</details>

*Roadmap v1.0 created: 2026-09-17 (inline). Omgezet naar het GSD-sjabloon en uitgebreid met v1.1 op 2026-10-16.*
