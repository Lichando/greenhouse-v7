<section class="empty-state page-empty">
    <span class="eyebrow">GreenHouse Brokers</span>
    <h1>Estamos ajustando los detalles.</h1>
    <p>Ocurrió un error al procesar la solicitud. Probá nuevamente en unos minutos.</p>
    <?php if (!empty($debugMessage)): ?><pre class="debug-output"><?= e($debugMessage) ?></pre><?php endif; ?>
    <a class="button button-primary" href="<?= e(url('/')) ?>">Volver al inicio</a>
</section>
