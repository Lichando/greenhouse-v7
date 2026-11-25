<?php
$title = $title ?? 'No encontramos esa página';
?>
<section class="empty-state page-empty">
    <span class="eyebrow">404 · La oportunidad sigue ahí</span>
    <h1><?= e($title) ?></h1>
    <p>Puede que el enlace haya cambiado. Volvé al inicio o explorá las propiedades disponibles.</p>
    <div class="button-row"><a class="button button-primary" href="<?= e(url('/')) ?>">Volver al inicio</a><a class="button button-outline" href="<?= e(url('/properties')) ?>">Ver propiedades</a></div>
</section>
