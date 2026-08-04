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
