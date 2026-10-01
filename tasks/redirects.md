# Redirect-map oud → nieuw (uit te voeren bij live-gang — NIET eerder)

Oude site (Fork CMS) gebruikt `/nl/`-prefixen; nieuwe site gebruikt `/`.
Onderstaande 301-map voorkomt rankingverlies. Uitvoering hangt af van hosting:

- **Apache/PHP-hosting (keuze A, bv. Combell):** `.htaccess` met `Redirect 301`-regels
  (te plaatsen bij deploy — vereist host-bevestiging, daarom nu alleen deze map).
- **Netlify/Vercel-fallback:** `_redirects`-formaat (alleen als hosting wijzigt).

## Pagina-redirects (oud → nieuw)

| Oude URL (vandotec.be) | Nieuwe URL | Status |
|---|---|---|
| `/nl/` | `/` | 301 |
| `/nl/over-ons` | `/over-vandotec` | 301 |
| `/nl/jobs` | `/jobs` | 301 |
| `/nl/contact` | `/contact` | 301 |
| `/nl/offerte-aanvraag` | `/contact` | 301 |
| `/nl/expertises` (indien bestaand) | `/expertises` | 301 |
| `/nl/expertises/categorie/tankstations` | `/expertises#tankstations` | 301 (anchor — let op: fragment gaat niet mee in server-redirect; JS-fallback of accepteren) |
| `/nl/expertises/categorie/ev-laadinstallaties` | `/expertises#ev-laadinstallaties` | idem |
| `/nl/expertises/categorie/infrastructuur-en-civiele-werken` | `/expertises#infrastructuurwerken` | idem (slug verschilt!) |
| `/nl/expertises/categorie/hoog-middenspanningscabine` | `/expertises` | 301 (geen aparte sectie meer) |
| `/nl/services/*` (5 pagina's) | `/service-onderhoud` (+ `#slug` waar matcht: onderhoud, tank-cleaning) | 301 |
| `/nl/projecten` | `/expertises` (of `/over-vandotec#referenties` indien gebouwd) | 301 — keuze bij live-gang |
| `/nl/disclaimer` | `/disclaimer` | 301 |
| `/nl/privacy-policy` | `/privacy` | 301 (slug verschilt!) |
| `/nl/cookie-policy` | `/cookies` | 301 (slug verschilt!) |
| `/nl/algemene-voorwaarden` | `/algemenevoorwaarden` | 301 (slug verschilt!) |

## Let op

- Oude FR-URL's (`/fr/*`) → voorlopig naar `/` (FR is v2, geen inhoud om naar te verwijzen).
- Canonicals per pagina staan al in de build (Layout `path`-prop) — na live-gang controleren
  dat ze naar `https://www.vandotec.be/...` wijzen (nu al zo geconfigureerd).
- DNS TTL een dag vooraf verlagen naar 1u (onderdeel live-voorstel, GOLIVE-04).
