# SPEC: Realisaties-pilot (hub + programmatische projectpagina’s)

Status: uitgevoerd via PR #20 (2026-10-07), goedgekeurd door Camil. Contentronde (verhalen + foto’s + toestemmingen) volgt apart.

## 1. Doel (één zin)

Elke referentie krijgt een eigen indexeerbare pagina (`/realisaties/<slug>`) plus
een hub (`/realisaties`), programmatisch uit `expertises.json`, klaar om op te
schalen zodra pilot-foto’s en -feiten binnen zijn.

## 2. Context

A→E-plan + realisaties-ambitie (2026-10-06): 14 dunne referentiekaarten ombouwen
tot SEO-gewicht; 128 klantgroepen op X-schijf (0 aangevinkt); 1727 dossiers als
feitenbron (niet openspitten i.v.m. privacy). Pilot-template eerst, content volgt.

## 3. Scope

- Wél:
  - JSON verrijken per referentie: `slug`, `client`, `location`, `photos[]`
    (bestaande site-foto’s hergebruiken; geen nieuwe claims, geen nieuwe teksten).
  - Hub `/realisaties`: filterbaar overzicht (zelfde categorieën als expertises),
    kaarten linken naar detailpagina’s.
  - Detailtemplate `[slug].astro`: hero-foto, feitenblok (klant/plaats/categorie),
    bestaande tekst, fotogalerij, CTA’s, onderlinge links (volgende/vorige),
    JSON-LD (`Article` + breadcrumb).
  - Toegang zonder nav-wijziging: hub gelinkt vanaf expertises-referentiekop en
    home-momentband; nav en nummering (01–06) onaangeroerd.
  - Canonicals + sitemap dekken nieuwe URL’s (via bestaande `@astrojs/sitemap`).
- Uitdrukkelijk níet: nieuwe projectverhalen schrijven, klantnamen publiceren die
  er nog niet stonden, nav-item, foto’s van X-schijf importeren (aparte ronde).

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] `/realisaties` rendert 14 kaarten met werkende filters
- [ ] 14 detailpagina’s bouwen (`dist/realisaties/*`), elk met unieke title/description
- [ ] Elke detailpagina heeft JSON-LD, breadcrumb, canonical, ≥1 foto, CTA
- [ ] Bestaande expertises-modalen blijven werken (zelfde data, geen regressie)
- [ ] `npm run build` groen, `node tasks/check-seo.cjs` ALL OK over alle pagina’s (script telt dynamisch: 11 + hub + 14 details)

## 5. Verificatie

Build + SEO-check (script telt pagina’s — drempel bijwerken als het script vast
op 11 staat), dist-grep op 14 slugs, screenshots hub + 1 detail 1440/390,
JSON-LD parsen per steekproef.

## 6. Smaak-check

- [x] Nodig (hub + template zijn zichtbaar → screenshots aan Camil)

## 7. Vrijstelling?

N.v.t. — volledige spec.
