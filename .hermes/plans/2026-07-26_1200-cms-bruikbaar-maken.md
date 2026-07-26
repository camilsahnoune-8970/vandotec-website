# CMS bruikbaar maken — uitvoeringsplan

> **For Hermes:** gebruik dit plan als uitvoeringsrichtlijn voor Astro-pagina's gekoppeld aan Decap CMS via Netlify. Voer alleen stappen uit nadat de gebruiker het plan heeft goedgekeurd.

**Goal:** alle bestaande pagina's daadwerkelijk CMS-gestuurd maken door de bestaande `src/data/*.json` te koppelen aan de bijbehorende Astro-pagina's.

**Architecture:**
- Bestaande `pages`-collection blijft file-based.
- Elke pagina gebruikt precies één JSON-bestand uit `src/data/`.
- Er wordt geen nieuw content-systeem geïntroduceerd; we koppelen alleen wat er al ligt.
- Wijzigingen zijn per pagina afsluitend te verifiëren.

**Tech Stack:** Astro 7, Decap CMS via Netlify, file-based JSON in `src/data/`.

---


## Stap 1 — Hergebruikbare data-loader toevoegen
**Objective:** één helper om JSON per pagina te laden en zo zou de code DRY te houden.

**Files:**
- Create: `src/lib/loadPageData.ts`

**Acceptance:**
- import in een `.astro` pagina werkt
- ontbrekend veld geeft geen crash

---


## Stap 2 — homepage koppelen
**Objective:** `src/pages/index.astro` leest `src/data/home.json` in plaats van hardcoded hero/about-content te gebruiken.

**Files:**
- Modify: `src/pages/index.astro`

**Acceptance:**
- homepage laadt met data uit `home.json`
- `title`, `description`, `hero_title`, `hero_subtitle` uit CMS

---


## Stap 3 — contactpagina koppelen
**Objective:** `src/pages/contact.astro` gebruikt `src/data/contact.json` voor titel en beschrijving.

**Files:**
- Modify: `src/pages/contact.astro`

**Acceptance:**
- paginatitel en meta uit `contact.json`
- hardcoded contactgegevens behouden tot uitdrukkelijk anders gevraagd

---


## Stap 4 — expertisespagina koppelen
**Objective:** `src/pages/expertises.astro` gebruikt `src/data/expertises.json` voor titel en beschrijving.

**Files:**
- Modify: `src/pages/expertises.astro`

**Acceptance:**
- hero en meta uit JSON
- domeinblocks blijven eerst nog bestaan als layout-data

---


## Stap 5 — jobs, over-vandotec en service-onderhoud koppelen
**Objective:** de laatste drie pagina's krijgen hun CMS-data gekoppeld.

**Files:**
- Modify: `src/pages/jobs.astro`
- Modify: `src/pages/over-vandotec.astro`
- Modify: `src/pages/service-onderhoud.astro`

**Acceptance:**
- alle pagina's lezen hun eigen JSON-bestand
- geen build-error

---


## Stap 6 — build, lint-check en commit
**Objective:** controle dat alles compileert en dat geen `.astro` pagina meer de eigen titel hardcoded terwijl de JSON al bestaat.

**Commands:**
- `npm run build`

**Acceptance:**
- build slaagt
- daarna pas commit en push

---


## Stap 7 — live-check
**Objective:** snel de routes op Netlify verifiëren.

**Checks:**
- `/`
- `/contact`
- `/expertises`
- `/jobs`
- `/over-vandotec`
- `/service-onderhoud`

**Acceptance:**
- elke route geeft 200
- geen CMS-frontend-errors in browsercontrole

---


## Risico's
- Hardcoded tekst blijft staan tot een volgende stap; dit plan koppelt alleen centraal beheersbare velden.
- Media/afbeeldingen blijven voor nu in `public/img/` en los van de JSON-collections.

## Open vragen
- Wil je daarna ook afbeeldingen via Decap beheerbaar maken?
- Wil je dat ik daarna ook een tweede plan maak voor nested content zoals expertises of vacatures?
