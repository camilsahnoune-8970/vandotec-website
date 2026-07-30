# Vandotec /beheer CMS — Code- en Architectuurreview

Reviewdatum: 2026-07-30  
Focus: routing/auth flows, imports, build, editor-validatie, `/api/save-page`, styling  
Scope: `src/pages/beheer/index.astro`, `login.astro`, `bewerk/[slug].astro`, `AdminLayout.astro`, `admin-auth.ts`, `admin-pages.ts`, `save-page.ts`, `admin.css`

---

## Samenvatting

Het CMS werkt qua feature-set, maar heeft problemen op meerdere niveaus:
- **auth/routing is grotendeels decoratief in productie** vanwege `output: 'static'`
- **editor heeft een HTML-escape bug** die elke opslag verpest
- **`/api/save-page` draait NIET in de huidige build** vanwege ontbrekende Vercel-functieconfig
- **logout UI is een dangling form** zonder backend handler
- **hardcoded credentials + triviale session** maken het CMS geen beveiliging
- styling is gedeeld tussen admin en public via `/style.css`, waardoor klassen zoals `.nav-item` niet bestaan

---

## 0. Blokkade: explainer voor auth + `/api/save-page` in productie

 Bij `output: 'static'` in `astro.config.mjs` worden **alle** HTML-pagina's vooraf gebouwd. Daardoor:
1. `export async function GET(cookies, redirect)` op `/beheer`, `/beheer/bewerk/[slug]` en `/beheer/login` **worden nooit uitgevoerd in productie** — er is statische HTML zonder redirect-logica.
2. Het cookie-ingenieuringsmechanisme in `admin-auth.ts` werkt alleen in `astro dev` / preview, niet op Vercel Static Export.
3. `/api/save-page` is alleen een werkend echte API als Vercel hem als Serverless Function deployeeert; de huidige `vercel.json` heeft dat niet.

> Dit betekent: een gebruiker kan direct `/beheer` benaderen zonder authenticatie en opslaan zonder login. Dit is een **blokkerend productieprobleem**.

---

## 1. Blockers

### 1.1 Editor HTML-escape bug — elke opslag slaat verkeerde data op

**Bestand:** `src/pages/beheer/bewerk/[slug].astro`, regel 51

**Probleem:**
```astro
{raw.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
```

De editor double-escaped HTML-entities die al in de JSON staan. Voorbeeld in de editor:
```
...&amp;euml;...
```
Na replace wordt:
```
&amp;amp;euml;
```
→ opgeslagen → nieuw laden → nogmaals ge-escaped → oneindige corruptie.

**Bewijs:** `dist/beheer/bewerk/home/index.html` toont `&amp;amp;euml;` in de textarea.

Daarnaast zijn `<` en `>` een subset van wat `JSON.stringify` al produceert; de HTML-escape van JSON-content in een textarea is onnodig en onvolledig.

**Fix:**
```astro
<textarea ...>{raw}</textarea>
```
Laat de browser de tekst weergeven; een `<textarea>` escapet `&`, `<`, `>` automatisch bij rendering. Voeg een aparte client-side escape toe voor preview of gebruik een code-editor bibliotheek.

---

### 1.2 Opslag via `/api/save-page` draait niet in productie

**Bestand:** `vercel.json` vs `src/pages/api/save-page.ts`

**Probleem:**  
`vercel.json` definieert alleen `"api/callback.js"` als Node.js-functie, maar **geen** `"api/save-page"`. Op Vercel met `output: 'static'` worden `src/pages/api/*` routes alleen als functies gedeployed als ze expliciet in `vercel.json` staan.

Daarnaast: de `dist/api/save-page` is in de build een **statisch JSON-bestand**, geen Node.js-runtimehandler. Requests naar `/api/save-page` in productie retourneren dus een 200 met `{ok: true, method: "POST", ...}` — de POST-handler wordt nooit bereikt.

**Fix:**
```json
// vercel.json
{
  "functions": {
    "api/save-page.js": { "runtime": "nodejs20.0.0" }
  }
}
```
Of gebruik een integratie zoals een webhook/server-action in plaats van Vercel Functions.

---

### 1.3 Logout-form is dangling — geen backend handler

**Bestand:** `src/components/admin/AdminLayout.astro`, regels 34–36

```astro
<form method="POST" action="/beheer" class="admin-logout-form">
  <button ... type="submit">Uitloggen</button>
</form>
```

