<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\View;
use App\Models\Appointment;
use App\Models\Inquiry;
use App\Models\Property;
use DateTimeImmutable;
use Throwable;

final class PropertiesController
{
    public function index(array $params = []): void
    {
        $filters = [
            'operation' => in_array($_GET['operation'] ?? '', ['sale', 'rent'], true) ? $_GET['operation'] : '',
            'type' => in_array($_GET['type'] ?? '', ['apartment', 'house', 'land', 'commercial'], true) ? $_GET['type'] : '',
            'city' => substr(trim((string) ($_GET['city'] ?? '')), 0, 100),
            'search' => substr(trim((string) ($_GET['search'] ?? '')), 0, 120),
            'min_price' => is_numeric($_GET['min_price'] ?? null) ? (float) $_GET['min_price'] : '',
            'max_price' => is_numeric($_GET['max_price'] ?? null) ? (float) $_GET['max_price'] : '',
        ];
        $page = filter_var($_GET['page'] ?? 1, FILTER_VALIDATE_INT) ?: 1;
        $result = Property::paginate($filters, max(1, $page));
        View::render('properties/index', ['filters' => $filters, 'result' => $result]);
    }

    public function show(array $params): void
    {
        $property = Property::findBySlug((string) ($params['slug'] ?? ''));
        if (!$property) {
            http_response_code(404);
            View::render('errors/404', ['title' => 'Propiedad no encontrada']);
            return;
        }
        View::render('properties/show', ['property' => $property]);
    }

    public function toggleFavorite(array $params): void
    {
        $user = Auth::requireRole(['client']);
        $property = Property::findById((int) ($params['propertyId'] ?? 0));
        if (!$property) {
            http_response_code(404);
            View::render('errors/404', ['title' => 'Propiedad no encontrada']);
            return;
        }
        Property::toggleFavorite((int) $user['id'], (int) $property['id']);
        flash('success', 'Actualizamos tu lista de favoritos.');
        redirect('/properties/' . rawurlencode($property['slug']));
    }

    public function requestVisit(array $params): void
    {
        $user = Auth::requireRole(['client']);
        $property = Property::findById((int) ($params['propertyId'] ?? 0));
        $scheduledAt = trim((string) ($_POST['scheduled_at'] ?? ''));
        try {
            $date = new DateTimeImmutable($scheduledAt);
            if (!$property || $date <= new DateTimeImmutable()) {
                throw new \InvalidArgumentException();
            }
        } catch (Throwable) {
            flash('error', 'Elegí una fecha futura para coordinar la visita.');
            redirect($property ? '/properties/' . rawurlencode($property['slug']) : '/properties');
        }

        Appointment::create((int) $user['id'], (int) $property['id'], $date->format('Y-m-d H:i:s'), (string) ($_POST['note'] ?? ''));
        flash('success', 'Recibimos tu solicitud de visita. El equipo se pondrá en contacto para confirmarla.');
        redirect('/properties/' . rawurlencode($property['slug']));
    }

    public function inquire(array $params): void
    {
        $user = Auth::user();
        $property = Property::findById((int) ($params['propertyId'] ?? 0));
        $name = trim((string) ($_POST['name'] ?? $user['name'] ?? ''));
        $email = trim((string) ($_POST['email'] ?? $user['email'] ?? ''));
        $message = trim((string) ($_POST['message'] ?? ''));
        if (!$property || $name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) {
            flash('error', 'Revisá tus datos y escribí un mensaje de al menos 10 caracteres.');
            redirect($property ? '/properties/' . rawurlencode($property['slug']) : '/properties');
        }
        Inquiry::create(['property_id' => $property['id'], 'name' => $name, 'email' => $email, 'subject' => 'Consulta por propiedad', 'message' => $message], $user ? (int) $user['id'] : null);
        flash('success', 'Tu consulta quedó registrada. GreenHouse Brokers te contactará pronto.');
        redirect('/properties/' . rawurlencode($property['slug']));
    }
}
