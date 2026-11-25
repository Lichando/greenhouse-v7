<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\View;
use App\Models\Property;

final class HomeController
{
    public function index(array $params = []): void
    {
        View::render('home/index', ['properties' => Property::featured(3)]);
    }

    public function about(array $params = []): void
    {
        View::render('home/about');
    }
}
