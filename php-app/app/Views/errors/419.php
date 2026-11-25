<section class="empty-state page-empty">
    <span class="eyebrow">Protección de sesión</span>
    <h1><?= e($title ?? 'La sesión venció') ?></h1>
    <p>Actualizá la página e intentá enviar el formulario nuevamente.</p>
    <a class="button button-primary" href="<?= e(url('/')) ?>">Volver al inicio</a>
</section>
