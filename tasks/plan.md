# Implementation Plan: Vandotec duurzaam beheerbaar (gratis, solo-maker)

## Overview
Van breekbare Astro-build naar platform-waardig beheren zonder WordPress/Framer te kopen.
Eerst techniek groen en voorspelbaar (build, SEO, formulier, publiceer/rollback), daarna pas
beheer-laag (content/media) en content (foto's, stats). Alles gratis-only; betalen alleen bij bewezen vastlopen.
Taken staan in `tasks/todo.md`. GSD-mijlpaal (`gsd-new-milestone`) start pas na akkoord op dit plan.

## Architecture Decisions
- Geen framework-switch; Astro-static blijft. CMS wordt een git-laag (geen betaalde dienst, geen nieuw account zonder “ja”).
- Git = versies + backup + rollback. `dist/` is artefact, nooit handmatig editen.
- Formulier-garantie hangt aan hosting-keuze: statisch = geen PHP-runtime (dan alternatief nodig), PHP-hosting = `contact.php` fixen + testen. Eerst beslissen, dan bouwen.
- SEO-fix via Layout-props (geen dubbele tags), `og:url`/canonical per pagina expliciet.

## Task List (index — details in `tasks/todo.md`)
### Fase 1: Fundering (eerst groen)
- [ ] Task 1: Build verifiëren (`npm run build`) + `dist/`-status vastleggen
- [ ] Task 2: SEO-duplicatie fix (unieke title/description/og per pagina, geen dubbele `og:title`)
- [ ] Task 3: `contact.php`-bug + hosting-beslisnotitie + formulier-testplan
### Checkpoint: Fundering
- [ ] Build groen, preview oké, SEO zonder duplicaten, hosting-keuze genomen

### Fase 2: Beheer-garanties (platform-gevoel, gratis)
- [ ] Task 4: Content/media-aanpak (JSON vs gratis git-CMS, media-map, alt-teksten)
- [ ] Task 5: Preview → publiceer → rollback in 1 stap (git-werkwijze, geen handmatige `dist/`-trucs)
- [ ] Task 6: Sitemap/robots/redirects (`/nl/` → `/`, `_headers`, canonicals)
### Checkpoint: Beheer
- [ ] Maker past tekst/foto/vacature/SEO aan → preview → publiceer → rollback bewezen

### Fase 3: Content + polish
- [ ] Task 7: Foto-inventaris (wat ontbreekt, wat tijdelijk, wie levert echte foto's)
- [ ] Task 8: Stats verifiëren (`100+`/`10+` bevestigen of schrappen)
- [ ] Task 9: Responsive + toegankelijkheid + snelheid (breakpoints, toetsenbord, contrast, Lighthouse-basis)
### Checkpoint: Compleet
- [ ] Alle succescriteria uit `tasks/spec.md` gehaald, klaar voor GSD-verify (geen live-flip)

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| PHP-formulier op statische hosting werkt niet | High | Eerst hosting beslissen (Task 3); geen code-taak starten zonder die keuze |
| Geen echte foto's → downgrade vs live site | Med | Task 7 maakt lijst + tijdelijke oplossing expliciet; geen stock zonder “ja” |
| URL-wissel `/nl/` → `/` kost ranking | Med | Task 6 legt redirects + canonicals vast vóór live-voorstel |
| CMS-scope groeit (rollen, media-bieb, WYSIWYG) | Med | Solo-maker scope bewaken; alleen wat gratis + onderhoudbaar is |

## Open Questions
- Hosting: statisch of PHP? (blokkeert formulier-taken)
- CMS: JSON houden of Decap-achtige git-laag? (blokkeert Task 4-5)
- Foto's + stats: Memodatum van maker nodig (blokkeert Task 7-8)

## GSD-route (na akkoord)
1. Dit plan + `tasks/todo.md` akkoord → 2. `gsd-new-milestone` (maakt `.planning/`, REQUIREMENTS + ROADMAP) → 3. `gsd-plan-phase` → 4. uitvoeren per slice → 5. `gsd-verify-work`/`gsd-secure-phase`/`gsd-ui-review`. Live-flip blijft aparte “ja”.
