---
phase: "06"
name: "Herstel en rolwissel"
created: 2026-10-16
status: passed
---

# Phase 6: Herstel en rolwissel — Verification

## Goal-Backward Verification

**Phase Goal:** de repo, de docs en de GSD-instellingen kloppen met de nieuwe rolverdeling, en de basislijn is gemeten.

## Checks

| # | Succescriterium | Status | Evidence |
|---|-----------------|--------|----------|
| 1 | AGENTS.md, STATE.md, MILESTONES.md en de spec zeggen dat Claude Code bouwt en dat opencode niet meer bouwt | ✓ | `git grep -i opencode` op de actuele docs (16/10): AGENTS.md 4, MILESTONES.md 1, spec 3, ROADMAP.md 2, QA-RUNBOOK 0; elke vermelding is een ontkenning of historie. STATE.md buiten het journaal: 8 regels, ook die zijn ontkenning of historie (regel 52 is een historische opmerking over de koude lezers). |
| 2 | `config.json` bestaat en GSD leest ROADMAP.md (fase 6 t/m 18) | ✓ | `roadmap.get-phase 6`, `7`, `18` geven `found: true`; fase 3 geeft `found: false` (bewust: geparkeerd). `config-ensure-section` en 15 `config-set`-aanroepen meldden `updated: true`. `validate.health`: geen configfout; alleen W027 (tijdelijke worktree `wt-base`, wordt opgeruimd) en W019 (`SKILLS.md` is voor GSD een onbekend bestand, voorstel in fase 18). |
| 3 | Basislijn op `origin/main` groen, 27 pagina's | ✓ | `baseline.log` op `9c0ce09`: `npm ci` exit 0 (0 kwetsbaarheden), `npm run build` exit 0 (27 pagina's, 26 `index.html` + 404), test-img-helpers, qa-beelden, check-seo (`ALL OK`), qa-a11y, check-contrast, PHP-test en `verify-mediakit` (`MEDIAKIT-RONDE OK`) allemaal exit 0. |

Aanvullend gemeten in deze fase:

- Mediakit gecontroleerd met PyMuPDF `1.28.2` (SHA-256 `ebd24491…ecbffe` komt overeen met PyPI): p. 3, 4, 5, 6 en 10 bevestigen de spec-verwijzingen voor CLAIM-03, 04, 05 en 11. P. 13 en 14 zijn niet gelezen (nog niet nodig).
- GSD-schrijftest: `state.record-session` voegt een kopblok (`milestone: v1.1`) en een Session-blok toe aan `STATE.md` en laat de overige secties ongemoeid; de testwijziging is teruggedraaid.

## Open uit deze fase (buiten de PR)

- Hoofdmap `_vandotec-check` herstellen (staat op een verouderde branch met een framework-wijziging in `STATE.md`): wacht op Camils antwoord over een opencode-proces dat sinds 09:18 draait.
- Tijdelijke worktrees en hulpbestanden van Claude (`wt-base`, `jq-dl`, `pdfvenv`, `pdf-wheel`): worden in fase 18 opgeruimd; `wt-base` eerder, zodra de PR gemerged is.

## Result

**passed.** De drie succescriteria zijn gemeten. Het hoofdmap-herstel staat open en is geen succescriterium.
