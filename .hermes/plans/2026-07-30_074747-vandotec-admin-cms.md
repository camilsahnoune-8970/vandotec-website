# Vandotec WordPress/Webflow-achtige admin CMS implementation plan

> For Hermes: use plan mode only. No code edits, no mutating commands in this turn. Deliverable is this plan file.

**Goal:** Maak een moderne admin CMS in de bestaande Astro-site voor Vandotec, waardoor een niet-technische gebruiker pagina's kan bewerken met een split-screen editor + preview, in plaats van via de oude Decap interface.

**Architecture:**
- Nieuwe admin routes binnen Astro: `/admin/login`, `/admin`, `/admin/edit/{slug}`
- Hergebruik bestaande `src/data/*.json` als enige contentmodel
- Bewerkingsinterface toont JSON-editor links en live preview rechts
- Opslaan via een server-side Astro API route (`POST /api/save-page`) die rechtstreeks de JSON-bestanden en git push afhandelt
- Geen nieuwe hosting of CMS-tools; breaking changes beperken tot de admin interface zelf

**Tech Stack:** Astro 7, bestaande sitebestanden, `simple-git` voor git-operaties, vanilla JS in de editor, admin styles los van public styles

## Assumptions
- `/admin` is bereikbaar als admin entry point
- `simple-git` is beschikbaar in package.json
- De gebruiker werkt in de lokale site map `/Users/camil/Downloads/website group vandotec`
- Wachtwoord is tijdelijk hardcoded als `vandotec2026`; wachtwoordwijziging komt later

## Step-by-step plan

### Task 1: Add admin structure and helpers
Objective: Maak admin ondersteunende code voor routing en page listing.

Files:
- Create src/lib/admin-pages.ts
- Create src/lib/admin-auth.ts

Step 1: Create src/lib/admin-pages.ts with page listing and read helpers
Step 2: Create src/lib/admin-auth.ts with cookie-based auth helper
Verification: read both files and confirm exports exist

### Task 2: Add admin layout and styles
Objective: Bouw een WordPress/Webflow-achtige dark admin shell en styles.

Files:
- Create src/components/admin/AdminLayout.astro
- Create src/styles/admin.css

Step 1: Write AdminLayout.astro with sidebar nav for all pages and logout form
Step 2: Write admin.css with dark theme, sidebar, cards, grid, and preview iframe styles
Verification: open `/admin` after build and confirm layout renders

### Task 3: Add login page
Objective: Laat een admin inloggen met een tijdelijk wachtwoord.

Files:
- Create src/pages/admin/login.astro
- Modify src/pages/admin/index.astro to support login/logout POST

Step 1: Write login.astro with password form
Step 2: Add POST login/logout handling in admin index route with cookie session
Verification: visit `/admin/login`, submit password, confirm redirect to `/admin`

### Task 4: Add admin dashboard
Objective: Toon een overzichtspagina met alle pagina's en een link om ze te bewerken.

Files:
- Modify src/pages/admin/index.astro

Step 1: Replace hollow layout wrapper with dashboard content using getPageFiles
Step 2: Add table/list of pages with edit links
Verification: `/admin` toont pagina's in een tabel met bewerkacties

### Task 5: Add editor page with live preview
Objective: Bouw de split-screen editor met JSON editor en iframe preview.

Files:
- Create src/pages/admin/edit/[slug].astro

Step 1: Add GET guard with isAuthenticated redirect
Step 2: Load JSON via readPageFile and show in textarea
Step 3: Add iframe preview pointing to `/{slug}` with sandbox
Step 4: Add client JS: POST to `/api/save-page` and show save feedback
Verification: open `/admin/edit/home`, edit JSON, confirm preview updates on reload

### Task 6: Add save API with git push
Objective: Sla JSON op in `src/data` en push naar origin/main.

Files:
- Create src/pages/api/save-page.ts

Step 1: Parse slug and content from form data
Step 2: Validate allowed slugs and JSON parse
Step 3: Write JSON file with 2-space indent + newline
Step 4: Use simple-git to add, commit `chore: update {slug} via admin`, and push origin main
Step 5: Return JSON success or error response
Verification: save from editor, inspect git log and remote branch for new commit

### Task 7: Remove Decap admin ownership conflicts
Objective: Verwijder statische bestanden die Astro's `/admin` route blokkeren.

Files:
- Remove public/admin/index.html

Step 1: Backup or remove `public/admin/index.html`
Verification: verify no public/admin page blocks generated `/admin`

### Task 8: Cleanup, build, and verify issues are resolved
Objective: Controleer dat de admin routes werken en admin bugs/EPERM gerelateerde storingen niet uit de app zelf voortkomen.

Steps:
- Run `npm run build` and confirm 14 pages including admin routes
- Run `git status --short` and review unexpected files
- Remove temporary/backup files if no longer needed
- Optional local preview: `npm run preview` and open `/admin`
- Optional push: `git add/commit` only admin-related files, then push

## Files likely to change
- src/lib/admin-pages.ts
- src/lib/admin-auth.ts
- src/components/admin/AdminLayout.astro
- src/styles/admin.css
- src/pages/admin/index.astro
- src/pages/admin/login.astro
- src/pages/admin/edit/[slug].astro
- src/pages/api/save-page.ts
- public/admin/index.html

## Validation
- `npm run build` succeeds and build log contains `/admin`, `/admin/login`, `/admin/edit/*`, `/api/save-page`
- `/admin` responds with dashboard instead of Decap page
- Saving from editor writes `src/data/{slug}.json` and pushes commit to origin/main

## Risks and tradeoffs
- Hardcoded admin password is temporary; replace with env/config before production use
- Auto git push from admin can fail on auth or network; currently unhandled failure messages only
- iframe preview can lag until reload; no hot reload implemented
- EPERM wrangler/.Trash error is external to this repo and unrelated to admin CMS; ignore unless local dev requires Wrangler

## Open questions
- Should the JSON editor be replaced later with a form-based or block-based editor?
- Should media/asset uploads be added now or later?
- Does the site have multiple GitHub environments/branches beyond main?
