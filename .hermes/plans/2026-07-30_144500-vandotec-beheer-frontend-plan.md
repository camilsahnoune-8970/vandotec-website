# Vandotec /beheer frontend rebuild

> **For Hermes:** Execute this plan task-by-task after explicit go. Do not run mutating commands in this turn.

**Goal:** Turn the existing `/beheer` admin into a coherent WordPress/Webflow-inspired shell using only Astro, vanilla JS, and `src/styles/admin.css`. Improve login, sidebar nav, dashboard, editor, layout behavior, and client-side route guards without redesigning auth.

**Architecture:**
- Reuse current `/beheer`, `/beheer/login`, `/beheer/bewerk/*`, `/api/save-page`
- Keep exports in `src/components/admin/AdminLayout.astro`, `src/pages/beheer/**`, `src/styles/admin.css`
- Keep admin session as a browser cookie gate; avoid new auth providers or hosting changes
- Maintain public-facing `/admin` and unrelated pages untouched

**Constraints:**
- No new frameworks
- No new Netlify/Vercel backend
- No schema/data layer changes beyond polished save messaging
- Preserve existing routes and save flow

---

## 1. Login page overhaul

**Files:** `src/pages/beheer/login.astro`, `src/styles/admin.css`

### Task 1.1: Standardize login form behavior

**Objective:** Make `/beheer/login` submit via fetch to `/beheer` with `intent=login`, show loading/error/success states, and redirect on success.

**Step 1:** Update `login.astro` to use a single centered card layout with consistent spacing and accessible labels.
**Step 2:** Add client-side status text for invalid credentials and loading state.
**Step 3:** Keep the existing `/beheer` POST login handling.

Verification:
- Build succeeds
- Local preview `/beheer/login` shows centered card and status text
- Submit redirects to `/beheer` on success

Commit:
```bash
git add src/pages/beheer/login.astro src/styles/admin.css
git commit -m "feat: standardize /beheer/login layout and submit behavior"
```

---

## 2. Sidebar and navigation clarity

**Files:** `src/components/admin/AdminLayout.astro`, `src/styles/admin.css`

### Task 2.1: Make sidebar state explicit

**Objective:** Make the sidebar readable and consistent across dashboard/editor states.

**Step 1:** Replace template-string `active` classes with runtime nav selection based on `window.location.pathname`.
**Step 2:** Style `.admin-nav`, `.admin-nav-item`, and `.admin-sidebar-footer` for clear visual grouping.
**Step 3:** Ensure logout form submits `POST` to `/beheer` with `intent=logout`.

Verification:
- Build succeeds
- Static routes show consistent sidebar markup
- All admin pages use the same shell

Commit:
```bash
git add src/components/admin/AdminLayout.astro src/styles/admin.css
git commit -m "feat: refine /beheer sidebar and nav state clarity"
```

---

## 3. Dashboard design and density

**Files:** `src/pages/beheer/index.astro`, `src/styles/admin.css`

### Task 3.1: Improve dashboard hierarchy

**Objective:** Make the page list feel like a CMS overview instead of a plain table.

**Step 1:** Add a clear page header, subtitle, and action row.
**Step 2:** Keep the existing table but improve row spacing, labels, and empty/fallback state.
**Step 3:** Add small visual chips/status cues for edit/view actions.

Verification:
- Build succeeds
- `/beheer` shows improved header, table readability, and action grouping
- No broken responsive behavior on narrow widths

Commit:
```bash
git add src/pages/beheer/index.astro src/styles/admin.css
git commit -m "feat: tighten /beheer dashboard hierarchy and row clarity"
```

---

## 4. Editor focus and layout

**Files:** `src/pages/beheer/bewerk/[slug].astro`, `src/styles/admin.css`

### Task 4.1: Make editor vs preview distinction stronger

**Objective:** Reduce cognitive load in the split view.

**Step 1:** Add clear section headers, editor help text, and action grouping.
**Step 2:** Keep split layout but refine card spacing, iframe border, preview hint text, and save status presentation.
**Step 3:** Ensure save status transitions remain client-side and local.

Verification:
- Build succeeds
- `/beheer/bewerk/home` shows clear editor/preview separation
- Save status still appears without changing API behavior

Commit:
```bash
git add src/pages/beheer/bewerk/[slug].astro src/styles/admin.css
git commit -m "feat: clarify editor/preview layout and save feedback"
```

---

## 5. Layout behavior and coverage

**Files:** `src/pages/beheer/index.astro`, `src/pages/beheer/login.astro`, `src/pages/beheer/bewerk/[slug].astro`, `src/components/admin/AdminLayout.astro`, `src/styles/admin.css`

### Task 5.1: Improve shell responsiveness

**Objective:** Make the admin usable across browser widths without breaking existing routes.

**Step 1:** Add sensible mobile/tablet behavior for sidebar and topbar.
**Step 2:** Verify no route layout breaks by inspecting built HTML pages.
**Step 3:** Maintain same auth flow and save routes.

Verification:
- Build succeeds
- Inspect `/beheer`, `/beheer/login`, `/beheer/bewerk/home` in preview
- No duplicate shell, no broken nav, no broken save form

Commit:
```bash
git add src/components/admin/AdminLayout.astro src/pages/beheer/index.astro src/pages/beheer/login.astro src/pages/beheer/bewerk/[slug].astro src/styles/admin.css
git commit -m "feat: improve /beheer shell responsiveness and layout coverage"
```

---

## 6. Client-side route gating

**Files:** `src/components/admin/AdminLayout.astro`, `src/pages/beheer/index.astro`, `src/pages/beheer/login.astro`, `src/pages/beheer/bewerk/[slug].astro`

### Task 6.1: Add consistent client-side guards

**Objective:** Ensure unauthenticated visitors cannot remain on protected admin pages in static export.

**Step 1:** Add inline auth guard in `AdminLayout.astro` for `/beheer`, `/beheer/login`, and `/beheer/bewerk/*`.
**Step 2:** Keep `/beheer/login` as the public entrypoint; redirect from protected pages when `admin_session` is absent.
**Step 3:** Verify `/api/save-page` still requires session via existing cookie check.

Verification:
- Build succeeds
- Without `admin_session`, visit `/beheer` or `/beheer/bewerk/home`
- Browser redirects back to `/beheer/login`
- `/beheer/login` remains accessible without redirect loop

Commit:
```bash
git add src/components/admin/AdminLayout.astro src/pages/beheer/index.astro src/pages/beheer/login.astro src/pages/beheer/bewerk/[slug].astro
git commit -m "feat: add consistent client-side admin routing guard"
```

---

## 7. Final verification

### Task 7.1: Local preview pass

**Objective:** Validate the improved shell end-to-end before deployment.

**Step 1:** Run `npm run build`
**Step 2:** Run `npm run preview`
**Step 3:** Open and inspect `/beheer`, `/beheer/login`, `/beheer/bewerk/home`
**Step 4:** Fix any last spacing/typography issues in `admin.css` only

Commit:
```bash
git add src/styles/admin.css
git commit -m "fix: final /beheer frontend polish pass"
```

Push:
```bash
git push origin main
```
