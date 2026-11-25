<?php

declare(strict_types=1);

use App\Core\Router;

if (PHP_SAPI === 'cli-server') {
    $publicRoot = realpath(__DIR__);
    $requestedPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $requestedFile = realpath(__DIR__ . $requestedPath);
    if ($publicRoot && $requestedFile && str_starts_with($requestedFile, $publicRoot . DIRECTORY_SEPARATOR) && is_file($requestedFile)) {
        return false;
    }
}

require dirname(__DIR__) . '/bootstrap.php';

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: SAMEORIGIN');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' && (getenv('APP_ENV') ?: 'local') === 'production') {
    header('Strict-Transport-Security: max-age=63072000');
}

$router = new Router();
foreach (require BASE_PATH . '/routes/web.php' as $route) {
    $router->add($route[0], $route[1], $route[2]);
}
$router->dispatch($_SERVER['REQUEST_METHOD'] ?? 'GET', $_SERVER['REQUEST_URI'] ?? '/');
