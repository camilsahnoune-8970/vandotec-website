# Vandotec Brand Spec

Extracted from live site (vandotec.be) — Fork CMS, theme "Siesqo", Bootstrap 5.

---

## Color Palette

| Token | Hex | RGB | Role |
|-------|-----|-----|------|
| Navy (Primary) | `#091950` | `9,25,80` | Headers, nav, buttons, backgrounds, links |
| Red (Accent) | `#c2000b` | `194,0,11` | CTA buttons, underlines, danger, .btn-red |
| Light Blue | `#2e58a6` | `46,88,166` | Secondary bg, hover states, footer links |
| Dark | `#242424` | `36,36,36` | Body text, dark sections |
| White | `#fff` | `255,255,255` | Backgrounds, text on dark |
| Off White | `#fafafa` | `250,250,250` | Subtle section backgrounds |
| Muted | `#6c757d` | `108,117,125` | Secondary text, captions |
| Border | `#dee2e6` | `222,226,232` | Default borders |
| Darker Navy | `#071440` | `7,20,64` | Link hover, btn-primary:hover border |
| Darker Red | `#a50009` | `165,0,9` | btn-danger:hover |

## Typography

**Font Stack:** `"Open Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Body | 1rem (16px) | 400 | 1.5 |
| h1 | fluid (2.5rem → ~2.875rem) | 500 (700 for `.line`) | 1.2 |
| h2 | fluid (2rem → ~2.325rem) | 500 (600 for cards) | 1.2 |
| h3 | fluid (1.75rem → ~1.9rem) | 500 | 1.2 |
| h4 | fluid (1.5rem → ~1.575rem) | 500 | 1.2 |
| h5 | 1.25rem | 500 | 1.2 |
| .btn | 1rem → 1.25rem | 600 | — |
| Footer nav | 1.5rem | 700 | — |
| Expertise card h2 | 1.25rem | 600 | — |

**Underline accent pattern:** 80px wide, 2px high, `#c2000b` (h1.line). Cards use 40px wide variant.

## Button Styles

**`.btn-red` (primary CTA):**
- Uppercase, font-weight 600, border-radius 0
- Horizontal padding: 2rem
- Default: `#c2000b` solid (gradient 90deg)
- Hover: gradient `#091950 → #2e58a6`, text white
- Variant (outlined): bg red, hover → white bg + navy text

**`.btn-primary`:**
- bg `#091950`, text white
- Hover: darker navy `#081544`

## Layout

- Container: Bootstrap 5 grid (max 1320px at xxl)
- Border radius: 0 (sharp/square corners throughout)
- Grid gutters: Bootstrap default (1.5rem / `--bs-gutter-x`)
- Section padding: 2rem–7rem (responsive)

## Hero/Carousel

- Full-viewport height (`100vh` via `--vh`)
- Navy overlay (`rgba(9,25,80,0.35)` on images)
- Text container: max-width 60% (desktop), left-aligned at 10%
- Hero h1: 60px desktop, weight 600, white text
- Hero h1 span: navy bg `#091950` with `box-decoration-break: clone`

## Component Architecture (for rebuild)

**Header**: Logo left, nav right, language switcher, .btn-red CTA in nav

**Hero**: Full-screen image carousel with navy overlay, headline, subtitle, btn-red CTA. Scroll-down indicator.

**About**: Intro text block — Vandotec positioning paragraph + "Meer over ons" link

**Expertises**: 4-column card grid — Tankstations, EV laadinstallaties, Infrastructuur, Hoog-/Middenspanningscabine. Each with image bg, navy text, red underline accent.

**Quote Block**: Full-width centered statement with red accent, emphasis on service/interventiedienst

**Connect/CTA**: Two-col grid — blue (`#091950`) and light blue (`#2e58a6`) panels with h1 heading, descriptive p, and btn-red variant

**Footer**: Multi-column nav with footer-navigation heading style (1.5rem, 700 weight, uppercase, red underline), footer-subnav, contact info, and bottom bar with legal links
