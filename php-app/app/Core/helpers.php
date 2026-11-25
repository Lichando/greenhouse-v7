<?php

declare(strict_types=1);

function e(mixed $value): string
{
    return htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function url(string $path = ''): string
{
    $config = require BASE_PATH . '/config/app.php';
    $base = $config['url'];
    $path = ltrim($path, '/');
    return $path === '' ? $base . '/' : $base . '/' . $path;
}

function redirect(string $path, int $status = 303): never
{
    header('Location: ' . url($path), true, $status);
    exit;
}

function flash(string $key, ?string $value = null): ?string
{
    if ($value !== null) {
        $_SESSION['_flash'][$key] = $value;
        return null;
    }
    $message = $_SESSION['_flash'][$key] ?? null;
    unset($_SESSION['_flash'][$key]);
    return is_string($message) ? $message : null;
}

function csrf_field(): string
{
    return '<input type="hidden" name="_token" value="' . e(App\Core\Csrf::token()) . '">';
}

function money(int|float|string|null $amount, string $currency = 'USD'): string
{
    $symbol = $currency === 'ARS' ? 'ARS ' : ($currency === 'USD' ? 'US$ ' : e($currency) . ' ');
    return $symbol . number_format((float) $amount, 0, ',', '.');
}

function format_date(?string $value, string $format = 'd/m/Y'): string
{
    if (!$value) {
        return 'A coordinar';
    }
    try {
        return (new DateTimeImmutable($value))->format($format);
    } catch (Throwable) {
        return 'A coordinar';
    }
}
