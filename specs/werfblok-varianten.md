# SPEC: werfblok-varianten (ter vervanging home-rail “Van onze werven”)

Status: goedgekeurd door Camil 2026-10-07 (Maes De Panne + beide varianten) — in uitvoering.

## 1. Doel (één zin)

Eén winnend “uitgelicht project”-blok op home ter vervanging van de fotorail
met lightbox; verliezer wordt vóór merge verwijderd.

## 2. Context

Realisaties-ambitie: projecten tonen met beeld + uitleg. Onderwerp objectief
gekozen: Maes De Panne (3 foto’s, 466 KB, sneeuwbeeld). Twee Awwwards-vertaalde
types ter vergelijking op screenshots; Camil kiest op beeld.

## 3. Scope

- Wél:
  - V1 redactionele split: grote foto links, verhaal rechts (eyebrow
    “Uitgelicht project”, titel, 2–3 zinnen uit bestaande feiten, feitenrij,
    knop naar `/realisaties/maes-de-panne`).
  - V2 full-bleed band: foto over volle breedte, zwevende navy-kaart met
    verhaal + feiten + knop, bestaande parallax-techniek.
  - Beide hergebruiken bestaande componenten/klassen waar mogelijk; rail +
    lightbox op home verdwijnt (blijft elders bestaan).
- Uitdrukkelijk níet: nieuwe claims (alleen bestaande feiten), nieuwe kleuren,
  beide varianten tegelijk live, nav-wijzigingen.

## 4. Acceptatiecriteria (meetbaar, afvinkbaar)

- [ ] V1 en V2 elk gescreenshot (1440/390) ter vergelijking
- [ ] Camil kiest winnaar; verliezer verwijderd vóór PR
- [ ] Winnaar: 1 rode knop, geen blauw-op-blauw, responsive zonder overflow
- [ ] `npm run build` groen, `node tasks/check-seo.cjs` ALL OK

## 5. Verificatie

Build + SEO-check, screenshots beide varianten, winnaar-screenshot in PR.

## 6. Smaak-check

- [x] Nodig (Camil kiest op beeld)

## V3 — “Drie werven, één aanpak” (tab-verkenner, WERKPLAATS-gebaar)

Interactieve tabs met 3 echte projecten (Maes De Panne, Van Assche Zulte,
Spilmont Hautrage — alle drie met eigen foto’s): per tab foto + 1 zin + feiten
+ link naar detailpagina. Fundamenteel anders dan alles op de site (geen enkel
blok laat de bezoeker kiezen). Techniek: bestaande pill-/tab-logica
(`ref-pills`-patroon), geen nieuwe libraries.

## V4 — “Wie ons al vond” (klanten-ticker, TELEX-gebaar)

Smal typografisch lint met klantnamen + plaatsen (uit de 14 bestaande refs,
geen nieuwe content): langzaam lopend, pauzeert bij hover en bij
reduced-motion (uit). Totaal ander gebaar dan alle foto-blokken; bovendien
SEO-zichtbare klantnamen op home. Techniek: pure CSS-marquee, max 1 rode accent
(eyebrow-streepje), voor de rest navy-in-licht of wit-op-navy naar smaak.

## Status

- V1 (split) en V4 (ticker) beide live via PR #23 (2026-10-07), goedgekeurd door Camil.
- V2 (full-bleed-kaart) vervallen als moment-band-dubbel — verwijderd.
- V3 (tab-verkenner) geparkeerd.
