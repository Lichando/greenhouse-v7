<?php
$title = 'Propiedades | GreenHouse Brokers';
$typeLabels = ['apartment' => 'Departamentos', 'house' => 'Casas', 'land' => 'Terrenos', 'commercial' => 'Comercial'];
?>
<section class="page-hero page-hero-compact"><div class="container"><p class="eyebrow">La selección GreenHouse</p><h1>Propiedades que abren<br>nuevas posibilidades.</h1><p>Explorá oportunidades seleccionadas en Rosario y alrededores.</p></div></section>
<section class="section properties-section"><div class="container">
    <form class="filter-panel" action="<?= e(url('/properties')) ?>" method="get">
        <label class="search-field"><span>Buscar por zona o palabra</span><input name="search" value="<?= e($filters['search']) ?>" type="search" placeholder="Barrio, ciudad, dirección"></label>
        <label class="search-field"><span>Operación</span><select name="operation"><option value="">Todas</option><option value="sale" <?= $filters['operation'] === 'sale' ? 'selected' : '' ?>>Comprar</option><option value="rent" <?= $filters['operation'] === 'rent' ? 'selected' : '' ?>>Alquilar</option></select></label>
        <label class="search-field"><span>Tipo</span><select name="type"><option value="">Todos</option><?php foreach ($typeLabels as $value => $label): ?><option value="<?= e($value) ?>" <?= $filters['type'] === $value ? 'selected' : '' ?>><?= e($label) ?></option><?php endforeach; ?></select></label>
        <label class="search-field"><span>Ciudad</span><input name="city" value="<?= e($filters['city']) ?>" type="text" placeholder="Rosario"></label>
        <button class="button button-primary" type="submit">Aplicar filtros</button>
    </form>
    <div class="results-line"><p><strong><?= e($result['total']) ?></strong> oportunidades en la red</p><span>Mostrando página <?= e($result['page']) ?> de <?= e(max(1, $result['pages'])) ?></span></div>
    <?php if ($result['items']): ?><div class="property-grid"><?php foreach ($result['items'] as $property): require BASE_PATH . '/app/Views/properties/_card.php'; endforeach; ?></div><?php else: ?><div class="empty-state"><span class="eyebrow">Sin coincidencias</span><h2>Probá con otros filtros.</h2><p>Si todavía no aparece lo que buscás, contanos y activamos nuestra red.</p><a class="button button-outline" href="<?= e(url('/contact')) ?>">Contactar a un broker</a></div><?php endif; ?>
    <?php if ($result['pages'] > 1): ?><nav class="pagination" aria-label="Paginación de propiedades"><?php if ($result['page'] > 1): ?><a href="?<?= e(http_build_query(array_merge($_GET, ['page' => $result['page'] - 1]))) ?>">← Anterior</a><?php endif; ?><span><?= e($result['page']) ?> / <?= e($result['pages']) ?></span><?php if ($result['page'] < $result['pages']): ?><a href="?<?= e(http_build_query(array_merge($_GET, ['page' => $result['page'] + 1]))) ?>">Siguiente →</a><?php endif; ?></nav><?php endif; ?>
</div></section>
