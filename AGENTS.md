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
- Het "tweede paar ogen" is een andere agent-sessie die de diff naleest tegen `AGENTS.md` en de bevindingen als PR-commentaar zet. Claude Code start het zelf als verse subagent; Camil mag ook een nieuwe agent-sessie starten. Camil hoeft de diff niet te lezen.
- Journaalregel: in **dezelfde PR** als het werk, als extra regel in `.planning/STATE.md`. Een PR-nummer hoef je er niet in te zetten; dat staat in de PR zelf.

## Rolverdeling (sinds 2026-10-16)

- **Claude Code bouwt.** Camil beslist, keurt specs goed, doet de smaak-review en alle live-, DNS-, hosting- en kostenbesluiten. Opencode bouwt niet meer in deze repo (besluit Camil, 2026-10-16), tenzij hier opnieuw een andere rolverdeling komt te staan. Nooit twee agents tegelijk in dezelfde bestanden.
- Zichtbare wijziging: eerst voor/na aan Camil, merge na zijn "ja". Voor/na = de tekst voor en na in de PR-tekst, plus screenshots 390 en 1440 als bestanden in de map `screenshots/` in de repo-root (buiten git, staat in `.gitignore`). Camil opent die bestanden. Er is geen preview-host die Camil gebruikt (Vercel is sinds 19/10 losgekoppeld, zie C11 in `.planning/STATE.md`). Maak de screenshots met `node tasks/shot-pagina.cjs`, zie `tasks/QA-RUNBOOK.md`.
- Tests, docs en techniek zonder zichtbare wijziging: CI groen is genoeg; bij code of tekst op de site ook het tweede paar ogen. In het PR-sjabloon vul je dan bij "Preview bekeken door Camil" in: "n.v.t., onzichtbaar" met de reden.
- Pas mergen als beide verplichte checks van `main-sluis` groen zijn: `gh pr checks <n>` zonder `pending`. Een rode check betekent stoppen en melden, nooit eromheen mergen.
- Onzichtbare PR (docs, tests, techniek): merge zodra CI groen is. Camil hoeft daarop niet te wachten.
- Zichtbare PR: eerst het tweede paar ogen, dan voor/na aan Camil, dan zijn "ja", dan de merge door de agent die de PR opende, met het commando hieronder. Camil merget zelf alleen als de merge geblokkeerd wordt.
- Verschijnt er toch weer een Vercel-check op een PR, dan is de koppeling terug: stoppen en melden (C11).
- Commit- en PR-titel: `type: tekst`, bv. `content: ...`, `docs: ...`, `spec: ...`, `a11y: ...`.

## Beslissingen aan Camil (zo vraag je ze)

- Camil is geen developer en kan git- of codekeuzes niet beoordelen. Leg in gewone taal uit wat iets is vóór je iets vraagt. Werk in het Nederlands, met "je".
- **Eén beslissing per vraag**, genummerd (een punt kan meerdere vragen hebben, bv. CLAIM-05 heeft er vier), met je aanbeveling eerst zodat "ja" volstaat. Meng geen beslissingen in een rapport of tussen uitvoering. Wat een duidelijke standaard heeft en geen risico draagt, doe je en meld je.
- Zoek zelf op wat op te zoeken valt (bestanden, code, `docs/mediakit-2026.pdf`) voor je iets vraagt, en noem cijfers plus een concreet scenario.
- Rapporteer in vier delen, op één scherm: (1) situatie, (2) wat het voor Camil betekent, (3) wat hij moet doen of "niets", (4) wat je niet weet of niet controleerde.
- Elke claim klopt met wat je controleerde; een aanname noem je een aanname. Geen hooks of achtergrondprocessen zonder opdracht. Een preview-server voor testen mag; stop hem daarna weer (alleen je eigen PID).

## Valkuilen op deze pc

