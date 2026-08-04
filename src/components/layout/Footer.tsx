import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-neutral-950 to-black text-white border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logos-08-bnrXmopZHTaexDH9J3uMSrSa6zmdUC.png"
                alt="GREEN HOUSE"
                className="h-8 w-auto object-contain"
              />
              <span className="font-bebas text-xl font-bold text-white tracking-wider">GREEN HOUSE</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              La plataforma líder de real estate en Argentina. Conectando sueños con hogares.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20v-7.21H5.5V9.25h2.79V7.61c0-2.77 1.69-4.28 4.16-4.28 1.18 0 2.2.09 2.49.13v2.88h-1.71c-1.34 0-1.6.64-1.6 1.57v2.05h3.2l-.41 3.54h-2.79V20" /></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a14.028 14.028 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zM9.5 14.5L14 12l-4.5-2.5z" /></svg>
              </a>
            </div>
          </div>

          {/* Para Compradores */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 tracking-wider">PARA COMPRADORES</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?operation=SALE" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Propiedades en Venta
                </Link>
              </li>
              <li>
                <Link href="/properties?operation=RENT" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Propiedades en Alquiler
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Guía del Comprador
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Calculadora de Hipoteca
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Profesionales */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 tracking-wider">PARA PROFESIONALES</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Inmobiliarias
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Desarrolladoras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Planes Profesionales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Publicar Propiedad
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 tracking-wider">INFORMACIÓN</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-400 hover:text-primary transition-colors font-montserrat">
                  Prensa
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 tracking-wider">SUSCRIBIRSE</h4>
            <p className="text-sm text-neutral-400 mb-4 font-montserrat">
              Recibe las mejores propiedades directamente en tu email.
            </p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Tu email"
                className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary font-montserrat"
              />
              <button className="px-3 py-2 bg-gradient-to-r from-primary to-accent text-white font-montserrat font-semibold rounded-lg hover:shadow-lg transition-all text-sm">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 font-montserrat">
            © {currentYear} GREEN HOUSE. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500 font-montserrat">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
