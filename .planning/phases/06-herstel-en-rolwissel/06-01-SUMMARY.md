---
phase: 06-herstel-en-rolwissel
plan: 01
subsystem: planning-docs
tags: [rolwissel, gsd, roadmap, config]
provides:
  - docs op de nieuwe rolverdeling (Claude Code bouwt)
  - ROADMAP.md in GSD-sjabloon, v1.1 als fase 6 t/m 18
  - .planning/config.json voor deze repo
affects: [fase 7 t/m 18]
actuals:
  tasks: 3
  commits: 2
tech-stack:
  added: []
  patterns: [GSD-fasebestanden onder .planning/phases/, eigen PR-levering zonder gsd-ship]
key-files:
  created:
    - .planning/config.json
    - .planning/phases/06-herstel-en-rolwissel/
  modified:
    - AGENTS.md
    - .planning/STATE.md
    - .planning/MILESTONES.md
    - .planning/ROADMAP.md
    - .planning/REQUIREMENTS.md
    - specs/inhoud-waarheid.md
    - tasks/QA-RUNBOOK.md
    - tasks/SECURITY-NOTITIE.md
key-decisions:
  - "GSD-kopblok en Session-blok in STATE.md worden geaccepteerd; GSD-schrijfacties op STATE.md/ROADMAP.md worden met git diff gelezen"
  - "Levering met eigen routine, niet met gsd-ship (gh-credential-route)"
completed: 2026-10-16
status: complete
---

# Phase 6: Herstel en rolwissel Summary

**Claude Code bouwt, de docs zeggen dat, GSD leest de roadmap en de repo heeft een gevalideerde GSD-config.**

## Accomplishments
- AGENTS.md, STATE.md, MILESTONES.md en de spec: Claude Code bouwt sinds 2026-10-16; de schrijfstop vervalt; oude startprompts als verouderd gemarkeerd.
- ROADMAP.md omgezet: GSD vindt fase 6, 7 en 18 (`roadmap.get-phase`), de geparkeerde v1.0-fases 3-5 bewust niet; originele v1.0-details bewaard.
- `config.json` aangemaakt via `config-ensure-section` en 15 `config-set`-aanroepen.
- Basislijn gemeten op `origin/main` `9c0ce09`: `npm ci` (0 kwetsbaarheden), build (27 pagina's), de hele testset zonder server en `verify-mediakit` allemaal exit 0.
- Mediakit gecontroleerd met PyMuPDF `1.28.2` (SHA-256 gecontroleerd): p. 3, 4, 5, 6 en 10 bevestigen de spec-verwijzingen; werkwijze vastgelegd in het runbook.
- GSD-schrijftest op een wegwerpkopie: `state.record-session` voegt een kopblok (milestone v1.1) en een Session-blok toe en laat de rest van `STATE.md` ongemoeid.

## Task Commits
1. **Tasks 1-3: rolwissel, ROADMAP, config** - `65ecd5a`
2. **Fasebestanden en runbook** - zie de PR

## Next Phase Readiness
Klaar voor fase 7 (CLAIM-11). Openstaand uit fase 6: hoofdmap herstellen (alleen lokaal, geen PR; wacht op Camils antwoord over het opencode-proces dat sinds 09:18 draait) en tijdelijke map `wt-base` opruimen.