`clearSessionCookie()` bestaat in `admin-auth.ts` maar wordt **nooit** gebruikt. Er is geen `POST` handler op `/beheer` die de cookie wist. De form submit negeert de redirect of loopt vast op 405/the statische pagina.

**Fix:** Verwijder de form of voeg een login.astro handler toe:
```astro
<!-- login.astro -->
export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  const form = await request.formData();
  const intent = String(form.get('intent') ?? '');
  const password = String(form.get('password') ?? '');

  if (intent === 'login' && password === import.meta.env.ADMIN_PASSWORD) {
    setSessionCookie(cookies);
    return redirect('/beheer');
  }
  if (intent === 'logout') {
    clearSessionCookie(cookies);
    return redirect('/beheer/login');
  }
  ...
};
```

---

### 1.4 Wachtwoord hardcoded in broncode

**Bestand:** `src/pages/beheer/login.astro`, regel 5

```astro
const PASSWORD = 'vandotec2026';
```

Met open-source hosting of publieke repo is dit geen authenticatie. Een secrets manager of `process.env.ADMIN_PASSWORD` is vereist.

**Fix:**
```astro
const PASSWORD = import.meta.env.ADMIN_PASSWORD;
if (!PASSWORD) throw new Error('ADMIN_PASSWORD onveranderd');
```

---

### 1.5 Triviale session — geen cryptografische waarde

**Bestand:** `src/lib/admin-auth.ts`, regel 4

```ts
return session.value === '1';
```

Elke browser die een cookie `admin_session=1` plaatst, heeft toegang. Geen `nonce`, `jwt`, of server-side sessiestore.

**Fix:** Genereer een cryptografische session token op login, sla het op in een `Map<string, {expires, ip}>` in een module-level variabele (of een KV-store), en valideer dat.

---

## 2. High/Medium-severity non-blockers

### 2.1 `/beheer` en editor hebben geen POST handler, login form post naar `action="/beheer"`

**Bestanden:** `login.astro`, `index.astro`, `bewerk/[slug].astro`

**Probleem:** Login stuurt POST naar `/beheer`, maar `/beheer/index.astro` heeft alleen een `GET`. Er is geen page handler die `POST` verwerkt. Dit betekent de login knop doet niets in practice (of geeft een 405). In productie werkt `GET(cookies)` in de HTML ook niet, dus het is een moot point.

**Fix:** Zie 1.3 — voeg een `export const POST` toe op login of verander de form action naar een API route.

---

### 2.2 Dode Astro-expressies in statische navigatieklassen

**Bestanden:** `AdminLayout.astro` → `dist/beheer/index.html`, `dist/beheer/bewerk/home/index.html`

**Probleem:**
```html
<a href="/beheer/bewerk/home" class="admin-nav-item {active === 'home' ? 'active' : ''}">
```
Dit is een string literal in de statische HTML. Astro evaluateert het alleen op de server tijdens build. Dus de navigatie heeft **nooit** een `active` klasse in productie, ook niet als admin.js dit berekent. De navigatie wordt nooit visueel aangeduid.

**Fix:** Gebruik een module-level script of Astro-pages component voor /beheer die op runtime de actieve link markeert op basis van `window.location.pathname`.

---

### 2.3 JSON-validatie is client-only, geen server-side validering

**Bestanden:** `bewerk/[slug].astro`, `save-page.ts`

**Probleem:**  
De editor blokkeert opslaan bij client-side JSON.parse error, maar de API route valideert opnieuw. Er is geen **sanitization of schema-validatie** van de opgeslagen JSON. Een gebruiker kan een JSON met `null`, arrays waar een object verwacht wordt, of overschrijvende properties opslaan.

Daarnaast accepteert de API alleen een `slug` whitelist, maar de editor zelf accepteert ook slugs buiten de whitelist als je de pagina last-minute aanpast — er is geen client-side rol voor dat veranderen.

**Fix:** Voeg een JSON-schema toe (bv. zod) en valideer op POST:
```ts
const schema = z.object({
  title: z.string(),
  hero_title: z.string().optional(),
  // ...
});
schema.parse(parsed);
```

---

## 3. Lagere prioriteit issues

### 3.1 `getPageFiles` heeft een statisch pad gebaseerd op cwd

**Bestand:** `src/lib/admin-pages.ts`, regels 11, 23-35

```ts
const root = process.cwd();
statSync(join(root, 'src/data/home.json'));
```

