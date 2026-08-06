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
    description: 'Todo lo que necesitás para avanzar con claridad hacia tu próxima propiedad.',
    nav: ['Inicio', 'Buscar propiedades', 'Favoritos', 'Visitas agendadas', 'Mis consultas', 'Documentación', 'Perfil', 'Configuración'],
    stats: [['12', 'Recomendadas', '+4 esta semana'], ['3', 'Visitas agendadas', 'Próxima: mañana'], ['2', 'Consultas activas', '1 respuesta nueva']],
  },
  AGENCY: {
    label: 'Inmobiliaria',
    eyebrow: 'Centro de operaciones',
    title: 'Tu negocio, en movimiento',
    description: 'Una vista inteligente de tus propiedades, clientes y oportunidades comerciales.',
    nav: ['Dashboard', 'Propiedades', 'Captaciones', 'Clientes', 'Agentes', 'Publicaciones', 'Agenda', 'Reportes', 'Configuración'],
    stats: [['48', 'Propiedades activas', '+8% este mes'], ['18', 'Nuevos leads', '+5 esta semana'], ['$24.8M', 'Ventas del mes', '+12.4% vs. anterior']],
  },
  DEVELOPER: {
    label: 'Desarrolladora',
    eyebrow: 'Portfolio de proyectos',
    title: 'Construí el futuro',
    description: 'Controlá tus emprendimientos, unidades y ventas desde un solo lugar.',
    nav: ['Dashboard', 'Emprendimientos', 'Obras', 'Unidades', 'Reservas', 'Ventas', 'Clientes', 'Documentación', 'Reportes', 'Configuración'],
    stats: [['6', 'Emprendimientos', '2 en preventa'], ['82%', 'Avance de obras', '+6.2% este mes'], ['124', 'Unidades disponibles', '38 reservadas']],
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

  const isClient = role === 'CLIENT';
  const isAgency = role === 'AGENCY';

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className="border-b border-border bg-card lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-6 py-6 lg:block">
          <div>
            <p className="font-bebas text-3xl tracking-wide text-primary">GreenHouse</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{config.label}</p>
          </div>
          <button type="button" onClick={signOut} className="text-sm text-muted-foreground transition hover:text-foreground lg:mt-10">Salir</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:px-3" aria-label={`Navegación de ${config.label}`}>
          {config.nav.map((item, index) => (
            <button key={item} type="button" onClick={() => setActive(item)} className={`group flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition lg:mb-1 lg:w-full ${active === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <span className={`flex size-6 items-center justify-center rounded-md text-[10px] font-bold ${active === item ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </button>
          ))}
        </nav>
        <div className="mt-auto hidden border-t border-border p-5 lg:block">
          <p className="text-xs leading-5 text-muted-foreground">Tu espacio de trabajo está actualizado.</p>
          <button type="button" onClick={signOut} className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">Cerrar sesión</button>
        </div>
      </aside>

      <main className="flex-1 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span className="size-2 rounded-full bg-primary" />
                {config.eyebrow}
              </div>
              <h1 className="mt-3 max-w-3xl text-5xl leading-[0.95] tracking-wide sm:text-7xl">{config.title}</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Hola, {name}. {config.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:block">Última actualización · Hoy, 09:42</span>
              <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{name.slice(0, 2).toUpperCase()}</div>
            </div>
          </header>

          <section className="grid gap-3 md:grid-cols-3" aria-label="Resumen">
            {config.stats.map(([value, label, detail]) => (
              <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">+ activo</span>
                </div>
                <p className="mt-3 text-sm font-semibold">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
              </article>
            ))}
          </section>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm" aria-labelledby="activity-title">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{isClient ? 'Tu búsqueda' : isAgency ? 'Rendimiento comercial' : 'Evolución del portfolio'}</p><h2 id="activity-title" className="mt-2 text-3xl tracking-wide">{isClient ? 'Propiedades que pueden interesarte' : isAgency ? 'Actividad de los últimos 30 días' : 'Avance general de proyectos'}</h2></div>
                <button type="button" className="text-xs font-bold text-primary">Ver detalle</button>
              </div>
              <div className="mt-8 flex h-44 items-end gap-2 sm:gap-4">
                {[42, 58, 48, 72, 64, 86, 76, 94, 81, 100, 88, 96].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-md transition group-hover:bg-primary ${index === 9 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${height}%` }} /><span className="text-[10px] text-muted-foreground">{['E','F','M','A','M','J','J','A','S','O','N','D'][index]}</span></div>)}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm" aria-labelledby="next-title">
              <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Siguiente paso</p>
              <h2 id="next-title" className="mt-3 text-3xl tracking-wide">{isClient ? 'Agendá una visita' : isAgency ? 'Respondé tus leads' : 'Revisá los hitos'}</h2>
              <p className="mt-3 text-sm leading-6 opacity-80">{isClient ? 'Tenés tres propiedades listas para conocer esta semana.' : isAgency ? 'Hay 6 consultas nuevas esperando respuesta.' : 'Dos proyectos tienen avances para validar hoy.'}</p>
              <button type="button" className="mt-8 rounded-xl bg-primary-foreground px-4 py-3 text-sm font-bold text-primary transition hover:opacity-90">Abrir actividad</button>
            </section>
          </div>

          <section className="mt-6 grid gap-6 md:grid-cols-2" aria-label="Actividad reciente">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">{isClient ? 'Próximas visitas' : isAgency ? 'Consultas pendientes' : 'Próximos hitos'}</h2><span className="text-xs font-bold text-primary">Ver todo</span></div>
              <div className="mt-5 divide-y divide-border">{(isClient ? ['Casa en Nordelta · Mañana, 11:30', 'Departamento Palermo · Viernes, 16:00', 'Loft en Colegiales · 18 de octubre'] : isAgency ? ['María González · Consulta por Palermo', 'Tomás Ruiz · Solicita tasación', 'Estudio Norte · Nueva captación'] : ['Torre Norte · Entrega de amenities', 'Paseo Verde · Inicio de etapa 3', 'Altos del Lago · Reunión comercial']).map((item) => <div key={item} className="flex items-center gap-3 py-3 text-sm"><span className="size-2 rounded-full bg-primary" /><span>{item}</span></div>)}</div>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">Actividad reciente</h2><span className="text-xs font-bold text-primary">Ver reportes</span></div>
              <div className="mt-5 space-y-4">{['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'].map((item, index) => <div key={item} className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-primary">0{index + 1}</span><div><p className="text-sm font-semibold">{item}</p><p className="mt-1 text-xs text-muted-foreground">Hace {index + 1} hora{index ? 's' : ''}</p></div></div>)}</div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
