# UI-REVIEW (E3, 2026-10-06) — 6 pijlers, schaal 1–4

Basis: ±15 nagekeken screenshots (Chromium/Firefox/WebKit, 1440/390, print),
plus code-audit. Echte screenreader en echte iPhone-Safari: niet geverifieerd.

| Pijler | Cijfer | Bewijs |
|---|---|---|
| Visuele hiërarchie | 3 | Hero-systeem (01–06) + spookwoorden + spec-rij sterk en uniform; service `hero-tabs`-overlap is een bewust compromis, geen fout |
| Consistentie | 4 | Tokens, radius 0, één eyebrow-component, gedeelde rails/bands/modals; 48 inline styles net verhuisd naar utilities (E1) |
| Typografie | 3 | Eén font, strakke display-schaal; eyebrow-spacing op 390 verkleind (.22→.14em); geen nieuwe fonts |
| Kleur | 3 | Navy/rood-discipline, blauw-op-blauw weggewerkt — MAAR: homepage-hero toont 3 rode accenten (CTA-knop + rode `em` + link-onderlijn) tegen eigen max-2-regel |
| Spacing/ritme | 4 | Vaste sectie-ritmes, container, haarlijnen; alles past in 100svh waar bedoeld |
| Toegankelijkheid/responsive | 3 | Focus-states, skip-link, contrast, reduced-motion, print, 3 engines zonder breuken; echte screenreader nog open |

## Open punten (geen blockers voor staging)

1. **Rood-telling hero (Camil-beslissing):** max-2-regel vs. 3 accenten in de
   goedgekeurde hero. Opties: (a) regel versoepelen naar “max 3, waarvan max 1
   groot vlak”, (b) `em` in hero-titel wit maken. Smaak-oordeel aan Camil.
2. **Echte screenreader + iPhone-Safari:** basis gedaan (PR #14), rest is mensenwerk.
3. **Rest-risico formulier-spam:** honeypot + validatie aanwezig; rate-limit/CAPTCHA
   alleen als misbruik blijkt (ronde C meten).
