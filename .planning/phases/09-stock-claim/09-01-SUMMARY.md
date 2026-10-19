---
phase: 09-stock-claim
plan: 01
status: complete
requirements: [CLAIM-14]
---

# Plan 09-01: Stock-claim afzwakken — Summary

## Wat er is gedaan

- **Vier plekken zonder voorraad-claim:** `home.json:29` ("…met eigen technici."), `service-onderhoud.json:24` ("…door eigen technici."), `service-onderhoud.json:37` ("Met eigen technici."), en het lijstitem `service-onderhoud.json:28` ("Uitgebreide stock veelgebruikte onderdelen") is uit de lijst "Bij interventie" gehaald.
- **Twee versies, één keuze van Camil:** de eerste versie zei "eigen materieel" (besluit 19/10: afzwakken). Bij het voor/na heeft Camil die versie afgewezen: ook de materieel-zin is weggehaald, omdat "eigen materieel" niet in de Vandotec-feitenlijst en niet in de mediakit staat (tekstlaag, gemeten). Alleen de tweede versie is gebouwd en gemeten.
- **Patch:** `patch_phase9_v2.py` buiten de repo: droge run met aantallen (4 treffers) vóór het schrijven; JSON na het schrijven gecontroleerd.
- **Documentatie:** REVIEW-regel (CLAIM-14) en één journaalregel in STATE.md.

## Verificatie

- Volledige ronde `l4-f9.ps1` op de definitieve tekst: 14 van 14 stappen `EXIT 0`; `dist/` "uitgebreide stock" = 0; "eigen materieel" = 5, dezelfde als vóór de wijziging.
- Schermafbeeldingen `fase09-voor-*` en `fase09-na-*` gemaakt (390 en 1440).

## Afwijkingen van het plan

- De eerste versie (met "eigen materieel") is gebouwd, gecontroleerd en daarna bij het voor/na afgewezen. De tweede versie is een nieuwe build met een nieuwe controleronde.
- De GSD-planner (`gsd-plan-phase`) is niet ingezet: het plan is twee taken plus een checkpoint en is met de hand geschreven in het formaat van fase 8.

## Open

- Niets in deze fase. Eventuele "eigen materieel"-zinnen op vijf andere pagina's zijn buiten scope en niet onderzocht.
