# AGENTS.md — Vandotec-website (enig contract voor mens én AI)

Stack: Astro 7, `output: static`, 11 pagina's. Content in `src/data/*.json`, styling in `public/style.css`, eigen foto's in `public/img/`.

## Commando's

- Build (moet groen blijven): `npm run build`
- Preview: `npx astro preview` (lokaal, poort van Astro)
- SEO-check: `node tasks/check-seo.cjs` (moet 10/10 blijven)

## Samenwerken (mens en AI)

- Lees eerst `.planning/STATE.md` — daar staat waar we zijn.
- Werk per pagina of per laag, nooit twee agents tegelijk in dezelfde bestanden.
- Branches: `<wie>/<wat>` (bv. `opencode/hero`, `codex/jobs-tekst`, `claude/footer`). Merge via pull request met preview-check (build groen · SEO 10/10 · preview bekeken door Camil).
- Review roteert: wie bouwt, reviewt niet zichzelf. Smaak-review doet Camil altijd zelf.
- Na afgeronde taak: één regel in `.planning/STATE.md` (wat + welke bestanden + door wie).
- Niet live zetten en geen DNS/hosting wijzigen zonder expliciete "ja" van Camil. Repo is sinds 2026-10-05 publiek (besluit Camil) — dus nooit secrets/tokens/wachtwoorden committen.
- `main` is beschermd (regelset `main-sluis`): alles via PR, lineaire historie, geen force-push. Zelfs journaalregels gaan via een branch + PR.

## Huisstijl (hard)

- Tokens in `public/style.css`: `--navy #00298F`, `--red #C30017`, Open Sans, radius 0. Geen nieuwe kleuren of fonts.
- Content in `src/data/*.json`. Geen placeholders, geen ongefundeerde claims — alleen geverifieerde info.
- Nooit blauw op blauw. Max 2 rode accenten per viewport.

## Verificatie (geen bewijs = niet klaar)

- Bewijs in `dist/`: links/assets bestaan, tellers kloppen, contrast AA, geen dode code.
- Wat je niet kunt zien (render, screenreader): markeer als “niet geverifieerd”, claim het niet.
- Bij twijfel over foto-inhoud: zeggen, niet gokken.

## Voor Codex / Claude Code (startprompt)

Verbind repo `camilsahnoune-8970/vandotec-website`, lees `AGENTS.md` + `.planning/STATE.md`, kies een open punt, werk op `codex/<taak>` of `claude/<taak>`, open een PR, schrijf één journaalregel.

## Documentatie

- Astro: https://docs.astro.build
- Huisstijl-details: `docs/mediakit-2026.pdf`, `tasks/beelden.md` (beeldenregister)
- Oude plannen/designs: `docs/archief/` (alleen naslag, niet leidend)
