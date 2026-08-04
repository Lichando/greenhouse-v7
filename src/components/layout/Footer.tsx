'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'buyers',
      title: 'Para Compradores',
      items: [
        { label: 'Propiedades en Venta', href: '/properties?operation=SALE' },
        { label: 'Propiedades en Alquiler', href: '/properties?operation=RENT' },
        { label: 'Guía del Comprador', href: '#' },
        { label: 'Calculadora de Hipoteca', href: '#' },
      ],
    },
    {
      id: 'sellers',
      title: 'Para Vendedores',
      items: [
        { label: 'Publicar Propiedad', href: '#' },
        { label: 'Herramientas de Marketing', href: '#' },
        { label: 'Planes para Vendedores', href: '#' },
        { label: 'Contactar Asesor', href: '/contact' },
      ],
    },
    {
      id: 'professionals',
      title: 'Para Profesionales',
      items: [
        { label: 'Inmobiliarias', href: '/contact' },
        { label: 'Desarrolladoras', href: '/contact' },
        { label: 'Planes Profesionales', href: '#' },
        { label: 'Soporte Dedicado', href: '#' },
      ],
    },
    {
      id: 'community',
      title: 'Comunidad',
      items: [
        { label: 'Blog', href: '#' },
        { label: 'Suscribir Newsletter', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary border-t border-primary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section: Logo and Social */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/20">
          {/* Brand Section */}
          <div className="flex items-center gap-2 group hover:opacity-85 transition-opacity flex-shrink-0">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logos-08-bnrXmopZHTaexDH9J3uMSrSa6zmdUC.png"
              alt="GREEN HOUSE"
              className="h-7 w-auto object-contain"
            />
            <span className="font-bebas text-base font-bold text-white tracking-wider">GREEN HOUSE</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20v-7.21H5.5V9.25h2.79V7.61c0-2.77 1.69-4.28 4.16-4.28 1.18 0 2.2.09 2.49.13v2.88h-1.71c-1.34 0-1.6.64-1.6 1.57v2.05h3.2l-.41 3.54h-2.79V20" /></svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a14.028 14.028 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zM9.5 14.5L14 12l-4.5-2.5z" /></svg>
            </a>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <button
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="flex items-center justify-between py-2 text-sm font-montserrat font-semibold text-white hover:text-white/80 transition-colors mb-2"
              >
                <span>{section.title}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${openSection === section.id ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              
              {/* Expanded Items */}
              {openSection === section.id && (
                <div className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-xs font-montserrat text-white/80 hover:text-white transition-colors pl-3 border-l border-white/30 hover:border-white/60 py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <p className="text-xs sm:text-sm font-montserrat text-white/70">
            © {currentYear} GREEN HOUSE. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-montserrat text-white/70">
            <Link href="#" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
