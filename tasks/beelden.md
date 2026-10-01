# Beelden-register Vandotec (bron + positie + status)

Principe: eigen beelden van vandotec.be eerst; gratis stock alleen voor gaten;
echte Vandotec-foto's vervangen stock later 1:1 (zelfde ratio's).

## A. Overgenomen van vandotec.be (in `tasks/beelden-staging/`, nog NIET in `public/`)

| Bestand (staging) | Bron-URL (vandotec.be) | Grootte | Bestemming (nieuw) | Ratio |
|---|---|---|---|---|
| `hero-1.jpg` | `/src/Frontend/Files/Banners/Banner/Image/source/298f31df….jpeg` | 183KB | Home hero-achtergrond (optie 1) | 16:9, navy-overlay |
| `hero-2.jpg` | `…/692260bf….jpeg` | 640KB | Home hero-achtergrond (optie 2) | 16:9, navy-overlay |
| `hero-3.jpg` | `…/ff8ae7c7….jpeg` | 1236KB | Alleen na compressie, anders afvallen | 16:9 |
| `exp-tankstations.jpg` | Expertise-thumb `c28f687c…` (cat. tankstations) | 145KB | `/expertises#tankstations` + teaser | 4:3 |
| `exp-ev-laadinstallaties.jpg` | Expertise-thumb `6f3cd63a…` | 336KB | `/expertises#ev-laadinstallaties` | 4:3 |
| `exp-infrastructuur.jpg` | Expertise-thumb `30cd7793…` | 671KB | `/expertises#infrastructuurwerken` | 4:3 |
| `exp-hoogspanning.jpg` | Expertise-thumb `1213e112…` | 41KB | Hoog-/Middenspanning (over-pagina) | 4:3 |
| `over-ons.jpg` | `/src/Frontend/Files/Pages/UserTemplate/2018-03-11-2013-32.jpg` | 280KB | Over-pagina (vervangt team-workshop.svg) | 4:3 |
| `vca-logo.jpg` | `/src/Frontend/Files/MediaLibrary/11/vca-logo-1.jpg` | 8KB | ~~Cert-strip~~ Feiten-band (over-pagina) | origineel |
| `vca-logo.svg` | ~~Officieel~~ Ogeverifieerde Commons-variant (VERVANGEN — niet het juiste logo) | 11KB | Nergens meer in gebruik | SVG, archief |
| `vca-officieel.png` | **Officieel VCA-beeldmerk** (aangeleverd door maker 2026-09-18, uit certificaat-pakket) | 7KB | Apart VCA-blok (over-pagina), wit badge-vlak | PNG |
| `gebouw-poperinge.jpg` | Bijlage maker 2026-09-17 (`nieuw-gebouw-foto-beeuwsaert-1`) — nieuwbouw Group Vandotec + Powerland, Poperinge | 87KB (gecomprimeerd) | Over-pagina, 16:9-band na intro, géén onderschrift (op verzoek) | 16:9 |
| `hero-over.jpg` | Teambijeenkomst touwtrekken in de werkplaats (eigen maker-foto `_R6_7651`, 2025) | 239KB (gecomprimeerd) | `/over-vandotec` page-hero met overlay | 16:9 |

Volgende stap (wacht op Camil-ja): keuze hero-foto (1 of 2), compressie hero-2/3 + exp-infrastructuur
(`sharp` = nieuwe dependency → apart akkoord nodig, of Camil comprimeert extern aan),
daarna verplaatsen naar `public/img/` + inbinden met alt-teksten.

**Update 2026-09-17 — GEKOZEN + GEÏNTEGREERD:** hero = optie 2 (tankstation).
`sharp` (dev-dep, maker-akkoord) comprimeerde alles naar `public/img/`
(hero 640→157KB, totaal eigen beelden ~675KB). exp-hoogspanning.jpg (33KB) staat
klaar in `public/img/` voor later gebruik (nog geen sectie).

## B2. Tweede sourcing-ronde (GEÏNTEGREERD 2026-09-17) — online i.p.v. oude beelden

Maker-instructie: overal passende online beelden; PMO-hero + busjes-foto + VCA-logo blijven.
Oude live-thumbs (exp-tankstations/ev/infrastructuur-oud), hero-1/2/3 en afgekeurde
kandidaten (Glenamoy, Abuja, Marathon-derelict) blijven in staging als archief.

