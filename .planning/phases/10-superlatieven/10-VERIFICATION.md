---
phase: 10-superlatieven
verified: 2026-10-19T15:24:20+02:00
status: passed
score: 4/4 must-haves verified
covered_files: [".planning/phases/10-superlatieven/10-01-PLAN.md", ".planning/phases/10-superlatieven/10-01-SUMMARY.md", "src/pages/over-vandotec.astro", "tasks/REVIEW.md"]
covered_digest: "v3:sha256:89705f6a1fa1670afc4727cc9c43f7d482e887bd8f410c6ffb73b7921a9d8d4d"
behavior_unverified: 0
overrides_applied: 0
re_verification: none
deferred: []
advisory: []
---

# Phase 10: Superlatieven — Verification Report

**Phase Goal:** CLAIM-04 (superlatieven) is afgezwakt volgens de besluiten van Camil van 19/10: "op elke werf, bij elke opdrachtgever" wordt "op onze werven"; "de referentie" en "altijd met eigen mensen, altijd sleutel-op-de-deur" blijven staan, omdat ze letterlijk in de mediakit staan (spec `specs/inhoud-waarheid.md` rij 04).
**Verified:** 2026-10-19 15:24 (+02:00)
**Status:** passed
**Re-verification:** No — initial verification

## Oordeel in het kort

De absolute werf-claim staat niet meer op de site. De wijziging is één regel in `src/pages/over-vandotec.astro` (commit b1978f0), de gebouwde `dist/` bevat de nieuwe zin en niet de oude, en de mediakit-zinnen die bewust blijven staan zijn in `docs/mediakit-2026.pdf` teruggevonden. Camil heeft de voor/na-tekst goedgekeurd (10-UAT.md, 19/10). Geen gaps. Alleen de administratie (REQUIREMENTS.md CLAIM-04 en ROADMAP.md Phase 10) staat nog open; dat hoort bij de afronding volgens 10-01-SUMMARY.md.

## Must-haves

| # | Must-have | Controle | Uitkomst | Status |
|---|-----------|----------|----------|--------|
| 1 | Diff van b1978f0 op `src/pages/over-vandotec.astro` is precies één regel | `git show b1978f0 -- src/pages/over-vandotec.astro`; `git diff --numstat b1978f0^ b1978f0` | 1 regel verwijderd, 1 toegevoegd (regel 138). Oud: "…veilig en gezond werken — op elke werf, bij elke opdrachtgever." Nieuw: "…veilig en gezond werken — op onze werven." | VERIFIED |
| 2 | dist: "op elke werf" 0x, "op onze werven" 1x | `grep -rhoF --include=*.html --include=*.xml --include=*.txt --include=*.json "<tekst>" dist \| wc -l` (dist niet herbouwd) | "op elke werf": 0. "op onze werven": 1. dist-bestand `dist/over-vandotec/index.html` (14:31:36) is nieuwer dan de bron `over-vandotec.astro` (14:30:24). | VERIFIED |
| 3 | ISO 17020 (5x), klasse 6/P2 (1x) ongewijzigd; verify-mediakit groen | Zelfde grep in dist; `node tasks/verify-mediakit.cjs` (alleen-lezen script) | ISO 17020: 5. Klasse 6/P2: 1. verify-mediakit: alle regels OK, eindregel `MEDIAKIT-RONDE OK`, exit 0. | VERIFIED |
| 4 | Camil keurde de voor/na-tekst goed (19/10) vóór de merge | `10-UAT.md` (status passed, testregels 1 en 2); branchcontrole `git branch -a --contains b1978f0` | UAT: test 1 "Ja, \"op onze werven\" (Recommended)", test 2 "Letterlijk laten staan (Recommended)", beide 19/10. b1978f0 zit alleen op `claude/fase-10-superlatieven` (lokaal en origin), niet op main: nog niet gemerged. De goedkeuring zelf kan de code niet bewijzen. | VERIFIED (attested) |

## Aanvullende controles

| Controle | Uitkomst | Status |
|----------|----------|--------|
| Spec rij 04 ↔ `over-vandotec.astro:138` | Regel 138 bevat de nieuwe zin; de VCA-zin op regel 139 (ISO 17020, klasse 6/P2) is niet aangeraakt (diff raakt alleen regel 138). | VERIFIED |
| Mediakit p. 3: "de referentie" | PDF-tekstlaag (pymupdf, `-I`): aanwezig op p. 3 ("sinds 1978 de referentie"). | VERIFIED |
| Mediakit p. 5: "altijd met eigen mensen, altijd sleutel-op-de-deur" | PDF-tekstlaag: "altijd met eigen mensen, altijd sleutel-" gevolgd door "op-de-deur" op de volgende regel (woordafbreking in de PDF). Aanwezig op p. 5. | VERIFIED |
| `tasks/REVIEW.md` en `.planning/STATE.md`: één nieuwe regel elk | `git diff --numstat`: REVIEW.md 1 toegevoegd, STATE.md 1 toegevoegd. Werkmap-bestanden: alle regels eindigen op CRLF (REVIEW.md 148/148, STATE.md 166/166, astro 259/259). De blob in git staat op LF (core.autocrlf=true); de nieuwe regels zijn gelijk aan de rest van het bestand. | VERIFIED |
| Administratie: REQUIREMENTS.md CLAIM-04, ROADMAP.md Phase 10 | REQUIREMENTS.md regel 52 `[ ]` en regel 123 "Pending"; ROADMAP.md regel 20 `[ ]`, regel 236 "0/1 Not started". Volgens 10-01-SUMMARY.md worden die bij afronding via GSD gezet. Niet door dit verificatiewerk gewijzigd. | INFO (geen must-have van het plan) |

## Gecontroleerde en niet gecontroleerde punten

- Niet opnieuw gebouwd: dist is op de huidige inhoud gebouwd (zie tijdstempels), conform de opdracht.
- Niet opnieuw gedraaid: de volledige controleronde van 14 stappen en de browsertests (axe, crawl, srcset, Firefox, WebKit, print). 10-01-SUMMARY.md meldt 14 van 14 EXIT 0; ik heb geen logbestand van die ronde gevonden en die claim dus niet zelf gecontroleerd.
- Screenshots `fase10-voor/na-*`: niet bekeken. Volgens 10-UAT.md tonen ze het midden van de pagina leeg; het bewijs is de tekst en de telling in dist.
- Vingerafdruk: berekend met `gsd-tools query verification.fingerprint` op de huidige werkmap (covered_files als hierboven).

## Gaps Summary

Geen gaps. Alle must-haves zijn met commando's of bronbestanden gecontroleerd; de goedkeuring van Camil is vastgelegd in 10-UAT.md.

---

_Verified: 2026-10-19 15:24 (+02:00)_
_Verifier: Claude (gsd-verifier)_
