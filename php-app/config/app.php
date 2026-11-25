<?php

declare(strict_types=1);

return [
    'name' => getenv('APP_NAME') ?: 'GreenHouse Brokers',
    'url' => rtrim((string) (getenv('APP_URL') ?: 'http://127.0.0.1:8000'), '/'),
    'environment' => getenv('APP_ENV') ?: 'local',
    'debug' => (getenv('APP_DEBUG') ?: 'false') === 'true',
    'timezone' => getenv('APP_TIMEZONE') ?: 'America/Argentina/Buenos_Aires',
];