| Bestand (`public/img/`) | Titel / auteur / licentie | Bron | Positie |
|---|---|---|---|
| `hero-expertises.jpg` (182KB) | “Pertamina filling station, Bali”, Yoshi Canopus, CC BY-SA | Wikimedia Commons | `/expertises` page-hero |
| `hero-service.jpg` (65KB) | “Welder”, Hortlander, CC BY | Flickr (Openverse) | `/service-onderhoud` page-hero |
| `hero-jobs.jpg` (57KB) | “Welder at work, 1958”, Seattle Municipal Archives, CC BY | Flickr (Openverse) | `/jobs` page-hero |
| `hero-contact.jpg` (192KB) | “Restored filling station, Skellytown TX”, Jeffrey Beall, CC BY | Wikimedia Commons | `/contact` page-hero |
| `exp-ev.jpg` (109KB, vervangt oude thumb) | “Grand Canyon EV charging stations”, Grand Canyon NPS, CC BY | Flickr (Openverse) | `/expertises#ev-laadinstallaties` |
| `exp-infrastructuur.jpg` (169KB, vervangt oude thumb) | “Road Work”, chumlee10, CC BY-SA | Flickr (Openverse) | `/expertises#infrastructuurwerken` |
| `exp-tankstations.jpg` (98KB, vervangt oude thumb) | PMO-tankstation (eigen Vandotec-foto, cover-crop van hero) | Eigen archief | `/expertises#tankstations` |

`/over-vandotec` page-hero blijft bewust vlak (busjes-foto + cert-strip + quote als ankers).
Uitklap-teaserkaarten (6× foto + “In het kort” + anchor) bovenaan `/expertises` als template.

## B. Eerste ronde (stock-gaten, GEÏNTEGREERD 2026-09-17)

Zoekmethode: Openverse (alleen commercieel herbruikbaar). Licenties: CC BY / BY-SA →
naamsvermelding in footer (`.credits`) + volledig register hier. Stock is tijdelijk en
1:1 vervangbaar door echte Vandotec-foto's (zelfde 4:3-ratio's).

| Bestand (`public/img/`) | Titel / auteur / licentie | Bron-URL | Positie |
|---|---|---|---|
| `stock-carwash.jpg` (87KB) | “Car Wash, Station Street”, Geograph, CC BY-SA 2.0 | `commons/f/f8/Car_Wash,_Station_Street_-_geograph.org.uk_-_1941497.jpg` | `/expertises#carwashes` |
| `stock-reiniging.jpg` (82KB) | “Aviation fuel storage tank and transportation truck”, Project Kei, CC BY-SA | `commons/d/de/Aviation_fuel_storage_tank_and_transportation_truck.jpg` | `/expertises#reinigingssystemen` |
| `stock-water.jpg` (137KB) | “R. C. Harris Water Treatment Plant interior 2025”, Canmenwalker, CC BY | `commons/d/d8/R._C._Harris_Water_Treatment_Plant_interior_2025.JPG` | `/expertises#waterprojecten` |
| `stock-contact.jpg` (67KB) | “Fuel dispenser in use”, Henrywingra, CC BY-SA | `commons/6/60/Fuel_dispenser_in_use.jpg` | `/contact` (vervangt `contact-site.svg`) |

Download-notitie: Wikimedia rate-limite (429) bij snelle bulk-downloads — opgelost met
eigen User-Agent + 6s pauzes. Flickr-kandidaat (`wuestenigel`, CC BY) 404 op `_b`-formaat
→ vervangen door Wikimedia-alternatief hierboven.

## B3. Home-beelden nieuw (GEÏNTEGREERD 2026-09-17) — geen hergebruik
| Bestand (`public/img/`) | Titel / auteur / licentie | Bron | Positie |
|---|---|---|---|
| `home-about.jpg` (86KB) | “USACE, Air Force work together…”, USACE Europe District, CC BY | Flickr (Openverse) | Home About-sectie |
| `home-tankstations.jpg` (21KB) | “Petrol Station Forecourt”, Rubber Dragon, CC BY-SA | Flickr (Openverse) | Home foto-strip |
| `home-ev.jpg` (34KB) | “Electric car charging station”, Håkan Dahlström, CC BY | Flickr (Openverse) | Home foto-strip |
| `home-carwash.jpg` (55KB) | “Automatic Car Wash”, Dick Thomas Johnson, CC BY | Flickr (Openverse) | Home foto-strip |
| `home-reiniging.jpg` (37KB) | “Pioneer Oil Refinery”, tkksummers, CC BY-SA | Flickr (Openverse) | Home foto-strip |
| `home-infra.jpg` (65KB) | “Digger - FGS Plant Hire”, Terinea IT Support, CC BY | Flickr (Openverse) | Home foto-strip |
| `home-water.jpg` (63KB, verwijderd 2026-09-19 met domein-schrap) | “Glen Canyon Bridge & Dam”, Thad Roan - Bridgepix, CC BY | Flickr (Openverse), archief staging |
| `home-tankstations/ev/infra.jpg` | Verwijderd uit `public/` 2026-09-19 (strip-sectie geschrapt als dubbel) | Originelen in staging |