Op Vercel draait dit in de serverless functie. `process.cwd()` is dan `/vercel/path0` of vergelijkbaar, niet de project-root. `statSync` faalt dus in productie. In de huidige config draait `/api/save-page` ook onder een andere cwd dan de admin-pages code zou verwachten.

**Fix:** Gebruik `fileURLToPath` of afhankelijkheid injection voor de data-root.

---

### 3.2 `getStaticPaths` is hardcoded en gedupliceerd

**Bestanden:** `bewerk/[slug].astro`, `admin-pages.ts`

**Probleem:** 6 slugs zijn op twee plekken hardcoded. Een extra pagina toevoegen vereist aanpassing op 3 plaatsen: `admin-pages.ts`, `bewerk/[slug].astro getStaticPaths`, en `AdminLayout.astro`.

**Fix:** Exporteer een `PAGE_CONFIGS` array uit `admin-pages.ts` en iter daarover.

---

### 3.3 Import van `readPageFile` kan crashen op niet-gespecificeerde slug

**Bestand:** `src/pages/beheer/bewerk/[slug].astro`, regel 26

```ts
const raw = readPageFile(slug || 'home');
```

`readPageFile` doen een `readFileSync` op `undefined` als `slug` niet in de map staat — wat niet kan vanwege `getStaticPaths`, maar wel als iemand `/beheer/bewerk/random` handmatig opvraagt in preview.

**Fix:** Validatie op API-niveau, en throw een herleidbare 404 in de editor zelf.

---

### 3.4 Styling: `.admin-nav-item` classes niet gedefinieerd in admin.css

**Bestand:** `src/styles/admin.css`

**Probleem:** `admin.css` geeft `.admin-nav-item` en `.admin-nav-item.active` geen expliciete styles — ze overerven van het body/default. Er is dus geen visueel verschil tussen actief/inactief in admin. Terwijl deze klassen correct werden gebruikt in de vorige `/admin` implementatie, is de nu kopie naar `/beheer` vergeten bij het schrijven van admin.css.

**Fix:**
```css
.admin-nav-item {
  ...
  border-radius: 0.5rem;
  color: var(--admin-muted);
  text-decoration: none;
  font-size: 0.95rem;
}
.admin-nav-item.active {
  background: var(--admin-surface-2);
  color: var(--admin-text);
  font-weight: 600;
}
```

---

### 3.5 HTML-entities in preview worden gedubbeld

**Bestand:** `src/pages/beheer/bewerk/[slug].astro`, tekstinhoud van textarea

Na fix van 1.1 zal de preview iframe de originele HTML uit `src/data/home.json` laden, dus entities zoals `&amp;euml;` blijven correct als die in de JSON staan. Controleer dat de JSON-bestanden deze niet opnieuw encoden. Op dit moment bevat `home.json` reeds correct geëscapte entities.

---

## 4. Build-kwaliteit

- Build loopt zonder fouten (`npm run build` slaagt).
- Maar genereert **dode Astro-expressies** in statische HTML (bovenstaand punt 2.2).
- `/api/save-page` wordt **foutief** gebruikt: Vercel config mist functiewaarschuwing bij API routes.
- Geen TypeScript-fouten, geen lint-waarschuwingen.

---

## 5. Per-bestand overzicht

### `src/pages/beheer/index.astro`
- Pro: Correct auth-guard met `isAuthenticated`, redirect naar login, redirect preserved.
- Con: Redirect werkt alleen in dev; in productie is het statisch HTML.
- Con: `active="dashboard"` is correct, maar is niet zichtbaar in styling (3.4).
- **Niet-blocker** in dev, blocker in productie.

### `src/pages/beheer/login.astro`
- Pro: Eenvoudige, gebruiksvriendelijke UI; goede label/autocomplete.
- Con: Hardcoded password (1.4).
- Con: Form `POST` naar `/beheer` zonder handler (2.1).
- Con: GEEN `export const POST` per se — dus login heeft geen backend.

### `src/pages/beheer/bewerk/[slug].astro`
- Pro: Nice UX/editor-preview combinatie, live JSON validatie.
- Blocker: HTML-escape bug (1.1) — corrupteert data na elke opslag.
- Con: Button buiten `<form>` met JS click handler is verwarrend en valideringslogica doublet client-side.
- Con: `saveBtn` disabled wordt niet teruggezet bij JSON-error tijdens opslag-fetch.

### `src/components/admin/AdminLayout.astro`
- Pro: Clean dark-theme shell met sidebar/topbar.
- Con: Logout form zonder handler (1.3).
- Con: Dode Astro navigatie-classes (2.2).
- Con: Laadt globaal `/style.css`, waardoor global styles ook in admin gelden (CSS-conflicten met `*{box-sizing}` etc.).

