# REVIEW.md — integrale audit 2026-10-08 (spec: specs/review-ronde.md)

Methode: 4 modules (M1 structuur, M2 inhoud, M3 vertrouwen, M4 gevoel) + geautomatiseerde
dist-scan (27 html, 880 interne links) + adversarial check per Critical (doubt-driven).
Bewijsregel: geen bewering zonder bestand:regel of commando-output; de rest staat als “niet geverifieerd”.

## Baseline (2026-10-08, main post-PR #35)

- `npm run build`: groen, 27 pagina’s. `node tasks/check-seo.cjs`: ALL OK.
- Dist-scan: 880 interne links, **0 dode links**; 0 missende /img/-assets.
- Scanner-misser (geen site-bug): `/logo.png` + `/logo-white.svg` bestaan in `public/` (alleen `public/img/` was gescand).
- `public/img/`: 111 bestanden, `public/style.css`: 54,9 KB.

## Critical (5)

1. **D-Glas kaart zonder naam én zonder alt** — `src/data/expertises.json:359` (`title` i.p.v. `name`,
   geen top-level `alt`) × `src/pages/expertises.astro:223` + `src/pages/realisaties.astro:44`
   (`alt={ref.alt || ref.name}`, `h3` uit `ref.name`). Dist-scan bevestigt: 2 imgs zonder alt, beide
   `dglas-oostende-1.jpg`. Enige van 15 referenties met `title`. Adversarial check: geen andere
   `title`-entries (grep). Voorstel: `{"name": "D-Glas, Oostende", "alt": "Plaatsing ondergrondse
   tank bij D-Glas Oostende"}` + template-fallback `ref.alt || ref.client || ref.title || ref.name`.
2. **“Tankstation groene luifel” is placeholder-achtig** — `src/data/expertises.json:333-346`
   (geen client/location, 1 zin tekst) terwijl `src/pages/index.astro:63,217` de echte klant
   verklappen (Pessleux — Fosses-la-Ville). Voorstel: aanvullen na toestemming
   (`client: Pessleux, location: Fosses-la-Ville`) of entry + ticker-vermelding verwijderen.
3. **Formulier dood zonder PHP-hosting, nooit getest** — `src/pages/contact.astro:109`
   (`action="/contact.php"`) × `public/contact.php:2-3,61` (werkt alleen op PHP-hosting).
   Succes-state hangt aan `?sent=1` dat alleen PHP zet. Status: **niet geverifieerd** (nooit live getest).
4. **Blauw-op-blauw fallback ontbreekt (latent)** — `public/style.css:36` (`a{color:navy}`) zonder
   override in `.section-dark/.cross-band/.urgency-band/.quote-break/.facts-band/.connect-item`
   (alleen 4 selectors wél wit). Adversarial check: vandaag renderen géén kale links in donkere
   banden (facts-band linkloos; cross-band-data linkloos; quote-break-link is `.btn`). Dus latent,
   geen live defect — wel structureel risico bij elke data-link. Voorstel: globale
   `a:not(.btn)`-override op donker naar wit + underline.
5. **Project-hero zonder srcset/width-height/preload** — `src/pages/realisaties/[slug].astro:37-39`
   (`<img src={ref.img} fetchpriority>`; head-slot alleen JSON-LD) vs home-patroon
   (`index.astro:16,20`: preload + srcset + sizes). Gevolg: volle file op mobiel, CLS, tragere LCP.
   Voorstel: `-800`-varianten + `srcset/sizes/width/height` + preload per slug (patroon index:16).

## Required ( CONVERT naar fix-rondes; verkort, volledig bewijs in module-output)

**M1 structuur**
- `Layout.astro` (365 regels): header + footer + lightbox + cookiebar + 8 IIFE’s = God-component.
  Voorstel: splits Header/Footer/partials; `contact-strip` uit footer tillen.
- Dode CSS: `.card-icon`, `.section-header-img`, `.section-header-split` (`style.css:199,201,680`,
  0 hits in src). Voorstel: schrappen.
- Dood `icon`-veld (`expertises.json:9,49,64`) wordt nooit gerenderd; 3 svg’s
  (`icon-tankstation/ev/infra`) nergens gebruikt. Voorstel: renderen of veld + svg’s verwijderen.
