# STATE.md — waar we zijn (enige waarheid, bijhouden per taak)

## Waar staan we

- Site: 11 pagina's, Astro static, build groen, SEO 11/11. Remote `origin/main` synchroon.
- Repo sinds 2026-10-05 publiek (besluit Camil); `main` beschermd via regelset `main-sluis` (PR-verplicht, lineair, geen force-push, geldt ook voor admins).
- Huisstijl staat; 14 referenties met filter+modal; galerijen met lightbox op home/expertises/service/over.
- Footer-quote toont alleen “Benoit Goesaert”. Team: Marijn/Benoit/Kevin met portret, Fien weg.
- Staging voorbereid: `new.powerland.be` achter Cloudflare Access (zie `tasks/staging-upload.md`). GitHub-workflow uitgeschakeld.

## Wat loopt

- Preview-ronde door Camil (hero, galerijen, footer, service-sectie).
- Review door Kevin via staging-URL zodra die staat.

## Geblokkeerd / wacht op Camil

- Combell-upload + DNS + Access-regel (alleen Camil kan dit).
- EV-stockfoto vervangen bij Powerland-laderfoto; witte logo-variant; jobs-teksten; beheerlaag-keuze.
- Technisch open (laag prio): `srcset` mobiel, screenreader-test, inline-styles opruimen.

## Laatste 5

- 2026-10-05 spec-protocol ingericht (specs-template + QA-voorbeeld + AGENTS-regel) (opencode)
- 2026-10-05 Esso-band weg van jobs via PR #11 (opencode)
- 2026-10-05 performance-pass B via PR #8 + jobs-foto/locatie-inventaris via PR #9 (opencode)
- 2026-10-05 content-waarheid A via PR #6 (contact-foto eigen beeld, FAQ+jobs bevestigd door Camil)
- 2026-10-05 uniforme section-hero's 02-06 via PR #4, homepage-hero via PR #3 (opencode)
- 2026-10-05 repo publiek + sluis `main-sluis` actief, bewezen met geblokkeerde test-push (opencode)
- 2026-10-05 werkhub ingericht via proef-PR #1 (AGENTS, STATE, PR-template, archief) (opencode)
- 2026-10-01 footer-quote alleen Benoit Goesaert; staging-voorbereiding gepusht (opencode)
- 2026-09-30 teamportretten geplaatst en geverifieerd, Fien weg (opencode)
- 2026-09-30 service-CTA's per kaart + footer full-bleed band (opencode)
- 2026-09-30 issues-pass: juridisch herschreven, a11y, 45+ uniform (opencode)
- 2026-09-30 galerij-pass: lightbox, moment-banden, rails met dots (opencode)
