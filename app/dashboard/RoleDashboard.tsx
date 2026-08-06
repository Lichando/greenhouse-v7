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
    label: 'Cliente', eyebrow: 'Tu espacio personal', title: 'Encontrá tu próximo hogar',
    description: 'Todo lo que necesitás para avanzar con claridad hacia tu próxima propiedad.',
    nav: ['Inicio', 'Buscar propiedades', 'Favoritos', 'Visitas agendadas', 'Mis consultas', 'Documentación', 'Perfil', 'Configuración'],
    stats: [['12', 'Recomendadas', '+4 esta semana'], ['3', 'Visitas agendadas', 'Próxima: mañana'], ['2', 'Consultas activas', '1 respuesta nueva']],
  },
  AGENCY: {
    label: 'Inmobiliaria', eyebrow: 'Centro de operaciones', title: 'Tu negocio, en movimiento',
    description: 'Una vista inteligente de tus propiedades, clientes y oportunidades comerciales.',
    nav: ['Dashboard', 'Propiedades', 'Captaciones', 'Clientes', 'Agentes', 'Publicaciones', 'Agenda', 'Reportes', 'Configuración'],
    stats: [['48', 'Propiedades activas', '+8% este mes'], ['18', 'Nuevos leads', '+5 esta semana'], ['$24.8M', 'Ventas del mes', '+12.4% vs. anterior']],
  },
  DEVELOPER: {
    label: 'Desarrolladora', eyebrow: 'Portfolio de proyectos', title: 'Construí el futuro',
    description: 'Controlá tus emprendimientos, unidades y ventas desde un solo lugar.',
    nav: ['Dashboard', 'Emprendimientos', 'Obras', 'Unidades', 'Reservas', 'Ventas', 'Clientes', 'Documentación', 'Reportes', 'Configuración'],
    stats: [['6', 'Emprendimientos', '2 en preventa'], ['82%', 'Avance de obras', '+6.2% este mes'], ['124', 'Unidades disponibles', '38 reservadas']],
  },
} as const;

