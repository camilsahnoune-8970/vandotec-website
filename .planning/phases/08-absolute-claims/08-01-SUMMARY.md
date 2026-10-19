---
phase: 08-absolute-claims
plan: 01
subsystem: inhoud-waarheid
tags: [claim-03, claim-12, 24-7, eigen-beheer, og-image]
provides:
  - "24/7" en "24 uur per dag" van de site en uit de OG-afbeelding
  - absolute "elk project/elke interventie in eigen beheer" afgezwakt
affects: [src/data/*.json, src/pages, src/layouts/Layout.astro, public/og-image.png, tasks/make-og.cjs]
actuals:
  tasks: 3
  commits: 1
key-files:
  modified:
    - src/data/contact.json
    - src/data/expertises.json
    - src/data/home.json
    - src/data/over-vandotec.json
    - src/data/service-onderhoud.json
    - src/layouts/Layout.astro
    - src/pages/contact.astro
    - src/pages/index.astro
    - src/pages/over-vandotec.astro
    - src/pages/service-onderhoud.astro
    - src/pages/realisaties.astro
    - tasks/make-og.cjs
    - public/og-image.png
    - tasks/REVIEW.md
key-decisions:
  - "Tegels 24/7 worden het woord Service (besluit Camil)"
  - "OG-afbeelding wordt echt PNG met .png() in plaats van JPEG-data onder een .png-naam"
  - "Na review: hero-ondertitel met lidwoord, eyebrow 'Interventiedienst' (dubbel met de kop)"
completed: 2026-10-16
status: complete
---

# Phase 8: Absolute claims Summary

**"24/7" en de absolute "eigen beheer"-zinnen zijn van de site, de OG-afbeelding is opnieuw gemaakt, en het Voka-citaat en de stock-claim zijn onaangeroerd.**

## Accomplishments
- 32 vervangingen in 12 bestanden via een patchscript dat elk aantal treffers vooraf controleerde (droogloop, dan schrijven).
- `public/og-image.png`: regel "Interventiedienst", nu echt PNG (47.316 bytes, was JPEG-data 41.260 bytes onder een `.png`-naam).
- Twee tekstpunten uit het tweede paar ogen verwerkt (zinsvorm hero-ondertitel, dubbele eyebrow).
- `tasks/REVIEW.md`: "Afgehandeld" bij het 24/7-punt en een nieuwe regel voor CLAIM-12.

## Task Commits
1. **Task 1-3** - zie de PR

## Next Phase Readiness
Fase 9 (CLAIM-14, stock-claim): `service-onderhoud.json:24` bevat de stock-zin nog; die wordt daar behandeld.
