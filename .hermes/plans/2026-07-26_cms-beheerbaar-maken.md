# Vandotec CMS — plan naar een beheerbare omgeving

DOEL
- Van een technisch werkende CMS naar een echt bruikbare beheeromgeving voor een niet-technische admin.
- Geen hardcoded content meer in `src/pages/*.astro` die alleen door codebewerking kan veranderen.
- Wel duidelijk en gestaag, zodat we geen grote sprongen maken en niets breken.

BEHOUDEN
- `pages` blijft de file-based collection voor vaste pagina's: home, contact, expertises, jobs, over-vandotec en service-onderhoud.

## 1. Huidige situatie

- Frontend bestaat uit 6 Astro-pagina's in `src/pages/*.astro`.
- Elke pagina gebruikt een JSON-bestand uit `src/data/*.json` via `src/lib/loadPageData.ts`.
- De site is live op `https://vandotec.netlify.app` en de CMS flow is geverifieerd: CMS → JSON → build → site.
- De CMS backend is Decap CMS via Netlify git-gateway in combinatie met Netlify Identity.

Wat er nu per pagina in JSON staat:
- `home.json`: `title`, `description`, `hero_title`, `hero_subtitle`
- `contact.json`: `title`, `description`
- `expertises.json`: `title`, `description`
- `jobs.json`: `title`, `description`
- `over-vandotec.json`: `title`, `description`
- `service-onderhoud.json`: `title`, `description`

Wat er daarnaast nog hardcoded staat:
- `index.astro`: meeste homepage-secties, expertiseskaarten, servicesecties, projectaanpak en statistieken
- `contact.astro`: contactgegevens, adres, telefoon, e-mail, interventietekst en contactformulier
- `expertises.astro`: 6 domeinsecties met iconen, koppen, beschrijvingen en aanpaktekst
- `jobs.astro`: introductie, voordelen, vacaturetekst en call-to-actions
- `over-vandotec.json`: verhaal, kerncijfers, waarden, projectaanpak
- `service-onderhoud.astro`: 4 servicesecties met iconen, teksten en lijsten

## 2. Problemen en gaten

- De meeste zichtbare content is nog niet CMS-gestuurd.
- Een admin kan momenteel alleen pagina-title en meta-description aanpassen.
- Lijstachtige inhoud zoals expertises en services is niet herhaalbaar of uitbreidbaar in het CMS.
- Er is geen gestructureerd model voor jobs of vacatures.
- Er zijn geen velden voor SEO, afbeeldingen/media of duidelijke calls-to-action per pagina.
- Hardcoded tekst moet voor elke aanpassing door een technicus worden aangepast.

## 3. Doelarchitectuur

- Behoud `pages` als file-based collection voor vaste pagina's.
- Breid per pagina het JSON-model uit zodat alle huidige zichtbare content uit data komt.
- Modelleer herhaalbare inhoud als lijsten of gestructureerde blokken.
- Houd de nav/configuratie zo veel mogelijk stabiel tijdens de uitvoering.
- Voeg pas later SEO- en mediavelden toe in een aparte polishfase.

Doel per pagina:
- `home.json`: volledige homepage-hero, intro, kennissecties, CTA's en relevante blokken
- `contact.json`: contactgegevens, adres, telefoon, e-mail, interventie en formuliercontext
- `over-vandotec.json`: intro, kerncijfers, waarden, projectaanpak en statistieken
- `expertises.json`: lijst van 6 domeinen met eigen titel, icon, beschrijving en aanpak
- `service-onderhoud.json`: lijst van 4 services met eigen titel, afbeelding, intro en details
- `jobs.json`: pagina-intro en algemene jobscontext in fase 1

## 4. Gefaseerde uitvoeringsvolgorde

FASE 1: volledige page-based content
- home, contact, over-vandotec, expertises, service-onderhoud, jobs uitbreiden naar volledige page models.
- Doel: elke huidige zichtbare tekst uit JSON halen en in Astro uit die JSON renderen.

FASE 2: lijst- en blokstructuur binnen page collections
- expertises en service-onderhoud omzetten naar lijsten van objecten.
- home en over-vandotec uitbreiden met duidelijke blokvelden.
- Doel: herhaalbare inhoud administratief beheerbaar maken binnen bestaande bestanden.

FASE 3: jobs naar folder collection
- jobs omzetten naar een folder collection met 1 vacature per bestand.
- Doel: een admin kan een vacature toevoegen of verwijderen zonder grote JSON-lijst te bewerken.

FASE 4: SEO, media en editor polish
- Toevoegen van SEO- en afbeeldingsvelden.
- Admin-ervaring, preview en validatie verbeteren.

## 5. Risico's en aandachtpunten

- Contentverlies vermijden: alle huidige tekst en blokken eerst vastleggen in het nieuwe model voordat code aangepast wordt.
- Backwards compatibility: houd live paginastructuren en routes aan tijdens elke fase.
- Preview-functionaliteit werkt momenteel niet volledig; dit los eerst op voordat grote contentherstructurering wordt doorgevoerd.
- Folder collection voor jobs moet juist worden geconfigureerd, zodat Netlify builds niet breken op `_redirects`,路由 of `_headers`.
- Zorg dat `loadPageData.ts` en paginatemplates mee evolueren met bredere JSON-structuren.
- Voorkom grote commits met betrekking tot code en content tegelijk; splits liever per fase.

## 6. Concrete implementatiestappen per fase

