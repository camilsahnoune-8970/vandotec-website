# AGENTS.md — Vandotec-website (enig contract voor mens én AI)

Stack: Astro 7, `output: static`, 27 gebouwde pagina's (26 `index.html` + 404). Content in `src/data/*.json`, styling in `public/style.css`, eigen foto's in `public/img/`.

## Commando's

- Build (moet groen blijven): `npm run build`
- Preview: `npx astro preview --port 4333` (de testscripts hebben 4333 vast; zie `tasks/QA-RUNBOOK.md`)
- SEO-check: `node tasks/check-seo.cjs` (moet `ALL OK` blijven)
- Alle tests, in de volgorde van de CI, met de valkuilen: `tasks/QA-RUNBOOK.md`

## Samenwerken (mens en AI)

- Lees eerst `.planning/STATE.md` — daar staat waar we zijn.
- Werk per pagina of per laag, nooit twee agents tegelijk in dezelfde bestanden.
- Branches: `<wie>/<wat>` (bv. `opencode/hero`, `codex/jobs-tekst`, `claude/footer`). Merge via pull request met preview-check (build groen · SEO `ALL OK` · bij zichtbare wijziging: voor/na bekeken door Camil).
- Review roteert: wie bouwt, reviewt niet zichzelf. Smaak-review doet Camil altijd zelf.
- Het "tweede paar ogen" is een andere agent-sessie (bv. Claude Code op verzoek van Camil, of een aparte opencode-sessie zonder jouw context) die de diff naleest tegen `AGENTS.md` en de bevindingen als PR-commentaar zet. Camil hoeft de diff niet te lezen.
- Journaalregel: in een aparte docs-PR na de merge (dan is het PR-nummer bekend); je mag meerdere gemergde PR's in één docs-PR bundelen.

## Rolverdeling (sinds 2026-10-12)

- **opencode bouwt.** Camil beslist, keurt specs goed, doet de smaak-review en alle live-, DNS-, hosting- en kostenbesluiten. Claude Code reviewt of herstelt technisch alleen op verzoek van Camil en schrijft niet in de repo zonder dat verzoek.
- Zichtbare wijziging: eerst voor/na (tekst of screenshots 390 + 1440) aan Camil, merge na zijn "ja". Onzichtbare wijziging (docs, tests, techniek): merge na groene CI en het tweede paar ogen. In het PR-sjabloon vul je dan bij "Preview bekeken door Camil" in: "n.v.t., onzichtbaar" met de reden.
- Pas mergen als beide verplichte checks van `main-sluis` groen zijn: `gh pr checks <n>` zonder `pending`. Een rode check betekent stoppen en melden, nooit eromheen mergen.

## Beslissingen aan Camil (zo vraag je ze)

- Camil is geen developer en kan git- of codekeuzes niet beoordelen. Leg in gewone taal uit wat iets is vóór je iets vraagt. Werk in het Nederlands, met "je".
- **Eén beslissing per vraag**, genummerd, met je aanbeveling eerst zodat "ja" volstaat. Meng geen beslissingen in een rapport of tussen uitvoering. Wat een duidelijke standaard heeft en geen risico draagt, doe je en meld je.
- Zoek zelf op wat op te zoeken valt (bestanden, code, `docs/mediakit-2026.pdf`) voor je iets vraagt, en noem cijfers plus een concreet scenario.
- Rapporteer in vier delen, op één scherm: (1) situatie, (2) wat het voor Camil betekent, (3) wat hij moet doen of "niets", (4) wat je niet weet of niet controleerde.
- Elke claim klopt met wat je controleerde; een aanname noem je een aanname. Geen hooks of achtergrondprocessen zonder opdracht.

## Valkuilen op deze pc

- GitHub-account: `camilsahnoune-8970`, nooit `Camil96`. Git heeft hier geen `user.email`: commit met omgevingsvariabelen `GIT_AUTHOR_NAME`/`GIT_COMMITTER_NAME=camilsahnoune-8970` en `GIT_AUTHOR_EMAIL`/`GIT_COMMITTER_EMAIL=camil.sahnoune@vandotec.be`.
- Push via de gh-credential, anders kan Git Credential Manager het verkeerde account nemen: `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -u origin <branch>`. Merge: `gh pr merge <n> --squash --delete-branch --match-head-commit <sha>`. Nooit force-pushen.
- In de werkmap hebben veel bestanden CRLF-regeleinden (`core.autocrlf=true`; git zelf bewaart LF), bv. `src/pages/contact.astro`. Een zoek-en-vervang over meerdere regels vindt dan niets: wijzig per regel.
- Een oude `astro preview` laat `npm ci` falen met EPERM en bezet poort 4333; zie `tasks/QA-RUNBOOK.md`. Stop alleen je eigen processen.

## Werkwijze (spec-first)

- Geen code zonder goedgekeurde spec: kopieer `specs/_TEMPLATE.md` naar `specs/<onderwerp>.md`, vul in, Camil keurt goed, dan pas bouwen. Grote fasen lopen via GSD spec-phase; B (Spec Kit) en Ralph zijn geparkeerd.
- Vrijgesteld: kleine fixes (typo, één regel CSS, één woord tekst) — vermeld in de PR waarom geen spec nodig was.
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

## Voor opencode (startprompt, verse sessie na 2026-10-12)

Lees `AGENTS.md`, `.planning/STATE.md` en `tasks/QA-RUNBOOK.md`. Controleer eerst de stand: `git fetch`, `git status`, `gh pr list`, en de statische testset uit het runbook op een verse `origin/main`. Is die set rood, dan meld je dat aan Camil en repareer je niets zonder spec. Start elke taak met `git switch -c opencode/<taak> origin/main` (nooit vanaf een `claude/`-branch), kies het open punt dat `.planning/STATE.md` noemt, vraag Camil één beslissing per keer, open een PR en schrijf de journaalregel zoals hierboven staat.

## Voor Codex / Claude Code (startprompt)

Verbind repo `camilsahnoune-8970/vandotec-website`, lees `AGENTS.md` + `.planning/STATE.md`, kies een open punt, werk op `codex/<taak>` of `claude/<taak>`, open een PR, schrijf één journaalregel.

## Documentatie

- Astro: https://docs.astro.build
- Huisstijl-details: `docs/mediakit-2026.pdf`, `tasks/beelden.md` (beeldenregister)
- Audit met status per punt: `tasks/REVIEW.md`. Beveiliging: `tasks/SECURITY-NOTITIE.md` (let op de correctie van 2026-10-12 over het wachtwoord in de historie).
- Oude plannen/designs: `docs/archief/` (alleen naslag, niet leidend)
