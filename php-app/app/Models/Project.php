<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;

final class Project
{
    public static function forDeveloper(int $userId): array
    {
        $statement = Database::connection()->prepare('SELECT p.*, (SELECT COUNT(*) FROM units u WHERE u.project_id = p.id) AS unit_count FROM projects p WHERE p.owner_user_id = :owner_id ORDER BY p.created_at DESC LIMIT 50');
        $statement->execute(['owner_id' => $userId]);
        return $statement->fetchAll();
    }

    public static function unitsForDeveloper(int $userId, ?string $status = null): array
    {
        $sql = 'SELECT u.*, p.name AS project_name FROM units u JOIN projects p ON p.id = u.project_id WHERE p.owner_user_id = :owner_id';
        if ($status !== null) {
            $sql .= ' AND u.status = :status';
        }
        $sql .= ' ORDER BY p.name, u.unit_code LIMIT 100';
        $statement = Database::connection()->prepare($sql);
        $params = ['owner_id' => $userId];
        if ($status !== null) {
            $params['status'] = $status;
        }
        $statement->execute($params);
        return $statement->fetchAll();
    }

    public static function reservationsForDeveloper(int $userId): array
    {
        $statement = Database::connection()->prepare("SELECT r.*, u.unit_code, p.name AS project_name, COALESCE(r.client_name, c.name, 'Interesado') AS client_name FROM reservations r JOIN units u ON u.id = r.unit_id JOIN projects p ON p.id = u.project_id LEFT JOIN users c ON c.id = r.client_user_id WHERE p.owner_user_id = :owner_id ORDER BY r.created_at DESC LIMIT 100");
        $statement->execute(['owner_id' => $userId]);
        return $statement->fetchAll();
    }

    public static function createUnit(int $ownerId, array $data): bool
    {
        $statement = Database::connection()->prepare(
            'INSERT INTO units (project_id, unit_code, type, bedrooms, area, price, currency, status) SELECT p.id, :unit_code, :type, :bedrooms, :area, :price, :currency, \'available\' FROM projects p WHERE p.id = :project_id AND p.owner_user_id = :owner_id'
        );
        $statement->execute([
            'unit_code' => $data['unit_code'],
            'type' => $data['type'],
            'bedrooms' => $data['bedrooms'],
            'area' => $data['area'],
            'price' => $data['price'],
            'currency' => $data['currency'],
            'project_id' => $data['project_id'],
            'owner_id' => $ownerId,
        ]);
        return $statement->rowCount() === 1;
    }

    public static function createReservation(int $ownerId, array $data): bool
    {
        $pdo = Database::connection();
        $pdo->beginTransaction();
        try {
            $unitQuery = $pdo->prepare("SELECT u.id FROM units u JOIN projects p ON p.id = u.project_id WHERE u.id = :unit_id AND p.owner_user_id = :owner_id AND u.status = 'available' FOR UPDATE");
            $unitQuery->execute(['unit_id' => $data['unit_id'], 'owner_id' => $ownerId]);
            if (!$unitQuery->fetch()) {
                $pdo->rollBack();
                return false;
            }
            $insert = $pdo->prepare("INSERT INTO reservations (unit_id, client_name, client_email, status, note) VALUES (:unit_id, :client_name, :client_email, 'requested', :note)");
            $insert->execute([
                'unit_id' => $data['unit_id'],
                'client_name' => $data['client_name'],
                'client_email' => $data['client_email'],
                'note' => $data['note'],
            ]);
            $update = $pdo->prepare("UPDATE units SET status = 'reserved' WHERE id = :unit_id AND status = 'available'");
            $update->execute(['unit_id' => $data['unit_id']]);
            if ($update->rowCount() !== 1) {
                $pdo->rollBack();
                return false;
            }
            $pdo->commit();
            return true;
        } catch (\Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            throw $exception;
        }
    }

    public static function create(int $ownerId, array $data): void
    {
        $statement = Database::connection()->prepare("INSERT INTO projects (owner_user_id, name, slug, description, city, province, status, progress_percent, target_date) VALUES (:owner_id, :name, :slug, :description, :city, :province, 'planning', 0, :target_date)");
        $statement->execute([
            'owner_id' => $ownerId,
            'name' => $data['name'],
            'slug' => $data['slug'],
            'description' => $data['description'],
            'city' => $data['city'],
            'province' => $data['province'],
            'target_date' => $data['target_date'] ?: null,
        ]);
    }
}
