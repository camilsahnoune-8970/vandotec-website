# Mail-test contactformulier (uit te voeren op PHP-host — niet lokaal mogelijk)

`public/contact.php` gebruikt `mail()` naar `info@vandotec.be`. `astro preview`
draait geen PHP; deze test kan alleen op de hosting (keuze A).

## Voorbereiding (host)

1. Zet de gebouwde `dist/`-inhoud op de PHP-host (inclusief `contact.php` in root).
2. Controleer SPF/DKIM voor `vandotec.be` (vraag host/IT als mails niet aankomen).

## Testgevallen

| # | Actie | Verwacht |
|---|---|---|
| 1 | Geldige aanvraag (naam + e-mail + bericht, onderwerp Offerte) | Redirect naar `/contact?sent=1` + bedank-melding zichtbaar + mail in `info@vandotec.be` |
| 2 | Leeg verplicht veld | HTTP 400 + melding “Alle velden gemarkeerd met * zijn verplicht.”, géén mail |
| 3 | Ongeldig e-mailadres (`geenmail`) | HTTP 400 + “Ongeldig e-mailadres”, géén mail |
| 4 | Honeypot-veld `website` gevuld (spam-simulatie) | HTTP 404, géén mail, géén redirect |
| 5 | GET op `/contact.php` (geen POST) | HTTP 405 “Method not allowed” |

## Bij falen

- Geen mail bij #1: check `mail()`-logs bij host, SPF/DKIM, spamfolder van `info@vandotec.be`.
- Geen redirect: check dat `contact.php` als eerste output `<?php` heeft (geen BOM/whitespace).
