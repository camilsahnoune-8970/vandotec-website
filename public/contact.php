<?php
// Minimal, validated contact-form handler — werkt alleen op PHP-hosting (bv. Combell).
// Op puur statische hosting (GitHub Pages e.d.) draait PHP niet — zie tasks/hosting-keuze.md.
// No external dependencies (ook geen mbstring), no DB. Uses PHP mail().
// Test: tasks/test-contact.php (zet VD_MAIL_DRYRUN = pad; dan schrijft het script de mail
// naar dat bestand in plaats van te verzenden). Bezoekers kunnen die variabele niet zetten.
header('Content-Type: text/html; charset=utf-8');

function fail($code, $msg) {
    http_response_code($code);
    $safe = htmlspecialchars($msg, ENT_QUOTES, 'UTF-8');
    exit('<!doctype html><html lang="nl"><meta charset="utf-8"><title>Vandotec</title>'
        . '<p>' . $safe . '</p><p><a href="/contact">Terug naar het contactformulier</a></p></html>');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Spam honeypot (stay invisible)
if (!empty($_POST['website'])) {
    http_response_code(404);
    exit;
}

function clean($k) {
    return isset($_POST[$k]) && is_string($_POST[$k]) ? trim($_POST[$k]) : '';
}

// Zelfde grenzen als de maxlength-attributen in src/pages/contact.astro
$MAX = ['name' => 100, 'email' => 254, 'phone' => 30, 'message' => 5000];
// Zelfde waarden als form_subjects in src/data/contact.json
$SUBJECTS = [
    'offerte'      => 'Offerte aanvragen',
    'interventie'  => 'Interventie / storing',
    'onderhoud'    => 'Onderhoudscontract',
    'sollicitatie' => 'Open sollicitatie',
    'vraag'        => 'Algemene vraag',
];

$f = [];
foreach (['name', 'email', 'phone', 'subject', 'message'] as $k) {
    $f[$k] = clean($k);
    if (!preg_match('//u', $f[$k])) {
        fail(400, 'Ongeldige tekens in de invoer.');
    }
}
// De browser verstuurt elk regeleinde in de textarea als CRLF maar telt het voor maxlength als 1 teken.
// Normaliseren vóór de lengtecontrole, anders weigert de server een bericht dat de browser toeliet.
$f['message'] = preg_replace('/\r\n?/', "\n", $f['message']);
[$name, $email, $phone, $subject, $message] = array_values($f);

if ($name === '' || $email === '' || $message === '') {
    fail(400, 'Alle velden gemarkeerd met * zijn verplicht.');
}
foreach ($MAX as $k => $limit) {
    // telt tekens (code points), niet bytes: "é" telt als 1, net als in de browser
    if (preg_match_all('/./us', $f[$k]) > $limit) {
        fail(400, 'Een van de velden is te lang.');
    }
}
// header injection guard: elke CR of LF apart verboden in alles wat in een kop of eenregelig veld komt
foreach ([$name, $email, $phone, $subject] as $v) {
    if (preg_match('/[\r\n]/', $v)) {
        fail(400, 'Ongeldige invoer gedetecteerd.');
    }
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'Ongeldig e-mailadres ingevoerd.');
}
if ($subject !== '' && !isset($SUBJECTS[$subject])) {
    fail(400, 'Ongeldig onderwerp.');
}

// RFC 2047: niet-ASCII in een kop moet gecodeerd zijn, anders breken é/ë in de onderwerpregel.
function encode_header($text) {
    return preg_match('/[^\x20-\x7E]/', $text) ? '=?UTF-8?B?' . base64_encode($text) . '?=' : $text;
}

$to = 'info@vandotec.be';
// Afzender is altijd ons eigen domein: mailen "namens" het adres van de bezoeker faalt op
// SPF/DMARC (spam of geweigerd). De bezoeker staat in Reply-To, zodat Beantwoorden gewoon werkt.
$headers  = "From: Vandotec website <info@vandotec.be>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
// base64: een bericht van 5000 tekens zonder Enter wordt anders één regel boven de 998 bytes
// die mailservers mogen inkorten of weigeren (RFC 5322), desnoods midden in een é.
$headers .= "Content-Transfer-Encoding: base64\r\n";

$label = $subject === '' ? 'Geen onderwerp gekozen' : $SUBJECTS[$subject];

$body  = "Nieuw contactformulier Vandotec\n";
$body .= "--------------------------------\n";
$body .= "Naam:      {$name}\n";
$body .= "E-mail:    {$email}\n";
$body .= "Telefoon:  {$phone}\n";
$body .= "Onderwerp: {$label}\n";
$body .= "Bericht:\n{$message}\n";

// Alleen een vaste label uit $SUBJECTS: de bezoeker bepaalt de onderwerpregel niet.
$subject_line = encode_header('[Vandotec] ' . $label);

$encoded = chunk_split(base64_encode($body));

$dry = getenv('VD_MAIL_DRYRUN');
$sent = $dry
    ? file_put_contents($dry, "To: {$to}\r\nSubject: {$subject_line}\r\n{$headers}\r\n{$encoded}") !== false
    : mail($to, $subject_line, $encoded, $headers);

if ($sent) {
    // relatieve redirect: geen open redirect via Host-header mogelijk
    header('Location: /contact?sent=1');
    exit;
}
fail(500, 'Het bericht kon niet verzonden worden. Neem contact op: +32 57 33 52 51.');
