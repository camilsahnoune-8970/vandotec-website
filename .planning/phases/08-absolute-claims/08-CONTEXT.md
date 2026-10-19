---
phase: "08"
name: "Absolute claims"
created: 2026-10-16
---

# Phase 8: Absolute claims — Context

## Decisions

Besluiten van Camil (16/10/2026), genomen via de assumptions-modus (ik legde de standaard voor, hij koos):

- **C2 / CLAIM-03:** er is geen bevestigde 24/7-wachtdienst; "24/7" en "24 uur per dag" worden afgezwakt tot de bronformulering "interventiedienst" (mediakit p. 6: "Onderhoud & service: interventiedienst, periodiek onderhoud en keuringen"; p. 6 en p. 3 noemen geen 24/7).
- **Tegels:** het getal "24/7" wordt op de drie plekken het woord **Service** (hero-tegel op de homepage, kernfeiten-strook op Over Vandotec, grote achtergrondtekst op Service & onderhoud). Het label "Interventiedienst" blijft.
- **CLAIM-12:** zelfde lijn als CLAIM-02: "Elk project wordt uitgevoerd door eigen vaste ploegen" wordt "Projecten worden uitgevoerd door eigen vaste ploegen"; "Elke interventie wordt uitgevoerd door een eigen technicus" wordt "Interventies worden uitgevoerd door eigen technici"; "elk project in eigen beheer" wordt "projecten door eigen ploegen". Het geverifieerde Voka-citaat op `over-vandotec.astro:166` blijft ongewijzigd.
- **Zinnen met 24/7:** herschreven zoals voorgesteld (zie PLAN), zonder tijdsbelofte.

Opnieuw gemeten op `684c5c5` (L1): "24/7" staat op 24 regels in 10 bestanden in `src/` (klopt met de spec) en "24 uur per dag" op 2 regels; de OG-afbeelding bevat "24/7 interventie" via `tasks/make-og.cjs`. `public/og-image.png` is JPEG-data (bytes `ffd8ffdb`, 41.260 bytes) onder een `.png`-naam.

## Discretion Areas

- Formulering van de vervangingen waar de zin anders niet loopt: "staat klaar voor" (was "staat 24/7 paraat voor"), "Bel onze interventiedienst." (was "Onze interventiedienst is 24/7 bereikbaar."), eyebrow "Service & interventie" (was "24/7 paraat").
- OG-afbeelding: echt PNG maken (`.png()`), omdat de bestandsnaam en de verwijzing in `Layout.astro` (`og-image.png`) dan kloppen; geen hernoeming nodig.
- `service-onderhoud.json:24` bevat ook de stock-claim (CLAIM-14, fase 9). In deze fase verandert alleen het stuk "Elke interventie … eigen technicus".

## Deferred Ideas

- "Elk project start met een analyse" en "Elk project doorloopt vijf vaste fasen" zijn procesbeweringen, geen eigen-beheer-claims; buiten CLAIM-12.
- "Zo snel mogelijk / direct" zonder SLA staat in `tasks/REVIEW.md` onder Optional/Nit en valt buiten deze milestone.
