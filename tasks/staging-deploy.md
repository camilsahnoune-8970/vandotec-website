# Deploy-handleiding staging: preview.vandotec.be (besloten preview)

Doel: klikbare, afgeschermde staging voor maker + zaakvoerder. Live-gang
vandotec.be is een aparte beslissing en gebeurt hier NIET mee.

## Stap 1 — DNS (éénmalig, in je DNS-paneel)

- Nieuw record: type **A**, host `preview`, waarde = IP van je Combell-hosting
  (staat in je hosting-paneel; alternatief: CNAME `preview` → je host-naam).
- Wachten tot het resolveert: `ping preview.vandotec.be` moet het hosting-IP tonen.
- TLS: zet in het hostingpaneel SSL aan voor het subdomein (Let's Encrypt),
  zodat de URL `https://preview.vandotec.be` wordt.

## Stap 2 — Bestanden uploaden (FileZilla / paneel file-manager)

Upload de **inhoud** van `dist/` (verse build 2026-09-19, exit 0, 19 pagina's)
naar de webroot van `preview.vandotec.be`, plus deze twee extra bestanden
(uit `tasks/`, hernoemd):

| Lokaal bestand | Uploaden als (in staging-root) | Doel |
|---|---|---|
| `tasks/staging-robots.txt` (hieronder) | `robots.txt` | Crawlers weren (laag 1, samen met noindex-header) |
| `tasks/staging-htaccess.txt` | `.htaccess` | noindex-header + Basic Auth (laag 1 + 3) |
| (zelf aanmaken, zie stap 3) | `.htpasswd` | Login-gegevens (nooit in chat/e-mail delen) |

`tasks/staging-robots.txt`:
```
User-agent: *
Disallow: /
```

## Stap 3 — Wachtwoord instellen (alleen jij, nergens delen in chat)

1. Kies een gebruikersnaam (voorstel: `vandotecpreview`) en een sterk wachtwoord.
2. Genereer lokaal de hash (wachtwoord verlaat je machine niet):
   `openssl passwd -apr1 'JOUW-WACHTWOORD-HIER'` (Git Bash / macOS-terminal;
   op Windows zonder openssl: gebruik de wachtwoord-beveiliging in je hostingpaneel).
3. Maak `.htpasswd` met exact één regel: `vandotecpreview:HASH-UIT-STAP-2`.
4. Upload `.htpasswd` naar de staging-root.
5. **Pas in `.htaccess` de regel `AuthUserFile` aan** naar het echte serverpad,
   bv. `/home/jouwaccount/domains/preview.vandotec.be/public_html/.htpasswd`
   (pad staat in je hostingpaneel; zonder juist pad werkt de login niet).
6. Deel gebruikersnaam + wachtwoord **privé** met de zaakvoerder (niet mailen naar groepen).

## Stap 4 — Checken (jij + ik)

- Jij: `https://preview.vandotec.be` → eerst login-scherm (auth werkt), daarna site.
  Zonder juiste login: HTTP 401 (correct).
- Ik (geef me het woord “check”): verifieer read-only — noindex-header aanwezig,
  `robots.txt` disallowt, homepage + contact + formulier-HTML + `contact.php` bereikbaar.
- Daarna: mail-test (`tasks/mail-test.md`, 5 gevallen) op staging.

## Opruimen (bij live-gang, niet nu)

Staging-map + DNS-record verwijderen zodra de live-site is goedgekeurd.
`.htaccess`/`.htpasswd`/`robots.txt` uit `tasks/` NOOIT meenemen naar www.
