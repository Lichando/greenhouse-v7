<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\ContactController;
use App\Controllers\DashboardController;
use App\Controllers\HomeController;
use App\Controllers\PropertiesController;

return [
    ['GET', '/', [HomeController::class, 'index']],
    ['GET', '/about', [HomeController::class, 'about']],
    ['GET', '/properties', [PropertiesController::class, 'index']],
    ['GET', '/properties/{slug}', [PropertiesController::class, 'show']],
    ['POST', '/properties/{propertyId}/favorite', [PropertiesController::class, 'toggleFavorite']],
    ['POST', '/properties/{propertyId}/appointments', [PropertiesController::class, 'requestVisit']],
    ['POST', '/properties/{propertyId}/inquiries', [PropertiesController::class, 'inquire']],
    ['GET', '/contact', [ContactController::class, 'index']],
    ['POST', '/contact', [ContactController::class, 'store']],
    ['GET', '/auth/login', [AuthController::class, 'login']],
    ['POST', '/auth/login', [AuthController::class, 'authenticate']],
    ['GET', '/auth/register', [AuthController::class, 'register']],
    ['POST', '/auth/register', [AuthController::class, 'store']],
    ['GET', '/auth/choose-role', [AuthController::class, 'chooseRole']],
    ['POST', '/auth/choose-role', [AuthController::class, 'saveRole']],
    ['POST', '/auth/logout', [AuthController::class, 'logout']],
    ['GET', '/dashboard', [DashboardController::class, 'index']],
    ['GET', '/dashboard/choose-role', [AuthController::class, 'chooseRole']],
    ['POST', '/dashboard/favorites/{propertyId}', [DashboardController::class, 'toggleFavorite']],
    ['POST', '/dashboard/properties', [DashboardController::class, 'createProperty']],
    ['POST', '/dashboard/projects', [DashboardController::class, 'createProject']],
    ['POST', '/dashboard/units', [DashboardController::class, 'createUnit']],
    ['POST', '/dashboard/reservations', [DashboardController::class, 'createReservation']],
    ['POST', '/dashboard/profile', [DashboardController::class, 'updateProfile']],
    ['GET', '/dashboard/{section}', [DashboardController::class, 'index']],
];
