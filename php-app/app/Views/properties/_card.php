<?php
$typeLabels = ['apartment' => 'Departamento', 'house' => 'Casa', 'land' => 'Terreno', 'commercial' => 'Comercial'];
$operationLabels = ['sale' => 'En venta', 'rent' => 'En alquiler'];
$image = $property['image_url'] ?: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
?>
<article class="property-card">
    <a class="property-image" href="<?= e(url('/properties/' . rawurlencode($property['slug']))) ?>">
        <img src="<?= e($image) ?>" alt="<?= e($property['title']) ?>" loading="lazy">
        <span class="property-tag"><?= e($operationLabels[$property['operation']] ?? 'Oportunidad') ?></span>
    </a>
    <div class="property-card-body">
        <div class="property-meta"><span><?= e($typeLabels[$property['type']] ?? 'Propiedad') ?></span><span><?= e($property['city']) ?>, <?= e($property['province']) ?></span></div>
        <h3><a href="<?= e(url('/properties/' . rawurlencode($property['slug']))) ?>"><?= e($property['title']) ?></a></h3>
        <p class="property-address"><?= e($property['address']) ?></p>
        <div class="property-card-bottom"><strong><?= e(money($property['price'], $property['currency'])) ?></strong><span><?= $property['area'] ? e(number_format((float) $property['area'], 0, ',', '.')) . ' m²' : 'Consultar' ?></span></div>
        <div class="property-specs"><span><?= $property['bedrooms'] ? e($property['bedrooms']) . ' dorm.' : 'Uso flexible' ?></span><span><?= $property['bathrooms'] ? e($property['bathrooms']) . ' baños' : 'Broker GreenHouse' ?></span></div>
    </div>
</article>
