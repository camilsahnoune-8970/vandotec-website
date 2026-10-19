---
phase: 10-superlatieven
plan: 01
status: complete
requirements: [CLAIM-04]
---

# Plan 10-01: Superlatieven afzwakken — Summary

## Wat er is gedaan

- **Eén zin afgezwakt:** `src/pages/over-vandotec.astro:138`, VCA-blok. Voor: "…veilig en gezond werken — op elke werf, bij elke opdrachtgever." Na: "…veilig en gezond werken — op onze werven." Besluit Camil (19/10).
- **Bewust gelaten (besluit Camil, 19/10):** "de referentie" (mediakit p. 3) en "altijd met eigen mensen, altijd sleutel-op-de-deur" (mediakit p. 5) in `src/data/over-vandotec.json:8`. Beide staan letterlijk in de mediakit.
- **Documentatie:** afhandeling in `tasks/REVIEW.md` en één journaalregel in `.planning/STATE.md`.

## Verificatie

- `dist/`: "op elke werf" 1 → 0 (gemeten vóór en na de wijziging); "op onze werven" 0 → 1.
- ISO 17020 (5x) en klasse 6/P2 (1x) ongewijzigd; `verify-mediakit` met `MEDIAKIT-RONDE OK`.
- Volledige controleronde: 14 van 14 stappen `EXIT 0`, inclusief de browsertests (axe, crawl, srcset, Firefox, WebKit, print).
- Tweede paar ogen (alleen-lezen agent): diff klopt, spec rij 04 klopt. Eén bevinding: het vinkje bij CLAIM-04 ontbrak nog; dat hoort bij de afronding.

## Afwijkingen van het plan

- Het plan voor deze fase is achteraf in het fase-9-formaat geschreven. De GSD-planner (`gsd-plan-phase`) is niet gedraaid: het is één regel tekst, en daar was geen zware planning voor nodig.
- De screenshots `fase10-voor-over-*` en `fase10-na-over-*` tonen het midden van de volledige pagina leeg, ook in de voor-versie. De gewijzigde zin is daarop niet zichtbaar. Het bewijs is de tekst en de telling in `dist/`.
- `REQUIREMENTS.md` (vinkje CLAIM-04) en `ROADMAP.md` worden bij de afronding gezet via GSD, niet met de hand.