### FASE 1 — volledige page-based content

Doel
- Alle huidige hardcoded pagina-inhoud verplaatsen naar JSON.
- Geen lijst- of folder-collectie veranderingen in deze fase.

Stappen
1. Definieer per pagina een doel-JSON-schema met alle velden die nodig zijn om de pagina volledig te vullen vanuit data.
2. Breng voor elke pagina een voorlopig datamodel op:
   - `home.json`: `title`, `description`, `hero_title`, `hero_subtitle`, `intro`, `about`, `highlights`, `stats`, `ctas`
   - `contact.json`: `title`, `description`, `address`, `phone`, `email`, `intervention`, `form_intro`
   - `over-vandotec.json`: `title`, `description`, `intro`, `stats`, `values`, `process`, `ctas`
   - `expertises.json`: `title`, `description`, `intro`, `items`
   - `service-onderhoud.json`: `title`, `description`, `intro`, `items`
   - `jobs.json`: `title`, `description`, `intro`, `ctas`
3. Vul elk JSON-bestand met de bestaande hardcoded tekst, zodat de inhoud volledig bewaard blijft.
4. Pas per pagina de Astro-template aan om alle inhoud uit de bijbehorende JSON te renderen.
5. Verifieer per pagina:
   - `npm run build`
   - lokaal of live diff van tekst en opmaak
6. Verifieer de volledige CMS flow: aanpassen in Config course → opslaan in JSON → build → live.

Resultaat fase 1
- Geen hardcoded content meer in pagina's.
- Admin kan alle pagina-inhoud aanpassen via het CMS.

### FASE 2 — lijst- en blokstructuur binnen pages

Doel
- Herhaalbare inhoud beter modelleren binnen bestaande bestanden.

Stappen
1. `expertises.json`
   - `items` wordt een lijst van objecten met:
     - `slug`
     - `title`
     - `icon`
     - `summary`
     - `body`
     - `approach`
2. `service-onderhoud.json`
   - `items` wordt een lijst van objecten met:
     - `slug`
     - `title`
     - `image`
     - `intro`
     - `details`
     - `highlights`
3. `home.json`
   - splits hero, intro, secties en CTA's in duidelijke blokken of lijsten waar herhaling nodig is.
4. `over-vandotec.json`
   - modelleer values en process als gestructureerde lijsten of blokken.
5. Pas Astro-templates aan zodat lijsten uniform worden gerenderd.
6. Verifieer opnieuw per pagina opbouw, build en live content.

Resultaat fase 2
- Expertises en services zijn volledig herhaalsbaar en uitbreidbaar binnen bestaande page-based collections.
- Admin kan per domein of service een eigen blok beheren zonder code aan te raken.

### FASE 3 — jobs als folder collection

Doel
- Vacatures loslaten van één pagina-bestand en beheerbaar maken als losse items.

Stappen
1. Keuze voor folder collection bevestigen: `src/data/jobs/` met per vacature een eigen bestand.
2. Definieer een vacaturemodel met minimaal:
   - `slug`
   - `title`
   - `location`
   - `type`
   - `description`
   - `requirements`
   - `cta_label`
   - `cta_url`
3. Migreer de huidige jobs-pagina-inhoud naar:
   - `src/data/jobs/index.json`: paginaintro, algemene CTA's en context
   - één of meer voorbeeldvacaturebestanden in dezelfde map
4. Configureer Decap CMS zodanig dat de folder collection correct wordt herkend.
5. Pas de jobs-pagina aan zodat de lijst van vacatures uit de folder collection wordt opgehaald en getoond.
6. Verifieer:
   - toevoegen, bewerken en verwijderen van een vacaturebestand via het CMS
   - build en live weergave van de jobs-pagina
7. Verifieer dat overige pagina's en routes niet breken.

Resultaat fase 3
- Vacatures zijn los bewerkbaar.
- Admin kan een vacature snel toevoegen door een nieuw bestand aan te maken of op te nemen in de folder collection.

### FASE 4 — SEO, media en editor polish

Doel
- Site scherpstellen op vindbaarheid, media en gebruiksvriendelijkheid.

Stappen
1. Voeg per page-based JSON toe:
   - `seo_title`
   - `seo_description`
   - `og_title`
   - `og_description`
   - `og_image`
   - `noindex`
2. Voeg per lijstitem of blok waar nuttig toe:
   - `image`
   - `alt`
   - `caption`
3. Zorg dat Astro-templates deze velden gebruiken in `<title>`, `<meta>` en `<meta property="og:*">`.
4. Combineer deze fase met cleanup en consistentiecontrole:
   - uniforme knoppen/labels
   - duidelijke slug- en padstructuur
   - consistente naamgeving in Decap CMS
5. Verifieer per pagina SEO-velden in de HTML-head en preview uitlijning.

Resultaat fase 4
- Elke pagina heeft schone en uitbreidbare SEO.
- Media zijn beheersbaar vanuit het CMS.
- Admin heeft een duidelijkere en consistentere werkomgeving.

## Aanvullende aandachtspunten

- Voorkom in elke fase dat code en content in één grote stap worden vervangen; splits liever per collectie of per pagina.
- Zorg dat elke fase eindigt met een werkelijke build en een inhoudelijke controle op de live site of een statische preview.
- Houd dit planbestand bij met beslissingen en voorkeuren, zodat latere sessies direct op dezelfde architectuur kunnen voortbouwen.
