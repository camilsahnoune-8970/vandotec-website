# STATE.md

---
milestone: v1.0
name: "Duurzaam live-waardig"
status: planning
progress:
  phases_complete: 0
  phases_total: 5
  requirements_complete: 8
  requirements_total: 22
---

## Project Reference

See: .planning/PROJECT.md (updated 2026-09-17)

**Core value:** De maker kan alles zelf aanpassen, previewen, publiceren en terugrollen — gratis, zonder breekbare handklusjes.
**Current focus:** Milestone-initialisatie — Fase 1 (Fundering, audit) staat klaar.

## Current Position

Phase: Fase 2 beeldintegratie uitgevoerd (2026-09-17) — wacht op maker-preview + akkoord
Plan: `.planning/ROADMAP.md` (5 fasen, 22 requirements, alles gemapt ✓)
Status: Hero-2 + 3 expertise-foto's + over-ons + VCA-logo live in build; stock-gaten
(carwash, reiniging, water) + jobs/contact-CTA nog open; testbrowser hapert → maker checkt visueel
Last activity: 2026-09-18 — Mediakit-ronde gebouwd (palet, stats, tijdlijn, High Five, ijkingen, referenties, team); maker-preview open; 2026-09-30 cta+footer: 4 distincte service-CTA's (01 = tel), footer-quote full-bleed Ritchie-band; build groen, SEO 11/11; maker-preview open

## Decisions (milestone-scope)

- GSD is leidend systeem; `tasks/*.md` is archief/input (maker-akkoord 2026-09-17)
- Onderzoek overgeslagen: brownfield, codebase + live site al geïnventariseerd
- Roadmap inline opgesteld (geen roadmapper-subagent in deze runtime) — maker reviewt
- Commits alleen op expliciet verzoek (nog geen commits uitgevoerd)

## Blockers

- Fase 3-entry: beheerlaag-keuze (JSON vs git-CMS) + mail-test op PHP-host (alleen op host te bewijzen)
- Fase 2/4: stock-veto's (stilzwijgend akkoord — herroepbaar), jobs-teksten (CONTENT-04 open)
- Logo-bestanden uit mediakit-pakket (maker levert aan)
- Staand: live-flip, repo-public, DNS (aparte goedkeuringen)
- Gedocumenteerd-dood (geen actie): `api/save-page` (alleen voor toekomstige CMS-fase), `_headers` (Netlify-only, genegeerd op PHP-host)

## Todos

- [x] Fase 1 audit uitvoeren en rapporteren (bewijs: zie rapport 2026-09-17)
- [ ] Fasesluiting Fase 1 (maker-akkoord)
- [ ] Fase 2 entry gates aan maker voorleggen
