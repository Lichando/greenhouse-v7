<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;
use PDO;

final class User
{
    public static function findById(int $id): ?array
    {
        $statement = Database::connection()->prepare('SELECT id, name, email, role, status, created_at FROM users WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);
        $user = $statement->fetch();
        return $user ?: null;
    }

    public static function findByEmail(string $email): ?array
    {
        $statement = Database::connection()->prepare('SELECT id, name, email, role, status, password_hash FROM users WHERE email = :email LIMIT 1');
        $statement->execute(['email' => strtolower(trim($email))]);
        $user = $statement->fetch();
        return $user ?: null;
    }

    public static function create(string $name, string $email, string $passwordHash): int
    {
        $statement = Database::connection()->prepare(
            'INSERT INTO users (name, email, password_hash, role, status) VALUES (:name, :email, :password_hash, \'pending\', \'active\')'
        );
        $statement->execute([
            'name' => trim($name),
            'email' => strtolower(trim($email)),
            'password_hash' => $passwordHash,
        ]);
        return (int) Database::connection()->lastInsertId();
    }

    public static function assignRole(int $id, string $role): void
    {
        $statement = Database::connection()->prepare("UPDATE users SET role = :role, updated_at = CURRENT_TIMESTAMP WHERE id = :id AND role = 'pending'");
        $statement->execute(['role' => $role, 'id' => $id]);
    }

    public static function updateProfile(int $id, string $name): void
    {
        $statement = Database::connection()->prepare('UPDATE users SET name = :name, updated_at = CURRENT_TIMESTAMP WHERE id = :id');
        $statement->execute(['name' => trim($name), 'id' => $id]);
    }
}
