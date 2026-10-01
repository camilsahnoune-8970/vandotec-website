# Todo: Vandotec duurzaam beheerbaar

## Task 1: Build verifiëren
**Description:** Draai een verse build en leg vast wat er uitkomt (pagina's, warnings, `dist/`-status).
**Acceptance criteria:**
- [ ] `npm run build` slaagt zonder errors
- [ ] Aantal pagina's in `dist/` genoteerd + afwijking vs `src/pages/` verklaard
**Verification:**
- [ ] Tests pass: n.v.t. (geen runner) — build-output als bewijs
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: `npx astro preview`, home + contact openen op mobiel en desktop
**Dependencies:** None
**Files likely touched:** geen (alleen lezen + build-output)
**Estimated scope:** Small

## Task 2: SEO-duplicatie fix
**Description:** Elke pagina krijgt één unieke title + description + og-set; dubbele `og:title` weg; `og:url`/canonical per pagina.
**Acceptance criteria:**
- [ ] Geen dubbele `og:title`/`og:description` meer in gebuilde HTML
- [ ] Elke pagina heeft unieke title + description (bron: JSON of frontmatter)
**Verification:**
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: view-source op `/`, `/contact`, `/expertises` vergelijken
**Dependencies:** Task 1
**Files likely touched:**
- `src/layouts/Layout.astro`
- `src/pages/*.astro`
- `src/data/*.json` (alleen SEO-velden)
**Estimated scope:** Small (1-2 files per pagina, in één slice)

## Task 3: contact.php-bug + hosting-beslisnotitie
**Description:** Verwijder foute `<script setup>`-regel boven `<?php`; leg hosting-keuze vast (statisch vs PHP) + hoe het formulier dan bewezen werkt.
**Acceptance criteria:**
- [ ] `contact.php` stuurt geen output vóór `header()` (bug weg)
- [ ] Beslisnotitie: statisch (dan PHP-alternatief nodig) of PHP-hosting (dan mail-test nodig) — met jouw “ja”
- [ ] Spam-honeypot + validatie + foutmeldingen getest volgens notitie
**Verification:**
- [ ] Build succeeds: `npm run build`
- [ ] Manual check: formulier versturen (geldig + leeg + spam-v veld) via preview/testhost
**Dependencies:** Task 1
**Files likely touched:**
- `public/contact.php`
- `src/pages/contact.astro`
- (notitie in `tasks/` of ADR, geen hosting-config zonder “ja”)
**Estimated scope:** Medium

## Checkpoint: Fundering
- [ ] Build groen, preview oké op mobiel + desktop
- [ ] SEO zonder duplicaten
- [ ] Hosting-keuze genomen (blokkeert Fase 2-formulierwerk)

## Task 4: Content/media-aanpak (gratis git-laag)
**Description:** Kies en beschrijf hoe jij straks zonder code-graafwerk teksten, foto's, vacatures en SEO aanpast (JSON houden vs gratis git-CMS + media-map + alt-teksten).
**Acceptance criteria:**
- [ ] Keuze vastgelegd + waarom gratis/onderhoudbaar voor solo-maker
- [ ] Media-plek + naamgeving + alt-verplichting beschreven
- [ ] Geen nieuw account/dienst zonder “ja”
**Verification:**
- [ ] Manual check: proefwijziging (tekst + foto + SEO-titel) zonder `dist/` aan te raken
**Dependencies:** Checkpoint Fundering
**Files likely touched:**
- `src/data/*.json` of CMS-config (`public/admin/`, `src/components/admin/`)
- `public/img/`
**Estimated scope:** Medium

## Task 5: Preview → publiceer → rollback in 1 stap
**Description:** Leg de enige werkwijze vast: previewen, publiceren en terugrollen via git, zonder handmatige `dist/`-trucs.
**Acceptance criteria:**
- [ ] Stappenplan preview → publiceer → rollback (elk 1 voorspelbare stap)
- [ ] Fout-scenario bewezen (foute wijziging teruggezet via vorige versie)
**Verification:**
- [ ] Manual check: proef-publish + proef-rollback op preview/testbranch
**Dependencies:** Task 4
**Files likely touched:** werkwijze-doc (geen site-code tenzij nodig)
**Estimated scope:** Small

## Task 6: Sitemap/robots/redirects
**Description:** Sitemap + robots kloppend; oude `/nl/`-URL's naar nieuwe `/` gemapt; `_headers`/canonicals vastgelegd.
**Acceptance criteria:**
- [ ] Sitemap bevat alle live-URL's (geen beheer/API), robots verwijst ernaar
- [ ] Redirect-map oud → nieuw + canonical per pagina beschreven
**Verification:**
- [ ] Manual check: sitemap + robots openen via preview; 3 oude URL's nalopen in map
**Dependencies:** Task 2
**Files likely touched:**
- `public/sitemap.xml`
- `public/robots.txt`
- `public/_headers`
**Estimated scope:** Small

## Checkpoint: Beheer
- [ ] Tekst/foto/vacature/SEO aanpassen → preview → publiceer → rollback bewezen
- [ ] Formulier-stroom bewezen volgens hosting-keuze

## Task 7: Foto-inventaris
**Description:** Lijst per plek wat nu SVG-placeholder is, wat tijdelijk kan, en welke echte Vandotec-foto's nodig zijn.
**Acceptance criteria:**
- [ ] Lijst: hero, 6 expertises, team/workshop, contact (nodig/formaat/alt)
- [ ] Tijdelijk vs echt gemarkeerd; geen stock zonder “ja”
**Verification:**
- [ ] Manual check: lijst nalopen tegen `src/pages/` + `public/img/`
**Dependencies:** Task 4
**Files likely touched:** inventaris-doc (geen foto's toevoegen zonder “ja”)
**Estimated scope:** Small

## Task 8: Stats verifiëren
**Description:** `40+`/`100+`/`24/7`/`10+` in `home.json` bevestigen of terugbrengen tot wat zeker is.
**Acceptance criteria:**
- [ ] Elke stat heeft bron of is verwijderd/aangepast
- [ ] Geen placeholder-cijfers meer live-voorstel in
**Verification:**
- [ ] Manual check: stats op home + contact nalopen na build
**Dependencies:** Geen (kan parallel met Task 7)
**Files likely touched:**
- `src/data/home.json`
- evt. `src/data/contact.json`
**Estimated scope:** XS

## Task 9: Responsive + toegankelijkheid + snelheid
**Description:** Breakpoints (360→1920, geen overflow), toetsenbord/focus/contrast, Lighthouse-basis, geen AI-uiterlijk buiten brand-spec.
**Acceptance criteria:**
- [ ] Geen horizontale scroll op 360/390/768/1440
- [ ] Toetsenbord door nav/formulier/footer; zichtbare focus; alt-teksten ingevuld waar foto's staan
- [ ] Lighthouse-basis genoteerd (geen harde CI-drempel nodig)
**Verification:**
- [ ] Manual check: preview op mobiel + desktop + toetsenbord-run + Lighthouse-run noteren
**Dependencies:** Task 2, Task 7
**Files likely touched:**
- `style.css` / `src/styles/*`
- `src/layouts/Layout.astro`
- `src/pages/*.astro` (alleen waar nodig)
**Estimated scope:** Medium

## Checkpoint: Compleet
- [ ] Alle succescriteria uit `tasks/spec.md` gehaald
- [ ] Klaar voor `gsd-verify-work` + `gsd-secure-phase` + `gsd-ui-review` (geen live-flip zonder “ja”)
