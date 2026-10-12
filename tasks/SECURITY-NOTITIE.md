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

## Correctie 2026-10-12 (Claude)

De regel "Geen secrets, tokens of wachtwoorden in repo of historie (scan 2026-10-05)" klopte niet.
`git log --all -S"<wachtwoord>"` vindt het oude wachtwoord van het eigen CMS (`/beheer`) in meerdere
commits van de publieke historie, onder meer `395d89e`, `7506ab3` en `75b65ad`. Sinds PR #59 staat het
niet meer in de bestanden; de historie bevat het nog steeds. De waarde staat bewust niet in dit document.

- **Open actie voor Camil:** gebruikt hij dat wachtwoord nog ergens? Zo ja, vervang het daar. Een
  wachtwoord in een publieke historie geldt als bekend.
- Historie herschrijven (force-push) is een apart besluit van Camil. De sluis `main-sluis` verbiedt
  force-push; geen taak voor opencode.
- Gevonden bij de overdracht: `.vercel/project.json` staat in git en bevat `projectId`, `orgId` en `projectName` van het inmiddels verwijderde Vercel-project. Dat zijn identifiers (aanname: geen geheimen; ik las alleen de sleutelnamen); opruimen is een besluit van Camil (zie `.planning/STATE.md`).
- Niet gecontroleerd: andere geheimen dan dit wachtwoord (token, API-sleutel). Bij een nieuwe scan:
  noem de zoekmethode en het aantal treffers.