## B5. Vandotec.be + Powerland.be als bron (GEÏNTEGREERD 2026-09-19)

Alleen merk-neutrale, inhoudelijk passende beelden overgenomen (eigen groep-materiaal).
Afgekeurd: cartoon-laadpaal (speels, off-brand), Powerland-teal laders met logo
(merkmenging), Daimler-persfoto (merk + licentie), solar/wind (geen Vandotec-domein),
drone-solar (idem), donkere lege garage (onaantrekkelijk).

| Bestand (`public/img/`) | Titel / bron | Positie |
|---|---|---|
| `exp-ev.jpg` (126KB) + `home-ev.jpg` (85KB) | EV-lader met blauwe SUV (powerland.be UserTemplate dsc3586) | `/expertises#ev-laadinstallaties` + home-strip |
| `ref-vanheede.jpg` (59KB) | Bovengrondse tankinstallatie (project-thumb Vanheede, vandotec.be) | Referentiekaart Vanheede |
| `ref-galloo.jpg` (34KB) | Tank + Vandotec-busje op recyclagesite (project-thumb Galloo) | Referentiekaart Galloo |
| `ref-maes.jpg` (47KB) | Tankstation Maes met groene luifel (project-thumb) | Referentiekaart Maes |
| `ref-tradit.jpg` (59KB) | Techniekers aan het werk (project-thumb Tradit) | Referentiekaart Tradit |
| `ref-cools.jpg` (77KB) | Vandotec-busje bij tankstation (project-thumb Cools Avia) | Referentiekaart Cools |
| `ref-iveco.jpg` (59KB) | Laadpalen bij showroom (project-thumb Iveco Maenhout) | Referentiekaart + home-rij |
| `ref-demarol.jpg` (52KB) | Avia-pompen (project-thumb Demarol Lessines) | Referentiekaart |
| `ref-decospan.jpg` (45KB) | Laadpalen bij dealer (project-thumb Decospan Menen) | Referentiekaart |
| `ref-mig.jpg` (37KB) | Servicebusje bij pomp (project-thumb MIG Lievegem) | Referentiekaart |
| `ref-cid.jpg` (22KB) | Shell-luifel (project-thumb Cid Lines Ieper) | Referentiekaart |
| `jobs-team.jpg` (49KB) | High-five in werkplaats (`werken-bij-vandotec.jpg`) | `/jobs` page-hero |
Afgekeurd deze ronde: `contact-header.jpg` (Esso + carwash in beeld — conflicteert met domein-schrap), `jobs-waarden/header.jpg` (niet nodig).

## B4. Service-beelden (GEÏNTEGREERD 2026-09-17)

| Bestand (`public/img/`) | Titel / auteur / licentie | Bron | Positie |
|---|---|---|---|
| `srv-interventie.jpg` (66KB) | “Roadside assistance”, SqueakyMarmot, CC BY-SA | Flickr (Openverse) | `/service-onderhoud` urgentie-band |
| `srv-onderhoud.jpg` (37KB) | “Repair Frigate”, gIadius, CC BY | Flickr (Openverse) | `#onderhoud` split |
| `srv-preventief.jpg` (73KB) | “Turkish Tecnician” (inspectie), NATO E3A Component, CC BY | Flickr (Openverse) | `#preventief` split |
| `srv-tankcleaning.jpg` (85KB) | “Inchindown - Storage tank interior”, intrepidexplorer82, CC BY | Flickr (Openverse) | `#tank-cleaning` 16:9 |

Afgekeurd onderweg: NC-materiaal (Iron Man, World Bank, WSDOT), verkeerd domein
(Rolleiflex-reparatie, textielmachine), dode Flickr-`_b`-varianten (wuestenigel-checklist, PEO-tank).

## B8. Officiele logo's (GEINTEGREERD 2026-09-19, mediakit-pakket van maker)

| Bestand (`public/`) | Bron | Gebruik |
|---|---|---|
| `logo.png` (102KB, 240px hoog, transparant) | `vandotec_highres.png` (2242px) | Header (kleurenlogo, vervangt oude logo.svg) |
| `favicon-v.png` (23KB, 180px) | `vandotec_BOL.png` (V-icoon) | Favicon + apple-touch-icon |
| `logo-white.svg` (oud) | Blijft tijdelijk: transparante header + footer hebben nog geen witte PNG-variant | Header-transparant + footer |

Open: witte logo-variant uit mediakit-pakket opvragen (nu oude kleuren in wit-logo).

