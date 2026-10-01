# Vandotec.be — Briefing voor OpenCode (overname Hermes-sessie)

**Datum:** 2026-09-17  
**Hermes-sessie:** `20260916_154831_7b2463`  
**Werkmap:** `C:\Users\camil.sahnoune\_vandotec-check`  
**GitHub:** `Camil96` (ingelogd via `gh auth status`)  
**Repo:** `Camil96/vandotec-website` (private — moet public voor GitHub Pages)

---

## 1. Wat er gebeurd is (samenvatting Hermes-sessie)

Camil wilde een nieuwe website voor vandotec.be — zonder budget, alleen gratis tools. Hermes deed:

1. **Research Vandotec** — scope, domein, huidige site (Fork CMS + Siesqo theme), Voka-interview, expertise-pagina's.
2. **Plannen** — `PLAN-vandotec.md` geschreven in de repo. Bevat alle keuzes, aannames, risico's, tijdlijn.
3. **Design-handoff** — `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` (OpenDesign-export: 6 pagina's, 1 stylesheet).
4. **Brand-spec** — `brand-spec.md` geëxtraheerd van de live site (Fork CMS, Bootstrap 5).
5. **Implementatie** — Astro-project gebouwd vanuit het design-archief:
   - `src/pages/*.astro` — 13 pagina's (home, expertises, service-onderhoud, over-vandotec, jobs, contact, cookies, privacy, disclaimer, algemenevoorwaarden, + beheer-submap).
   - `src/layouts/Layout.astro` — gedeelde wrapper (nav, footer, header).
   - `src/data/*.json` — 6 content-bestanden (home, expertises, service-onderhoud, over-vandotec, jobs, contact).
   - `style.css` — design-system (navy #091950, red #c2000b, Open Sans).
   - `src/components/admin/` — NetlifyCMS-ready (nog niet ingebonden).
   - `public/` — logo's, img/, favicon, contact.php, admin/, robots.txt, sitemap.xml.
   - Build-output: `dist/` — 18 mappen/pagina's, 511ms build, deploy-klaar.
   - Deploy-zip: `vandotec-website.zip` (24.5KB — **WAARSCHUWING**: dit is de OUDERE export, niet de nieuwe Astro-build! Nieuwe build staat in `dist/`).

---

## 2. Technische keuzes (zoals besloten)

| Aspect | Keuze | Reden |
|--------|-------|-------|
| Stack | Astro (statisch) | Al gekozen in repo; snel, SEO-vriendelijk, 100% gratis |
| Hosting | **GitHub Pages** (aanbevolen) | 0 kosten, gebruikers account `Camil96` heeft. Repo moet public worden. Vercel is ook geconfigureerd (`.vercel/`, `vercel.json`) als alternatief. |
| Data-layer | JSON in `src/data/` | Geen CMS nodig voor nu — content bewerken via JSON + git |
| CMS | **Niet nu** (Pad A) | Statisch zonder admin. NetlifyCMS via GitHub git-gateway is stretch-goal, pas na live-zetten |
| Contactformulier | Formspree (gratis 50/maand) of eigen PHP | `public/contact.php` bestaat — eigen PHP-formhandler zonder externe accounts, geen budget nodig |
| Analytics | Geen | Geen budget, geen extern account toegestaan zonder expliciete goedkeuring |
| Foto's | **Nog ontbrekend** | Geen AI-beelden. Echte projectfoto's van Vandotec nodig (zie §5) |
| Typografie | Open Sans (Google Fonts) | Gratis, al in brand-spec |

---

## 3. Waar de site nu staat (feitelijke toestand)

- **Build:** klaar (`dist/` aanwezig, 18 pagina's, 511ms)
- **Live op vandotec.be:** **NEE** — de oude Fork CMS site draait nog
- **Preview lokaal:** werd gestart (port 4323), maar background-processen faalden door MSYS-path probleem (`cd /c/Users/...` niet gevonden in bg-shell). Werkgereed: gebruik `npx astro preview` in de workdir zonder `cd`.
- **Deploy-zip:** `vandotec-website.zip` bestaat, maar dit is de voor-Astro export (8 bestanden, index.html = 14KB — niet de nieuwe build). De echte deploy is `dist/` inhoud → upload naar GitHub Pages.
- **SEO-meta:** build heeft `og:image` (dist/og-image.png, 25KB), `robots.txt`, `sitemap.xml`. **og:title/description zijn nog statisch** ("Vandotec") — pages passen geen title/description props aan Layout. Dit moet nog gefixt worden (zie §5).
- **Contactformulier:** `public/contact.php` staat — eigen PHP, geen externe dienst. Nog niet getest op werking.
- **Admin/CMS:** `public/admin/` bestaat (NetlifyCMS frontend), `public/admin/config.yml` geconfigureerd, maar de beheer-UI is niet ingebonden in de build als werkend CMS — het is klaar voor implementatie als stretch-goal.

---

## 4. Openstaande punten (user-input nodig voor live-zetten)

Deze punten hebben **niemand anders dan Camil** de informatie om op te lossen:

1. **Echte projectfoto's** — de site heeft nu SVG-placeholders. Echte foto's van Vandotec projecten (tankstation, EV-laadpaal, carwash, infra, water) moeten geleverd worden. Optioneel: screenshot van de live site als tijdelijk 대체, maar dat is geen upgrade.
2. **Statistieken verifiëren** — `40+ jaar` = bevestigd (sinds 1978 / 1984). Maar `100+ projecten/jaar` en `10+ vaste medewerkers` zijn **ongeauditeerd placeholders** in de content. Pas echte cijfers of verwijder de twijfelachtige stats.
3. **DNS-provider check** — vandotec.be draait op een provider die ALIAS/ANAME ondersteunt voor apex-domein GitHub Pages koppeling? Zo niet → `www.vandotec.be` met 301 redirect van apex.
4. **Repo public maken** — repo `Camil96/vandotec-website` is private. Voor GitHub Pages moet het public zijn (of een `gh-pages` branch gebruiken).
5. **Live deploy creds / actie** — het flippen naar GitHub Pages + domeinkoppeling moet door Camil geautoriseerd worden. Geen automatische push zonder expliciete "ja, zet live".

---

## 5. Wat er TE DOEN is (voor live-zetten)

### Direct (volledig automatisering, geen user-input nodig)

1. **Fix og:title/description per pagina** — de huidige build heeft statische "Vandotec" tags. Pages moeten specifieke title/description injecteren via `<slot name="head">` of directe `<meta>` tags in het head. Dit is puur code, geen contentkeuze.
2. **Contactformulier testen** — `public/contact.php` lokaal testen (preview-server). Werkt het? Stuur het naar een mailadres of het blijft staan.
3. **Preview op eigen machine** — `npx astro preview` draait lokaal. Controleer visueel op mobiel/desktop.
4. **Sitemap + canonicals verifiëren** — de oude site gebruikt `/nl/`-prefixen. Nieuwe site gebruikt `/`. 301-redirects & canonicals moeten kloppen (check `robots.txt`, `sitemap.xml`).

### Na user-goedkeuring (Camil moet zeggen "ja" voor elk)

5. **Repo public maken** — GitHub repo `Camil96/vandotec-website` → Settings → Change visibility → Public. **(User action: inloggen op GitHub, dit aanpassen)**
6. **GitHub Pages activeren** — Settings → Pages → branch `main` / folder `/` of `gh-pages` branch. Apex domain `vandotec.be` met CNAME → `Camil96.github.io`.
7. **DNS aanpassen** — bij DNS-provider: ALIAS/ANAME record `vandotec.be` → `Camil96.github.io` (of CNAME `www` → `Camil96.github.io` + 301 van apex).
8. **Live URL testen** — na DNS propagatie (TTL-lowering naar 1u vooraf): `https://vandotec.be` en `https://www.vandotec.be` checken.
9. **301 redirects oude → nieuwe** — oude `/nl/` URLs → nieuwe `/`. Kan via `_headers` in dist/ of via DNS/edge.

---

## 6. Critical: wat OpenCode EERST moet doen

**Niet beginnen met iets wat een gebruiker moet goedkeuren.** Volgorde:

1. **Lees het plan** — `PLAN-vandotec.md` is de aanslagsplaat. Lees §7 (openstaande vragen) en §9 (risico's).
2. **Lees de design-handoff** — `DESIGN-HANDOFF.md` + `DESIGN-MANIFEST.json` zijn het visuele contract. Code moet ertegen matchen.
3. **Lees brand-spec** — `brand-spec.md` voor kleuren, typografie, componenten.
4. **Controleer de code-bouw** — `src/pages/`, `src/layouts/Layout.astro`, `src/components/`, `src/data/`, `style.css`. Run `npm run build` om te verifiëren dat het compileert.
5. **Preview lokaal** — `npx astro preview` in de workdir, geen `cd` naar een MSYS-path.
6. **Fix og:tags** — maak per pagina specifieke title/description.
7. **Test contactformulier** — `contact.php` via local preview.
8. **RAPPORTEER** — geef Camil een overzicht van wat er klaar staat, wat er nog moet, en wat hij moet goedkeuren voor live. **Niet live zetten zonder expliciete goedkeuring.**

---

## 7. Wat je NIET moet doen

- **Niet live op vandotec.be zetten zonder Camil zegt "ja" of "zet live".** De deploy is klaar, maar de flip moet geautoriseerd zijn.
- **Niet de OUDERE zip gebruiken voor deploy** — `vandotec-website.zip` is de voor-Astro export (let op: index.html = 14KB, style.css = 12KB — dat is de oude export uit juli 2026, NIET de nieuwe Astro-build). De nieuwe build is `dist/`.
- **Niet introduceren van tracking/analytics zonder goedkeuring** — geen Google Analytics, geen externe accounts, geen creditcard. Gratis tier alleen als het echt gratis is zonder verborgen cost.
- **Niet powerland stuff mengen** — dit is uitsluitend Vandotec. Powerland is een zusterbedrijf maar heeft eigen doelgroepsegmenten (B2C app/laadnetwerk) en eigen inhoud. Laat het staan.
- **Niet toeschave toevoegen aan het brandpalet zonder goedkeuring** — het palet is vastgelegd in `brand-spec.md` (navy, red, light blue, etc.). Kleur #37B49E (Powerland-groen) is alleen toegestaan als accenton, NIET als primair.

---

## 8. Extra context (Hermes sessie details)

De Hermes-sessie `20260916_154831_7b2463` had 3 request-dumps:

1. **`request_dump_20260916_154831_7b2463_20260916_160352_039149.json`** — start: research Vandotec, plan maken, initialisatie. Bevat web_search & web_extract calls naar vandotec.be, over-ons, contact, jobs, expertises, Voka-artikel.
2. **`request_dump_20260916_154831_7b2463_20260916_163541_186757.json`** — uitgebreidere sessie: implementatie details, GSG tooling, MSYS-path bugs, build-status. Bevat het overzicht dat de site "technisch VOLTOOID en DEPLOY-READY" was — 18 pagina's, build 511ms, SEO-meta, cookie-bar, contactformulier, deploy-zip.
3. **`request_dump_20260916_154831_7b2463_20260917_103649_608651.json`** — volgende dag: preview-server pogingen + localtunnel + og:title fix. Bevat de vaststelling dat preview bg-processen faalden door path-issue, en dat localtunnel moest worden opnieuw gestart.

**GitHub:** `Camil96` is ingelogd via `gh auth status` — `gh cli` werkt. Repo `Camil96/vandotec-website` bestaat.

---

## 9. Locaties (voor referentie)

```
Werkmap:        C:\Users\camil.sahnoune\_vandotec-check
Plan:           \_vandotec-check\PLAN-vandotec.md
Design-handoff: \_vandotec-check\DESIGN-HANDOFF.md
Brand-spec:     \_vandotec-check\brand-spec.md
Design-manifest: \_vandotec-check\DESIGN-MANIFEST.json
README:         \_vandotec-check\README.md
Astro-config:   \_vandotec-check\astro.config.mjs
Package.json:   \_vandotec-check\package.json

Broncode:
  src/pages/         — 13 Astro pagina's (.astro)
  src/layouts/       — Layout.astro (nav, footer, header)
  src/components/    — admin/ submap (NetlifyCMS klaar)
  src/data/          — 6 JSON content-bestanden
  src/styles/        — global.css (import van style.css)
  public/            — logo, img, favicon, contact.php, admin/, robots.txt, sitemap.xml, og-image.png

Output:
  dist/              — 18 mappen/pagina's, build-output, deploy-klaar

Deploy:
  vandotec-website.zip — OUD (juli 2026 export, 8 bestanden) — NIET gebruiken voor nieuwe deploy!
  dist/                 — NIEUWE Astro-build — dit is wat gepubliceerd moet worden

Sessielogs (Hermes, reference only):
  AppData/Local/hermes/sessions/request_dump_20260916_154831_7b2463_*.json
  AppData/Local/hermes/cache/browser-use/workspace/20260916_154831_7b2463/
```

---

*Laatste update: 2026-09-17. Website is gebouwd, niet live. Wacht op Camil's goedkeuring voor de flip.*
