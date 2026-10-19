---
phase: "09"
name: "Stock-claim"
created: 2026-10-19
---

# Phase 9: Stock-claim — Context

## Decisions

Besluiten van Camil (19/10/2026), in twee stappen:

- **Stap 1 (assumptions-modus):** "uitgebreide stock veelgebruikte onderdelen" wordt afgezwakt. Camil heeft de voorraad niet bevestigd en de mediakit noemt hem niet.
- **Stap 2 (bij het voor/na):** de eerste versie met "eigen materieel" is afgewezen. Ook de materieel-zin gaat weg: alleen "eigen technici" blijft. Reden: "eigen materieel" staat niet in de Vandotec-feitenlijst en niet in de mediakit (tekstlaag, gemeten 19/10).

## Gemeten (L1, op `2c8c6ad` = `origin/main` na PR #74)

- `grep -i stock` in `src/`: 4 regels in 2 bestanden: `src/data/home.json:29`; `src/data/service-onderhoud.json:24`, `:28`, `:37`. Dat klopt met de spec (CLAIM-14).
- `grep -i "aan boord|voorraad|magazijn|onderdelen"` in `src/`: geen extra stock-claim. De regels met "onderdelen" in `service-onderhoud.json` (`:38`, `:44`) gaan over onderhoudscontracten en slijtageonderdelen; dat is geen voorraadclaim.
- Mediakit (`docs/mediakit-2026.pdf`, 14 pagina's, tekstlaag gelezen met PyMuPDF): alleen p. 6 noemt de dienst: "Onderhoud & service: interventiedienst, periodiek onderhoud en keuringen." Op p. 1-14 staat geen stock, voorraad, onderdeel, "aan boord" of "materieel".

**Aanname:** de tekstlaag van de PDF is compleet. Tekst die als plaatje in de PDF staat, is niet gelezen.

## Resultaat in de tekst (na besluit stap 2)

- `home.json:29`: "…met eigen technici."
- `service-onderhoud.json:24`: "…door eigen technici."
- `service-onderhoud.json:28`: het lijstitem "Eigen materieel" is uit de lijst gehaald (de lijst heeft nu 3 punten).
- `service-onderhoud.json:37`: "Met eigen technici."

## Discretion Areas

- "Eigen technici" blijft staan; dat is in fase 8 (CLAIM-12) al door Camil goedgekeurd. Let op: ook die formulering staat niet letterlijk in `references/feiten.md` van de Vandotec-skill; dat is een bekend verschil, geen nieuw punt.
- "Eigen materieel" staat op vijf andere plekken op de site (`jobs.json:9`, `over-vandotec.json:9`, `contact.astro:185`, `expertises.astro:116`, `over-vandotec.astro:121`). Die zijn buiten deze fase gelaten en niet onderzocht.

## Deferred Ideas

- Geen. De overige "Optional / Nit"-punten uit `tasks/REVIEW.md` vallen buiten deze fase.