const sectionContent: Record<string, { eyebrow: string; title: string; description: string; action: string; items: string[] }> = {
  Inicio: { eyebrow: 'Resumen general', title: 'Todo en un solo lugar', description: 'Un vistazo rápido a lo más importante de tu actividad.', action: 'Ver actividad', items: ['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'] },
  Dashboard: { eyebrow: 'Resumen general', title: 'Todo en un solo lugar', description: 'Un vistazo rápido a lo más importante de tu actividad.', action: 'Ver actividad', items: ['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'] },
  'Buscar propiedades': { eyebrow: 'Explorá oportunidades', title: 'Propiedades para vos', description: 'Descubrí espacios seleccionados según tus preferencias y necesidades.', action: 'Ver todas las propiedades', items: ['Casa moderna en Nordelta · USD 420.000', 'Departamento luminoso en Palermo · USD 185.000', 'Loft con terraza en Colegiales · USD 230.000'] },
  Favoritos: { eyebrow: 'Tu selección', title: 'Propiedades guardadas', description: 'Volvé a las propiedades que más te interesaron y compará tus opciones.', action: 'Explorar más', items: ['Casa en Nordelta · Guardada hace 2 días', 'Departamento Palermo · Guardada hace 5 días', 'Loft en Colegiales · Guardada hace 1 semana'] },
  'Visitas agendadas': { eyebrow: 'Tu agenda', title: 'Próximas visitas', description: 'Organizá tus recorridos y no te pierdas ninguna oportunidad.', action: 'Agendar visita', items: ['Casa en Nordelta · Mañana, 11:30', 'Departamento Palermo · Viernes, 16:00', 'Loft en Colegiales · 18 de octubre'] },
  'Mis consultas': { eyebrow: 'Comunicación', title: 'Consultas activas', description: 'Seguí tus conversaciones con propietarios y asesores.', action: 'Nueva consulta', items: ['María González · Respondió hace 20 min', 'GreenHouse Palermo · En espera de respuesta', 'Estudio Norte · Consulta resuelta'] },
  Documentación: { eyebrow: 'Centro de documentos', title: 'Tus documentos', description: 'Accedé a contratos, comprobantes y archivos importantes.', action: 'Subir documento', items: ['Contrato de reserva.pdf · Actualizado hoy', 'Comprobante de ingresos.pdf · Revisado', 'Ficha de propiedad.pdf · Disponible'] },
  Perfil: { eyebrow: 'Tu información', title: 'Perfil y preferencias', description: 'Mantené tus datos actualizados para recibir una mejor experiencia.', action: 'Editar perfil', items: ['Información personal', 'Preferencias de búsqueda', 'Datos de contacto'] },
  Configuración: { eyebrow: 'Preferencias', title: 'Configurá tu espacio', description: 'Administrá notificaciones, privacidad y preferencias de tu cuenta.', action: 'Guardar cambios', items: ['Notificaciones por email', 'Privacidad de la cuenta', 'Preferencias de comunicación'] },
  Propiedades: { eyebrow: 'Inventario', title: 'Propiedades activas', description: 'Gestioná publicaciones, precios y disponibilidad de tu cartera.', action: 'Agregar propiedad', items: ['Casa Nordelta · Publicada · 12 consultas', 'Departamento Palermo · Publicada · 8 visitas', 'PH Villa Urquiza · Borrador'] },
  Captaciones: { eyebrow: 'Nuevas oportunidades', title: 'Captaciones en curso', description: 'Convertí nuevas oportunidades en propiedades publicadas.', action: 'Nueva captación', items: ['Estudio Norte · Reunión mañana', 'Casa Martínez · Documentación pendiente', 'Local Belgrano · Tasación solicitada'] },
  Clientes: { eyebrow: 'Relaciones', title: 'Clientes y contactos', description: 'Conocé el estado de cada relación y mantené el seguimiento al día.', action: 'Agregar contacto', items: ['María González · Búsqueda activa', 'Tomás Ruiz · Solicita tasación', 'Estudio Norte · Propietario'] },
  Agentes: { eyebrow: 'Equipo', title: 'Rendimiento de agentes', description: 'Acompañá a tu equipo con información clara y accionable.', action: 'Invitar agente', items: ['Sofía Martínez · 18 leads activos', 'Lucas Fernández · 12 cierres este mes', 'Carla López · 9 propiedades'] },
  Publicaciones: { eyebrow: 'Visibilidad', title: 'Tus publicaciones', description: 'Revisá el alcance y rendimiento de cada publicación.', action: 'Nueva publicación', items: ['Casa Nordelta · 1.240 vistas', 'Departamento Palermo · 860 vistas', 'PH Villa Urquiza · Pendiente de publicar'] },
  Agenda: { eyebrow: 'Organización', title: 'Agenda comercial', description: 'Coordiná visitas, reuniones y tareas de tu equipo.', action: 'Crear evento', items: ['Visita con María · Hoy, 15:30', 'Tasación Casa Martínez · Mañana, 10:00', 'Reunión de equipo · Viernes, 09:00'] },
  Reportes: { eyebrow: 'Análisis', title: 'Reportes de rendimiento', description: 'Tomá mejores decisiones con una lectura clara de tus resultados.', action: 'Exportar reporte', items: ['Rendimiento comercial · Octubre', 'Origen de leads · Últimos 30 días', 'Ventas por zona · Trimestre actual'] },
  Emprendimientos: { eyebrow: 'Portfolio', title: 'Tus emprendimientos', description: 'Supervisá el estado de cada proyecto y sus principales indicadores.', action: 'Nuevo emprendimiento', items: ['Torre Norte · En construcción · 64% avance', 'Paseo Verde · Preventa · 38% vendido', 'Altos del Lago · Finalizado · 92% vendido'] },
  Obras: { eyebrow: 'Ejecución', title: 'Avance de obras', description: 'Mantené bajo control los hitos y fechas de cada desarrollo.', action: 'Agregar hito', items: ['Torre Norte · Estructura · 78%', 'Paseo Verde · Fundaciones · 42%', 'Altos del Lago · Terminaciones · 96%'] },
  Unidades: { eyebrow: 'Inventario', title: 'Unidades disponibles', description: 'Consultá disponibilidad, precios y estado de cada unidad.', action: 'Ver inventario', items: ['Torre Norte 8A · Disponible · USD 198.000', 'Paseo Verde 2C · Reservada · USD 142.000', 'Altos del Lago 4B · Vendida'] },
  Reservas: { eyebrow: 'Comercial', title: 'Reservas recientes', description: 'Seguí cada reserva desde el primer contacto hasta el cierre.', action: 'Nueva reserva', items: ['Unidad 8A · Torre Norte · En revisión', 'Unidad 2C · Paseo Verde · Confirmada', 'Unidad 4B · Altos del Lago · Convertida'] },
  Ventas: { eyebrow: 'Resultados', title: 'Ventas y conversiones', description: 'Medí el ritmo de ventas y la evolución de tu portfolio.', action: 'Ver detalle', items: ['Torre Norte · 24 unidades vendidas', 'Paseo Verde · 38% de conversión', 'Altos del Lago · Objetivo alcanzado'] },
};

