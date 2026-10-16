---
phase: "06"
name: "Herstel en rolwissel"
created: 2026-10-16
---

# Phase 6: Herstel en rolwissel — Context

> **Achteraf vastgelegd.** Fase 6 is de startfase van deze GSD-inrichting; er was nog geen `config.json` en geen fasenummering, dus discuss en plan konden niet volgens de cyclus lopen. De besluiten hieronder zijn van Camil en in het gesprek van 16/10 genomen; de bestanden zijn daarna in dezelfde PR geschreven. Vanaf fase 7 loopt de cyclus gewoon (discuss, plan, execute, verify).

## Decisions

Besluiten van Camil (16/10/2026), bindend voor deze milestone:

- **Rolverdeling:** Claude Code is de enige bouwer; opencode bouwt niet meer in deze repo; de Claude-schrijfstop vervalt.
- **Scope:** milestone v1.1 "Inhoud-waarheid" plus technisch opruimen. P1-P5 en v1.0-fase 3-5 worden schriftelijk geparkeerd (reden, eigenaar, trigger).
- **Onbekend feit of geen antwoord:** afzwakken en sluiten als "bewust gelaten (reden)".
- **GSD:** volledig GSD. Fasebestanden staan in de repo onder `.planning/phases/`, in dezelfde PR als het werk.
- **Lus:** stap voor stap in het gesprek; geen automatische herstart; Ralph blijft geparkeerd (reden nergens vastgelegd).
- **Gereedschap voor mij:** PyMuPDF `1.28.2` (alleen om de mediakit te lezen) en `jq` 1.8.2, allebei in mijn scratchpad en met gecontroleerde SHA-256; ze verdwijnen in fase 18.
- **Besluiten per punt:** C2 afzwakken (CLAIM-03); C3 wachtwoord vervangen door Camil; C4 beveiliging aan; C5 14 bestanden weg; C8 `#2680FF` niet gebruiken; C10 bewust gelaten; C11 Vercel loskoppelen door Camil zelf.

## Discretion Areas

- Welke GSD-instellingen de repo-regels nodig hebben (zie `config.json`): geen onderzoek (`workflow.research=false`), geen worktrees of parallelle uitvoering, `discuss_mode=assumptions`, geen tag, Nyquist-validatie, UI-fase, AI-integratiefase, API-dekkingspoort en patroon-mapper uit (voor tekstwijzigingen aan een statische site is dat ruis; de verifier en de plan-checker blijven aan).
- `STATE.md`: het GSD-kopblok en het Session-blok worden geaccepteerd; wat GSD verder in `STATE.md` of `ROADMAP.md` schrijft, wordt vóór de commit met `git diff` gelezen.
- Levering gaat niet met `gsd-ship` maar met de eigen routine uit `AGENTS.md` (push via de gh-credential-route, merge met de volledige commit-sha, eerst controleren dat de PR `MERGED` is).

## Deferred Ideas

- GSD-capability met een poort op `verify:pre` (Set 1 plus `grep` in `dist/`) in plaats van handmatig draaien; voorstel aan Camil na drie herhalingen (CLAUDE.md), niet eerder gebouwd.
- `tasks/check-claims.cjs` in de CI tegen teruggekeerde claims; voorstel in fase 18.
- `.planning/SKILLS.md` (opencode-skillregister) is voor GSD een onbekend bestand (waarschuwing W019); archiveren of verwijderen: voorstel in fase 18.
