# Vandotec.be — Nieuwe website: volledig plan

> Status: **design-archief klaar, implementatie nog ontbreef**. Dit document is de aanslagsplaat. Alle cijfers, afwegingen en openstaande vragen staan in §7.

## 0. Wat er nu is (inventaris)

| Element | Vindplaats | Status |
|---|---|---|
| Astro-project (output: static) | `astro.config.mjs`, `package.json` | ✅ boilerplate, maar niet functionerend |
| HTML-templates (6 pagina's) | root: `index.html`, `expertises.html`, `service-onderhoud.html`, `over-vandotec.html`, `jobs.html`, `contact.html` | ✅ geschreven, maar in root — Astro verwacht `src/pages/` |
| CSS design-system | `public/style.css` (211 regels) | ✅ compleet (navy #091950, red #c2000b) |
| JSON-content per pagina | `src/data/*.json` (6 files) | ✅ aanwezig, maar **niet gekoppeld** aan templates |
| SVG-assets | `img/`, `logo.svg`, `logo-white.svg` | ✅ aanwezig (iconen, geen foto's) |
| Admin/CMS-config | `public/admin/config.yml` (NetlifyCMS git-gateway) | ⚠️ geconfigureerd, maar **login + /beheer UI bestaan niet** |
| Beheer-plannen | `.hermes/plans/*.md` (4 plannen) | ⚠️ plannen voor `src/pages/beheer/**` die **niet bestaan** |
| Deploy-config | `.vercel/` + `vercel.json` | ⚠️ Vercel-orientatie; user wil **gratis / GitHub Pages** |
| Screenshots live site | `__screenshot-*.png`, `vandotec-live.png` | ✅ referentie oud-design |
| Brand-spec | `brand-spec.md` | ✅ geëxtraheerd van live site (Fork CMS, Siesqo theme) |
| Design-handoff | `DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json` | ✅ OpenDesign export |

**Conclusie:** Er is een volledig visueel prototype + content-structuur, maar geen werkende website. De structuur is een "export-archief" zonder build- of runtime-koppeling.

---

## 1. Doel & positionering (Vandotec's eigen merkstem)

> ⚠️ **Niet Powerland-tonen.** Vandotec is B2B, het merk is 'no-nonsense' / 'realisme', niet 'fight-the-average'. CLAUDE.md-voorkomende tonen niet automatisch.

**Wie is Vandotec?**
- Installatiebedrijf sinds 1984 (Poperinge, BE0417.923.411)
- 6 domeinen: tankstations (40jaar, 200+ commerciële / 600+ industriële), EV-laadinfra, carwashes, reinigingssystemen, infra- en civiele werken, waterprojecten
- **Sleutel-op-de-deel**: ontwerp → bouw → onderhoud, alles in eigen beheer
- **Eigen vaste ploegen + eigen materieel, geen onderaannemers** ← kerndifferentiër
- **24/7 interventiedienst** ← kernwaarde
- VCA\*\* gecertificeerd
- Zusterbedrijf Powerland (B2C EV-app) — **striktscheiden**

**Merkstijl Vandotec** (verzameld uit site + Voka-interview):
- Praktisch, technisch, oprecht
- "Realisme", "focus op oplossingen", "grondige voorbereiding", "betrokkenheid"
- Korte lijnen, vaste contactpersonen
- Niet corporate-grijs, niet ook scherp/anti-corporate als Powerland
- Toon: klare taal, feitelijk, maar met karakter van een handvoll ervaren vaklieden die weten wat ze doen

**Doelgroep (B2B/B2G):**
1. Tankstationexploitanten (brandstof/CNG/LNG/AdBlue)
2. Bedrijven & overheden (EV-laadinfra, carwash, reiniging)
3. Projectontwikkellaars & industriële ondernemingen (infra/elektra/water)
4. Werkzoekenden (jobs)

**Conversie-doelen:** offerte-aanvragen, interventie-telefoontjes, sollicitaties.

---

## 2. Contentstructuur (sitemap)

```
/                           ← Home
/expertises                 ← 6 domeinen (tankstations, EV, carwash, reiniging, infra, water)
/expertises/tankstations    ← diepgang per domein + type-installaties (brandstof/CNG/LNG/AdBlue)
/expertises/ev-laadinstallaties
/service                    ← 24/7 interventie, onderhoud, preventief, tank cleaning
/over-vandotec              ← 40j, vasteploegen, VCA, High-Five waarden, projectaanpak
/jobs                       ← vacatures + open sollicitatie
/contact                    ← formulier + interventie-telefoon
/privacy  | /cookie  | /algemenevoorwaarden
```

**Content-structuur per pagina** is al vastgelegd in `src/data/*.json` (6 files). Die structuur gebruiken we 1:1.

---

## 3. Designrichtlijn (prototype → productie)

**Uitgangspunt:** Het design-archive (`index.html` + `style.css` + SVG-assets) is het visuele contract. Dat blijft staan.

**Wat er beter moet:**
| Issue | Oplossing |
|---|---|
| Hero-placeholder `hero-bg.svg` (geen echte foto) | Echte projectfoto tankstation/laadpaal (zie §6) |
| Cookie-banner invalst op live site (1/3 scherm) | Uitstroomloos cookie-modal, fixed bottom-bar |
| Geen foto's in sections | Placeholder-illustraties vervangen door echte projectfoto's |
| Mobiel: hero-text over volledige breedte | Max-width 600px, links-uitlijning |
| Merkkleur navy (#091950) + red (#c2000b) | Behouden. Toevoegen: 1 accentkleur voor EV (groen #37B49E — Powerland-palet, **alleen als accent**, niet als primair) |

**Typografie:** Open Sans (gratis Google Font) — behouden.

**Layout:** 1200px container, strakke raster. Geen volle-breedte tekstblokken op B2B-pagina's (geeft leesbaarheid).

---

## 4. Technische aanpak (gratis stack)

### Keuze 1: Generator — Astro (statisch)
- **Waarom:** al gekozen in repo; modern, snel, SEO-vriendelijk; output = plain HTML die overal host
- **Hosting:** **GitHub Pages** (gratis, user heeft GitHub-account `Camil96` al gekoppeld)
  - `vandotec.be` CNAME → `Camil96.github.io` (apex domein via ALIAS/ANAME, valt aan DNS-provider)
  - GitHub Pages vereist een **public** repo of `github-pages`-branch. Repo is nu `private` → moet openbaar worden.
- **Alternatief op de planning:** Vercel (al geconfigureerd, ook gratis) — **aanname: GitHub Pages**, tenzij user zegt anders.

### Keuze 2: Data-layer — JSON in `src/data/`
- 6 pagina's × 1 JSON-bestand = content als data
- Astro pagina's in `src/pages/*.astro` consumeren de JSON via `import`
- Geen externe CMS-backend nodig → 100% statisch, 0 servercost

### Keuze 3: CMS (content editing)
Twee paden:

**Pad A — Statisch zonder admin (aanpak voor nu)**
- Content beheer je via de JSON-bestanden in git (VS Code / GitHub web UI)
- 0 setup-cost, 100% gratis, scheelt dagen development
- *Nadeel:* geen WYSIWYG voor de gebruiker

**Pad B — NetlifyCMS via GitHub (git-gateway)**
- `public/admin/` frontend (Single Page App in /admin)
- GitHub-OAuth app (gratis te registreren via GitHub)
- Redacteert content via UI, commit-direct naar git
- *Kost:* ~2u setup + GitHub OAuth app registreren
- Wordt aangebeurt **na** live-zetten, als extra

> 📌 **Aanname:** start met Pad A (statisch). Keuze B is een *stretch-goal*.

### Keuze 4: Contactformulier (zero-cost)
| Optie | Gratis tier | Opmerking |
|---|---|---|
| **Formspree** | 50 submissions/maand | Eenvoudig HTML form, postt naar Formspree endpoint. Werkt met GitHub Pages. |
| **Netlify Forms** | Gratis bij Netlify hosting | Niet beschikbaar bij GitHub Pages |
| **mailto:** | Altijd gratis | Slecht UX, spam |

> 📌 **Aanname:** Formspree (gratis tier). Voldoende voor B2B-leads.

### Keuze 5: SEO / analytics
- SEO: handgeschreven `title` + `meta description` per pagina (al in JSON)
- Sitemap.xml + robots.txt (Astro plugin `astro-sitemap`, gratis)
- Analytics: **geen** externe tracking. Geen budget voor tools. (Openstaand punt — zie §7)

### Keuze 6: Foto's
- **Geen AI-beelden.** Alleen echte projectfoto's van Vandotec.
- De live site heeft placeholder-SVGs. Echte foto's moeten geleverd worden.
- Opties: (a) screenshot van de live site (bevat al foto's), (b) stock via onbeperktegratis sites (.Unsplash/Pixabay — maar die passen niet bij *echte projecten*), (c) de gebruikers foto's leveren
> 📌 **Open punt:** heeft de gebruiker echte projectfoto's beschikbaar?

---

## 5. Implementeringsplan (stappen)

### Fase 1 — Structuur & build (2-3 dagen)
1. **Reorganiseer repo naar Astro-standaard**
   - Verplaats HTML-templates van root → `src/pages/*.astro`
   - Maak één gedeelde `src/layouts/Layout.astro` (header, footer, nav)
   - Importeer `style.css` via `src/styles/global.css` → `astro:config` toevoegen
2. **Koppel JSON-data aan pagina's**
   - Per `.astro`-pagina: `import data from '../data/<page>.json'`
   - Render hero, about, expertises, service-grid, stats, CTA's, footer dynamisch
3. **Assets organiseren**
   - `public/img/` → `public/assets/img/`
   - Logo's, iconen, SVG's bevestigen
4. **Build testen**
   - `npm install` + `npm run build`
   - `npm run preview` → check mobiel/desktop

### Fase 2 — Design-refinement (1 dag)
5. **Cookie-consent** vervangen door fixed bottom-bar (GDPR-compliance, geen overlay)
6. **Hero-image** placeholder → echte foto (of tijdelijk: screenshot live site)
7. **Responsive fixes** — mobiele nav, grid-collapse (expertise-grid 3→2→1 col)

### Fase 3 — CMS / beheer (optioneel, 2u)
8. **NetlifyCMS** `admin/` als static SPA, `config.yml` koppelen aan JSON-bestanden
9. GitHub OAuth app registreren (gratis)
10. Test: login → bewerk home.json → commit

### Fase 4 — SEO & launch (1 dag)
11. **Sitemap + robots** (`astro-sitemap`)
12. **Meta-tags** per pagina finaliseren
13. **Formspree** endpoint koppelen aan contactformulier
14. **Repo public maken** + GitHub Pages instellen (Settings → Pages → `gh-pages` branch of `docs/`)
15. **Domein koppelen**: CNAME-record `www.vandotec.be` → `Camil96.github.io`
16. **301 redirect** oude pagina's → nieuwe (canonical tags)

### Fase 5 — Verificatie & flip
17. **End-to-end test:** mobiel (360×800, 390×844, 430×932), tablet (820×1180, 1024×768), desktop (1440×900, 1920×1080)
18. **SEO check:** Lighthouse, headings-hierarchie, alt-teksten lege images
19. **Content final check:** alle cijfers en claim's verifiëren
20. **DNS TTL verlagen → 1h**, deploy → monitor 48h

---

## 6. Content & assets checklist

| Asset | Status | Actie |
|---|---|---|
| Hero-afbeelding | ❌ SVG-placeholder | Echte projectfoto leveren |
| Expertise-foto's | ❌ geen | Per expertise één foto (tankstation, laadpaal, carwash, infra, water) |
| Team/workshop-foto | ❌ `team-workshop.svg` | Echte team- of projectfoto |
| Statistieken (40+, 100+, 10+) | ⚠️ onverifieerd | [USER] bevestigen |
| Copy | ✅ in JSON | Na check finaliseren |
| Logo (blauw + wit) | ✅ SVG aanwezig | OK |
| Iconen (6 expertise) | ✅ aanwezig | OK |

---

## 7. Openstaande vragen & kritieke aannames (VOOR DEZE CHECK)

> De gebruiker zei: "ik gebruik jou enkel gratis" en "Mijn prompt is kort en ondubelzinnig. Al de rest denk jij er zelf aan."
> Dit zijn de plekken waar een onwetige gebruiker echt een keuze moet maken.

### A. Hosting: GitHub Pages vs. Vercel (beide gratis)
- **GitHub Pages** (aanbevolen): 0 kosten, user heeft account, past bij "enkel gratis". Past niet bij domeinkoppeling apex domain zonder ALIAS-support van DNS-provider.
- **Vercel** (alternatief): al geconfigureerd in repo, beter domein-support, maar user moet een Vercel-account aanmaken.
- 👉 **Aanname:** GitHub Pages. Zet me op als user zegt "anders".

### B. Statistieken ondertekend
- `40+ jaar ervaring` → ✅ bevestigd (sinds 1984)
- `100+ projecten/jaar` → ⚠️ **ongeauditeerd**. Is dit realistisch? Vandotec is midsize B2B.
- `10+ vaste medewerkers` → ⚠️ **ongeauditeerd**. Moet bevestigen.
- 👉 **Aktie:** deze cijfers in de HTML/JSON zijn placeholders. Vervang door **echte cijfers** als je die hebt. Als niet, zet op "40+ jaar" + "24/7 interventie" en laat de tweede/derde stat staan tot bevestiging.

### C. Echte projectfoto's
- Huidige prototype heeft geen photo's, alleen SVGs.
- 👉 **Aktie:** lever 3-5 echte projectfoto's (tankstation, EV-laadpaal, infra). Als tijdelijk ok, screenshot de live site — maar dat is geen upgrade.

### D. Analytics
- "Geen budget" → geen Google Analytics (gratis, maar exter account). Openstaand.
- 👉 **Aanname:** geen analytics. Als je wel tracking wilt, moet je een account goedkeuren.

### E. Contactformulier
- 👉 **Aanname:** Formspree (gratis 50 submissions/maand). Geen externe account nodig voor mij — ik registreer via GitHub. Als 50 te weinig is, moet je een betaalde form-handler kiezen.

---

## 8. Tijdlijn (geschat)

| Fase | Duur | Deliverable |
|---|---|---|
| 1. Structuur + build | 2-3 dagen | Werkbare static Astro build |
| 2. Design-refinement | 1 dag | Geoptimaliseerde UI (cookies, foto's, responsive) |
| 3. CMS (optioneel) | 2u | NetlifyCMS beheer in /admin |
| 4. SEO + launch | 1 dag | Live op vandotec.be (GitHub Pages) |
| 5. Verificatie | 1 dag | Test-opnames, SEO check |

> ⚡ **Fast-track mogelijk:** Als je Pad A (statisch, zonder CMS) kiest en tijdelijkerwijs de live-site-screenshot als hero-afb gebruikt, kan de site binnen **48u** live zijn.

---

## 9. Risico's & valkuilen (geen bijvangsten)

1. **Domein/DNS:** GitHub Pages met apex domain (`vandotec.be`) vereist ALIAS/ANAME-record. Als je DNS-provider dat niet ondersteunt, moet `www.vandotec.be` gebruiken → redirect apex. → **Check je DNS-provider (Begarma, Combell, ...) voor ALIAS-support.**
2. **SEO-canonical:** Oude site heeft `/nl/`-prefixed URL's. Nieuwe site gebruikt `/`. **301-redirects** noodzakelijk om rankingverlies te vermijden.
3. **Formspree limiet:** 50 submissions/maand. Een B2B-formulier met 50+ leads/maand breekt de limiet. → **Bespreek alternatief (Eigen form-backend via GitHub Actions) als volume >50/m.**
4. **Foto's ontbreken:** Een website zonder echte projectfoto's is een downgrade van de huidige live-site. → **Prioriteit #1 voor content.**
5. **CMS-setup:** NetlifyCMS vereist een GitHub OAuth app + beveiligde `admin/`. Als niet goed gedaan, exposing content aan het publiek. → **Pas als site live staat.**
6. **Astro-output:** `trailingSlash: 'never'` — GitHub Pages levert URLs zonder trailing slash. Test canonical tags.

---

## 10. Directe volgende stappen (ready voor 'ga door')

1. ✅ Plan geschreven → `PLAN-vandotec.md` in repo
2. 🔄 **Herstructureer repo naar Astro-standaard** (pages + layouts + styles)
3. 🔄 **Koppel JSON-data aan .astro pagina's** (template → component)
4. 🔄 **Build lokaal testen** → preview op mobiel + desktop

> *Dit plan leeft in `Camil96/vandotec-website` repo. Zet me op met 'ga door' en ik start met stap 2.*
