'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Role = 'CLIENT' | 'AGENCY' | 'DEVELOPER';

type RoleDashboardProps = {
  role: Role;
  name: string;
};

const roleConfig = {
  CLIENT: {
    label: 'Cliente',
    eyebrow: 'Tu espacio personal',
    title: 'Encontrá tu próximo hogar',
    description: 'Seguimiento simple y claro para cada paso de tu búsqueda.',
    nav: ['Inicio', 'Buscar propiedades', 'Favoritos', 'Visitas agendadas', 'Mis consultas', 'Documentación', 'Perfil', 'Configuración'],
    stats: [['12', 'Propiedades recomendadas'], ['3', 'Visitas agendadas'], ['2', 'Consultas activas']],
    cards: ['Propiedades recomendadas', 'Últimas visitas', 'Estado de consultas', 'Próximas visitas'],
  },
  AGENCY: {
    label: 'Inmobiliaria',
    eyebrow: 'Centro de operaciones',
    title: 'Tu negocio, en movimiento',
    description: 'Una vista completa de tus propiedades, clientes y oportunidades.',
    nav: ['Dashboard', 'Propiedades', 'Captaciones', 'Clientes', 'Agentes', 'Publicaciones', 'Agenda', 'Reportes', 'Configuración'],
    stats: [['48', 'Propiedades activas'], ['18', 'Nuevos leads'], ['$24.8M', 'Ventas del mes']],
    cards: ['Rendimiento de agentes', 'Consultas pendientes', 'Captaciones recientes', 'Agenda de hoy'],
  },
  DEVELOPER: {
    label: 'Desarrolladora',
    eyebrow: 'Portfolio de proyectos',
    title: 'Construí el futuro',
    description: 'Controlá tus emprendimientos, unidades y ventas desde un solo lugar.',
    nav: ['Dashboard', 'Emprendimientos', 'Obras', 'Unidades', 'Reservas', 'Ventas', 'Clientes', 'Documentación', 'Reportes', 'Configuración'],
    stats: [['6', 'Emprendimientos'], ['82%', 'Avance de obras'], ['124', 'Unidades disponibles']],
    cards: ['Avance de obras', 'Ventas por proyecto', 'Flujo de caja', 'Próximos hitos'],
  },
} as const;

export function RoleDashboard({ role, name }: RoleDashboardProps) {
  const config = roleConfig[role];
  const [active, setActive] = useState<string>(config.nav[0]);
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push('/auth/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className="border-b border-border bg-card lg:flex lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-6 py-6 lg:block">
          <div>
            <p className="font-bebas text-3xl tracking-wide text-primary">GreenHouse</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{config.label}</p>
          </div>
          <button onClick={signOut} className="text-sm text-muted-foreground transition hover:text-foreground lg:mt-10">Salir</button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:px-4" aria-label={`Navegación de ${config.label}`}>
          {config.nav.map((item) => (
            <button key={item} onClick={() => setActive(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition lg:mb-1 lg:block lg:w-full ${active === item ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{config.eyebrow}</p>
              <h1 className="mt-2 text-5xl tracking-wide sm:text-6xl">{config.title}</h1>
              <p className="mt-3 max-w-xl leading-6 text-muted-foreground">Hola, {name}. {config.description}</p>
            </div>
            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">{active}</div>
          </header>

          <section className="grid gap-4 md:grid-cols-3" aria-label="Resumen">
            {config.stats.map(([value, label]) => (
              <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-3xl font-semibold text-primary">{value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Actividad">
            {config.cards.map((card, index) => (
              <article key={card} className="min-h-40 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl tracking-wide">{card}</h2>
                  <span className="text-sm text-muted-foreground">0{index + 1}</span>
                </div>
                <p className="mt-8 text-sm text-muted-foreground">La información de {card.toLowerCase()} aparecerá acá.</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
