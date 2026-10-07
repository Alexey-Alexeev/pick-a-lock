<?php
declare(strict_types=1);

// Extracts site.zip (uploaded by the GitHub Actions deploy workflow) into this same directory,
// then deletes the zip. This script itself rides along in every deploy (it's a public/ file, so
// it's part of the build output), but for the very FIRST deploy it — and deploy-config.php —
// must be uploaded manually over FTP once, since nothing can call this script before it exists
// on the server. See deploy-config.example.php.

header('Content-Type: text/plain; charset=utf-8');

// The site is ~5,700 files — extraction can run past a shared host's default 30s execution
// limit. Both calls are silently ignored if the host's php.ini locks them down; that's fine,
// it just means a very large deploy might need re-triggering.
set_time_limit(0);
ini_set('memory_limit', '512M');
// Keep extracting even if the triggering HTTP request times out and disconnects first.
ignore_user_abort(true);

$configFile = __DIR__ . '/deploy-config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo "Missing deploy-config.php\n";
    exit;
}
require $configFile;

$token = $_GET['token'] ?? '';
if (!is_string($token) || !hash_equals(DEPLOY_TOKEN, $token)) {
    http_response_code(403);
    echo "Forbidden\n";
    exit;
}

$zipPath = __DIR__ . '/site.zip';
if (!is_file($zipPath)) {
    http_response_code(404);
    echo "site.zip not found\n";
    exit;
}

$zip = new ZipArchive();
if ($zip->open($zipPath) !== true) {
    http_response_code(500);
    echo "Failed to open site.zip\n";
    exit;
}

$zip->extractTo(__DIR__);
$zip->close();
unlink($zipPath);

echo 'OK: extracted ' . date('c') . "\n";