### `src/lib/admin-auth.ts`
- Pro: Cookie helpers zijn duidelijk, helpers zijn gedeeld.
- Con: Triviale sessie-waarde `'1'` (1.5).
- Con: `secure` flag is conditioneel op protocol; op lokale dev is het false, maar op Vercel Preview is het meestal ook true — dat is prima.
- Con: Geen `maxAge`, dus sessie verloopt niet automatisch (browser session-only).

### `src/lib/admin-pages.ts`
- Con: Hardcoded pad uit `process.cwd()` (3.1).
- Con: Slug registry gedupliceerd met `getStaticPaths` (3.2).
- Pro: Leest bestanden synchroon, wat simpel is.

### `src/pages/api/save-page.ts`
- Pro: Whitelist van slugs; JSON-parse error handling; git commit + push.
- Con: Draait niet in productie zonder `vercel.json` update (1.2).
- Con: `status.files.length` check is robuust genoeg om lege commits te voorkomen.
- Con: Geen backup van de oude JSON voor voordat erover wordt geschreven.
- Con: `pushed` flag wordt niet gebruikt voor feedback — return `saved: true` ook bij failure.
- Con: `git.push` zet `pushed = true`, maar faalt niet als remote niet toegankelijk is; moest een `try/catch` rond de push hebben.

### `src/styles/admin.css`
- Con: `.admin-nav-item` mist expliciete styling (3.4).
- Pro: Token-set via CSS vars is schoon; `.admin-preview-frame iframe` height is 70vh; `.admin-grid` is responsive.
- Con: `/style.css` wordt ook geladen; `.btn` en `.btn-red` uit style.css botsen mogelijk met `.admin-btn`.
- Con: Geen mobile breakpoint voor `.admin-layout` grid → op kleine schermen is sidebar altijd 260px.

---

## 6. Concrete prioritering

| Prioriteit | Item | Impact | Koste om te fixen |
|------------|------|---------|-------------------|
| 🔴 Blokkerend | API route niet geconfigureerd in Vercel | Opslag faalt in productie | 5 min |
| 🔴 Blokkerend | HTML-escape bug corrupteert JSON | Dataverlies | 10 min |
| 🔴 Blokkerend | Auth niet werkend in productie | CMS open voor iedereen | 30-60 min |
| 🟠 Hoog | Logout form heeft geen handler | UX bug | 10 min |
| 🟠 Hoog | Hardcoded wachtwoord | Veiligheidsrisico | 5 min |
| 🟠 Hoog | Triviale session | Veiligheidsrisico | 30 min |
| 🟡 Medium | Dode Astro expressies in navigatie | UI bug | 15 min |
| 🟡 Medium | `.admin-nav-item` ontbreekt in CSS | Visuele bug | 5 min |
| 🟡 Medium | Geen schema-validatie op save | Datakwaliteit | 20 min |
| 🟢 Laag | cwd/pad hardcoded | Dev-only maar netjes fixen | 10 min |
| 🟢 Laag | Dubbele slug-definities | Onderhoudskosten | 10 min |
| 🟢 Laag | geen `.admin-layout` mobile styling | Kleine UX | 10 min |

---

## 7. Aanbevolen volgorde van aanpassing

1. Fix vercel.json → voeg `api/save-page.js` als functie toe.
2. Verwijder `.replace(/</g, '&lt;').replace(/>/g, '&gt;')` in bewerk.astro textarea.
3. Voeg een backend login/logout handler toe in login.astro met APIRoute POST.
4. Verwijder hardcoded password, verplaats naar `process.env.ADMIN_PASSWORD`.
5. Vervang triviale session door signed token + server-side store.
6. Maak `.admin-nav-item` en `.admin-nav-item.active` expliciet gestyled in admin.css.
7. Voeg runtime navigatie-actief-logica toe of gebruik een Astro component op basis van `Astro.url.pathname`.
8. Voeg zod-schema toe in `save-page.ts` POST voordat je schrijft.
9. Voeg geen `src/style.css` alleen toe aan admin-pagina's of scope alle `.admin-*` classes expliciet.
10. Voeg een changelog/wiki toe waarmee developers snappen welke slugs veilig zijn.

---

*Review is gebaseerd op code in commits d7db3f7 en 1ec4afd, met uitgevoerde `npm run build` verificatie.*
