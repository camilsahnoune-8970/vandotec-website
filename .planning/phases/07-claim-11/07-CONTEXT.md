---
phase: "07"
name: "CLAIM-11"
created: 2026-10-16
---

# Phase 7: CLAIM-11 — Context

## Decisions

- **Camil (16/10):** CLAIM-11 opnieuw indienen als nieuwe PR met dezelfde inhoud (PR #70 was door een fout van mij gesloten).
- **Spec (CLAIM-11):** alleen een documentatiewijziging, geen wijziging op de site. De site volgt de mediakit.
- **Standaard bij een niet te bevestigen feit** (besluit Camil): afzwakken en sluiten. Hier niet nodig: de bron is nu gecontroleerd.

Aannames die ik heb gecontroleerd (L1 Meten, 16/10, tekstlaag van `docs/mediakit-2026.pdf` met PyMuPDF `1.28.2`):

- p. 3: "Oplevering Powerhub — nieuw bedrijfsgebouw in Poperinge (mei 2026)".
- p. 4 (jaar 2026): "Oplevering Powerhub … Projectleiding intern door COO Marijn Louwagie."
- p. 10: "opgeleverd in mei 2026" en "de volledige projectleiding lag in handen van COO Marijn Louwagie."
- De site (`over-vandotec.json:37-41`) zegt precies dit. Er verandert dus niets aan de tekst.

## Discretion Areas

- Of "Powerhub-bewijs" uit de lijst "Niet geverifieerd" in `tasks/REVIEW.md` mag: ja, de mediakit is nu gelezen. Het blijft de eigen persmap van het bedrijf: geen onafhankelijk bewijs, en dat staat in de REVIEW-regel.

- **Gevonden tijdens deze fase:** `requirements.mark-complete` zet een CLAIM alleen om als de statuscel in de traceability-tabel exact `Pending` is. Vier rijen hadden een opmerking in die cel (CLAIM-03, 11, 13, 14); die zijn kaal gemaakt en de regel staat nu in `AGENTS.md`. `phase.complete` meldde `requirements_updated: false` zonder waarschuwing; daarom altijd `mark-complete` apart draaien en `write_set_complete: true` controleren.

## Deferred Ideas

- Geen.
