# Security-notitie (E3, 2026-10-06)

GSD secure-phase is fase-gebonden (geen fase met threat-model hier), dus als
proportionele statische review uitgevoerd op het enige dynamische punt:
`public/contact.php` (geen auth, geen DB, geen sessies, geen third-party).

## Gevonden en gefixt

1. **Header-injectie-check onvolledig** — regex keek alleen naar het paar `\r\n`;
   losse CR of LF glipten door in `From:`/`Reply-To`/onderwerp. Nu: `/[\r\n]/`.
2. **Redirect via `HTTP_HOST`** — host-header bepaalde de redirect na verzending
   (open-redirect-risico). Nu: relatieve `Location: /contact?sent=1`.

## Bewust geaccepteerd (geen blockers)

- Geen rate-limit/CAPTCHA: honeypot + validatie volstaan voor een B2B-formulier
  met laag volume; bij misbruik alsnog toevoegen (meten in ronde C).
- Geen CSRF-token: geen sessie/auth, impact beperkt tot spam-mail.
- `mail()` zonder `-f` envelope-sender: deliverability hangt van de host af;
  verifiëren bij de staging-test (ronde C).
- E-mailvalidatie via `FILTER_VALIDATE_EMAIL`; alle velden verplichte-velden-check
  server-side (naast client-side `required`).

Geen secrets, tokens of wachtwoorden in repo of historie (scan 2026-10-05).
