<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\View;
use App\Models\User;

final class AuthController
{
    public function login(array $params = []): void
    {
        if (Auth::user()) {
            redirect('/dashboard');
        }
        View::render('auth/login', ['old' => ['email' => ''], 'formError' => null]);
    }

    public function authenticate(array $params = []): void
    {
        $email = trim((string) ($_POST['email'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        $user = filter_var($email, FILTER_VALIDATE_EMAIL) ? User::findByEmail($email) : null;
        if (!$user || !password_verify($password, $user['password_hash']) || $user['status'] !== 'active') {
            View::render('auth/login', ['old' => ['email' => $email], 'formError' => 'El correo o la contraseña no son correctos.']);
            return;
        }
        Auth::login($user);
        flash('success', 'Qué bueno tenerte de vuelta.');
        redirect($user['role'] === 'pending' ? '/auth/choose-role' : '/dashboard');
    }

    public function register(array $params = []): void
    {
        if (Auth::user()) {
            redirect('/dashboard');
        }
        View::render('auth/register', ['old' => ['name' => '', 'email' => ''], 'formError' => null]);
    }

    public function store(array $params = []): void
    {
        $name = trim((string) ($_POST['name'] ?? ''));
        $email = trim((string) ($_POST['email'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        $confirmation = (string) ($_POST['password_confirmation'] ?? '');
        $nameLength = preg_match_all('/./us', $name) ?: 0;
        $error = null;
        if ($nameLength < 2 || $nameLength > 100) {
            $error = 'El nombre debe tener entre 2 y 100 caracteres.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Ingresá un correo electrónico válido.';
        } elseif (strlen($password) < 8) {
            $error = 'La contraseña debe tener al menos 8 caracteres.';
        } elseif ($password !== $confirmation) {
            $error = 'Las contraseñas no coinciden.';
        } elseif (User::findByEmail($email)) {
            $error = 'Ya existe una cuenta con ese correo electrónico.';
        }
        if ($error !== null) {
            View::render('auth/register', ['old' => ['name' => $name, 'email' => $email], 'formError' => $error]);
            return;
        }

        $id = User::create($name, $email, password_hash($password, PASSWORD_DEFAULT));
        Auth::login(User::findById($id) ?? ['id' => $id, 'name' => $name, 'email' => $email, 'role' => 'pending', 'status' => 'active']);
        flash('success', 'Tu cuenta está creada. Elegí cómo vas a usar GreenHouse Brokers.');
        redirect('/auth/choose-role');
    }

    public function chooseRole(array $params = []): void
    {
        $user = Auth::requireUser();
        if ($user['role'] !== 'pending') {
            redirect('/dashboard');
        }
        View::render('auth/choose-role');
    }

    public function saveRole(array $params = []): void
    {
        $user = Auth::requireUser();
        if ($user['role'] !== 'pending') {
            redirect('/dashboard');
        }
        $role = (string) ($_POST['role'] ?? '');
        if (!in_array($role, ['client', 'agency', 'developer'], true)) {
            flash('error', 'Elegí un perfil para continuar.');
            redirect('/auth/choose-role');
        }
        User::assignRole((int) $user['id'], $role);
        Auth::login(User::findById((int) $user['id']) ?? $user);
        flash('success', 'Perfil actualizado. Ya podés empezar a conectar oportunidades.');
        redirect('/dashboard');
    }

    public function logout(array $params = []): void
    {
        Auth::logout();
        flash('success', 'Cerraste sesión de forma segura.');
        redirect('/');
    }
}