- Echt ongebruikt: `exp-hoogspanning.jpg`, `ref-demarol.jpg`, `service-24-7.svg`,
  `service-onderhoud.svg`, `service-preventief.svg` (0 hits src/css/dist). Voorstel: verwijderen.
- `title`-veld D-Glas onzichtbaar (`[slug].astro:19` leest `client || name`). Voorstel: hernoemen naar
  `name` of `title`-fallback toevoegen.
- Duplicatie om componenten van te maken: `page-hero` 9×, `connect-grid` 6× identiek,
  `gal-rail` 4×, `moment-band` 5×, `stats` 2 smaken (lijst met regels in module-output).

**M2 inhoud**
- “Eigen ploegen, geen onderaannemers” hardcoded (`[slug].astro:63`) én in data (5×) + spanning met
  Powerland-zusterdivisie (`expertises.json:135`). Absolute nul-claim zonder bewijs. Voorstel:
  “eigen vaste ploegen met eigen materieel; zusterdivisie waar van toepassing expliciet vermeld”.
- “24/7 interventie” op zelfde nummer als kantoor (`contact.json:14,17-18`); wachtdienst/SLA onbewezen.
  Voorstel: “24/7 bereikbaar voor storingsmeldingen; interventie in overleg, contractklanten prioriteit”.
- Tellers zonder bron (`45+ jaar`, `6.000+ projecten`, `5 landen`; `expertises.json:441-453`):
  alleen BE+FR bewezen. Voorstel: peildatum/methode of terug naar “sinds 1978 — duizenden projecten”.
- IJkcijfers + ISO 17020 zonder certificaatnummer (`service-onderhoud.json:10-16`, `contact.astro:204`,
  `over-vandotec.astro:131`). Voorstel: nummer + meetjaar invullen (Camil).
- Superlatieven `over-vandotec.json:8` (“de referentie”, 2× “altijd”) vs eigen waarde “Geen luchtkastelen”.
  Voorstel: “in de regel met eigen mensen, sleutel-op-de-deur waar overeengekomen”.
- 8/15 entries hebben 1 foto; 4 hebben ≤4 woorden tekst (Iveco, Decospan, MIG, Cid e.a.).
  Voorstel: aanvullen of verbergen tot 2+ foto’s + bewijs.
- `gallery` vs `photos`: 2 veldnamen; Demarol/D-Glas geen `gallery` → modal leeg op expertises.
  Voorstel: één veld `photos` voor beide templates.
- Demarol hero (`img …-3.jpg`) ≠ `photos[0]`; Maes-alt verzwijgt Shell (bestandsnaam niet).
  Voorstel: herordenen; alt neutraliseren of merkcheck.
- 6 merknamen (Gulf, Esso, Avia, Shell, Texaco, ProFleet + Porsche-auto) zonder toestemmingsbewijs.
  Voorstel: per merk checken; zonder bewijs neutraliseren + disclaimer-zin over merknamen.
- Juridische pagina’s anoniemer dan contact-bron (privacy alleen mail/tel; cookies/disclaimer geen
  enkel contactgegeven). AVG: identiteit verwerkingsverantwoordelijke ontbreekt. Voorstel: identiteitsblok.
- VCA/ISO/klasse 6/P2 zonder nummers (`over-vandotec.astro:137-138` + “op elke werf” absoluut).
  Voorstel: nummers + geldigheid (Camil).
- Powerhub-tijdlijn (`over-vandotec.json:36-41`, mei 2026 + persoonsnaam) zonder extern bewijs.
  Voorstel: maand weglaten of bewijs linken.

**M3 vertrouwen**
- `contact.php:44-45`: `$email` buiten CRLF-guard (alleen `filter_var` vangt af). **Niet geverifieerd.**
- `contact.php:57-59`: subject zonder `mb_encode_mimeheader` (é/ë stuk). **Niet geverifieerd.**
- Geen rate-limit/CSRF/lengte-limieten (`contact.php:17-19`). **Niet geverifieerd.**
- Cookiebanner claimt “cookies”, code gebruikt `localStorage` (`Layout.astro:153` vs `:343,358`).
- Google Fonts laadt vóór consent (`Layout.astro:18-20`) vs “Geen tracking”.
- Privacy vs cookies spreken elkaar tegen over analytics (`privacy.astro:23` vs `cookies.astro:23`).
- “Cookies uit → menu stuk” onwaar (`cookies.astro:27` vs `Layout.astro:162-196`, puur class-toggle).
- Sitemap 26 URL’s = exact dist + slugs. Conform (live indexatie niet geverifieerd).
- Veldnamen + honeypot matchen 1-op-1; subject-select zonder placeholder (altijd “offerte”).

