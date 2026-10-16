---
gsd_state_version: "1.0"
milestone: v1.1
milestone_name: Inhoud-waarheid
status: unknown
last_updated: "2026-10-16T11:37:53.346Z"
state_head: c7a8195cc0216db8e2f127707e39bae831b903b3
progress:
  total_phases: 13
  completed_phases: 3
  total_plans: 1
  completed_plans: 1
  percent: 17
current_phase: 7
current_phase_name: CLAIM-11
---

# STATE.md — waar we zijn (enige waarheid, bijhouden per taak)

Bijgewerkt 2026-10-16. **Claude Code bouwt.** Camil heeft de overdracht aan opencode (12/10) op 16/10 stopgezet; alleen Claude Code bouwt nog in deze repo. De overdrachtspoort van 13/10 staat hieronder als historie.

## Waar staan we

- Site: 27 gebouwde pagina's (26 `index.html` + 404), Astro static. `npm run build` groen, `node tasks/check-seo.cjs` ALL OK.
- Tests: bij elke PR draaien twee CI-jobs, "Build + tests zonder browser" en "Browsertests (Chromium, Firefox, WebKit)". Beide zijn verplicht in `main-sluis`. Lokaal draaien: zie `tasks/QA-RUNBOOK.md`.
- Repo publiek sinds 2026-10-05 (besluit Camil). `main-sluis`: PR verplicht, lineaire historie, geen force-push, geen bypass, 0 verplichte reviews (review roteert toch: wie bouwt, reviewt niet zichzelf, zie AGENTS.md).
- Live: deze nieuwe site staat niet live; de oude site (Fork CMS) draait nog. `deploy.yml` is uitgeschakeld (alleen handmatig). Niets live zetten zonder expliciete "ja" van Camil.
- Staging geschrapt uit planning (besluit Camil 2026-10-07); het contactformulier is ongetest tot er een host is.
- Inhoud (de inhoudspunten uit `tasks/REVIEW.md`, in het gesprek "bak B" genoemd): tellers klaar (PR #64: 6.000+ en 5 landen zijn groepscijfers, bron mediakit p. 3), "geen onderaannemers" klaar (PR #65, besluit Camil: nuanceren). De rest staat hieronder.

## Rolverdeling: overdracht aan opencode stopgezet (2026-10-16)

- Rolverdeling: **Claude Code bouwt** (sinds 2026-10-16). Camil beslist, keurt specs goed en doet de smaak-review. Opencode bouwt niet meer in deze repo. Nooit twee agents tegelijk in dezelfde bestanden.
- **De Claude-schrijfstop vervalt** (besluit Camil, 2026-10-16: "ik vertrouw jou meer dan opencode, we werken dit af"). Werkwijze en spelregels: `AGENTS.md`. De uitvoering loopt in GSD-fases 6 t/m 18, zie `ROADMAP.md`.
- Startpunt: milestone v1.1 "Inhoud-waarheid": `.planning/MILESTONES.md`, `specs/inhoud-waarheid.md` (alle CLAIM-punten met feiten, bron en aanbeveling) en `.planning/REQUIREMENTS.md`. De spec is goedgekeurd (PR #67 gemerged). P1-P5 doe je pas als Camil dat item heeft goedgekeurd, met een eigen spec per item.
- Historie: opencode zou na de merge van PR #67 beginnen. Er is nooit een branch of PR van opencode voor deze milestone gekomen (gemeten 16/10: op de server staat alleen `main`).
- Alles wat Claude wist en niet in code staat, staat nu in de repo: `AGENTS.md` (regels en valkuilen), `tasks/QA-RUNBOOK.md` (testen), `tasks/REVIEW.md` (audit met status per punt), `tasks/SECURITY-NOTITIE.md`.
- Fotorondgang-branch `opencode/fotorondgang-register` (a572097): gemerged, leeg, verwijderd op 2026-10-13 (poort M7).
- Opencode-proces: Claude stopte op 2026-10-16, op Camils verzoek, het toen draaiende proces (gestart 15/10). Zolang Claude Code de enige bouwer is (`AGENTS.md`), raakt een eventueel ander opencode-proces de repo niet.

## Overdrachtspoort: status 2026-10-13, AF met erkende restrisico's (historie)

De overdracht is af: PR #67 is gemerged (`332c6e8`), en Camil heeft op 13/10 besloten M10 en M15 te sluiten met de restrisico's hieronder. De M-punten waren gaten van Claude; die zijn gesloten. Wat nog open staat, staat in de C-lijst.

| # | Eis | Status | Bewijs |
|---|---|---|---|
| M1 | Palet-controle: `#2680ff` (niet huisstijl) vervangen door navy en rood, als gate | ✓ | `tasks/verify-mediakit.cjs`: regel `huisstijl-tokens (navy, rood): true,true` |
| M2 | Staging-verwijzing in SECURITY-NOTITIE geannoteerd | ✓ | `tasks/SECURITY-NOTITIE.md` (bij "mail()"-punt) |
| M3 | Fotorondgang gemeten (niet opgelost) | ✓ | spec P4: 65 bronfoto's, 24 op naam genoemd, 41 niet |
| M4 | Prestatiebasislijn gedraaid op een eigen preview | ✓ met voorbehoud | tabel hieronder; LCP onder 100 ms op vijf pagina's lijkt onbetrouwbaar |
| M5 | Maakt `tasks/make-og.cjs` lokaal dezelfde OG-afbeelding? | ✓ | scratchtest: SHA256 gelijk aan `public/og-image.png` (gemaakt op Windows, lettertype Arial) |
| M6 | Licentie Open Sans | ✓ | OFL 1.1, copyright 2020 The Open Sans Project Authors (spec CLAIM-09) |
| M7 | Verlaten branch verwijderd | ✓ | `git branch -d`: was `a572097` |
| M8 | Staging-documenten gemarkeerd als archief | ✓ | regel 1 van `tasks/staging-upload.md` en `tasks/staging-deploy.md` |
| M9 | Geheugen en oud startplan corrigeren (buiten de repo) | ✓ | projectgeheugen "NIET AF"; kopregel in het oude plan |
| M10 | Koude lezer(s) op de eindtoestand vinden alleen nits | ✓ gesloten met erkende restrisico's (Camil, 13/10): drie rondes gedaan; ronde 3 vond blokkers, die zijn verwerkt waar Claude dat kan. Restrisico's hieronder. | commentaren op PR #67 |
| M11 | Contrastcontrole rekende met kleuren die de site niet gebruikt (`#04091f`, `#6c757d`; site: `#001647`, `#595f65`) | ✓ | `tasks/check-contrast.cjs` gecorrigeerd; met echte kleuren alle AA-controles PASS, rood-op-navy 2,76:1 (was 3,13:1). Drempel ongewijzigd |
| M12 | Stand-check op verse `origin/main` in de runbook niet getest | ✓ | worktree op `origin/main` (4311dce): `npm ci` exit 0, build 27 pagina's, Set 1 exit 0 (img-helpers, beelden, SEO, a11y, contrast, PHP); worktree verwijderd |
| M13 | `verify-mediakit.cjs` gaf exitcode 0 bij een fout | ✓ | negatieve proef: kopie met een gewist label geeft `ISSUES` en exitcode 1; echte run exitcode 0 |
| M14 | Geen procedure voor voor/na-screenshots | ✓ | `tasks/shot-pagina.cjs` getest 2026-10-13 op de home-pagina: 390 en 1440 px, volledige pagina; `screenshots/` staat in `.gitignore` |
| M15 | Gaten en tegenstrijdigheden uit de koude lezers (ronde 2 en 3): feitelijke fouten in de spec, tegenstrijdige startprompt, verkeerde check-beschrijving, PHP- en preview-commando's | ✓ gesloten met erkende restrisico's (Camil, 13/10): verwerkt waar Claude dat kan; de rest staat in de C-lijst of hieronder | commentaar op PR #67 |
| P-a | CI groen op PR #67 (beide checks) | ✓ op `8fd0ea5` (vóór de merge gecontroleerd) | `gh pr checks 67` |
| P-b | Na merge: `origin/main` = geteste boom; build en checks groen | ✓ `332c6e8` = `8fd0ea5` (`git diff` leeg); build 27 pagina's; Set 1 exit 0 | commentaar op PR #67 |
| C1 | Camil keurt PR #67 goed | ✓ 13/10 ("ja"); gemerged als `332c6e8` | |

**Erkende restrisico's (Camil, 13/10)**
1. De mediakit-PDF is in de omgeving van de koude lezers niet leesbaar (`pdftoppm` ontbreekt). Hier wel met het Read-gereedschap. Een tekstversie in de repo zou dat oplossen; dat is niet gedaan.
2. De wettelijke naam voor CLAIM-08 is niet geverifieerd (openbaar ondernemingsregister niet getest).
3. De koude lezers zijn een stand-in voor opencode, geen bewijs voor zijn echte gedrag; dat blijkt pas in zijn eerste sessie.
4. CLAIM-10 (verbergen) heeft nog geen ontwerp voor de verberg-vlag; het voorstel staat in de spec.
5. Ronde 3 vond ook zaken die bewust niet zijn gerepareerd: `ci.yml:69` heeft "26 pagina's" in een stapnaam; `@astrojs/sitemap` staat in devDependencies en wordt niet gebruikt; `deploy.yml:4` noemt nog `new.powerland.be` (workflow is uitgeschakeld).

**Basislijn snelheid** (`tasks/perf-meten.cjs`, 390 px, cache uit, eigen preview op 4333, 2026-10-13):

| pagina | KB totaal | KB beelden | verzoeken | LCP ms | CLS |
|---|---|---|---|---|---|
| `/` | 412 | 156 | 13 | 1588 | 0 |
| `/expertises` | 536 | 265 | 14 | 96 | 0 |
| `/service-onderhoud` | 332 | 81 | 11 | 72 | 0 |
| `/over-vandotec` | 592 | 411 | 15 | 72 | 0 |
| `/jobs` | 275 | 107 | 10 | 52 | 0.003 |
| `/contact` | 489 | 238 | 14 | 64 | 0.019 |
| `/cookies` | 169 | 21 | 7 | 728 | 0 |
| `/privacy` | 170 | 21 | 7 | 712 | 0 |
| `/disclaimer` | 169 | 21 | 7 | 700 | 0 |
| `/algemenevoorwaarden` | 169 | 21 | 7 | 120 | 0 |
| `/404` | 243 | 95 | 8 | 152 | 0 |

Gemeten, niet beoordeeld: op `/over-vandotec` zit 411 KB aan beelden op een gsm-breedte. De LCP-waarden onder 100 ms zijn niet betrouwbaar (zie spec P5).

## Wat loopt

- Fotorondgang Beelden: gemeten 2026-10-13 zijn er 65 bronfoto's lokaal (`Beelden/`, door git genegeerd); 41 daarvan staan niet op naam in `tasks/beelden.md`. De groepsindeling uit de vorige STATE staat niet in de repo. Of het werk nog loopt, is in de repo niet te zien (spec P4).
- Mazout-teksten volgen later (foto's gestaged, nog geen entry).

## Wacht op Camil (C-lijst: zijn besluiten, geen gaten van Claude)

- **C1.** PR #67 goedkeuren: mergen of "ja" zeggen. Dit is de laatste stap van de poort.
- **C2.** 24/7 interventiedienst (CLAIM-03): bestaat er een echte wachtdienst? "24/7" staat in `src/` op 24 regels in 10 bestanden (plus 2× "24 uur per dag"), en ook in de OG-afbeelding `public/og-image.png`. Geen bron.
- ✓ **C3** afgehandeld 16/10 (besluit Camil): het oude CMS-wachtwoord is vervangen door Camil. Restrisico, geaccepteerd: de oude waarde blijft in de publieke git-historie; herschrijven is niet besloten. Zie `tasks/SECURITY-NOTITIE.md`.
- ✓ **C4** afgehandeld 16/10 (besluit Camil): secret scanning, push protection en Dependabot-beveiligingsupdates aangezet in de GitHub-instellingen; gecontroleerd via de GitHub-API (alle drie `enabled`).
- ✓ **C5** afgehandeld 16/10 (besluit Camil): `.vercel/`, `.hermes/plans/` en `archive-legacy-html/` (14 bestanden) uit de huidige versie gehaald. De git-historie bewaart ze nog; die herschrijven we niet. `.vercel/` staat nu in `.gitignore`.
- **C6.** Contactformulier: afzender `info@vandotec.be` werkt alleen bij hosting via Combell (SPF vandotec.be eindigt op `-all`, zie PR #52). Hoort bij de hostingkeuze.
- **C7.** Inhoudsbesluiten CLAIM-04 t/m 10 en 12 t/m 14, één per vraag (Claude Code legt ze voor, in de GSD-fases 8 t/m 17). CLAIM-11 sluit Claude Code zelf (fase 7).
- ✓ **C8** afgehandeld 16/10 (besluit Camil): middenblauw `#2680FF` blijft van de site. De mediakit noemt het, maar AGENTS.md zegt alleen navy en rood; niets gewijzigd.
- **C9.** Lopend werk buiten de specs: EV-stockfoto vervangen bij de Powerland-laderfoto; witte logo-variant; jobs-teksten; beheerlaag-keuze; rood-telling hero (a/b/laat zo); locatie-aanvinkingen. Tijdelijke tekst op de privacypagina: `privacy.astro:39` zegt dat een beeld "wordt vervangen door een eigen foto zodra beschikbaar" (een placeholder volgens AGENTS.md).
- ✓ **C10** bewust gelaten 16/10 (besluit Camil): de echte screenreader- en iPhone-Safari-test kan in deze omgeving niet worden uitgevoerd. Laag prioriteit; restrisico erkend. Basis gedaan in PR #14.
- **C11.** Vercel: op PR #67 verschijnen de checks "Vercel" en "Vercel Preview Comments" (project `vandotec/vandotec-website`). Claude heeft die koppeling niet aangezet en weet niet wie dat deed. Is die koppeling gewenst? Zo nee: loskoppelen is een besluit van Camil.

## Journaal (nieuwste bovenaan; oudere regels staan niet strikt op volgorde)

- 2026-10-16 fase 6 "Herstel en rolwissel" afgerond (claude): Claude Code bouwt (AGENTS, STATE, MILESTONES, spec), ROADMAP.md in GSD-sjabloon (v1.1 = fase 6 t/m 18), `.planning/config.json`, fasebestanden onder `.planning/phases/`, mediakit p. 3, 4, 5, 6, 10 gecontroleerd met PyMuPDF, QA-RUNBOOK bijgewerkt. Basislijn op `9c0ce09` groen (27 pagina's).
- 2026-10-16 C3, C8 en C10 afgehandeld (claude, besluit Camil): wachtwoord vervangen (restrisico historie geaccepteerd), #2680FF blijft weg, Safari/schermlezer-test bewust gelaten. SECURITY-NOTITIE bijgewerkt.
- 2026-10-16 C4 en C5 afgehandeld (claude, besluit Camil): GitHub-beveiliging aan (secret scanning, push protection, Dependabot), 14 oude bestanden uit de huidige versie, `.vercel/` in `.gitignore`. Opencode-proces gestopt op Camils verzoek.
- 2026-10-13 overdracht af met erkende restrisico's: PR #67 gemerged als `332c6e8` (Camil "ja"), P-b gecontroleerd, M10 en M15 gesloten door Camil (claude)
- 2026-10-13 overdrachtspoort M1-M15 op PR #67 (claude): verify-mediakit huisstijl-gate (navy/rood, was #2680ff), QA-RUNBOOK, ARCHIEF-regels staging-docs, SECURITY-NOTITIE (staging, GitHub-beveiliging uit), spec P4/P5/CLAIM-03/CLAIM-09 gemeten, branch `opencode/fotorondgang-register` verwijderd, perf-basislijn, OG-test (0 bytes verschil), koude lezers. Overdracht NIET AF tot poort groen en C1.

- 2026-10-12 milestone v1.1 "Inhoud-waarheid": `specs/inhoud-waarheid.md`, MILESTONES, REQUIREMENTS (CLAIM-01..12), ROADMAP-statusregel, startprompt; tweede koude-starttest verwerkt (CLAIM-12 erbij, bronverwijzingen rechtgezet) (claude)
- 2026-10-12 overdracht aan opencode via PR #66: STATE, AGENTS, `tasks/QA-RUNBOOK.md`, README, PR-sjabloon, SECURITY-NOTITIE (wachtwoord in historie gecorrigeerd), `.gitignore`; tweede paar ogen via koude-starttest (claude)
- 2026-10-12 absoluut "geen onderaannemers" geschrapt via PR #65 (10 plaatsen; hero-blok nu "Eigen / Vaste ploegen"; FAQ "Werken jullie met eigen ploegen? Ja") (claude)
- 2026-10-11 tellers 6.000+ en 5 landen als groepscijfers via PR #64 ("Projecten (groep)", "Landen actief (groep)"; bron mediakit p. 3; `verify-mediakit.cjs` volgt de site weer) (claude)
- 2026-10-07 STATE rechtgezet + branches opgeruimd (opencode)
- 2026-10-07 spec review-ronde goedgekeurd via PR #34 (audit loopt)
- 2026-10-08 integrale audit via PR #36 (REVIEW.md: 5 Critical, fix-rondes R1-R5)
- 2026-10-08 fix-ronde R1 via PR #38 (D-Glas naam+alt, override, srcset, cookies)
- 2026-10-08 afstand Alle-realisaties via PR #40 (kleine fix)
- 2026-10-08 uniforme slotband via PR #41 (ConnectGrid-partial, -35 regels)
- 2026-10-09 spec expertises-uniformiteit via PR #43 + uitvoering via PR #44 (advice-band weg, exp-num overal)
- 2026-10-09 urgency-light contrastfix via PR #46 (witte eyebrow/links op licht → navy)
- 2026-10-09 spec service-blok-licht via PR #48 + uitvoering via PR #49 (home service-overzicht licht)
- 2026-10-11 foutenronde-claude: spec via PR #51 + contactformulier via PR #52 (berichten met Enter werden geweigerd, afzender eigen domein, grenzen) + site-fouten via PR #53 (modal-foto's werkten nooit, dialogen gecentreerd, mobiele scroll /expertises, lightbox-navigatie, ticker-pauze, print, beeldafmetingen/srcset, dode code; tests tasks/qa-*.cjs + test-contact.php) (claude)
- 2026-10-11 tests automatisch op elke PR via PR #55 (CI; check-scripts geven nu echt een foutcode) + beveiligingsupdates via PR #57 (npm audit 12 -> 0; astro 7.3.5, sharp 0.35.5) + opruim via PR #59 (hoofdmap naar docs/archief) + lichtere beelden via PR #58 (gsm -28%, logo 102 -> 14 KB) (claude)
- 2026-10-11 WCAG-audit axe-core via PR #60 (59 -> 0) + werkadressen uit docs via PR #62 + oude Vercel-kopie (website-group-vandotec.vercel.app) verwijderd, nu 404; CI verplicht in main-sluis (claude)
- 2026-10-07 contentronde 4 via PR #32 (D-Glas-entry met 7 foto's)
- 2026-10-07 contentronde 3 via PR #30 (Demarol-entry + Cools-tankfoto)
- 2026-10-07 contentronde 2 via PR #28 (Avia-pompen bij Cools, kraanwagen in over-galerij)
- 2026-10-07 contentronde 1 via PR #25 (7 werffoto’s: Cools/Maes-galerijen, Mazout staged)
- 2026-10-07 werfblokken V1+V4 via PR #23 + footer-quote weg via PR #22 (opencode)
- 2026-10-07 realisaties-pilot via PR #20 (hub + 14 projectpagina’s, template klaar)
- 2026-10-06 mrsolar-lessen via PR #18 (advies-CTA, contactstrook, cijferband omhoog)
- 2026-10-06 onderhoudsronde E via PR #16 (utilities, motion-doc, securityfixes, reviews)
- 2026-10-06 QA-ronde D via PR #14 (eerste spec-protocol-ronde: browsers, koppen, print)
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