- GitHub-account: `camilsahnoune-8970`, nooit `Camil96`. Git heeft hier geen `user.email`: commit met omgevingsvariabelen `GIT_AUTHOR_NAME`/`GIT_COMMITTER_NAME=camilsahnoune-8970` en `GIT_AUTHOR_EMAIL`/`GIT_COMMITTER_EMAIL=camil.sahnoune@vandotec.be`.
- Push via de gh-credential, anders kan Git Credential Manager het verkeerde account nemen: `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -u origin <branch>`. Merge: `gh pr merge <n> --squash --delete-branch --match-head-commit <sha>`. Nooit force-pushen.
- Shell: PowerShell op Windows. Omgevingsvariabelen zet je met `$env:VAR = '...'`, niet met `VAR=waarde commando`.
- In de werkmap hebben de meeste bestanden CRLF-regeleinden (`core.autocrlf=true`; git zelf bewaart LF), bv. `src/pages/contact.astro`. Een zoek-en-vervang over meerdere regels vindt dan niets: wijzig per regel.
- Een oude `astro preview` laat `npm ci` falen met EPERM en bezet poort 4333; zie `tasks/QA-RUNBOOK.md`. Stop alleen je eigen processen.

## Werkwijze (spec-first)

- Geen code zonder goedgekeurde spec: kopieer `specs/_TEMPLATE.md` naar `specs/<onderwerp>.md`, vul in, Camil keurt goed, dan pas bouwen. Grote fasen lopen via GSD (de planningsmethode in `.planning/`); Spec Kit en Ralph zijn geparkeerd, gebruik ze niet (de reden is nergens vastgelegd; Camil kan het opheffen). GSD-instellingen staan in `.planning/config.json`, fasebestanden onder `.planning/phases/`. Lever PR's zelf met de commando's hieronder, niet met `gsd-ship` (dat pusht niet via de gh-credential-route).
- Vrijgesteld: kleine fixes (typo, één regel CSS, één woord tekst) — vermeld in de PR waarom geen spec nodig was.
- Na afgeronde taak: één regel in `.planning/STATE.md` (wat + welke bestanden + door wie). Bij een CLAIM ook het vinkje in `.planning/REQUIREMENTS.md` en het bijbehorende punt in `tasks/REVIEW.md`. Laat de statuscel in de traceability-tabel van `REQUIREMENTS.md` exact `Pending` tot GSD hem op `Complete` zet (`gsd_run query requirements.mark-complete <ID>`): met een opmerking in die cel zet GSD niets om. Eén CLAIM-PR tegelijk open.
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

## Voor Claude Code (startprompt, vanaf 2026-10-16)

Lees `AGENTS.md`, `.planning/STATE.md` en `tasks/QA-RUNBOOK.md`. Controleer eerst de stand: `git fetch`, `git status`, `gh pr list`, en de statische testset uit het runbook op een verse `origin/main`. Is die set rood, dan meld je dat aan Camil en repareer je niets zonder spec. Start elke taak met `git worktree add -b claude/<taak> <map buiten de repo> origin/main` (nooit vanaf een andere `claude/`-branch), kies het open punt dat `.planning/STATE.md` noemt (de actieve milestone staat in `.planning/MILESTONES.md`, de uitwerking in `specs/inhoud-waarheid.md`; de spec is goedgekeurd door de merge van PR #67), vraag Camil één beslissing per keer, open een PR en schrijf de journaalregel zoals hierboven staat.

## Voor opencode en Codex (startprompt)

Verouderd (2026-10-16): deze startprompt geldt niet meer en mag niet gevolgd worden. Claude Code bouwt (zie de sectie hierboven); opencode bouwt niet meer in deze repo.

## Documentatie

- Astro: https://docs.astro.build
- Huisstijl-details: `docs/mediakit-2026.pdf`, `tasks/beelden.md` (beeldenregister)
- Audit met status per punt: `tasks/REVIEW.md`. Beveiliging: `tasks/SECURITY-NOTITIE.md` (let op de correctie van 2026-10-12 over het wachtwoord in de historie).
- Oude plannen/designs: `docs/archief/` (alleen naslag, niet leidend)
