# Vandotec /beheer CMS: remaining verification + polish plan

> **For Hermes:** Execute this plan task-by-task with verification after each step. No large dependency switches.

**Goal:** Close the real remaining gaps in the existing `/beheer` CMS: make logout work, align login flow with the current server handlers, fix nav active-state rendering in static export, and finish minor style polish. Do not redesign auth or introduce new dependencies.

**Architecture:**
- Keep the current client-side `admin_session` cookie gate and the existing `/api/save-page` POST flow.
- Stay within `src/pages/beheer/**`, `src/components/admin/**`, `src/lib/admin-*`, `src/pages/api/save-page.ts`, `src/styles/admin.css`.
- No new auth providers, no hosting/stack changes.

---

## Current evidence

- `/beheer` has a client-side inline gate plus server GET/POST/DELETE handlers.
- `/beheer/bewerk/*` has a client-side inline gate plus server GET handler.
- `/api/save-page` rejects requests without `admin_session` and returns `401`.
- `AdminLayout.astro` has a logout form, but it currently submits `/beheer` in a way that does not match the login-only POST handler.
- `admin.css` already defines `.admin-nav-item` and `.admin-nav-item.active`.
- The sidebar nav uses Astro template expressions for `active`; in `output: 'static'` this risks rendering as a literal string class instead of toggling `active`.

---

## Task 1: Make logout reliable

**Objective:** Make the logout flow in `AdminLayout.astro` actually clear the `admin_session` cookie and land back on `/beheer/login`.

**Files:**
- Read: `src/components/admin/AdminLayout.astro`
- Modify: `src/components/admin/AdminLayout.astro`
- Read: `src/pages/beheer/index.astro`
- Read: `src/lib/admin-auth.ts`

**Step 1:** Replace the current logout form submission with a small inline script that sends `POST` to `/beheer` with `intent=logout`, or `DELETE` to `/beheer`, and follows the returned redirect.

**Step 2:** Ensure `/beheer` `POST` accepts `intent=logout` and clears the session via `clearSessionCookie(cookies)`.

**Step 3:** Build and inspect the rendered `dist/beheer/index.html` only to confirm the logout form no longer points to a broken action.

**Verification:**
- `npm run build` exits 0.
- The logout action in `AdminLayout.astro` targets `/beheer` with `intent=logout`.
- `/beheer` `POST` handles both login and logout.

Commit:
```bash
git add src/components/admin/AdminLayout.astro src/pages/beheer/index.astro
git commit -m "fix: make /beheer logout flow consistent with auth handlers"
```

---

## Task 2: Align login form with current handlers

**Objective:** Ensure `/beheer/login` submits in a way that matches `/beheer` POST without creating a second divergent auth path.

**Files:**
- Read: `src/pages/beheer/login.astro`
- Read: `src/pages/beheer/index.astro`
- Modify: `src/pages/beheer/login.astro`

**Step 1:** Keep the form action as `/beheer` and keep `intent=login`, since that already matches the current `/beheer` POST handler.

**Step 2:** Remove only the client-side status UI if it conflicts with server redirects; otherwise leave the inline script alone.

**Step 3:** Build and verify `/beheer/login` still loads and submits to `/beheer`.

**Verification:**
- `npm run build` exits 0.
- `login.astro` retains `action="/beheer"` and hidden `intent=login`.
- No new auth endpoint is introduced.

Commit:
```bash
git add src/pages/beheer/login.astro
git commit -m "fix: keep /beheer/login submit path aligned with /beheer POST handler"
```

---

## Task 3: Fix nav active state in static export

**Objective:** Ensure the sidebar nav shows the active page in production without server-side reactivity.

**Files:**
- Read: `src/components/admin/AdminLayout.astro`
- Read: `src/pages/beheer/index.astro`
- Read: `src/pages/beheer/bewerk/[slug].astro`
- Modify: `src/components/admin/AdminLayout.astro`

**Step 1:** Replace the Astro template-expression active class with a small inline script that reads `window.location.pathname` and adds `active` to the matching `.admin-nav-item`.

**Step 2:** Keep the existing `active` Astro prop if desired, but do not rely on it for production class output.

**Step 3:** Build and inspect `dist/beheer/index.html` and `dist/beheer/bewerk/home/index.html` to confirm the nav contains real `active` class toggling rather than literal template text.

**Verification:**
- `npm run build` exits 0.
- The rendered admin nav has runtime active-state logic.
- `/beheer` Dashboard and one editor page show the intended active nav state.

Commit:
```bash
git add src/components/admin/AdminLayout.astro
git commit -m "fix: make admin sidebar active nav state work in static export"
```

---

## Task 4: Style polish pass

**Objective:** Apply the remaining small style improvements from the existing plan without introducing a redesign.

**Files:**
- Read: `src/styles/admin.css`
- Modify: `src/styles/admin.css`

**Step 1:** Tighten card spacing, table row spacing, and button hierarchy so dashboard + editor feel cohesive.
**Step 2:** Keep `.admin-nav-item` and `.admin-nav-item.active` intact; only adjust spacing/typography where it clearly improves polish.
**Step 3:** Build and visually inspect `/beheer`, `/beheer/login`, and `/beheer/bewerk/home`.

**Verification:**
- `npm run build` exits 0.
- No broken table/button alignment.
- Admin shell remains visually consistent.

Commit:
```bash
git add src/styles/admin.css
git commit -m "style: polish /beheer spacing, table, and button hierarchy"
```

---

## Execution order

1. Task 1
2. Task 2
3. Task 3
4. Task 4
5. Final build + push

## Success criteria

- Logout from admin clears `admin_session` and lands on `/beheer/login`.
- `/beheer/login` submit path remains compatible with `/beheer` POST.
- Admin sidebar shows real active state in production.
- `npm run build` is stable and all changes are pushed.