**M4 gevoel**
- Rood-overschrijding home-hero (header-CTA + hero-CTA + eyebrow + link-underline + gloed),
  stats+Uitgelicht (3), footer-strip + promise-blok (≥3). Voorstel per viewport in module-output
  (o.a. `Mail ons` naar witte underline, footer-`h2::after` naar navy).
- Contrast-risico kleine transparante caps (`muted-on-dark`, `hero-corner .6`, `meta-index .5`).
  Voorstel: minimaal `.92/.85`; meting op foto als “niet geverifieerd”.
- Ticker niet pauzeerbaar met toetsenbord (WCAG 2.2.2); hover-pauze + reduced-motion wel ok.
  Voorstel: `:focus-within`-pauze + Pauzeer-toggle (eigen mini-spec).
- `srcset-800w` in data genegeerd: D-Glas 7×, Cools 5×, Demarol 5×, Maes-shell, kraanwagen bestaan
  maar templates renderen alleen `src`. Voorstel: `srcset/sizes` in beide rails + over-pagina.
- `width/height` ontbreken op meeste content-imgs (CLS). Alleen home-about/wrk-sleuf/ref-maes/moment
  hebben ze. Voorstel: dimensies uit bestanden overnemen of aspect-ratio-truc uitbreiden.
- Preload alleen op home; expertises/realisaties-overzicht alleen `fetchpriority`.
- Lightbox: geen pijltjes/prev-next (7 foto’s D-Glas, 1 zichtbaar), geen Tab-trap/fallback,
  geen `aria-describedby`. Voorstel: navigatie + focus-wrap + overflow-lock.
- Print-css dekt `[slug]` niet (`.gal-rail` print afgekapt, pager/CTA als dode chrome).
  Voorstel: print-regels + dist-print-verificatie (nu niet geverifieerd).
- Dode token `--light-blue` (alleen definitie) + rode focus-ring op rode buttons onzichtbaar.

## Optional / Nit (selectie)

- `.hero-inner`-declaraties 3× (`style.css:105,136,173`); `.quote-block` generiek + scoped dubbel;
  ticker 28 hardcoded spans (drift) — genereren uit data; `qa-print.cjs:12` `.footer-quote`-rest;
  ticker als 14 stops zonder lijstsemantiek; “beste oplossing” 2×; “zo snel mogelijk/direct” zonder SLA;
  ticker-klantnamen = impliciete referentieclaim zonder toestemmingsregister; jobs “familiebedrijf”
  zonder bewijs; subject-select altijd “offerte”.

## Niet geverifieerd (rest-risico, mensenwerk of hosting nodig)

Formulier-e2e, PHP-mailheaders, rate-limit-misbruik, live HAR vóór consent, contrastmeting op foto,
screenreader, iPhone-Safari, live indexatie, wachtdienst/SLA, certificaatnummers, merktoestemmingen,
ticker-klanttoestemmingen, Powerhub-bewijs, tellers-bron.

## Voorgestelde fix-rondes (na Camil-akkoord)

- R1 Critical content: D-Glas naam+alt, groene-luifel-besluit, blauw-op-blauw-override, slug-srcset,
  cookie-tekstcorrecties (privacy/cookies-tegenspraak, localStorage-label, Fonts-vermelding).
- R2 vertrouwen: contact.php-guards (email in CRLF-check, mb_encode_mimeheader, lengte-limieten),
  juridisch identiteitsblok, VCA/ISO-nummers (input Camil).
- R3 gevoel: rood-telling, ticker-pauze, lightbox-navigatie + focus, print-css, width/height-batch.
- R4 structuur: Layout-splits, dode CSS/assets/icon-veld, gallery→photos, component-extractie.
- R5 claims: tellers, 24/7-nuance, onderaannemers-nuance, superlatieven, dunne entries, merkenregister.
