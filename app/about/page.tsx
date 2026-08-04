import { MainLayout } from '@/src/components/layout/MainLayout';

export const metadata = {
  title: 'Sobre Nosotros - GREEN HOUSE',
  description: 'Conoce GREEN HOUSE, la plataforma líder de real estate en Argentina que conecta sueños con hogares.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Transparencia',
      description: 'Información clara y verificada en cada propiedad. Sin sorpresas.',
      icon: '🔍',
    },
    {
      title: 'Innovación',
      description: 'Tecnología de punta para facilitar tu búsqueda inmobiliaria.',
      icon: '⚡',
    },
    {
      title: 'Confianza',
      description: 'Asociaciones con profesionales verificados y propiedades auténticas.',
      icon: '🤝',
    },
    {
      title: 'Accesibilidad',
      description: 'Plataforma intuitiva y atención personalizada para todos.',
      icon: '♿',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Propiedades' },
    { number: '500+', label: 'Profesionales' },
    { number: '50K+', label: 'Usuarios Activos' },
    { number: '24/7', label: 'Soporte' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="font-bebas text-6xl font-bold text-white tracking-tight mb-4 fade-in-up">
              SOBRE GREEN HOUSE
            </h1>
            <p className="fade-in-up-1 text-xl text-white/90 max-w-2xl mx-auto font-montserrat">
              Conectando sueños con hogares. Somos la plataforma líder de real estate en Argentina.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className={`fade-in-up-${i} text-center p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800`}>
                <p className="font-bebas text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="font-montserrat text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div className="fade-in-up">
              <h2 className="font-bebas text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                NUESTRA MISIÓN
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 font-montserrat leading-relaxed mb-4">
                Revolucionar el mercado inmobiliario argentino mediante una plataforma transparente, segura e innovadora que pone en conexión a compradores, vendedores y profesionales.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 font-montserrat leading-relaxed">
                Creemos que todos merecen acceso a información de calidad para tomar decisiones informadas sobre sus inversiones inmobiliarias.
              </p>
            </div>

            {/* Vision */}
            <div className="fade-in-up-1">
              <h2 className="font-bebas text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                NUESTRA VISIÓN
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 font-montserrat leading-relaxed mb-4">
                Ser la plataforma número uno en Argentina, referente en innovación y confiabilidad del sector inmobiliario.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 font-montserrat leading-relaxed">
                Queremos transformar la experiencia inmobiliaria, eliminando barreras y haciendo que encontrar o vender una propiedad sea más simple que nunca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              NUESTROS VALORES
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Lo que nos define y guía cada decisión</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div 
                key={i} 
                className={`fade-in-up-${i + 1} p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg hover:border-primary/50 transition-all`}
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-bebas text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-montserrat">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              ¿POR QUÉ ELEGIRNOS?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Somos tu compañero de confianza en el mercado inmobiliario</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Base de Datos Completa',
                description: 'Miles de propiedades verificadas de inmobiliarias y desarrolladores de confianza.',
              },
              {
                title: 'Búsqueda Inteligente',
                description: 'Herramientas avanzadas de filtrado para encontrar exactamente lo que buscas.',
              },
              {
                title: 'Transacciones Seguras',
                description: 'Procesos verificados y respaldados para mayor seguridad en cada operación.',
              },
              {
                title: 'Soporte 24/7',
                description: 'Equipo dedicado siempre disponible para resolver tus dudas.',
              },
              {
                title: 'Profesionales Certificados',
                description: 'Red de inmobiliarios, desarrolladores y asesores verificados.',
              },
              {
                title: 'Tecnología Innovadora',
                description: 'Plataforma moderna, rápida y accesible desde cualquier dispositivo.',
              },
            ].map((feature, i) => (
              <div key={i} className={`fade-in-up-${i % 3} flex gap-4`}>
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/20 text-primary">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-bebas text-lg font-bold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 font-montserrat">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Timeline */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              NUESTRA HISTORIA
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Desde 2020, transformando el real estate argentino</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { year: '2020', title: 'Fundación de GREEN HOUSE', description: 'Nace la visión de crear una plataforma transparente y moderna para el real estate argentino.' },
                { year: '2021', title: 'Lanzamiento de la plataforma', description: 'Empezamos con 500 propiedades y 50 profesionales asociados en CABA.' },
                { year: '2022', title: 'Expansión nacional', description: 'Llegamos a 15 ciudades principales con más de 100 inmobiliarias asociadas.' },
                { year: '2023', title: 'Milestone: 50K usuarios', description: 'Alcanzamos 50,000 usuarios activos y 5,000 propiedades en la plataforma.' },
                { year: '2024', title: 'Presente y futuro', description: 'Consolidados como referentes con nuevas herramientas de IA y expansión a más regiones.' },
              ].map((item, i) => (
                <div key={i} className={`fade-in-up-${i} flex gap-6 items-start`}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bebas font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bebas text-xl font-bold text-neutral-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-montserrat">
                      {item.year} • {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              LOGROS Y RECONOCIMIENTOS
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Certificaciones que avalan nuestra calidad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏆', title: 'Mejor Plataforma Inmobiliaria', subtitle: '2023 - TechArgentina Awards' },
              { icon: '✅', title: 'ISO 27001 Certificado', subtitle: 'Seguridad y privacidad de datos' },
              { icon: '⭐', title: 'Rating 4.8/5', subtitle: 'Miles de usuarios satisfechos' },
              { icon: '🔒', title: 'Verificación AFIP', subtitle: 'Operaciones transparentes' },
              { icon: '🌟', title: 'Innovación Tecnológica', subtitle: 'Plataforma con IA integrada' },
              { icon: '💚', title: 'Impacto Social', subtitle: '1000+ familias ayudadas a encontrar hogar' },
            ].map((achievement, i) => (
              <div key={i} className={`fade-in-up-${i} p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center hover:shadow-lg transition-all`}>
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-bebas text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-montserrat">
                  {achievement.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              NUESTRO EQUIPO
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Profesionales dedicados a tu éxito inmobiliario</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'María González', role: 'Directora Ejecutiva', bio: '15+ años en real estate. Experta en estrategia digital.' },
              { name: 'Juan Rodríguez', role: 'Director Técnico', bio: 'Ingeniero especializado en fintech. Desarrollo de plataformas.' },
              { name: 'Laura Martínez', role: 'Directora de Operaciones', bio: 'Experiencia en gestión inmobiliaria y compliance.' },
              { name: 'Carlos López', role: 'Gestor de Asociaciones', bio: 'Relaciones con inmobiliarias y desarrolladores.' },
              { name: 'Sofía Torres', role: 'Customer Success Lead', bio: 'Especializada en experiencia del usuario.' },
              { name: 'Diego Fernández', role: 'Data & Analytics', bio: 'Experto en inteligencia de mercado inmobiliario.' },
            ].map((member, i) => (
              <div key={i} className={`fade-in-up-${i} rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all`}>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
                  👤
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bebas text-lg font-bold text-neutral-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-montserrat font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-montserrat">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 fade-in-up-6">
            <p className="text-center text-neutral-700 dark:text-neutral-300 font-montserrat">
              Con <span className="font-bold text-primary">50+ años de experiencia combinada</span> en el sector inmobiliario argentino, cada miembro del equipo trabaja con pasión para asegurar que GREEN HOUSE sea la plataforma más confiable y útil.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              IMPACTO SOCIAL
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Más que una plataforma, somos parte de tu historia</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="fade-in-up p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bebas text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Acceso Igualitario
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">
                  Facilitamos el acceso a información inmobiliaria de calidad sin importar el nivel socioeconómico. 1000+ familias de barrios en expansión encontraron su hogar a través de GREEN HOUSE.
                </p>
              </div>

              <div className="fade-in-up-1 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bebas text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Emprendedores Inmobiliarios
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">
                  Apoyamos a inmobiliarios independientes y pequeños emprendimientos a alcanzar mayor visibilidad. Más de 150 profesionales independientes generan ingresos a través de nuestra plataforma.
                </p>
              </div>

              <div className="fade-in-up-2 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bebas text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Sostenibilidad
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">
                  Promovemos propiedades eco-sustentables y desarrollos responsables. Destacamos proyectos con certificaciones ambientales en nuestra plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              NUESTRO FUTURO
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Lo que viene para GREEN HOUSE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fade-in-up p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="font-bebas text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                2024-2025
              </h3>
              <ul className="space-y-3 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-2">
                  <span className="text-primary">▸</span> Integración con IA para análisis predictivo de precios
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span> App móvil nativa (iOS & Android)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span> Expansión a 25 ciudades
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span> Sistema de hipotecas integrado
                </li>
              </ul>
            </div>

            <div className="fade-in-up-1 p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
              <h3 className="font-bebas text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                2025-2026
              </h3>
              <ul className="space-y-3 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-2">
                  <span className="text-accent">▸</span> Tokenización de propiedades
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span> Plataforma regional (MERCOSUR)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span> Smart contracts para transacciones
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span> Metaverso - recorridos virtuales 3D
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary fade-in-up-2">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-bebas text-3xl font-bold text-white mb-4">
            ¿Listo para encontrar tu próxima propiedad?
          </h2>
          <p className="text-white/90 font-montserrat mb-8">
            Únete a miles de usuarios que ya confían en GREEN HOUSE
          </p>
          <a 
            href="/properties"
            className="inline-block px-8 py-3 bg-white text-primary hover:bg-neutral-100 font-montserrat font-semibold rounded-lg transition-all"
          >
            Explorar Propiedades
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
