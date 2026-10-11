<?php
// Test voor public/contact.php zonder echte mail.
// Gebruik: php tasks/test-contact.php
// Start PHP's ingebouwde server op public/ met VD_MAIL_DRYRUN, post goede en kwaadaardige
// invoer en controleert statuscode + de koppen van de "verzonden" mail. Exit 0 = alles OK.
$root = dirname(__DIR__);
$dump = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'vd-mail-' . getmypid() . '.txt';
$port = 8099;
putenv('VD_MAIL_DRYRUN=' . $dump);
if (@fsockopen('127.0.0.1', $port)) { fwrite(STDERR, "poort $port is al bezet: stop eerst die server\n"); exit(2); }
$cmd = escapeshellarg(PHP_BINARY) . " -S 127.0.0.1:$port -t " . escapeshellarg($root . '/public');
$proc = proc_open($cmd, [['pipe', 'r'], ['file', sys_get_temp_dir() . '/vd-php-server.log', 'a'], ['file', sys_get_temp_dir() . '/vd-php-server.log', 'a']], $pipes, null, null, ['bypass_shell' => true]);
for ($i = 0; $i < 50 && !@fsockopen('127.0.0.1', $port); $i++) usleep(100000);

function post($fields) {
    global $port;
    $ctx = stream_context_create(['http' => [
        'method' => 'POST', 'follow_location' => 0, 'ignore_errors' => true,
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($fields),
    ]]);
    $body = file_get_contents("http://127.0.0.1:$port/contact.php", false, $ctx);
    preg_match('#HTTP/\S+ (\d+)#', $http_response_header[0], $m);
    return [(int)$m[1], $body, implode("\n", $http_response_header)];
}

$ok = ['name' => 'Jan Peeters', 'email' => 'jan@example.com', 'phone' => '+32 470 00 00 00',
       'subject' => 'offerte', 'message' => "Graag een offerte.\r\nTwee lijnen.", 'website' => '']; // CRLF: zo verstuurt een browser een textarea
$fails = 0;
function check($label, $cond, $extra = '') { global $fails; echo ($cond ? 'OK   ' : 'FAAL ') . $label . ($extra ? " ($extra)" : '') . "\n"; if (!$cond) $fails++; }
// Body van de gedumpte mail, gedecodeerd zoals een mailprogramma dat doet
function body($mail) {
    $parts = explode("\r\n\r\n", $mail, 2);
    if (count($parts) < 2) return '';
    return preg_match('/^Content-Transfer-Encoding: base64\r?$/mi', $parts[0]) ? base64_decode($parts[1]) : $parts[1];
}

// 1. Geldige invoer: 302 naar /contact?sent=1, mail met vaste afzender
@unlink($dump);
[$code, , $hdrs] = post($ok);
$mail = @file_get_contents($dump) ?: '';
check('geldige invoer geeft 302 naar /contact?sent=1', $code === 302 && strpos($hdrs, 'Location: /contact?sent=1') !== false);
check('From is ons eigen domein, niet de bezoeker', (bool)preg_match('/^From: .*<info@vandotec\.be>\r?$/m', $mail) && !preg_match('/^From:.*example\.com/m', $mail));
check('Reply-To is de bezoeker', (bool)preg_match('/^Reply-To: jan@example\.com\r?$/m', $mail));
check('onderwerp is de label uit de lijst', strpos($mail, 'Subject: [Vandotec] Offerte aanvragen') !== false);
check('bericht over meerdere regels komt ongeschonden in de mail', strpos(body($mail), 'Graag een offerte.' . chr(10) . 'Twee lijnen.') !== false);
check('geen losse CR in de body (CRLF uit de browser genormaliseerd)', strpos(body($mail), chr(13)) === false);

