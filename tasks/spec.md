# Spec: Vandotec-beheer als WordPress/Framer (gratis, solo-maker)

## Objective
Vandotec-site gaat van “gebouwd maar breekbaar” naar “duurzaam beheerbaar” door één maker (Camil).
Er professioneel uitzien is niet genoeg — beheren moet voelen als WordPress/Framer/Webflow:
aanpassen, media vervangen, SEO per pagina regelen, aanvragen zeker ontvangen,
eerst zien dan live zetten, en bij een fout één stap terug. Zonder dat platform te kopen.

User stories:
- Als maker pas ik een telefoonnummer, tekst, foto of vacature aan zonder in code te graven.
- Als maker zie ik eerst een preview voordat iets live gaat.
- Als maker zet ik bij een fout de vorige versie met één stap terug.
- Als maker komen formulier-aanvragen zeker aan en houd ik spam tegen.
- Als maker regel ik per pagina titel/beschrijving voor Google en social.

## Tech Stack
- Astro 7 (static, `output: static`, `outDir: dist`, `trailingSlash: never`), Node >= 22.12
- Content nu: `src/data/*.json` (6 files). CMS-laag nog te kiezen (voorstel in plan, geen betaalde dienst).
- Hosting nog te beslissen: statisch (geen PHP-runtime) vs PHP-hosting (alleen daar werkt `contact.php` met `mail()`).
- Geen framework-switch (geen WordPress/Webflow/Framer-migratie).

## Commands
- Build: `npm run build`
- Preview: `npx astro preview` (in workdir draaien, geen `cd` naar MSYS-path)
- Dev: `npm run dev`
- Geen test-runner in repo — verificatie via build + preview + handmatige checklist (zie Testing Strategy).

## Project Structure
- `src/pages/*.astro` — routes (10 top-level + `beheer/` + `api/`)
- `src/layouts/Layout.astro` — header/nav/footer, cookie-bar, SEO-defaults + `<slot name="head"/>`
- `src/data/*.json` — pagina-content (nu de enige content-laag)
- `src/components/admin/` — CMS-voorbereiding (nog niet ingebonden)
- `public/` — logo/img/favicon, `contact.php`, `admin/config.yml`, `robots.txt`, `sitemap.xml`, `og-image.png`, `_headers`
- `dist/` — build-output (deploy-artefact, niet handmatig editen)
- `tasks/` — spec + plan + todo van deze mijlpaal

## Code Style
- Brand-contract leidend: `brand-spec.md` (navy `#091950`, red `#c2000b`, Open Sans, radius 0, container 1200px).
- Design-contract leidend: `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` (6 screens, responsive-matrix 360→1920, geen horizontale overflow).
- Conventie: per pagina `<title>` + `meta description` + `og:title/og:description` via Layout (props, geen dubbele tags); `og:url`/canonical per pagina expliciet.

## Testing Strategy
- Build moet slagen zonder warnings: `npm run build`.
- Preview-check mobiel + desktop (`npx astro preview`): nav, hero, grids, formulier, cookie-bar, footer.
- SEO-check: geen dubbele `og:title`, per pagina unieke title/description, sitemap + robots kloppen.
- Formulier-check: valide submit komt aan, honeypot houdt spam tegen, foutinput geeft nette melding. Let op: op puur statische hosting kan PHP niet werken — dat is een hosting-beslissing, geen code-aanname.
- Toegankelijkheid-basis: toetsenbord door pagina, zichtbare focus, alt-teksten op echte foto's, contrast navy/wit en red/wit.
- Geen console.log-restjes, geen secrets in git.

## Boundaries
- Always: gratis-only bouwen; elke wijziging via git (versies = backup); eerst previewen; rollback-pad benoemen.
- Ask first: repo public maken, DNS wijzigen, live zetten op vandotec.be, nieuwe externe dienst/account, foto's van derden/stock, stats-cijfers wijzigen.
- Never: live flip zonder expliciete “ja”; `vandotec-website.zip` (oude export) deployen; tracking/analytics toevoegen; Powerland-groen als primair; secrets commiten.

## Success Criteria (mijlpaal = gehaald als)
- [ ] Maker past tekst/foto/vacature/SEO-titel aan zonder handmatig in `dist/` te zitten en zonder build-breuk.
- [ ] Elke pagina heeft unieke title + description + og-tags (geen duplicaten), preview gecontroleerd.
- [ ] Formulier-stroom is bewezen: geldige aanvraag komt aan, spam wordt tegengehouden, foutmeldingen zijn netjes.
- [ ] Publiceren = één voorspelbare stap; terugrollen naar vorige versie = één stap (via git).
- [ ] Sitemap/robots/redirects oude `/nl/` → nieuwe `/` zijn vastgelegd.
- [ ] `npm run build` groen + preview akkoord op mobiel en desktop.

## Open Questions
- Hosting: statisch (GitHub Pages-achtig, dan PHP-formulier vervangen) of PHP-hosting (dan `contact.php` fixen en testen)? Bepaalt formulier-garantie.
- CMS-laag: JSON-in-git houden of gratis git-CMS (bijv. Decap) inbinden voor beheerscherm + media-bieb? Geen nieuw account zonder “ja”.
- Foto's: echte Vandotec-foto's (tankstation, EV-paal, carwash, infra, water, team) — wie levert, wanneer?
- Stats: `100+ projecten/jaar` en `10+ medewerkers` bevestigen of schrappen tot `40+ jaar` + `24/7`?
