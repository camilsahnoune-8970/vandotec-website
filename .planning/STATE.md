# STATE.md — waar we zijn (enige waarheid, bijhouden per taak)

Bijgewerkt 2026-10-12, bij de overdracht van Claude Code naar opencode.

## Waar staan we

- Site: 27 gebouwde pagina's (26 `index.html` + 404), Astro static. `npm run build` groen, `node tasks/check-seo.cjs` ALL OK.
- Tests: bij elke PR draaien twee CI-jobs, "Build + tests zonder browser" en "Browsertests (Chromium, Firefox, WebKit)". Beide zijn verplicht in `main-sluis`. Lokaal draaien: zie `tasks/QA-RUNBOOK.md`.
- Repo publiek sinds 2026-10-05 (besluit Camil). `main-sluis`: PR verplicht, lineaire historie, geen force-push, geen bypass, 0 verplichte reviews (review roteert toch: wie bouwt, reviewt niet zichzelf, zie AGENTS.md).
- Live: deze nieuwe site staat niet live; de oude site (Fork CMS) draait nog. `deploy.yml` is uitgeschakeld (alleen handmatig). Niets live zetten zonder expliciete "ja" van Camil.
- Staging geschrapt uit planning (besluit Camil 2026-10-07); het contactformulier is ongetest tot er een host is.
- Inhoud (bak B uit `tasks/REVIEW.md`): tellers klaar (PR #64: 6.000+ en 5 landen zijn groepscijfers, bron mediakit p. 3), "geen onderaannemers" klaar (PR #65, besluit Camil: nuanceren). De rest staat hieronder.

## Overdracht Claude → opencode (2026-10-12)

- Rolverdeling: **opencode bouwt**. Camil beslist, keurt specs goed en doet de smaak-review. Claude reviewt of herstelt technisch alleen op verzoek van Camil.
- **Claude-schrijfstop**: Claude schrijft niet meer in deze repo tot Camil om een review of hotfix vraagt. Nooit twee agents tegelijk in dezelfde bestanden.
- Startpunt: milestone v1.1 "Inhoud-waarheid", ter goedkeuring via een aparte PR (`claude/milestone-v1-1`). Tot die PR gemerged is, bouwt niemand aan de CLAIM-punten hieronder.
- Alles wat Claude wist en niet in code staat, staat nu in de repo: `AGENTS.md` (regels en valkuilen), `tasks/QA-RUNBOOK.md` (testen), `tasks/REVIEW.md` (audit met status per punt), `tasks/SECURITY-NOTITIE.md`.
- Gemeten bij de overdracht: de lokale branch `opencode/fotorondgang-register` staat op `a572097` (2026-10-07), is volledig gemerged en bestaat niet op origin. Hij bevat geen werk en mag weg.

## Wat loopt

- Fotorondgang Beelden (groepen 1–3 deels benoemd; groep 2-rest + groep 4+ open), volgens de vorige STATE. **Door Claude niet geverifieerd**: opencode meldt of dit nog loopt en waar het werk staat.
- Mazout-teksten volgen later (foto's gestaged, nog geen entry).

## Geblokkeerd / wacht op Camil

1. 24/7 interventiedienst (CLAIM-03): Camil vraagt na of er een echte wachtdienst bestaat. "24/7" staat in `src/` op 24 regels in 10 bestanden (plus 2× "24 uur per dag"), en ook de OG-afbeelding `public/og-image.png` (gemaakt met `tasks/make-og.cjs:14`) zegt "24/7 interventie". Geen bron.
2. Overige inhoudsbesluiten, één per vraag: superlatieven, certificaatnummers, merknamen, groene luifel, identiteitsblok privacy, Google Fonts zelf hosten, dunne referenties, Powerhub-tijdlijn.
3. Het oude CMS-wachtwoord staat in de publieke git-historie (uit de bestanden sinds PR #59). Camil bevestigt of hij het nog ergens gebruikt. Historie herschrijven is een apart besluit, geen taak voor opencode. Zie `tasks/SECURITY-NOTITIE.md`.
4. Contactformulier: afzender `info@vandotec.be` werkt alleen bij hosting via Combell (SPF vandotec.be eindigt op `-all`, zie PR #52); hoort bij de hostingkeuze.
5. EV-stockfoto vervangen bij Powerland-laderfoto; witte logo-variant; jobs-teksten; beheerlaag-keuze; rood-telling hero (a/b/laat zo); locatie-aanvinkingen.
6. Technisch open (laag prio): echte screenreader- en Safari-op-iPhone-test (basis gedaan in PR #14).
7. Opruimen in de publieke repo, besluit Camil: `.vercel/` (het Vercel-project is verwijderd; het bestand bevat projectId, orgId en projectName), `.hermes/plans/` en `archive-legacy-html/` zijn nog gevolgd door git (14 bestanden gemeten). Ook `tasks/staging-upload.md` en `deploy.yml` zijn oud.

## Journaal (nieuwste bovenaan; oudere regels staan niet strikt op volgorde)

- 2026-10-12 overdracht aan opencode: STATE, AGENTS, `tasks/QA-RUNBOOK.md`, SECURITY-NOTITIE (wachtwoord in historie gecorrigeerd), `.gitignore` (claude)
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
