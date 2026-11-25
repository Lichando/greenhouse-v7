<?php
$siteName = getenv('APP_NAME') ?: 'GreenHouse Brokers';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$roleNames = ['client' => 'Cliente', 'agency' => 'Inmobiliaria', 'developer' => 'Desarrolladora', 'admin' => 'Administración'];
?>
<!doctype html>
<html lang="es-AR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#14241b">
    <meta name="description" content="GreenHouse Brokers conecta negocios inmobiliarios, personas y oportunidades en Argentina.">
    <title><?= e($title ?? $siteName . ' | Conectamos negocios. Generamos oportunidades.') ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= e(url('/assets/css/app.css')) ?>">
    <script src="<?= e(url('/assets/js/app.js')) ?>" defer></script>
</head>
<body>
<header class="site-header">
    <div class="container header-row">
        <a class="brand" href="<?= e(url('/')) ?>" aria-label="GreenHouse Brokers, inicio">
            <span class="brand-mark" aria-hidden="true">G</span>
            <span class="brand-wordmark"><strong>GREENHOUSE</strong><span>BROKERS</span></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle><span class="sr-only">Abrir menú</span><span></span><span></span></button>
        <nav class="primary-nav" id="primary-nav" aria-label="Navegación principal" data-menu>
            <a class="<?= $path === '/' ? 'is-active' : '' ?>" href="<?= e(url('/')) ?>">Inicio</a>
            <a class="<?= str_starts_with($path, '/properties') ? 'is-active' : '' ?>" href="<?= e(url('/properties')) ?>">Propiedades</a>
            <a class="<?= $path === '/about' ? 'is-active' : '' ?>" href="<?= e(url('/about')) ?>">La red</a>
            <a class="<?= $path === '/contact' ? 'is-active' : '' ?>" href="<?= e(url('/contact')) ?>">Contacto</a>
            <?php if ($currentUser): ?>
                <a class="nav-dashboard" href="<?= e(url('/dashboard')) ?>">Mi espacio</a>
                <span class="nav-user"><?= e($currentUser['name']) ?><?= isset($roleNames[$currentUser['role']]) ? ' · ' . e($roleNames[$currentUser['role']]) : '' ?></span>
                <form action="<?= e(url('/auth/logout')) ?>" method="post" class="inline-form"><?= csrf_field() ?><button class="nav-signin" type="submit">Cerrar sesión</button></form>
            <?php else: ?>
                <a class="nav-signin" href="<?= e(url('/auth/login')) ?>">Ingresar</a>
                <a class="button button-small button-white" href="<?= e(url('/auth/register')) ?>">Sumarme a la red</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
<?php if ($successMessage): ?><div class="container"><div class="flash flash-success" role="status"><?= e($successMessage) ?></div></div><?php endif; ?>
<?php if ($errorMessage): ?><div class="container"><div class="flash flash-error" role="alert"><?= e($errorMessage) ?></div></div><?php endif; ?>
<main id="main-content"><?= $content ?></main>
<footer class="site-footer">
    <div class="container footer-grid">
        <div><a class="brand brand-footer" href="<?= e(url('/')) ?>"><span class="brand-mark" aria-hidden="true">G</span><span class="brand-wordmark"><strong>GREENHOUSE</strong><span>BROKERS</span></span></a><p>Conectamos negocios.<br>Generamos oportunidades.</p></div>
        <div><span class="footer-label">Explorá</span><a href="<?= e(url('/properties')) ?>">Propiedades</a><a href="<?= e(url('/about')) ?>">La red GreenHouse</a><a href="<?= e(url('/contact')) ?>">Hablemos</a></div>
        <div><span class="footer-label">Contacto</span><a href="mailto:info@greenhouse.com">info@greenhouse.com</a><a href="tel:+543415550124">+54 341 555 0124</a><span>Rosario, Santa Fe · Argentina</span></div>
    </div>
    <div class="container footer-bottom"><span>© <?= date('Y') ?> GreenHouse Brokers</span><span>Una red para hacer mejores negocios inmobiliarios.</span></div>
</footer>
</body>
</html>
