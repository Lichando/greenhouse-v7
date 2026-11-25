<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\View;
use App\Models\Inquiry;

final class ContactController
{
    public function index(array $params = []): void
    {
        View::render('contact/index', ['old' => []]);
    }

    public function store(array $params = []): void
    {
        $user = Auth::user();
        $data = [
            'name' => trim((string) ($_POST['name'] ?? '')),
            'email' => trim((string) ($_POST['email'] ?? '')),
            'subject' => trim((string) ($_POST['subject'] ?? '')),
            'message' => trim((string) ($_POST['message'] ?? '')),
        ];
        $nameLength = preg_match_all('/./us', $data['name']) ?: 0;
        if ($nameLength < 2 || $nameLength > 100 || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || $data['subject'] === '' || strlen($data['message']) < 10 || strlen($data['message']) > 5000) {
            View::render('contact/index', ['old' => $data, 'formError' => 'Revisá los datos. El mensaje debe tener entre 10 y 5000 caracteres.']);
            return;
        }

        Inquiry::create($data, $user ? (int) $user['id'] : null);
        flash('success', 'Gracias por escribirnos. Recibimos tu consulta y te contactaremos pronto.');
        redirect('/contact');
    }
}
