# Motion-taal Vandotec-website (E2, 2026-10-06)

Eén rustige taal: alles beweegt met `--ease: cubic-bezier(.22,.61,.36,1)`,
niets duurt langer dan 0,9s, niets springt. Witruimte en foto’s doen het werk;
motion begeleidt alleen.

## Binnenkomst (eenmalig per pagina)

| Element | Animatie | Duur/delay |
|---|---|---|
| Hero-foto (`hero-photo`, `page-hero-photo`) | fade `opacity 0 → .5/.58` via `.loaded`-klasse na laden | .8s ease |
| Hero-tekst (`hero-inner > *`) | `hero-rise`: 1.5rem omhoog + fade in, cascade | .9s, delays .05/.16/.27/.38/.5/.6s |
| Scroll-reveals (`.reveal`) | fade + 1.5rem rise bij in viewport (JS `IntersectionObserver`) | .4–.6s |

Carousel bewust verwijderd (2026-09-19, timing-problemen) — hero is statisch.

## Hover/actief (overal hetzelfde)

- Kleurwissels (links, buttons, chips, pills): `.2–.25s`
- Kaarten (teaser, team, service, ref): `translateY(-4px)` + rode bovenrand, `.25–.3s`
- Foto-zoom in kaarten (`service-photo img`, `vtab img`): `scale(1.04)`, `.35–.5s`
- Navigatie-underline (`header-nav a::after`): `scaleX`, `.25s`
- Dots, FAQ-`details`, dialogen: native/`opacity`, `.25–.6s`

## Scroll

- Hero-parallax: foto beweegt langzamer dan scroll (JS, `transform`, `will-change`).
- Back-to-top-knop verschijnt bij scrollen (`.to-top.show`, `.25s`).

## Reduced-motion (hard)

`@media (prefers-reduced-motion: reduce)`: alle transitions en animaties uit,
`scroll-behavior: auto`. Hero-choreografie draait alleen binnen
`prefers-reduced-motion: no-preference`, met zichtbare basisstand als fallback.
JS `scrollIntoView` en parallax respecteren dezelfde mediaquery.

## Regels voor nieuwe motion

1. Hergebruik `--ease`; geen nieuwe easings zonder reden.
2. Max .9s; geen loops, geen autoplay, geen scroll-jacking.
3. Alles wat beweegt moet ook werken (en leesbaar zijn) met reduced-motion aan.
4. Testmobiel: geen motion die layout verschuift (geen CLS-bijdrage).
