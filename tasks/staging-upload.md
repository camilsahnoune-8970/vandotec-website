# Staging-upload new.powerland.be — instructies voor Camil (2026-10-01)
# Doel: klikbare staging achter Cloudflare Access, niet indexeerbaar, formulier echt testbaar.

## 0. Stand
- GitHub-workflow uitgeschakeld: niets deployt nog automatisch publiek.
- Repo privé; `dist/` is lokaal gebouwd en geverifieerd (build groen, SEO 11/11).

## 1. Uploaden (Camil, via Combell)
1. Neem de volledige inhoud van de lokale map `dist/` (dus index.html, contact/, expertises/, img/, style.css, contact.php, enzovoort).
2. Upload alles naar de webroot die bij `new.powerland.be` hoort.
3. Vervang daarna `robots.txt` op staging door `tasks/staging-robots.txt` uit deze repo (inhoud: `Disallow: /` voor alles).
4. Plaats onderstaande `.htaccess`-regels op staging (Apache/Combell) zodat elke pagina een noindex-header krijgt
   (extra laag bovenop Cloudflare Access — crawlers komen er toch al niet door):

```
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow, noarchive"
</IfModule>
```

5. Test het formulier: verstuur een proefbericht — het moet echt aankomen op info@vandotec.be (PHP draait op Combell).

## 2. Deur ervoor (Camil, in Cloudflare Zero Trust — zelfde plek als content.powerland.be)
1. DNS: `new.powerland.be` naar de Combell-server, oranje wolkje aan (proxied).
2. Access-applicatie voor `new.powerland.be`, allowlist exact:
   - camil.sahnoune@vandotec.be
   - kevin.bervoet@vandotec.be
   Verder niemand. Ieder logt in met een eigen e-mailcode; geen gedeelde wachtwoorden.
3. Test zonder inloggen (privévenster): geen toegang. Test met code: volledige site.

## 3. Aan Kevin bezorgen
- Alleen de URL `https://new.powerland.be/` — hij logt in met zijn eigen e-mailcode.
- Geen repo-toegang, geen wachtwoorden, geen FTP-gegevens delen.

## 4. Bijwerken van staging (volgende rondes)
1. Agent bouwt lokaal (`npm run build`), verifieert, commit + push.
2. Camil uploadt `dist/` opnieuw (alleen gewijzigde bestanden volstaat).
3. `robots.txt` (staging-variant) en `.htaccess`-regel blijven staan — niet overschrijven.
