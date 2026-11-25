<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;

final class Dashboard
{
    public static function metrics(string $role, int $userId): array
    {
        $pdo = Database::connection();
        if ($role === 'client') {
            return [
                ['value' => (string) self::count($pdo, "SELECT COUNT(*) FROM properties WHERE status = 'active'"), 'label' => 'Propiedades para explorar', 'detail' => 'Publicaciones activas'],
                ['value' => (string) self::count($pdo, 'SELECT COUNT(*) FROM favorites WHERE user_id = ?', [$userId]), 'label' => 'Favoritos guardados', 'detail' => 'Tu shortlist personal'],
                ['value' => (string) self::count($pdo, "SELECT COUNT(*) FROM appointments WHERE user_id = ? AND status IN ('requested','confirmed')", [$userId]), 'label' => 'Visitas en curso', 'detail' => 'Solicitudes y visitas confirmadas'],
            ];
        }
        if ($role === 'agency') {
            return [
                ['value' => (string) self::count($pdo, 'SELECT COUNT(*) FROM properties WHERE owner_user_id = ?', [$userId]), 'label' => 'Propiedades propias', 'detail' => 'Tu cartera publicada'],
                ['value' => (string) self::count($pdo, "SELECT COUNT(*) FROM inquiries i LEFT JOIN properties p ON p.id = i.property_id WHERE i.assigned_user_id = ? OR p.owner_user_id = ?", [$userId, $userId]), 'label' => 'Consultas y leads', 'detail' => 'Oportunidades asignadas a tu equipo'],
                ['value' => (string) self::count($pdo, 'SELECT COUNT(*) FROM appointments a JOIN properties p ON p.id = a.property_id WHERE p.owner_user_id = ? AND a.status IN (\'requested\',\'confirmed\')', [$userId]), 'label' => 'Visitas pendientes', 'detail' => 'Agenda comercial activa'],
            ];
        }
        return [
            ['value' => (string) self::count($pdo, 'SELECT COUNT(*) FROM projects WHERE owner_user_id = ?', [$userId]), 'label' => 'Emprendimientos', 'detail' => 'Proyectos de tu portfolio'],
            ['value' => (string) self::count($pdo, "SELECT COUNT(*) FROM units u JOIN projects p ON p.id = u.project_id WHERE p.owner_user_id = ? AND u.status = 'available'", [$userId]), 'label' => 'Unidades disponibles', 'detail' => 'Inventario comercializable'],
            ['value' => (string) self::count($pdo, "SELECT COUNT(*) FROM reservations r JOIN units u ON u.id = r.unit_id JOIN projects p ON p.id = u.project_id WHERE p.owner_user_id = ? AND r.status IN ('requested','confirmed')", [$userId]), 'label' => 'Reservas activas', 'detail' => 'Seguimiento de interesados'],
        ];
    }

    public static function overviewActivity(string $role, int $userId): array
    {
        if ($role === 'client') {
            return Appointment::forClient($userId);
        }
        if ($role === 'agency') {
            return Inquiry::forAgency($userId);
        }
        return Project::forDeveloper($userId);
    }

    private static function count(\PDO $pdo, string $sql, array $params = []): int
    {
        $statement = $pdo->prepare($sql);
        $statement->execute($params);
        return (int) $statement->fetchColumn();
    }
}
