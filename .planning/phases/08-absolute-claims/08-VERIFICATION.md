---
phase: "08"
name: "Absolute claims"
created: 2026-10-16
status: human_needed
---

# Phase 8: Absolute claims — Verification

## Goal-Backward Verification

**Phase Goal:** "24/7" en "elk project/elke interventie in eigen beheer" staan niet meer als ongedekte bewering op de site.

## Checks

| # | Succescriterium | Status | Evidence |
|---|-----------------|--------|----------|
| 1 | "24/7" staat nergens meer in `dist/` en niet in de OG-afbeelding | ✓ | `grep` in `dist/` (html, xml, txt, json): "24/7" 0 (was 24 in `src/`), "24 uur per dag" 0. OG-afbeelding bekeken: "Sinds 1978 · VCA-gecertificeerd · Interventiedienst"; echt PNG (`89504e47`), 47.316 bytes. |
| 2 | Absolute "eigen beheer"-zinnen op één lijn met CLAIM-02; Voka-citaat onveranderd | ✓ | "Elk project wordt uitgevoerd" 0, "Elke interventie wordt uitgevoerd" 0, "elk project in eigen beheer" 0; "elk project volledig in eigen beheer" (Voka) precies 1; `git diff` raakt `over-vandotec.astro:166` niet (`cat -A` door het tweede paar ogen: byte-identiek). |
| 3 | Build, SEO-, a11y- en mediakit-controles groen | ✓ | Bevestigingsronde op de definitieve tekst: alle 14 scripts exit 0 (build 27 pagina's; Set 1 zonder server; `verify-mediakit` `MEDIAKIT-RONDE OK`; Set 2 met preview op 4333: interactie, axe 0 treffers op 52 metingen, crawl 26 pagina's x 5 breedtes 0 meldingen, srcset 0 problemen, Firefox + WebKit OK, print OK). Een eerdere ronde vóór twee tekstaanpassingen was ook volledig groen (`l4-na-ronde1.log`). |
| 4 | Camil keurde het voor/na goed | ⏳ wacht op zijn ja | Voor/na-tekst in de PR; screenshots `fase08-voor-*` en `fase08-na-*` (390 en 1440; home, over, service, contact) in `screenshots/`. |

Tweede paar ogen (verse subagent, één ronde): geen blokkerende fouten; twee tekstpunten verwerkt; één REQUIREMENTS-punt was verwacht (wordt via `requirements.mark-complete` gezet); "meteen/direct"-beloftes zonder SLA blijven bewust buiten deze milestone (zie 08-CONTEXT).

Niet geverifieerd: echte schermlezer en iPhone-Safari (bewust gelaten, C10); de "voor/na"-oordeel over smaak ligt bij Camil.

## Result

**human_needed:** alle meetbare criteria zijn gehaald; de merge wacht op Camils "ja" op het voor/na.
