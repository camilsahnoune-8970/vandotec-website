# Vandotec admin route-conflict en admin-ervaring

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Verplaats de eigen admin UI van `/admin` naar `/beheer` om Decap CMS op `/admin` te weren, en maak de nieuwe beheeromgeving daarna bruikbaarer op basis van jouw feedback.

**Architecture:**
- Behoud Decap CMS op `/admin` met bestaande `public/admin/config.yml`
- Zet eigen dark admin dashboard op `/beheer`, `/beheer/login`, `/beheer/bewerk/{slug}`
- Hergebruik bestaande JSON-content en opslag via `/api/save-page`
- Geen nieuwe tools of migraties

**Tech Stack:** Astro 7-static, `simple-git`, vanilla JS, cookieauth

---

## Context

Huidige staat:
- `/admin`, `/admin/login`, `/admin/edit/*` en `/api/save-page` bestaan al
- `public/admin/config.yml` blijft bestaan voor Decap
- Live `/admin` blijkt Decap te laten prevaleren boven de eigen Astro routes
- Dashboard en editor zijn functionaliteit, maar route moet veranderen
- Editor-escape en dashboard data moeten verbeterd worden

---

## Task 1: Verplaats admin routes van /admin naar /beheer

### Task 1.1: Verplaats loginroute

**Objective:** Verhuis login van `/admin/login` naar `/beheer/login` zonder logout-logica te breken.

**Files:**
- Modify: `src/pages/admin/login.astro`
- Modify: `src/pages/admin/index.astro`

**Step 1:** Verander alle interne links/forms/redirects van `/admin` naar `/beheer` in login en dashboard.
**Step 2:** Verander redirects bij auth-fail naar `/beheer/login`.
**Step 3:** Build en verifieer dat `/beheer/login` gegenereerd wordt en redirects werken.

Run: `npm run build`
Expected: `beheer/login/index.html` in build output en geen verwijzingen meer naar `/admin/login` in de admin pages.

### Task 1.2: Verplaats dashboard en editorroutes

**Objective:** Zet `/admin`, `/admin/edit/*` om naar `/beheer`, `/beheer/bewerk/*`.

**Files:**
- Modify: `src/pages/admin/index.astro`
- Modify: `src/pages/admin/edit/[slug].astro`
- Modify: `src/components/admin/AdminLayout.astro`

**Step 1:** Pas alle admin-links, prefixed routes en form actions aan naar `/beheer` en `/beheer/bewerk`.
**Step 2:** Houd Decap CMS onaangeroerd; dit is alleen de eigen admin verplaatsen.
**Step 3:** Build and verifieer dat volgende routes bestaan: `/beheer`, `/beheer/login`, `/beheer/bewerk/*`.

Run: `npm run build`
Expected: routes `/beheer`, `/beheer/login`, `/beheer/bewerk/*` en nog steeds `/api/save-page`.

### Task 1.3: Verifieer routeconflicten zijn verdwenen

**Objective:** Controleer dat `/admin` niet meer door deze eigen admin wordt gebruikt.

**Files:**
- Inspect only: `dist/admin/*`, `dist/beheer/*`

Run: `find dist/admin -maxdepth 2 -type f -name 'index.html' -print | sort` en `find dist/beheer -maxdepth 3 -type f -name 'index.html' -print | sort`
Expected: `dist/admin` bevat alleen Decap-bestanden of niets; eigen admin staat alleen in `dist/beheer`.

---

## Task 2: Verbeter de beheeromgeving op basis van je feedback

### Task 2.1: Maak het dashboard minder leeg

**Objective:** Zorg dat het dashboard direct bruikbare informatie toont.

**Files:**
- Modify: `src/pages/admin/index.astro`
- Modify: `src/lib/admin-pages.ts` indien nodig

**Step 1:** Voeg een nuttige headertekst en actieknoppen toe per pagina.
**Step 2:** Verwijder de lege tabelrijen of vervang door duidelijke instructies als geen content aanwezig is.
**Step 3:** Build and open `/beheer` om te controleren dat het inhoudelijk gevuld is.

Verification: openbare tekst in dashboard is verwacht en niets is leeg.

### Task 2.2: Verbeter editorervaring en validatie

**Objective:** Verbeter de split-screen editor zodat deze veiliger en bruikbaarder is.

**Files:**
- Modify: `src/pages/admin/edit/[slug].astro`
- Modify: `src/pages/api/save-page.ts`

**Step 1:** Voeg een eenvoudige JSON-valideerfoutmelding toe bij ongeldige JSON in de editor.
**Step 2:** Voeg een duidelijke save-status toe, ook bij gefaalde save.
**Step 3:** Build and test een kapotte JSON; verwachting: duidelijke foutmelding, geen crash.
**Step 4:** Test een geldige save; verwachting: opslaan en git-log bericht zichtbaar.

### Task 2.3: Houd admin toegankelijk maar niet overdreven bloot

**Objective:** Houd de beveiliging eenvoudig, maar niet onzichtbaar.

**Files:**
- Modify: `src/lib/admin-auth.ts`
- Modify: `src/pages/admin/login.astro`

**Step 1:** Behoud cookieauth met `httpOnly`, `sameSite: 'lax'`, en `secure` op basis van protocol.
**Step 2:** Behoud tijdelijk hardcoded wachtwoord; vermijd extra loginflows.
**Step 3:** Voeg een eenvoudige uitlogbevestiging of directe logout toe.

Verification: logout werkt en bringt je terug naar `/beheer/login`.

---

## Validation

- `npm run build` genereert `/beheer`, `/beheer/login`, `/beheer/bewerk/*` en `/api/save-page`.
- `/admin` is niet langer onderdeel van de eigen admin; Decap blijft ongeroerd.
- Opslaan via de editor schrijft `src/data/{slug}.json` en pushed naar `origin/main`.
- Dashboard en editor geven direct zichtbare verbetering ten opzichte van de vorige staat.

## Risks and tradeoffs

- `/beheer` is minder voor de hand liggend dan `/admin`, dus makkelijker te verbergen.
- Hardcoded wachtwoord is tijdelijk; wachtwoordwijziging blijft voor later zoals afgesproken.
- iframe-preview heeft geen hot reload; reload blijft nodig na save.
