<section class="empty-state page-empty">
    <span class="eyebrow">Acceso restringido</span>
    <h1><?= e($title ?? 'No tenés permiso para ver esta sección') ?></h1>
    <p>Esta área está reservada para otro perfil de GreenHouse Brokers.</p>
    <a class="button button-primary" href="<?= e(url('/dashboard')) ?>">Ir a mi panel</a>
</section>
