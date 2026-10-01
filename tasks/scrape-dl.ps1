$base = 'https://www.vandotec.be'
$files = Get-Content -Path 'tasks/scrape-urls.txt' | Where-Object { $_ -match 'Files/' }
$i = 0
foreach ($rel in $files) {
  $i++
  $name = 'sc-' + $i + '-' + ([System.IO.Path]::GetFileName($rel)).Split('.')[0].Substring(0, [Math]::Min(24, ([System.IO.Path]::GetFileName($rel)).Split('.')[0].Length)) + '.jpg'
  try {
    Invoke-WebRequest -Uri ($base + '/' + $rel) -OutFile ("tasks/beelden-staging/" + $name) -UseBasicParsing -TimeoutSec 60
    $kb = [math]::Round((Get-Item ("tasks/beelden-staging/" + $name)).Length / 1KB)
    $name + ' OK ' + $kb + 'KB  <=  ' + $rel
  } catch { $name + ' MISLUKT: ' + $rel }
  Start-Sleep -Seconds 1
}