export function RoleDashboard({ role, name }: RoleDashboardProps) {
  const config = roleConfig[role];
  const [active, setActive] = useState<string>(config.nav[0]);
  const router = useRouter();
  const content = sectionContent[active] || {
    eyebrow: 'Resumen general',
    title: 'Todo en un solo lugar',
    description: 'Un vistazo rápido a lo más importante de tu actividad.',
    action: 'Ver actividad',
    items: ['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'],
  };
  const isClient = role === 'CLIENT';
  const isAgency = role === 'AGENCY';

  async function signOut() {
    await createClient().auth.signOut();
    router.push('/auth/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className="border-b border-border bg-card lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-6 py-6 lg:block"><div><p className="font-bebas text-3xl tracking-wide text-primary">GreenHouse</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{config.label}</p></div><button type="button" onClick={signOut} className="text-sm text-muted-foreground transition hover:text-foreground lg:mt-10">Salir</button></div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:px-3" aria-label={`Navegación de ${config.label}`}>
          {config.nav.map((item, index) => <button key={item} type="button" onClick={() => setActive(item)} className={`group flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition lg:mb-1 lg:w-full ${active === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><span className={`flex size-6 items-center justify-center rounded-md text-[10px] font-bold ${active === item ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{String(index + 1).padStart(2, '0')}</span>{item}</button>)}
        </nav>
        <div className="mt-auto hidden border-t border-border p-5 lg:block"><p className="text-xs leading-5 text-muted-foreground">Tu espacio de trabajo está actualizado.</p><button type="button" onClick={signOut} className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">Cerrar sesión</button></div>
      </aside>

      <main className="flex-1 px-5 py-7 sm:px-8 lg:px-12 lg:py-10"><div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"><span className="size-2 rounded-full bg-primary" />{content.eyebrow}</div><h1 className="mt-3 max-w-3xl text-5xl leading-[0.95] tracking-wide sm:text-7xl">{content.title}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Hola, {name}. {content.description}</p></div><div className="flex items-center gap-3"><span className="hidden text-xs text-muted-foreground sm:block">Última actualización · Hoy, 09:42</span><div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{name.slice(0, 2).toUpperCase()}</div></div></header>

        <section className="grid gap-3 md:grid-cols-3" aria-label="Resumen">{config.stats.map(([value, label, detail]) => <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p><span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Activo</span></div><p className="mt-3 text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></article>)}</section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.85fr]"><section className="rounded-2xl border border-border bg-card p-6 shadow-sm" aria-labelledby="activity-title"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{isClient ? 'Tu búsqueda' : isAgency ? 'Rendimiento comercial' : 'Evolución del portfolio'}</p><h2 id="activity-title" className="mt-2 text-3xl tracking-wide">{active === config.nav[0] ? (isClient ? 'Propiedades que pueden interesarte' : isAgency ? 'Actividad de los últimos 30 días' : 'Avance general de proyectos') : `Resumen de ${active.toLowerCase()}`}</h2></div><button type="button" className="text-xs font-bold text-primary">{content.action}</button></div><div className="mt-7 space-y-2">{content.items.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-sm"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">{String(index + 1).padStart(2, '0')}</span><span>{item}</span><span className="ml-auto text-xs text-muted-foreground">Ver</span></div>)}</div></section>
          <section className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm" aria-labelledby="next-title"><p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Acción recomendada</p><h2 id="next-title" className="mt-3 text-3xl tracking-wide">{content.action}</h2><p className="mt-3 text-sm leading-6 opacity-80">Mantené tu actividad al día y aprovechá las nuevas oportunidades de GreenHouse.</p><button type="button" className="mt-8 rounded-xl bg-primary-foreground px-4 py-3 text-sm font-bold text-primary transition hover:opacity-90">Abrir sección</button></section></div>

        <section className="mt-6 grid gap-6 md:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">Actividad reciente</h2><span className="text-xs font-bold text-primary">Ver todo</span></div><div className="mt-5 space-y-4">{['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'].map((item, index) => <div key={item} className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-primary">0{index + 1}</span><div><p className="text-sm font-semibold">{item}</p><p className="mt-1 text-xs text-muted-foreground">Hace {index + 1} hora{index ? 's' : ''}</p></div></div>)}</div></article><article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">Atajos</h2><span className="text-xs text-muted-foreground">{config.label}</span></div><div className="mt-5 grid gap-2">{config.nav.slice(0, 3).map((item) => <button key={item} type="button" onClick={() => setActive(item)} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition hover:border-primary hover:text-primary"><span>{item}</span><span>→</span></button>)}</div></article></section>
      </div></main>
    </div>
  );
}