// Browser telt een regeleinde als 1 teken voor maxlength maar verstuurt CRLF (2 tekens)
@unlink($dump);
[$code] = post(['message' => str_repeat(str_repeat('a', 499) . "\r\n", 10)] + $ok);
check('bericht van 5000 tekens met 10 Enters (zoals de browser telt) wordt aanvaard', $code === 302);
// Eén lange regel: transportregels moeten onder 998 bytes blijven (RFC 5322)
@unlink($dump);
post(['message' => str_repeat('é', 5000)] + $ok);
$raw = @file_get_contents($dump) ?: '';
$longest = max(array_map('strlen', explode("\n", $raw)) ?: [0]);
check('geen transportregel boven 998 bytes bij 5000 tekens zonder Enter', $raw !== '' && $longest <= 998, "langste $longest");
check('lange body komt na decoderen ongeschonden aan', strpos(body($raw), str_repeat('é', 5000)) !== false);

// Vanaf hier een bericht van één regel, zodat elke controle alleen om haar eigen reden faalt.
$ok['message'] = 'Graag een offerte.';

// 2. Kopinjectie: regeleinde in naam, e-mail, telefoon, onderwerp
foreach (['name' => "Jan\r\nBcc: x@evil.test", 'email' => "jan@example.com\nBcc: x@evil.test",
          'phone' => "1\rBcc: x@evil.test", 'subject' => "offerte\nBcc: x@evil.test"] as $k => $v) {
    @unlink($dump);
    [$code] = post([$k => $v] + $ok);
    check("regeleinde in $k geeft 400 en geen mail", $code === 400 && !file_exists($dump));
}

// 3. Lengtegrenzen (tekens, niet bytes)
foreach (['name' => 100, 'phone' => 30, 'message' => 5000] as $k => $limit) {
    [$code] = post([$k => str_repeat('é', $limit)] + $ok);
    check("$k van precies $limit tekens (é) wordt aanvaard", $code === 302);
    [$code] = post([$k => str_repeat('a', $limit + 1)] + $ok);
    check("$k van " . ($limit + 1) . ' tekens geeft 400', $code === 400);
}

// 4. Onderwerp buiten de lijst, geen onderwerp, ongeldige UTF-8, honeypot, foutpagina
[$code] = post(['subject' => 'Gratis geld'] + $ok);
check('onderwerp buiten de lijst geeft 400', $code === 400);
@unlink($dump);
[$code] = post(['subject' => ''] + $ok);
check('leeg onderwerp mag (select heeft geen verplichting)', $code === 302 && strpos(body(file_get_contents($dump)), 'Geen onderwerp gekozen') !== false);
[$code] = post(['name' => "Jan \xC3\x28"] + $ok);
check('ongeldige UTF-8 geeft 400', $code === 400);
@unlink($dump);
[$code] = post(['website' => 'http://spam.test'] + $ok);
check('honeypot ingevuld geeft 404 en geen mail', $code === 404 && !file_exists($dump));
[$code, $body] = post(['email' => 'geen-adres'] + $ok);
check('foutpagina heeft een link terug naar het formulier', $code === 400 && strpos($body, 'href="/contact"') !== false);
[$code, $body] = post(['name' => '', 'email' => '<script>x</script>'] + $ok);
check('foutpagina toont geen ruwe invoer', strpos($body, '<script>') === false);

// 5. Onderwerp met niet-ASCII wordt RFC 2047-gecodeerd (via de functie zelf)
$src = file_get_contents($root . '/public/contact.php');
check('encode_header bestaat in contact.php', strpos($src, 'function encode_header') !== false);
if (strpos($src, 'function encode_header') !== false) {
    preg_match('/function encode_header\(.*?\n\}/s', $src, $fn);
    eval($fn[0]);
    $enc = encode_header('[Vandotec] Offerte é');
    check('niet-ASCII onderwerp wordt =?UTF-8?B?…?=', strpos($enc, '=?UTF-8?B?') === 0 && base64_decode(substr($enc, 10, -2)) === '[Vandotec] Offerte é');
}

// proc_terminate laat de server op Windows soms draaien: dan zou een volgende run een oude server raken
$pid = proc_get_status($proc)['pid'];
if (stripos(PHP_OS, 'WIN') === 0) exec("taskkill /F /T /PID $pid 2>NUL"); else proc_terminate($proc);
@unlink($dump);
echo $fails ? "\n$fails FAAL\n" : "\nALLES OK\n";
exit($fails ? 1 : 0);
