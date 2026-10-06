# SPEC: Onderhoudsronde E (inline-styles, motion, secure/UI-review)

Status: concept — wacht op akkoord Camil.

## 1. Doel (één zin)

Codebase opgeschoond en gedocumenteerd zonder zichtbare wijzigingen: geen inline
styles meer, motion vastgelegd, security- en UI-review zonder open blocking-punten.

## 2. Context

Ronde E uit het A→E-akkoord (2026-10-05); laatste open ronde naast C (formulier,
wacht op staging). 49 inline styles geteld in `src/`; motion is ad hoc gegroeid
(hero-choreografie, reveals, parallax); `gsd-secure-phase` en `gsd-ui-review`
nooit gedraaid.

## 3. Scope

- Wél:
  - E1: alle `style="…"` in `src/` vervangen door CSS-klassen in `public/style.css`
    (zelfde pixels, alleen verplaatst; `display:none` honeypot uitgezonderd —
    die moet inline blijven om bots te misleiden).
  - E2: motion-taal documenteren in `tasks/motion.md` (durations, easings,
    reduced-motion-regel, per component).
  - E3: `gsd-secure-phase` en `gsd-ui-review` draaien; blocking-findings fixen,
    rest als issues noteren.
- Uitdrukkelijk níet: visuele wijzigingen, nieuwe content, performance-werk,
  formulier (ronde C).

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] `style="` komt in `src/` alleen nog voor in de honeypot (`contact.astro`)
- [ ] `npm run build` groen, `node tasks/check-seo.cjs` 11/11
- [ ] Screenshots home/expertises/contact 1440 nagekeken: pixel-gelijk aan `main`
- [ ] `tasks/motion.md` beschrijft elke animatie/transitie met duur + easing
- [ ] secure-review en UI-review zonder open blocking-findings (of met genoteerde issues)

## 5. Verificatie

Build + SEO-check, grep-telling `style="` voor/na, screenshot-vergelijking
Chromium 1440 (3 pagina’s), review-rapporten in de PR-beschrijving.

## 6. Smaak-check

- [x] Nodig — uitsluitend als controle dat er níets zichtbaar veranderde (voor/na-screenshots ter beoordeling).

## 7. Vrijstelling?

N.v.t. — volledige spec.
