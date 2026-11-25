<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\View;
use App\Models\Appointment;
use App\Models\Dashboard;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\Property;
use App\Models\User;

final class DashboardController
{
    private const NAVIGATION = [
        'client' => [
            'inicio' => 'Resumen', 'buscar-propiedades' => 'Explorar propiedades', 'favoritos' => 'Favoritos',
            'visitas' => 'Mis visitas', 'consultas' => 'Mis consultas', 'documentacion' => 'Documentación',
            'perfil' => 'Mi perfil', 'configuracion' => 'Configuración',
        ],
        'agency' => [
            'inicio' => 'Resumen', 'propiedades' => 'Propiedades', 'captaciones' => 'Captaciones',
            'clientes' => 'Clientes y leads', 'agentes' => 'Equipo', 'agenda' => 'Agenda',
            'publicaciones' => 'Publicaciones', 'reportes' => 'Reportes', 'configuracion' => 'Configuración',
        ],
        'developer' => [
            'inicio' => 'Resumen', 'emprendimientos' => 'Emprendimientos', 'obras' => 'Avance de obra',
            'unidades' => 'Unidades', 'reservas' => 'Reservas', 'ventas' => 'Ventas',
            'clientes' => 'Clientes', 'documentacion' => 'Documentación', 'reportes' => 'Reportes',
            'configuracion' => 'Configuración',
        ],
        'admin' => [
            'inicio' => 'Resumen', 'propiedades' => 'Propiedades', 'captaciones' => 'Consultas',
            'emprendimientos' => 'Emprendimientos', 'reportes' => 'Reportes', 'configuracion' => 'Configuración',
        ],
    ];

    public function index(array $params = []): void
    {
        $user = Auth::requireUser();
        if ($user['role'] === 'pending') {
            redirect('/auth/choose-role');
        }
        $role = (string) $user['role'];
        $section = (string) ($params['section'] ?? 'inicio');
        $navigation = self::NAVIGATION[$role] ?? [];
        if (!array_key_exists($section, $navigation)) {
            http_response_code(404);
            View::render('errors/404', ['title' => 'Sección no encontrada']);
            return;
        }

        $rows = match ($section) {
            'buscar-propiedades' => Property::featured(12),
            'favoritos' => Property::favoritesFor((int) $user['id']),
            'visitas', 'agenda' => $role === 'agency' ? Appointment::forAgency((int) $user['id']) : Appointment::forClient((int) $user['id']),
            'consultas' => Inquiry::forClient((int) $user['id']),
            'captaciones', 'clientes' => $role === 'client' ? Inquiry::forClient((int) $user['id']) : Inquiry::forAgency((int) $user['id']),
            'propiedades', 'publicaciones' => Property::ownedBy((int) $user['id']),
            'emprendimientos', 'obras' => Project::forDeveloper((int) $user['id']),
            'unidades' => Project::unitsForDeveloper((int) $user['id']),
            'reservas' => Project::reservationsForDeveloper((int) $user['id']),
            'ventas' => Project::reservationsForDeveloper((int) $user['id']),
            default => [],
        };
        $metrics = Dashboard::metrics($role, (int) $user['id']);
        $activity = $section === 'inicio' ? Dashboard::overviewActivity($role, (int) $user['id']) : [];
        View::render('dashboard/index', [
            'user' => $user,
            'role' => $role,
            'section' => $section,
            'sectionTitle' => $navigation[$section],
            'navigation' => $navigation,
            'metrics' => $metrics,
            'rows' => $rows,
            'projects' => $section === 'unidades' ? Project::forDeveloper((int) $user['id']) : [],
            'units' => $section === 'reservas' ? Project::unitsForDeveloper((int) $user['id'], 'available') : [],
            'activity' => $activity,
        ]);
    }

