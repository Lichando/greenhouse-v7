<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;

final class Inquiry
{
    public static function create(array $data, ?int $userId = null): void
    {
        $statement = Database::connection()->prepare(
            'INSERT INTO inquiries (user_id, property_id, name, email, subject, message, status) VALUES (:user_id, :property_id, :name, :email, :subject, :message, \'new\')'
        );
        $statement->execute([
            'user_id' => $userId,
            'property_id' => $data['property_id'] ?? null,
            'name' => trim($data['name']),
            'email' => strtolower(trim($data['email'])),
            'subject' => trim($data['subject']),
            'message' => trim($data['message']),
        ]);
    }

    public static function forClient(int $userId): array
    {
        $statement = Database::connection()->prepare('SELECT i.*, p.title AS property_title FROM inquiries i LEFT JOIN properties p ON p.id = i.property_id WHERE i.user_id = :user_id ORDER BY i.created_at DESC LIMIT 50');
        $statement->execute(['user_id' => $userId]);
        return $statement->fetchAll();
    }

    public static function forAgency(int $agencyId): array
    {
        $statement = Database::connection()->prepare("SELECT i.*, p.title AS property_title FROM inquiries i LEFT JOIN properties p ON p.id = i.property_id WHERE i.assigned_user_id = :assigned_id OR p.owner_user_id = :owner_id ORDER BY i.created_at DESC LIMIT 50");
        $statement->execute(['assigned_id' => $agencyId, 'owner_id' => $agencyId]);
        return $statement->fetchAll();
    }
}
