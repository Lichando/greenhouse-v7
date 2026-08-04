import { MainLayout } from '@/src/components/layout/MainLayout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section - Impactful */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-white to-accent/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary/10 px-4 py-20 sm:px-6 lg:px-8 fade-in">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl">
          {/* Logo + Headline */}
          <div className="fade-in-up text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-imagenes%20%282%29-UqoLYiq27vMJIMKaClqqSdNUgoA5Ix.png"
                alt="GREEN HOUSE"
                className="h-16 w-auto object-contain"
              />
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight">
              Tu hogar <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                está aquí
              </span>
            </h1>
            <p className="fade-in-up-1 mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Encuentra la propiedad perfecta en Argentina. Miles de hogares verificados, precios transparentes, y expertos listos para ayudarte.
            </p>
          </div>

          {/* Search Bar */}
          <div className="fade-in-up-2 mt-12 mb-20">
            <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-6 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-montserrat font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                    Tipo de Propiedad
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary font-montserrat">
                    <option>Apartamento</option>
                    <option>Casa</option>
                    <option>Oficina</option>
                    <option>Terreno</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-montserrat font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                    Operación
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary font-montserrat">
                    <option>Compra</option>
                    <option>Alquiler</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Link
                    href="/properties"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-montserrat font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105 text-center"
                  >
                    Buscar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="fade-in-up-3 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bebas text-primary dark:text-accent font-bold">5K+</div>
              <p className="text-sm font-montserrat text-neutral-600 dark:text-neutral-400 mt-2">Propiedades</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bebas text-primary dark:text-accent font-bold">50K+</div>
              <p className="text-sm font-montserrat text-neutral-600 dark:text-neutral-400 mt-2">Usuarios</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bebas text-primary dark:text-accent font-bold">15</div>
              <p className="text-sm font-montserrat text-neutral-600 dark:text-neutral-400 mt-2">Ciudades</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bebas text-primary dark:text-accent font-bold">100%</div>
              <p className="text-sm font-montserrat text-neutral-600 dark:text-neutral-400 mt-2">Verificadas</p>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Section */}
      <section className="fade-in-up-4 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Featured Properties</h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Check out our latest listings
              </p>
            </div>
            <Link
              href="/properties"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured properties will be loaded here */}
            <div className="fade-in-up h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="fade-in-up-1 h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="fade-in-up-2 h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="fade-in px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="fade-in-up text-center mb-12">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white">
              Nuestros Planes
            </h2>
            <p className="fade-in-up-1 mt-3 text-lg text-neutral-600 dark:text-neutral-400">
              Elige el plan que mejor se ajusta a tus necesidades
            </p>
          </div>

          <div className="fade-in-up-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Basic */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all hover:scale-105">
              <h3 className="font-bebas text-2xl text-neutral-900 dark:text-white mb-2">BASIC</h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-montserrat mb-6">Para comenzar</p>
              <div className="mb-6">
                <span className="font-bebas text-4xl text-primary">$49</span>
                <span className="text-neutral-600 dark:text-neutral-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Hasta 10 propiedades
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Soporte por email
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span> Analytics básicos
                </li>
              </ul>
              <Link href="/contact" className="w-full block text-center px-4 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-semibold rounded-lg transition-all">
                Comenzar
              </Link>
            </div>

            {/* Plan Pro - Destacado */}
            <div className="bg-gradient-to-b from-primary to-accent rounded-2xl p-8 border-2 border-primary/50 hover:shadow-2xl transition-all hover:scale-105 relative md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-950 px-4 py-1 rounded-full">
                <span className="font-bebas text-sm text-primary">MÁS POPULAR</span>
              </div>
              <h3 className="font-bebas text-2xl text-white mb-2">PRO</h3>
              <p className="text-white/80 font-montserrat mb-6">Para profesionales</p>
              <div className="mb-6">
                <span className="font-bebas text-4xl text-white">$129</span>
                <span className="text-white/80">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 font-montserrat text-sm text-white/90">
                <li className="flex gap-2">
                  <span>✓</span> Hasta 50 propiedades
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Soporte prioritario
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Analytics avanzados
                </li>
                <li className="flex gap-2">
                  <span>✓</span> Herramientas de marketing
                </li>
              </ul>
              <Link href="/contact" className="w-full block text-center px-4 py-2.5 bg-white text-primary hover:bg-neutral-100 font-montserrat font-semibold rounded-lg transition-all">
                Comenzar Ahora
              </Link>
            </div>

            {/* Plan Enterprise */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all hover:scale-105">
              <h3 className="font-bebas text-2xl text-neutral-900 dark:text-white mb-2">ENTERPRISE</h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-montserrat mb-6">Soluciones personalizadas</p>
              <div className="mb-6">
                <span className="font-bebas text-2xl text-neutral-900 dark:text-white">Contactar</span>
              </div>
              <ul className="space-y-3 mb-8 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span> Propiedades ilimitadas
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span> Soporte 24/7 dedicado
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span> Soluciones personalizadas
                </li>
              </ul>
              <Link href="/contact" className="w-full block text-center px-4 py-2.5 border-2 border-accent text-accent hover:bg-accent hover:text-white font-montserrat font-semibold rounded-lg transition-all">
                Solicitar Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Inmobiliarias */}
      <section className="fade-in-up px-4 py-20 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="fade-in-up text-center mb-12">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white">
              Inmobiliarias Adheridas
            </h2>
            <p className="fade-in-up-1 mt-3 text-lg text-neutral-600 dark:text-neutral-400">
              Confían en nosotros las mejores inmobiliarias de Argentina
            </p>
          </div>

          <div className="fade-in-up-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg p-6 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-center">
                  <div className="h-12 bg-gradient-to-r from-primary to-accent rounded-lg mb-3" />
                  <p className="text-sm font-montserrat text-neutral-700 dark:text-neutral-300">Inmobiliaria {i}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-in-up-3 mt-12 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat mb-4">
              ¿Eres una inmobiliaria? Únete a nuestra red
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold rounded-lg transition-all"
            >
              Solicitar Asociación
            </Link>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="fade-in-up-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="fade-in-up text-center mb-12">
            <h2 className="font-bebas text-4xl font-bold text-neutral-900 dark:text-white">
              Desarrolladoras Adheridas
            </h2>
            <p className="fade-in-up-1 mt-3 text-lg text-neutral-600 dark:text-neutral-400">
              Proyectos premium de los principales desarrolladores
            </p>
          </div>

          <div className="fade-in-up-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg p-8 flex items-center justify-center border border-primary/20 dark:border-primary/30 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-center">
                  <div className="h-16 bg-gradient-to-r from-primary to-accent rounded-lg mb-3" />
                  <p className="text-sm font-montserrat text-neutral-700 dark:text-neutral-300">Desarrolladora {i}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-in-up-3 mt-12 text-center">
            <p className="text-neutral-600 dark:text-neutral-400 font-montserrat mb-4">
              ¿Eres desarrolladora? Expande tu alcance con nosotros
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold rounded-lg transition-all"
            >
              Solicitar Asociación
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in-up-3 bg-gradient-to-r from-primary to-accent px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-bebas text-4xl font-bold text-white">¿Necesitas ayuda?</h2>
          <p className="mt-4 text-white/90 font-montserrat">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad perfecta.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-montserrat font-semibold text-primary transition-all hover:shadow-lg hover:scale-105"
          >
            Contactar
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
