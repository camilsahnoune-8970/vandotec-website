$base = 'https://www.vandotec.be'
$rels = Get-Content -Path 'tasks/scrape-urls.txt' | Where-Object { $_ -match 'Files/' } | ForEach-Object { $_.Trim() }
$names = @{
  'vandotec-overons1.jpg' = 'ov-1.jpg'; 'vandotec-overons3.jpg' = 'ov-3.jpg'
  'vandotec-overons5.jpg' = 'ov-5.jpg'; 'vandotec-overons7.jpg' = 'ov-7.jpg'
  'vca-logo-2.png' = 'vca-logo-2.png'; 'efacec-qc60-655x420.jpg' = 'ev-efacec.jpg'
  'icnh-duo-cluster.jpg' = 'ev-icnh.jpg'; 'inch-hero-3b.jpg' = 'ev-inch.jpg'
  'product-3.jpg' = 'ev-product.jpg'; 'over-ons_1637743259.jpg' = 'ov-header.jpg'
  'ev-laadinstallaties_1637573563.jpg' = 'ev-header.jpg'; 'offerte-aanvraag_1637744783.jpg' = 'offerte-header.jpg'
  'onderhoud_1641474771.jpg' = 'srv-h-onderhoud.jpg'; 'one-stop-shop_1641474672.jpg' = 'srv-h-onestop.jpg'
  'project-management_1637571276.jpg' = 'srv-h-projmanagement.jpg'; 'technieken_1641474815.jpg' = 'srv-h-technieken.jpg'
  'belac-logo-accreditatie.jpg' = 'belac-logo.jpg'; '8.jpeg' = 'srv-8.jpg'
  'img-1210.jpg' = 'srv-1210.jpg'; 'installatie-onderhoud.jpg' = 'srv-install.jpg'
  'large-thumbnail.jpg' = 'srv-large.jpg'; 'lng-tankstation-antwerpen-zoemin-fotografie-scaled.jpg' = 'lng-antwerpen.jpg'
  'p1030791.jpg' = 'srv-p1030791.jpg'
}
$UA = 'VandotecWebsite/1.0 (bouw; contact info@vandotec.be)'
$tn = 0
$infr = 0
foreach ($rel in $rels) {
  $fn = [System.IO.Path]::GetFileName($rel)
  $dest = $null
  $label = $fn
  if ($names.ContainsKey($fn)) { $dest = 'tasks/beelden-staging/' + $names[$fn]; $label = $names[$fn] }
  elseif ($rel -match 'Expertise/Type/MainImage') { $tn++; $dest = 'tasks/beelden-staging/tank-type-' + $tn + '.jpg'; $label = 'tank-type-' + $tn }
  elseif ($rel -match 'Expertise/Expertise/MainImage') { $infr++; $dest = 'tasks/beelden-staging/infra-thumb-' + $infr + '.jpg'; $label = 'infra-thumb-' + $infr }
  elseif ($rel -match 'Expertise/Category/MainImage') { continue }
  else { continue }
  try {
    Invoke-WebRequest -Uri ($base + '/' + $rel) -OutFile $dest -UseBasicParsing -TimeoutSec 60 -UserAgent $UA
    $kb = [math]::Round((Get-Item $dest).Length / 1KB)
    $label + ' OK ' + $kb + 'KB'
  } catch { $label + ' MISLUKT: ' + $_.Exception.Message.Substring(0, 100) }
  Start-Sleep -Seconds 2
}
