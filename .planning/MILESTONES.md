# Milestones

## v1.1 “Inhoud-waarheid” (actief, gestart 2026-10-12)

Doel: elke bewering op vandotec.be is gedekt door een bron of een bevestiging van Camil, of is afgezwakt.
Spec (ter goedkeuring door Camil): `specs/inhoud-waarheid.md`. Requirements: CLAIM-01 t/m CLAIM-14 in `REQUIREMENTS.md`.

- **Eigenaar:** opencode bouwt. Camil beslist, keurt de spec goed en doet de smaak-review. Claude Code reviewt technisch op verzoek van Camil.
- **Klaar als:** alle CLAIM-regels staan als klaar of "bewust gelaten (reden)"; `tasks/REVIEW.md` heeft voor elk inhoudspunt een regel "Afgehandeld" of "Bewust gelaten"; CI groen op `main`; per PR één journaalregel.
- **Al klaar:** CLAIM-01 tellers (PR #64), CLAIM-02 onderaannemers (PR #65).
- **Open:** CLAIM-03 t/m CLAIM-14; CLAIM-03 (24/7) wacht op navraag door Camil. Volgorde van de vragen: CLAIM-04, 05, 06, 07, 08, 09, 10, 12, 13, 14; CLAIM-11 sluit opencode zelf.
- **Niet in deze milestone:** live zetten, DNS en hosting, afzender `info@`/SPF, rood-telling, FR-vertaling.
- **Wachtrij zonder besluit van Camil** (eigen spec per item): P1 Layout-splitsing, P2 ticker uit data, P3 CSS-nits, P4 fotorondgang afmaken, P5 prestatiebasislijn. Zie de spec.

## v1.0 “Duurzaam live-waardig” (gestart 2026-09-17, doorgeschoven)

Van breekbare build naar platform-waardig beheren — zonder live te gaan.
Fasen: Fundering (audit) → Beeldintegratie → Beheer-garanties → Content-final → Pre-live.

Status 2026-10-12: fase 1 en 2 zijn klaar (FOUND en MEDIA in `REQUIREMENTS.md`). Fase 3 (MANAGE), fase 4 (CONTENT-04, jobs-pagina) en fase 5 (GOLIVE) liggen stil: ze hangen aan de hostingkeuze en aan besluiten van Camil. Het werk sinds 2026-10-05 (realisaties-hub, CI, a11y, foutenrondes, bak B) staat in het journaal van `STATE.md`, niet in de roadmap. GOLIVE-02 (responsive, toetsenbord, contrast) wordt waarschijnlijk grotendeels door de CI gedekt (crawl 26 pagina's × 5 breedtes, axe), maar is niet formeel afgevinkt.
