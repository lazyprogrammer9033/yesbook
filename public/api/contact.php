<?php
/**
 * Yesbook contact form handler for IONOS (PHP 8+).
 * Receives the "Book a demo" form and emails it using the server's mail().
 * No database, no cookies. Settings live in config.php next to this file.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);

$cfg = require __DIR__ . '/config.php';

// Only accept posts from our own site.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) reply(403, ['ok' => false, 'error' => 'origin']);

// Spam checks: hidden honeypot field and a minimum time on the page.
if (!empty($_POST['website'])) reply(200, ['ok' => true]);
if ((int)($_POST['elapsed'] ?? 0) < 2500) reply(200, ['ok' => true]);

// Simple per-IP rate limit (hashed IP, stored in the system temp folder, auto-expires after an hour).
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
$bucket = sys_get_temp_dir() . '/yb_rl_' . $ipHash;
$now = time();
$hits = array_filter(is_file($bucket) ? (array)json_decode((string)file_get_contents($bucket), true) : [], fn($t) => $t > $now - 3600);
if (count($hits) >= (int)$cfg['rate_limit_per_hour']) reply(429, ['ok' => false, 'error' => 'rate']);
$hits[] = $now;
@file_put_contents($bucket, json_encode(array_values($hits)));

function field(string $k, int $max = 200): string {
  $v = trim((string)($_POST[$k] ?? ''));
  $v = str_replace(["\r", "\0"], '', $v);
  return mb_substr($v, 0, $max);
}
$name = field('name', 120);
$business = field('business', 160);
$type = field('type', 60);
$email = field('email', 200);
$phone = field('phone', 40);
$plan = field('plan', 40);
$message = field('message', 5000);

if ($name === '' || $business === '' || $type === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  reply(422, ['ok' => false, 'error' => 'invalid']);
}

$oneLine = fn(string $s) => preg_replace('/[\r\n]+/', ' ', $s);
$subject = 'Demo request: ' . $oneLine($business) . ' (' . $oneLine($type) . ')';
$body = "New demo request from yesbook.ca\n\n"
  . "Name:      $name\n"
  . "Business:  $business\n"
  . "Type:      $type\n"
  . "Email:     $email\n"
  . "Phone:     " . ($phone ?: '-') . "\n"
  . "Plan:      " . ($plan ?: '-') . "\n\n"
  . "Message:\n" . ($message ?: '-') . "\n\n"
  . "Sent " . date('Y-m-d H:i T') . "\n";

$headers = [
  'From' => sprintf('%s <%s>', $cfg['from_name'], $cfg['from']),
  'Reply-To' => $oneLine($email),
  'Content-Type' => 'text/plain; charset=UTF-8',
  'X-Mailer' => 'Yesbook',
];
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail($cfg['to'], $encodedSubject, $body, $headers, '-f' . $cfg['from']);

reply($sent ? 200 : 500, ['ok' => $sent]);
