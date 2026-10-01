$base = 'https://www.vandotec.be'
$urls = @('https://www.vandotec.be/nl/expertises/categorie/tankstations','https://www.vandotec.be/nl/expertises/categorie/infrastructuur-en-civiele-werken','https://www.vandotec.be/nl/services/project-management','https://www.vandotec.be/nl/services/totaalprojecten','https://www.vandotec.be/nl/services/onderhoud','https://www.vandotec.be/nl/services/technieken','https://www.vandotec.be/nl/offerte-aanvraag')
$pat = 'Files/(Pages/UserTemplate/[A-Za-z0-9/\-_@.]+\.(jpg|jpeg|png)|Cache/photoswipe_max_size/src/Frontend/Files/(Pages|Expertise)/[A-Za-z0-9/\-_.]+\.(jpg|jpeg)|Cache/card_thumbnail/src/Frontend/Files/Expertise/(Type|Expertise)/[A-Za-z0-9/\-_.]+\.jpeg|MediaLibrary/11/belac[^"]*\.(jpg|png))'
$found = @()
foreach ($u in $urls) {
  try {
    $h = (Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 20).Content
    $m = [regex]::Matches($h, $pat)
    foreach ($x in $m) { $found += $x.Value }
  } catch { }
}
$found | Sort-Object -Unique | Out-File -Append -Encoding utf8 tasks/scrape-urls.txt
'klaar'
