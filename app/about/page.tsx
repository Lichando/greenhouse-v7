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

      {/* Team Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
              NUESTRO EQUIPO
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat">Profesionales apasionados por el real estate</p>
          </div>

          <div className="max-w-3xl mx-auto fade-in-up-1">
            <p className="text-neutral-700 dark:text-neutral-300 font-montserrat text-center leading-relaxed mb-4">
              Somos un equipo multidisciplinario de expertos en real estate, tecnología y servicio al cliente. Con más de 50 años de experiencia combinada en el sector inmobiliario argentino, estamos comprometidos a ofrecer la mejor experiencia.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 font-montserrat text-center leading-relaxed">
              Cada miembro del equipo trabaja con pasión para asegurar que GREEN HOUSE sea la plataforma más confiable y útil para todos nuestros usuarios.
            </p>
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
