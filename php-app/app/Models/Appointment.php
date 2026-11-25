<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;

final class Appointment
{
    public static function create(int $userId, int $propertyId, string $scheduledAt, string $note = ''): void
    {
        $statement = Database::connection()->prepare("INSERT INTO appointments (user_id, property_id, scheduled_at, note, status) VALUES (:user_id, :property_id, :scheduled_at, :note, 'requested')");
        $statement->execute([
            'user_id' => $userId,
            'property_id' => $propertyId,
            'scheduled_at' => $scheduledAt,
            'note' => trim($note),
        ]);
    }

    public static function forClient(int $userId): array
    {
        $statement = Database::connection()->prepare('SELECT a.*, p.title AS property_title, p.city FROM appointments a JOIN properties p ON p.id = a.property_id WHERE a.user_id = :user_id ORDER BY a.scheduled_at DESC LIMIT 50');
        $statement->execute(['user_id' => $userId]);
        return $statement->fetchAll();
    }

    public static function forAgency(int $agencyId): array
    {
        $statement = Database::connection()->prepare('SELECT a.*, p.title AS property_title, p.city, u.name AS client_name FROM appointments a JOIN properties p ON p.id = a.property_id JOIN users u ON u.id = a.user_id WHERE p.owner_user_id = :agency_id ORDER BY a.scheduled_at ASC LIMIT 50');
        $statement->execute(['agency_id' => $agencyId]);
        return $statement->fetchAll();
    }
}
