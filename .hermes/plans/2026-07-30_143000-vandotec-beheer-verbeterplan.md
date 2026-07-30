# Vandotec /beheer CMS: concrete verbeterplan

> **For Hermes:** Execute this plan task-by-task with verification after each step. No large dependency switches.

**Goal:** Maak de eigen Astro-admin op `/beheer` een bruikbaarere WordPress/Webflow-achtige basis: duidelijk dashboard, stabiele editor, betrouwbare opslag via `simple-git`.

**Architecture:**
- Bestaande `/beheer` routes behouden en versterken
- Geen nieuwe frameworks of externe builders
- Opslag blijft via `/api/save-page` naar `origin/main`
- Wijzigingen beperken tot: `src/pages/beheer/**`, `src/components/admin/**`, `src/lib/admin-*`, `src/pages/api/save-page.ts`, `src/styles/admin.css`

**Tech Stack:** Astro 7-static, vanilla JS, `simple-git`, bestaande JSON-bestanden

---

## Current state

- `/beheer`, `/beheer/login`, `/beheer/bewerk/*` bestaan en builden
- Dashboard en editor zijn functioneel maar visueel/inhoudelijk nog te eenvoudig
- `/api/save-page` heeft alleen POST; build geeft een WAARSCHUWING voor GET
- Opslag werkt via `simple-git` naar `origin/main`

---

## Task 1: Verfraai admin-shell met vaste elementen

### Task 1.1: Voeg constante admin-kop en -status toe

**Objective:** Zorg dat elke pagina een stabiele, professionele adminkop heeft.

**Files:**
- Modify: `src/components/admin/AdminLayout.astro`

**Step 1:** Voeg een consistente topbalk toe met: brand, pagina-titel, logout knop, en een kleine statuslijn voor connection/build/gebruikersrichting.
**Step 2:** Verifieer dat `/beheer`, `/beheer/login` en `/beheer/bewerk/*` allemaal dezelfde basischrome behouden.

Verification:
- Build met `npm run build`
- Open `https://vandotec.netlify.app/beheer` en `https://vandotec.netlify.app/beheer/bewerk/home`
- Verwacht: consistente navigatie/layout zonder gedupliceerde `<html>` of ontbrekende styles

---

## Task 2: Dashboard versterken

### Task 2.1: Maak pagina-overzicht direct bruikbaar

**Objective:** Dashboard moet direct inzicht geven in wat bewerkt kan worden en wat de laatste staat is.

**Files:**
- Modify: `src/pages/beheer/index.astro`
- Modify: `src/lib/admin-pages.ts` voor lineaire `lastModified`

**Step 1:** Vervang de tabel door een gestructureerd overzicht met per pagina: label, slug, bestand, actieknop, en een duidelijke lege-staatindicator als er geen laatstewijziging beschikbaar is.
**Step 2:** Voeg een duidelijke header en subtitel toe zodat de pagina niet leeg oogt.
**Step 3:** Voeg een directe handeling toe per rij: naast Bewerk ook “Bekijk site” direct zichtbaar.
**Step 4:** Build en verifieer op `/beheer`.

Verification:
- Dashboard moet inhoudelijk gevuld zijn en geen lege regels tonen
- Actieknoppen leiden naar `/beheer/bewerk/{slug}`

---

## Task 3: Editor verbeteren

### Task 3.1: Splitscherm-editor met duidelijke werkzone

**Objective:** Verbeter de split-screen editor zodat hij overzichtelijker en veiliger is.

**Files:**
- Modify: `src/pages/beheer/bewerk/[slug].astro`
- Modify: `src/styles/admin.css`

**Step 1:** Voeg vaste gebiedsnamen toe: editor, preview, acties.
**Step 2:** Verbeter de textarea met visuele hulp: JSON syntax-invalideren bij input opslaan naar UI-status, geen `alert()`.
**Step 3:** Voeg duidelijke knoppen toe: Opslaan, Terug naar dashboard, Bekijk site.
**Step 4:** Voorkom dat de gebruiker ongeldige JSON kan opslaan: button disabled bij ongeldige JSON.
**Step 5:** Build en verifieer op `/beheer/bewerk/contact`.

