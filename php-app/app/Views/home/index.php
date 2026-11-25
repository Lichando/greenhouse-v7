<?php
$title = 'GreenHouse Brokers | Conectamos negocios. Generamos oportunidades.';
$propertyTypes = ['apartment' => 'Departamentos', 'house' => 'Casas', 'land' => 'Terrenos', 'commercial' => 'Comercial'];
?>
<section class="hero">
    <div class="hero-photo" role="img" aria-label="Arquitectura residencial contemporánea rodeada de árboles"></div>
    <div class="hero-shade"></div>
    <div class="container hero-content">
        <p class="eyebrow eyebrow-light">GreenHouse Brokers · Rosario, Argentina</p>
        <h1>Conectamos negocios.<br><span>Generamos oportunidades.</span></h1>
        <p class="hero-copy">Una red inmobiliaria que acerca a quienes buscan, a quienes desarrollan y a quienes hacen posible cada operación.</p>
        <div class="hero-actions"><a class="button button-white" href="<?= e(url('/properties')) ?>">Explorar propiedades <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="<?= e(url('/about')) ?>">Conocé la red</a></div>
        <div class="hero-stamp"><span>GH</span><small>Brokerage<br>Network</small></div>
    </div>
    <div class="container search-wrap">
        <form class="search-panel" action="<?= e(url('/properties')) ?>" method="get">
            <label class="search-field"><span>Estoy buscando</span><select name="operation"><option value="">Cualquier operación</option><option value="sale">Comprar</option><option value="rent">Alquilar</option></select></label>
            <label class="search-field"><span>Tipo de propiedad</span><select name="type"><option value="">Todos los tipos</option><?php foreach ($propertyTypes as $value => $label): ?><option value="<?= e($value) ?>"><?= e($label) ?></option><?php endforeach; ?></select></label>
            <label class="search-field search-location"><span>Zona o ciudad</span><input name="city" type="search" placeholder="Rosario, Funes, Roldán"></label>
            <button class="button button-primary search-submit" type="submit">Encontrar oportunidades <span aria-hidden="true">↗</span></button>
        </form>
    </div>
</section>
<section class="section section-intro">
    <div class="container intro-grid">
        <p class="eyebrow">Más que una inmobiliaria</p>
        <div><h2>Un buen negocio empieza con las conexiones correctas.</h2><p>Integramos brokers, inmobiliarias, desarrolladoras y clientes en una misma red. Compartimos conocimiento, acercamos oportunidades y acompañamos cada decisión con mirada local.</p><a class="text-link" href="<?= e(url('/about')) ?>">Descubrí cómo trabajamos <span aria-hidden="true">→</span></a></div>
        <div class="intro-note"><span class="note-mark">GH</span><p>Una red profesional.<br>Una mirada compartida.<br><strong>Mejores oportunidades.</strong></p></div>
    </div>
</section>
<section class="section section-muted">
    <div class="container">
        <div class="section-heading"><div><p class="eyebrow">Oportunidades destacadas</p><h2>Propiedades con potencial</h2></div><a class="text-link" href="<?= e(url('/properties')) ?>">Ver todas <span aria-hidden="true">→</span></a></div>
        <?php if ($properties): ?><div class="property-grid"><?php foreach ($properties as $property): require BASE_PATH . '/app/Views/properties/_card.php'; endforeach; ?></div><?php else: ?><div class="empty-state"><p>Estamos sumando nuevas oportunidades a la red.</p><a class="text-link" href="<?= e(url('/contact')) ?>">Conversemos <span aria-hidden="true">→</span></a></div><?php endif; ?>
    </div>
</section>
<section class="section network-section">
    <div class="container network-grid"><div><p class="eyebrow">Crecer en red</p><h2>Tu próxima oportunidad puede estar en el otro lado de la mesa.</h2><p>Conectamos activos, talento y capital para que el mercado inmobiliario funcione mejor para todos los que lo integran.</p><a class="button button-dark" href="<?= e(url('/auth/register')) ?>">Conectate con GreenHouse <span aria-hidden="true">↗</span></a></div><div class="network-visual"><div class="network-orbit orbit-one"></div><div class="network-orbit orbit-two"></div><span class="network-core">GH</span><span class="network-node node-one">Brokers</span><span class="network-node node-two">Desarrollo</span><span class="network-node node-three">Inversión</span><span class="network-node node-four">Personas</span></div></div>
</section>