    public function toggleFavorite(array $params): void
    {
        $user = Auth::requireRole(['client']);
        Property::toggleFavorite((int) $user['id'], (int) ($params['propertyId'] ?? 0));
        flash('success', 'Tu lista de favoritos fue actualizada.');
        redirect('/dashboard/favoritos');
    }

    public function createProperty(array $params = []): void
    {
        $user = Auth::requireRole(['agency', 'admin']);
        $data = [
            'title' => trim((string) ($_POST['title'] ?? '')),
            'description' => trim((string) ($_POST['description'] ?? '')),
            'type' => (string) ($_POST['type'] ?? ''),
            'operation' => (string) ($_POST['operation'] ?? ''),
            'price' => filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT),
            'currency' => (string) ($_POST['currency'] ?? 'USD'),
            'bedrooms' => filter_var($_POST['bedrooms'] ?? null, FILTER_VALIDATE_INT),
            'bathrooms' => filter_var($_POST['bathrooms'] ?? null, FILTER_VALIDATE_INT),
            'area' => filter_var($_POST['area'] ?? null, FILTER_VALIDATE_FLOAT),
            'city' => trim((string) ($_POST['city'] ?? '')),
            'province' => trim((string) ($_POST['province'] ?? '')),
            'address' => trim((string) ($_POST['address'] ?? '')),
            'image_url' => trim((string) ($_POST['image_url'] ?? '')),
        ];
        if ($data['title'] === '' || strlen($data['description']) < 10 || !in_array($data['type'], ['apartment', 'house', 'land', 'commercial'], true) || !in_array($data['operation'], ['sale', 'rent'], true) || !$data['price'] || $data['price'] <= 0 || !in_array($data['currency'], ['USD', 'ARS'], true) || $data['city'] === '' || $data['province'] === '' || $data['address'] === '') {
            flash('error', 'Completá los campos obligatorios con valores válidos para publicar.');
            redirect('/dashboard/propiedades');
        }
        $slug = $this->slug($data['title']) . '-' . bin2hex(random_bytes(3));
        $data['bedrooms'] = $data['bedrooms'] === false ? null : $data['bedrooms'];
        $data['bathrooms'] = $data['bathrooms'] === false ? null : $data['bathrooms'];
        $data['area'] = $data['area'] === false ? null : $data['area'];
        $imageScheme = strtolower((string) parse_url($data['image_url'], PHP_URL_SCHEME));
        $data['image_url'] = $imageScheme === 'https' && filter_var($data['image_url'], FILTER_VALIDATE_URL) ? $data['image_url'] : null;
        Property::createForAgency((int) $user['id'], ['slug' => $slug] + $data);
        flash('success', 'La propiedad se publicó en tu cartera.');
        redirect('/dashboard/propiedades');
    }

    public function createUnit(array $params = []): void
    {
        $user = Auth::requireRole(['developer', 'admin']);
        $data = [
            'project_id' => filter_var($_POST['project_id'] ?? null, FILTER_VALIDATE_INT),
            'unit_code' => trim((string) ($_POST['unit_code'] ?? '')),
            'type' => trim((string) ($_POST['type'] ?? '')),
            'bedrooms' => filter_var($_POST['bedrooms'] ?? null, FILTER_VALIDATE_INT),
            'area' => filter_var($_POST['area'] ?? null, FILTER_VALIDATE_FLOAT),
            'price' => filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT),
            'currency' => (string) ($_POST['currency'] ?? 'USD'),
        ];
        if (!$data['project_id'] || $data['unit_code'] === '' || $data['type'] === '' || !$data['price'] || $data['price'] <= 0 || !in_array($data['currency'], ['USD', 'ARS'], true)) {
            flash('error', 'Completá proyecto, código, tipología y precio para registrar la unidad.');
            redirect('/dashboard/unidades');
        }
        $data['bedrooms'] = $data['bedrooms'] === false ? null : $data['bedrooms'];
        $data['area'] = $data['area'] === false ? null : $data['area'];
        try {
            $created = Project::createUnit((int) $user['id'], $data);
        } catch (\PDOException) {
            flash('error', 'Ese código de unidad ya existe en el proyecto seleccionado.');
            redirect('/dashboard/unidades');
        }
        if (!$created) {
            flash('error', 'No encontramos ese emprendimiento en tu portfolio.');
            redirect('/dashboard/unidades');
        }
        flash('success', 'La unidad quedó agregada al inventario.');
        redirect('/dashboard/unidades');
    }

    public function createReservation(array $params = []): void
    {
        $user = Auth::requireRole(['developer', 'admin']);
        $clientName = trim((string) ($_POST['client_name'] ?? ''));
        $clientEmail = trim((string) ($_POST['client_email'] ?? ''));
        $clientNameLength = preg_match_all('/./us', $clientName) ?: 0;
        $unitId = filter_var($_POST['unit_id'] ?? null, FILTER_VALIDATE_INT);
        if (!$unitId || $clientNameLength < 2 || $clientNameLength > 100 || !filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
            flash('error', 'Ingresá una unidad y los datos válidos de la persona interesada.');
            redirect('/dashboard/reservas');
        }
        $created = Project::createReservation((int) $user['id'], [
            'unit_id' => $unitId,
            'client_name' => $clientName,
            'client_email' => $clientEmail,
            'note' => trim((string) ($_POST['note'] ?? '')),
        ]);
        if (!$created) {
            flash('error', 'La unidad ya no está disponible o no pertenece a tus proyectos.');
            redirect('/dashboard/reservas');
        }
        flash('success', 'La reserva quedó registrada y la unidad pasó a estado reservado.');
        redirect('/dashboard/reservas');
    }

    public function createProject(array $params = []): void
    {
        $user = Auth::requireRole(['developer', 'admin']);
        $name = trim((string) ($_POST['name'] ?? ''));
        $description = trim((string) ($_POST['description'] ?? ''));
        $city = trim((string) ($_POST['city'] ?? ''));
        $province = trim((string) ($_POST['province'] ?? ''));
        $date = trim((string) ($_POST['target_date'] ?? ''));
        if ($name === '' || strlen($description) < 10 || $city === '' || $province === '') {
            flash('error', 'Completá nombre, descripción y ubicación del emprendimiento.');
            redirect('/dashboard/emprendimientos');
        }
        $targetDate = $date !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : null;
        Project::create((int) $user['id'], [
            'name' => $name,
            'slug' => $this->slug($name) . '-' . bin2hex(random_bytes(3)),
            'description' => $description,
            'city' => $city,
            'province' => $province,
            'target_date' => $targetDate,
        ]);
        flash('success', 'El emprendimiento fue agregado a tu portfolio.');
        redirect('/dashboard/emprendimientos');
    }

    public function updateProfile(array $params = []): void
    {
        $user = Auth::requireUser();
        $name = trim((string) ($_POST['name'] ?? ''));
        $length = preg_match_all('/./us', $name) ?: 0;
        if ($length < 2 || $length > 100) {
            flash('error', 'El nombre debe tener entre 2 y 100 caracteres.');
            redirect('/dashboard/perfil');
        }
        User::updateProfile((int) $user['id'], $name);
        flash('success', 'Tu perfil quedó actualizado.');
        redirect('/dashboard/perfil');
    }

    private function slug(string $value): string
    {
        $value = strtr($value, ['á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u', 'ü' => 'u', 'ñ' => 'n', 'Á' => 'a', 'É' => 'e', 'Í' => 'i', 'Ó' => 'o', 'Ú' => 'u', 'Ü' => 'u', 'Ñ' => 'n']);
        $slug = strtolower(trim((string) preg_replace('/[^a-zA-Z0-9]+/', '-', $value), '-'));
        return $slug !== '' ? substr($slug, 0, 80) : 'oportunidad';
    }
}