Verification:
- Ongeldige JSON toont direct een foutmelding en blokkeert opslaan
- Geldige save toont status `Opgeslagen` en reset na 3 seconden
- Preview iframe is zichtbaar en opnieuw te laden na save

### Task 3.2: Stabiliseer preview

**Objective:** Preview is stabiel en niet afhankelijk van onduidelijke reloads.

**Step 1:** Voeg een handmatige reloadknop toe naast de iframe.
**Step 2:** Voeg een minimale instructietekst toe als de preview leeg blijft.

Verification:
- Reload van preview werkt zonder gehele pagina te刷新n
- Er is een duidelijk bericht bij lege/foute preview

---

## Task 4: Opslag verifiëren en opschonen

### Task 4.1: `/api/save-page` bevat een valide POST path

**Objective:** Opslag via `/api/save-page` werkt en heeft consistente output.

**Files:**
- Modify: `src/pages/api/save-page.ts`

**Step 1:** Voeg een eenvoudige POST-response toe met duidelijke JSON: `{ ok: true }` of `{ ok: false, error: "..." }`
**Step 2:** Voeg een minimale logging toe voor commits zodat je in de editor kunt zien wat er gebeurde.
**Step 3:** Build en verifieer dat de route nog steeds bestaat en geen extra build-waarschuwingen veroorzaakt.

Verification:
- `npm run build` geeft geen nieuwe warnings voor `/api/save-page`
- Opslaan vanuit editor resulteert in commit/push naar `origin/main`

---

## Task 4.5: Client-side admin-gate voor `/beheer`

**Decision:** Optie 3 — blijf binnen duurzaamheid, geen nieuwe auth-providers of hostingstack.
Deze keuze voorkomt een productie-auth mismatch in Astro static export en houdt het project onderhoudsvriendelijk.

**Objective:** Voorkom dat `/beheer`, `/beheer/bewerk/*` en `/api/save-page` zonder login bereikbaar zijn in productie, zonder nieuwe dependencies.

**Files:**
- Modify: `src/pages/beheer/index.astro`
- Modify: `src/pages/beheer/login.astro`
- Modify: `src/pages/beheer/bewerk/[slug].astro`
- Modify: `src/pages/api/save-page.ts`
- Modify: `src/lib/admin-auth.ts`

**Step 1:** Verwijder statische暗中 guards die alleen in dev werken en vervang ze door een consistente client-side/admin-gate op basis van een admin-cookie/token, zonder externe auth-provider.
**Step 2:** Hou de login bij `/beheer/login` als startpagina; alle adminpagina's checken eerst de gate en sturen door naar login indien nodig.
**Step 3:** `/api/save-page` accepteert alleen requests met geldige admin-sessie; zonder sessie wordt een 401 geretourneerd.
**Step 4:** Build, push en verifieer op `/beheer` dat niet-geauthenticeerde toegang niet meer mogelijk is.

Verification:
- Bezoek `/beheer` zonder cookie → redirect naar `/beheer/login`
- Login met het ingestelde wachtwoord → toegang tot dashboard en editor
- Opslaan zonder sessie → API geeft fout
- Opslaan met sessie → API slaat en pushed naar `origin/main`

---

## Task 5: Algemene verfijningsronde

### Task 5.1: Admin-stijlen opqmaken

**Objective:** Kleine layout-, spacing- en typeverbeteringen zonder redesign.

**Files:**
- Modify: `src/styles/admin.css`

**Step 1:** Zorg voor consistente card-layout, duidelijkere knoppen en minder lege ruimte.
**Step 2:** Verifieer op alle `/beheer` pagina's dat CSS correct laadt en vormen niet breken.

Verification:
- Visuele inspectie op `/beheer`, `/beheer/login`, `/beheer/bewerk/*`
- Geen gebroken stylestructuren

---

## Execution order

1. Task 1
2. Task 2
3. Task 3.1
4. Task 3.2
5. Task 4
6. Task 5.1
7. Final build + push

## Success criteria

- `/beheer` voelt als een bruikbaar beheerdashboard: overzicht, acties, eenvoudige navigatie
- `/beheer/bewerk/*` heeft een overzichtelijke split-view met editor, preview, duidelijke save-status en validatie
- Opslaan via editor werkt en pusht naar GitHub
- Geen nieuwe dependencies of architectuurwijzigingen
- `npm run build` is stabiel en push succeeded
