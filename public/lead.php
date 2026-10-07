<?php
declare(strict_types=1);

// Static-hosting replacement for the old Next.js /api/lead route handler — this project is
// deployed as a static export (no Node.js server available), so the lead form posts here
// instead. Mirrors app/api/lead/route.ts's validation, anti-spam checks and Telegram delivery;
// keep the two in sync if either changes. See lead-config.example.php for setup.

header('Content-Type: application/json; charset=utf-8');

function respond(bool $ok, ?string $error = null, int $status = 200): void {
    http_response_code($status);
    echo json_encode($error === null ? ['ok' => $ok] : ['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

$configFile = __DIR__ . '/lead-config.php';
if (!is_file($configFile)) {
    respond(false, 'Форма временно недоступна', 500);
}
require $configFile;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Метод не поддерживается', 405);
}

// --- rate limit: max 3 requests per IP per 60s, mirrors lib/rateLimit.ts ---
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', $ip)[0]);
$rateFile = sys_get_temp_dir() . '/pick-a-lock-lead-' . md5($ip) . '.json';
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($decoded)) $hits = $decoded;
}
$hits = array_values(array_filter($hits, fn($t) => $now - (int) $t < 60));
$hits[] = $now;
file_put_contents($rateFile, json_encode($hits));
if (count($hits) > 3) {
    respond(false, 'Слишком много заявок, попробуйте позже', 429);
}

// --- parse body ---
$raw = file_get_contents('php://input');
$body = json_decode((string) $raw, true);
if (!is_array($body)) {
    respond(false, 'Некорректный запрос', 400);
}

function str_field(array $body, string $key, int $max): string {
    $v = isset($body[$key]) ? trim((string) $body[$key]) : '';
    return mb_substr($v, 0, $max);
}

$name = str_field($body, 'name', 100);
$phone = str_field($body, 'phone', 30);
$citySlug = str_field($body, 'citySlug', 100);
$serviceSlug = str_field($body, 'serviceSlug', 100);
$comment = str_field($body, 'comment', 500);
$page = str_field($body, 'page', 300);
$website = str_field($body, 'website', 200); // honeypot
$renderedAt = isset($body['renderedAt']) ? (float) $body['renderedAt'] : null;
$utm = [
    'utm_source' => str_field($body, 'utmSource', 100),
    'utm_medium' => str_field($body, 'utmMedium', 100),
    'utm_campaign' => str_field($body, 'utmCampaign', 100),
    'utm_content' => str_field($body, 'utmContent', 100),
    'utm_term' => str_field($body, 'utmTerm', 100),
];

// same pattern as RU_PHONE_REGEX in types/lead.ts
if (mb_strlen($phone) < 10 || !preg_match('/^(\+7|7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/u', $phone)) {
    respond(false, 'Введите корректный номер телефона', 400);
}
if ($citySlug === '' || $serviceSlug === '') {
    respond(false, 'Город или услуга не найдены', 400);
}

// honeypot: real users never fill the "website" field
if ($website !== '') {
    respond(true);
}
// reject submissions faster than a human could plausibly fill the form
if ($renderedAt !== null && (microtime(true) * 1000 - $renderedAt) < 1200) {
    respond(true);
}

// --- resolve city/service display names (generated at build time, see scripts/generate-lead-meta.mjs) ---
$metaFile = __DIR__ . '/data/lead-meta.json';
$meta = is_file($metaFile) ? json_decode((string) file_get_contents($metaFile), true) : null;
$cities = is_array($meta['cities'] ?? null) ? $meta['cities'] : [];
$services = is_array($meta['services'] ?? null) ? $meta['services'] : [];

$cityName = $cities[$citySlug] ?? null;
$serviceName = $services[$serviceSlug] ?? ($services['vskrytie-zamkov'] ?? null);
if ($cityName === null || $serviceName === null) {
    respond(false, 'Город или услуга не найдены', 400);
}

// --- build message, mirrors lib/telegram.ts formatLeadMessage ---
$lines = [
    '🔔 НОВАЯ ЗАЯВКА',
    "📍 Город: {$cityName}",
    "🔧 Услуга: {$serviceName}",
    '👤 Имя: ' . ($name !== '' ? $name : 'не указано'),
    "📞 Телефон: {$phone}",
];
if ($comment !== '') $lines[] = "📝 Проблема: {$comment}";
if ($page !== '') $lines[] = "🌐 Страница: {$page}";
$lines[] = 'Источник: ' . ($utm['utm_source'] !== '' ? $utm['utm_source'] : 'direct');

foreach ($utm as $key => $value) {
    if ($value !== '') $lines[] = "{$key}: {$value}";
}

$text = implode("\n", $lines);

// --- send to Telegram ---
$ch = curl_init('https://api.telegram.org/bot' . TELEGRAM_BOT_TOKEN . '/sendMessage');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(['chat_id' => TELEGRAM_CHAT_ID, 'text' => $text], JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT => 10,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode < 200 || $httpCode >= 300) {
    error_log('lead.php: Telegram send failed: ' . $curlError . ' http=' . $httpCode . ' body=' . $response);
    respond(false, 'Не удалось отправить заявку, попробуйте позвонить', 502);
}

respond(true);
