<?php
// Minimal, validated contact-form handler — werkt alleen op PHP-hosting (bv. Combell).
// Op puur statische hosting (GitHub Pages e.d.) draait PHP niet — zie tasks/hosting-keuze.md.
// No external dependencies, no DB. Uses PHP mail().
header('Content-Type: text/html; charset=utf-8');
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
    return isset($_POST[$k]) ? trim($_POST[$k]) : '';
}

$name    = clean('name');
$email   = clean('email');
$phone   = clean('phone');
$subject = clean('subject');
$message = clean('message');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    exit('Alle velden gemarkeerd met * zijn verplicht.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Ongeldig e-mailadres ingevoerd.');
}
// header injection guard: elke CR- of LF apart al verboden (niet alleen het paar)
foreach ([$name, $phone, $subject, $message] as $v) {
    if (preg_match('/[\r\n]/', $v)) {
        http_response_code(400);
        exit('Ongeldige invoer gedetecteerd.');
    }
}

$to      = 'info@vandotec.be';
$headers = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Priority: 3\r\n";

$body  = "Nieuw contactformulier Vandotec\n";
$body .= "--------------------------------\n";
$body .= "Naam:    {$name}\n";
$body .= "E-mail:  {$email}\n";
$body .= "Telefoon: {$phone}\n";
$body .= "Onderwerp: {$subject}\n";
$body .= "Bericht:\n{$message}\n";

$subject_line = empty($subject) ? 'Nieuw contactformulier' : $subject;

if (mail($to, '[Vandotec] ' . $subject_line, $body, $headers)) {
    // relatieve redirect: geen open redirect via Host-header mogelijk
    header('Location: /contact?sent=1');
    exit;
} else {
    http_response_code(500);
    exit('Het bericht kon niet verzonden worden. Neem contact op: +32 57 33 52 51.');
}
