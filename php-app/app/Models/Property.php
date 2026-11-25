<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\Database;
use PDO;

final class Property
{
    private const CARD_SELECT = "SELECT p.id, p.slug, p.title, p.description, p.type, p.operation, p.status, p.price, p.currency, p.bedrooms, p.bathrooms, p.area, p.city, p.province, p.address, COALESCE((SELECT pi.image_url FROM property_images pi WHERE pi.property_id = p.id ORDER BY pi.is_primary DESC, pi.sort_order ASC LIMIT 1), p.image_url) AS image_url FROM properties p";

    public static function featured(int $limit = 6): array
    {
        $statement = Database::connection()->prepare(self::CARD_SELECT . " WHERE p.status = 'active' ORDER BY p.created_at DESC LIMIT :limit");
        $statement->bindValue('limit', max(1, min(12, $limit)), PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll();
    }

    public static function paginate(array $filters, int $page = 1, int $limit = 12): array
    {
        $where = ["p.status = 'active'"];
        $params = [];
        foreach (['operation', 'type', 'city'] as $key) {
            if (!empty($filters[$key])) {
                $where[] = "p.$key = :$key";
                $params[$key] = $filters[$key];
            }
        }
        if (!empty($filters['search'])) {
            $where[] = '(p.title LIKE :title_search OR p.city LIKE :city_search OR p.province LIKE :province_search OR p.address LIKE :address_search)';
            $searchTerm = '%' . trim($filters['search']) . '%';
            $params['title_search'] = $searchTerm;
            $params['city_search'] = $searchTerm;
            $params['province_search'] = $searchTerm;
            $params['address_search'] = $searchTerm;
        }
        if (isset($filters['min_price']) && $filters['min_price'] !== '') {
            $where[] = 'p.price >= :min_price';
            $params['min_price'] = (float) $filters['min_price'];
        }
        if (isset($filters['max_price']) && $filters['max_price'] !== '') {
            $where[] = 'p.price <= :max_price';
            $params['max_price'] = (float) $filters['max_price'];
        }
        $condition = implode(' AND ', $where);
        $count = Database::connection()->prepare('SELECT COUNT(*) FROM properties p WHERE ' . $condition);
        $count->execute($params);
        $total = (int) $count->fetchColumn();

        $page = max(1, $page);
        $limit = max(1, min(24, $limit));
        $statement = Database::connection()->prepare(self::CARD_SELECT . ' WHERE ' . $condition . ' ORDER BY p.created_at DESC LIMIT :limit OFFSET :offset');
        foreach ($params as $key => $value) {
            $statement->bindValue(':' . $key, $value, is_float($value) ? PDO::PARAM_STR : PDO::PARAM_STR);
        }
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->bindValue(':offset', ($page - 1) * $limit, PDO::PARAM_INT);
        $statement->execute();
        return ['items' => $statement->fetchAll(), 'total' => $total, 'page' => $page, 'pages' => (int) ceil($total / $limit)];
    }

    public static function findBySlug(string $slug): ?array
    {
        $statement = Database::connection()->prepare(self::CARD_SELECT . ' WHERE p.slug = :slug AND p.status = \'active\' LIMIT 1');
        $statement->execute(['slug' => $slug]);
        $property = $statement->fetch();
        if (!$property) {
            return null;
        }
        $images = Database::connection()->prepare('SELECT image_url FROM property_images WHERE property_id = :id ORDER BY is_primary DESC, sort_order ASC');
        $images->execute(['id' => $property['id']]);
        $property['images'] = array_column($images->fetchAll(), 'image_url');
        if (!$property['images'] && $property['image_url']) {
            $property['images'] = [$property['image_url']];
        }
        return $property;
    }

    public static function findById(int $id): ?array
    {
        $statement = Database::connection()->prepare(self::CARD_SELECT . ' WHERE p.id = :id AND p.status = \'active\' LIMIT 1');
        $statement->execute(['id' => $id]);
        $property = $statement->fetch();
        return $property ?: null;
    }

    public static function ownedBy(int $userId, int $limit = 50): array
    {
        $statement = Database::connection()->prepare(self::CARD_SELECT . ' WHERE p.owner_user_id = :owner ORDER BY p.created_at DESC LIMIT :limit');
        $statement->bindValue(':owner', $userId, PDO::PARAM_INT);
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll();
    }

    public static function favoritesFor(int $userId): array
    {
        $statement = Database::connection()->prepare(self::CARD_SELECT . ' JOIN favorites f ON f.property_id = p.id WHERE f.user_id = :user_id ORDER BY f.created_at DESC');
        $statement->execute(['user_id' => $userId]);
        return $statement->fetchAll();
    }

    public static function toggleFavorite(int $userId, int $propertyId): void
    {
        $pdo = Database::connection();
        $check = $pdo->prepare('SELECT 1 FROM favorites WHERE user_id = :user_id AND property_id = :property_id');
        $check->execute(['user_id' => $userId, 'property_id' => $propertyId]);
        if ($check->fetchColumn()) {
            $delete = $pdo->prepare('DELETE FROM favorites WHERE user_id = :user_id AND property_id = :property_id');
            $delete->execute(['user_id' => $userId, 'property_id' => $propertyId]);
            return;
        }
        $insert = $pdo->prepare('INSERT IGNORE INTO favorites (user_id, property_id) VALUES (:user_id, :property_id)');
        $insert->execute(['user_id' => $userId, 'property_id' => $propertyId]);
    }

    public static function createForAgency(int $ownerId, array $data): int
    {
        $statement = Database::connection()->prepare(
            "INSERT INTO properties (owner_user_id, slug, title, description, type, operation, status, price, currency, bedrooms, bathrooms, area, city, province, address, image_url) VALUES (:owner_user_id, :slug, :title, :description, :type, :operation, 'active', :price, :currency, :bedrooms, :bathrooms, :area, :city, :province, :address, :image_url)"
        );
        $statement->execute([
            'owner_user_id' => $ownerId,
            'slug' => $data['slug'],
            'title' => $data['title'],
            'description' => $data['description'],
            'type' => $data['type'],
            'operation' => $data['operation'],
            'price' => $data['price'],
            'currency' => $data['currency'],
            'bedrooms' => $data['bedrooms'],
            'bathrooms' => $data['bathrooms'],
            'area' => $data['area'],
            'city' => $data['city'],
            'province' => $data['province'],
            'address' => $data['address'],
            'image_url' => $data['image_url'],
        ]);
        return (int) Database::connection()->lastInsertId();
    }
}
