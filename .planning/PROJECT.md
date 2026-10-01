# Vandotec.be — nieuwe website (Astro, statisch)

## What This Is

Vandotec.be wordt opnieuw gebouwd als snelle, statische Astro-website voor het Poperingse
installatiebedrijf Vandotec (tankstations, EV-laadinfrastructuur, carwashes,
reinigingssystemen, infrastructuurwerken, waterprojecten). Eén maker (Camil) bouwt en
beheert; de site moet er professioneel uitzien én beheren als WordPress/Framer —
zonder dat platform te kopen.

## Core Value

De maker kan alles zelf aanpassen, previewen, publiceren en terugrollen — gratis,
zonder breekbare handklusjes.

## Requirements

### Validated

(Gescheept én bevestigd — nog geen; validatie volgt per fase.)

### Active

- Fundering technisch groen en geverifieerd (build, SEO, formulier-basis)
- Eigen Vandotec-beelden + gedocumenteerde gratis stock op alle beeldposities
- Beheer-garanties: aanpassen → preview → publiceer → rollback, formulier komt zeker aan
- Uitsluitend geverifieerde inhoud (bron: live site of Voka-interview)
- Pre-live klaar (sitemap/redirects, responsive, toegankelijk, security-gereviewd)

### Out of Scope

- Live-flip naar vandotec.be zonder expliciete "ja" — geautoriseerde handeling, geen taak
- Repo public maken / DNS wijzigen — aparte goedkeuringen, geen fase-werk
- Betaalde diensten, hosting of accounts — gratis is hard; betalen alleen bij bewezen vastlopen
- Tracking/analytics — geen externe scripts zonder expliciete goedkeuring
- Video — overgeslagen op verzoek van de maker
- Powerland-menging — zusterbedrijf blijft strikt gescheiden (alleen Vandotec-scope)
- FR-vertalingen — NL/FR-switcher is dummy; echte vertaling is toekomstig werk (v2)

## Current Milestone

**v1.0 “Duurzaam live-waardig”** — van breekbare build naar platform-waardig beheren,
zonder live te gaan. Zie `.planning/REQUIREMENTS.md` en `.planning/ROADMAP.md`.
`tasks/*.md` (spec/plan/todo/hosting-keuze/beelden) geldt als archief en inputbron.

## Context

- Stack: Astro 7 static (`output: static`, `trailingSlash: never`), Node ≥ 22. Content als
  JSON in `src/data/` (6 bestanden); `dist/` is deploy-artefact, nooit handmatig editen.
- Visueel contract: `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` (oorspronkelijk),
  daarna restyle naar referentietaal jonasdebruyn.be met behoud van merk-tokens
  (`brand-spec.md`: navy `#091950`, red `#c2000b`, Open Sans, radius 0).
- Live site (Fork CMS, Siesqo-theme) draait nog; oude URL's met `/nl/`-prefix → 301-map nodig.
- Hostingkeuze: **A — PHP-hosting** (bv. Combell); `public/contact.php` (eigen `mail()`-handler
  met honeypot + validatie) werkt alleen daar. Op statische hosting is het formulier dood.
- Foto's: 9 eigen beelden in `tasks/beelden-staging/` + register `tasks/beelden.md`;
  echte projectfoto's volgen later van de maker; stock alleen voor gedocumenteerde gaten.
- Cijfers: alleen `40+` (sinds 1978, bevestigd) en `24/7` tonen; `100+`/`10+` nergens
  verifieerbaar → geschrapt uit JSON, filter in `src/lib/loadPageData.ts` als vangnet.
- Werkwijze: `npx astro preview` in workdir (geen `cd` naar MSYS-path); background-servers
  altijd gericht opruimen (alleen eigen PID's, nooit alle `node`-processen).

## Constraints

- **Budget**: alleen gratis — geen nieuwe accounts, diensten of kosten zonder expliciete goedkeuring
- **Hosting**: formulier-garantie hangt aan PHP-hosting (keuze A vastgelegd)
- **Privacy**: geen tracking, geen derde-scripts, persoonsgegevens alleen via eigen formulier
- **Merk**: navy/red/Open Sans/radius 0; Powerland-groen nooit primair
- **Goedkeuringen**: live-flip, repo-public, DNS, betaalde deps (`sharp`), stock-downloads — elk apart "ja"

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro static i.p.v. WordPress/Framer | Snel, SEO-vriendelijk, 100% gratis te hosten | ✓ Good |
| JSON-in-git als contentlaag (Pad A) | 0 setup-cost; CMS-UI is stretch-goal na live | — Pending |
| GitHub Pages losgelaten als doel | Formulier (PHP) + professioneel B2B-imago vragen PHP-hosting | ✓ Good |
| Keuze A: PHP-hosting | Eigen `contact.php` werkt; geen extern account, geen nieuwe kosten | — Pending (mail-test nog open) |
| Restyle naar referentietaal, merk behouden | Maker wil platform-uitstraling zonder platform te kopen | — Pending (preview-akkoord Fase A open) |
| Alleen geverifieerde inhoud | Live site of Voka als bron; rest eruit of ter goedkeuring | ✓ Good |
| Eigen beelden eerst, stock voor gaten | Herkenbare projecten nooit stock; stock 1:1 vervangbaar later | — Pending |
| GSD leidend, `tasks/` archief | Eén systeem; geen dubbele todo-lijsten | ✓ Good |
| Geen streep bij gecentreerde titels | Maker-regel 2026-09-17, site-breed (`.centered::after` uit) | ✓ Good |
| Max. 1 streep per kopblok | Maker-regel 2026-09-17: eyebrow + titel = eyebrow-streepje telt, titel-streep uit (`.eyebrow + .section-title::after` uit) | ✓ Good |
| Footer gebruikt `logo-white.svg` | `invert`-filter op `logo.svg` verkleurde het logo | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-17 after milestone v1.0 start*
