<?php
declare(strict_types=1);

// Read-only diagnostics for the deploy, token-protected the same way as deploy-unzip.php.
// ?action=list — recursively lists every file/dir under the web root with size and mtime, so we
// can see from outside whether anything other than this app's own build output is sitting on the
// server (leftover WordPress files, old test uploads, etc.) before deciding what to remove.

header('Content-Type: text/plain; charset=utf-8');
set_time_limit(0);

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

$action = $_GET['action'] ?? 'list';
if ($action !== 'list') {
    http_response_code(400);
    echo "Unknown action\n";
    exit;
}

$root = __DIR__;

function listDir(string $dir, string $root): void
{
    $items = scandir($dir);
    if ($items === false) return;
    natcasesort($items);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $path = $dir . '/' . $item;
        $rel = substr($path, strlen($root) + 1);
        if (is_dir($path)) {
            echo "DIR  {$rel}/\n";
            listDir($path, $root);
        } else {
            $size = filesize($path);
            $mtime = date('Y-m-d H:i:s', (int) filemtime($path));
            echo "FILE {$rel}  ({$size} bytes, {$mtime})\n";
        }
    }
}

listDir($root, $root);