## B7. vandotec.be-totaalscrape (GEINTEGREERD 2026-09-19)

Alle eigen beelden. Afgekeurd: tankreiniging/tanksanering (geschrapte dienst),
vacature-thumbs (misleidend zonder vacatures), ev-logos (merken derden),
Shell/G&V (merken derden), solar/wind/drone-solar (geen Vandotec-domein),
Glenamoy/Abuja/Marathon, contact-header met Esso+carwash (inhoudsconflict),
nachtwinkel/elektrakast/CAD (zwak), Maes-breed (duplicaat ref-maes),
over-ons-header (overbodig bij team-hero).

| Bestand (public/img/) | Bron | Positie |
|---|---|---|
| gal-tank-lng/pompen/texaco (29/43/54KB) | Tank-type-thumbs | Tankstations-galerij (3) |
| bedrijf-1..4 (46-67KB) | overons1/3/5/7 (Esso+busje, tankput, kraanlift, VW+busje) | Over Bedrijf-in-beeld-strook (4) |
| belac-logo.jpg (14KB) | MediaLibrary (BELAC-accreditatie) | VCA-blok, naast VCA-logo |

## B9. Eigen werfbeelden maker (GEINTEGREERD 2026-09-29, map Beelden/)

Alle eigen werkfoto's van de maker (rechtenvrij eigen archief). Stock vervangen 1:1 —
overschreven bestanden behouden hun naam zodat geen markup wijzigt. Alleen `exp-ev.jpg`
(Grand Canyon NPS, CC BY) is nog stock, tot de Powerland-laderfoto er is.

| Bestand (`public/img/`) | Bron (Beelden/) | Vervangt (stock) | Positie |
|---|---|---|---|
| `hero-expertises.jpg` | `Pessleux Fosses-la-Ville 2.jpg` (nacht) | Pertamina, Yoshi Canopus | `/expertises` hero |
| `hero-contact.jpg` | `Pesleux Lèsve 1.jpg` | Skellytown, Beall | `/contact` hero |
| `hero-service.jpg` | `Pessleux Fosses-la-Ville 4.jpg` (opbouw) | Welder, Hortlander | `/service-onderhoud` hero |
| `exp-tankstations.jpg` | `Pesleux Lèsve.jpg` (bus + luifel) | eigen PMO-crop (zwakker) | expertise-sectie + vtab + subject-card |
| `exp-infrastructuur.jpg` | `Esso Deurle 1.JPG` (grondwerk) | Road Work, chumlee10 | expertise-sectie + vtab |
| `home-about.jpg` | `Spilmont Hautrage 3.jpg` | USACE | home over-blok |
| `srv-interventie.jpg` | `Esso Deurle 2.JPG` (Esso + bus) | SqueakyMarmot | service + contact-card |
| `srv-onderhoud.jpg` | `Spilmont Hautrage 4.jpg` (werf) | gIadius | service |
| `srv-preventief.jpg` | `Maes De Panne 2.jpg` (leidingwerk) | NATO E3A | service + contact-card |
| `stock-contact.jpg` | `Pessleux Fosses-la-Ville 1.jpg` | Fuel dispenser, Henrywingra | contact-kaart |
| `ref-vanassche.jpg` (nieuw) | `Van Assche Zulte 1.jpg` (Texaco) | — | referentie Van Assche, Zulte |
| `ref-maes-panne.jpg` (nieuw) | `Maes De Panne 4.jpg` (sneeuw) | — | referentie Maes, De Panne |
| `ref-spilmont.jpg` (nieuw) | `Spilmont Hautrage 1.jpg` (kraan) | — | referentie Spilmont, Hautrage |
| `ref-pessleux.jpg` (nieuw) | `download.png` (groene luifel) | — | referentie Pessleux, Lèsve |
| `ref-soenen.jpg` (VERWIJDERD 2026-09-30) | `Soenen Golfkarton Hooglede.jpg` bleek groene-luifel-duplicaat, geen kraanbeeld — kaart geschrapt, `mom-werf.jpg` opnieuw uit `Spilmont Hautrage 1.jpg` | — | — |

Niet ingezet (reserve): `Maes De Panne 1/3.jpg`, `Pessleux Fosses-la-Ville 3.jpg`,
`Van Assche Zulte 2/3.jpg`, `download.jpg` — beschikbaar voor modals/galerijen in een volgende pass.

## C. Niet overnemen

- `logo.svg` / `logo-white.svg` (al lokaal, ongewijzigd), `quote.svg` (decoratief, vervangen door CSS).
- Fork-CMS-cache-URL's zijn geen permanente bron — na download gelden de lokale bestanden als bron.
