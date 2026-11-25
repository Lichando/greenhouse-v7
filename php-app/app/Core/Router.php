<?php

declare(strict_types=1);

namespace App\Core;

use Throwable;

final class Router
{
    private array $routes = [];

    public function add(string $method, string $path, array $handler): void
    {
        $parts = preg_split('/(\{[a-zA-Z][a-zA-Z0-9_]*\})/', $path, -1, PREG_SPLIT_DELIM_CAPTURE) ?: [];
        $pattern = '';
        foreach ($parts as $part) {
            if (preg_match('/^\{([a-zA-Z][a-zA-Z0-9_]*)\}$/', $part, $match)) {
                $pattern .= '(?P<' . $match[1] . '>[^/]+)';
                continue;
            }
            $pattern .= preg_quote($part, '~');
        }
        $this->routes[] = [strtoupper($method), '~^' . $pattern . '/?$~', $handler];
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $path = '/' . trim($path, '/');
        if ($path === '//') {
            $path = '/';
        }

        foreach ($this->routes as [$routeMethod, $pattern, $handler]) {
            if (!preg_match($pattern, $path, $matches)) {
                continue;
            }
            if ($routeMethod !== strtoupper($method)) {
                continue;
            }

            if ($routeMethod === 'POST' && !Csrf::validate($_POST['_token'] ?? null)) {
                http_response_code(419);
                View::render('errors/419', ['title' => 'Sesión vencida']);
                return;
            }

            $arguments = array_filter($matches, static fn ($key) => is_string($key), ARRAY_FILTER_USE_KEY);
            try {
                [$class, $action] = $handler;
                (new $class())->$action($arguments);
            } catch (Throwable $exception) {
                error_log((string) $exception);
                http_response_code(500);
                $appConfig = require BASE_PATH . '/config/app.php';
                if ($appConfig['debug']) {
                    View::render('errors/500', ['title' => 'Error', 'debugMessage' => $exception->getMessage()]);
                } else {
                    View::render('errors/500', ['title' => 'Error']);
                }
            }
            return;
        }

        http_response_code(404);
        View::render('errors/404', ['title' => 'Página no encontrada']);
    }
}
