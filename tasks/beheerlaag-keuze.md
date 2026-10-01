# Beheerlaag-keuze (MANAGE-01 — beslissing door maker)

Hoe worden teksten/foto's/vacatures/SEO aangepast zonder in code te graven?

## Optie A — JSON-in-git houden (aanbevolen voor solo-maker)

- Aanpassen via GitHub-webinterface of VS Code in `src/data/*.json`, commit = publiceer,
  git-history = versies + rollback (1 stap terug via vorige commit).
- Preview vóór publicatie: `npx astro preview` na `npm run build`.
- Kosten: €0, geen accounts, geen extra software. Werkt vandaag.
- Nadeel: geen WYSIWYG; JSON-syntax moet kloppen (1 fout = build rood).

## Optie B — Gratis git-CMS (Decap CMS, voorheen Netlify CMS)

- Beheerscherm op `/admin` met formulieren per pagina + media-bibliotheek; slaat op als
  git-commits (zelfde versies/rollback als A).
- Kost: ~2–4 uur inbinden + GitHub OAuth-app (gratis, wel een extra account-koppeling).
- Vereist: `config.yml` per content-type, uitrol pas zinvol ná live-gang.
- Nadeel: extra laag om te onderhouden; media-uploads vergroten de repo.

## Advies

Begin met **A** (werkt nu, kost niets). Schakel naar **B** zodra JSON-editen
voelt als frictie — niet eerder. De `src/pages/beheer/*`-schil en
`public/admin/config.yml` liggen klaar als vertrekpunt voor B.

## Status

- [ ] Maker kiest A of B (antwoord met “A” of “B”)
- [ ] Bij B: inbinden + test (login → home.json wijzigen → commit → preview)
