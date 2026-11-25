<?php

declare(strict_types=1);

namespace App\Core;

use App\Models\User;

final class Auth
{
    private static bool $loaded = false;
    private static ?array $user = null;

    public static function user(): ?array
    {
        if (self::$loaded) {
            return self::$user;
        }
        self::$loaded = true;
        $id = $_SESSION['user_id'] ?? null;
        if (is_int($id) || (is_string($id) && ctype_digit($id))) {
            self::$user = User::findById((int) $id);
            if (!self::$user || self::$user['status'] !== 'active') {
                self::logout();
            }
        }
        return self::$user;
    }

    public static function login(array $user): void
    {
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];
        self::$user = $user;
        self::$loaded = true;
        unset($_SESSION['_csrf']);
        Csrf::token();
    }

    public static function logout(): void
    {
        unset($_SESSION['user_id']);
        self::$user = null;
        self::$loaded = true;
        session_regenerate_id(true);
        unset($_SESSION['_csrf']);
    }

    public static function requireUser(): array
    {
        $user = self::user();
        if (!$user) {
            flash('error', 'Iniciá sesión para continuar.');
            redirect('/auth/login');
        }
        return $user;
    }

    public static function requireRole(array $roles): array
    {
        $user = self::requireUser();
        if (!in_array($user['role'], $roles, true)) {
            http_response_code(403);
            View::render('errors/403', ['title' => 'Acceso no permitido']);
            exit;
        }
        return $user;
    }
}
