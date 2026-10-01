# Hosting-keuze: statisch vs PHP (beslisnotitie — geen wijziging zonder “ja”)

## Waarom dit eerst moet
Het contactformulier (`src/pages/contact.astro` → POST naar `/contact.php`) kan alleen werken
waar PHP draait. Op puur statische hosting is het formulier dood — dan is een alternatief nodig.
Deze keuze bepaalt de formulier-garantie (“aanvraag komt zeker aan”).

## Optie A — PHP-hosting (bv. Combell, waar vandotec.be nu draait)
- `public/contact.php` (eigen code, honeypot + validatie, `mail()` naar `info@vandotec.be`) werkt na één mail-test.
- Astro-`dist/` is gewone bestanden en draait overal; `contact.php` ligt ernaast — mix van statisch + PHP op één host.
- Geen extern account, geen tracker, geen nieuwe kosten voor de maker (hosting is van/bij de klant).
- Aandacht: `mail()`-afleverbaarheid testen (SPF/DKIM bij provider), redirect na verzenden (`/contact?sent=1`) tonen als bedank-melding (nu nog geen `sent`-state in `contact.astro`).
- **Aanbevolen**, tenzij de klant geen PHP-hosting (meer) heeft.

## Optie B — Puur statisch (GitHub Pages-achtig, gratis)
- `contact.php` doet niets (wordt als tekst geserveerd of genegeerd). Formulier stuk tot er een alternatief is:
  - Formspree gratis tier (50/mnd) = extern account + data bij derde → valt onder “ask first”, plus AVG-verwerker.
  - Serverless function = extra platform/account, niet gratis-overal.
  - `mailto:` = slechte UX, geen garantie.
- Voordeel: hosting gratis, geen PHP-patchzorg. Nadeel: formulier-garantie onhaalbaar zonder concessie.

## Advies
Kies **A** als vandotec.be op PHP-hosting blijft (huidige situatie): kleinste wijziging,
sterkste garantie, binnen “gratis voor de maker”. Dan rest: mail-test + `?sent=1`-bedankstate bouwen.
Kies **B** alleen als de klant hostingkosten wil schrappen — dan eerst Formspree-“ja” (account + AVG) regelen.

## Status
- [x] `<script setup>`-bug uit `contact.php` (output vóór `header()`), vervangen door PHP-comment.
- [ ] Jouw keuze A of B (antwoord met “A” of “B”).
- [ ] Daarna: testplan uitvoeren (geldig / leeg / spam-honeypot / ongeldige e-mail).
