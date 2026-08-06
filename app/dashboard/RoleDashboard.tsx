'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Role = 'CLIENT' | 'AGENCY' | 'DEVELOPER';
type RoleDashboardProps = { role: Role; name: string };
type Stat = [string, string, string];

type ViewData = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  items: string[];
};

const roleConfig = {
  CLIENT: {
    label: 'Cliente',
    nav: ['Inicio', 'Buscar propiedades', 'Favoritos', 'Visitas agendadas', 'Mis consultas', 'Documentación', 'Perfil', 'Configuración'],
    stats: [['12', 'Recomendadas', '+4 esta semana'], ['3', 'Visitas agendadas', 'Próxima: mañana'], ['2', 'Consultas activas', '1 respuesta nueva']] as Stat[],
  },
  AGENCY: {
    label: 'Inmobiliaria',
    nav: ['Dashboard', 'Propiedades', 'Captaciones', 'Clientes', 'Agentes', 'Publicaciones', 'Agenda', 'Reportes', 'Configuración'],
    stats: [['48', 'Propiedades activas', '+8% este mes'], ['18', 'Nuevos leads', '+5 esta semana'], ['$24.8M', 'Ventas del mes', '+12.4% vs. anterior']] as Stat[],
  },
  DEVELOPER: {
    label: 'Desarrolladora',
    nav: ['Dashboard', 'Emprendimientos', 'Obras', 'Unidades', 'Reservas', 'Ventas', 'Clientes', 'Documentación', 'Reportes', 'Configuración'],
    stats: [['6', 'Emprendimientos', '2 en preventa'], ['82%', 'Avance de obras', '+6.2% este mes'], ['124', 'Unidades disponibles', '38 reservadas']] as Stat[],
  },
} as const;

const viewData: Record<string, ViewData> = {
  Inicio: { eyebrow: 'Resumen general', title: 'Todo en un solo lugar', description: 'Un vistazo rápido a lo más importante de tu actividad.', action: 'Ver actividad', items: ['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'] },
  Dashboard: { eyebrow: 'Resumen general', title: 'Todo en un solo lugar', description: 'Un vistazo rápido a lo más importante de tu actividad.', action: 'Ver actividad', items: ['Nueva actualización disponible', 'Se completó una tarea pendiente', 'Tu equipo agregó un comentario'] },
  'Buscar propiedades': { eyebrow: 'Explorá oportunidades', title: 'Encontrá un lugar para vos', description: 'Descubrí espacios seleccionados según tus preferencias y necesidades.', action: 'Aplicar filtros', items: ['Casa moderna en Nordelta · USD 420.000', 'Departamento luminoso en Palermo · USD 185.000', 'Loft con terraza en Colegiales · USD 230.000'] },
  Favoritos: { eyebrow: 'Tu selección', title: 'Lo que querés volver a mirar', description: 'Compará tus propiedades guardadas y avanzá con la que más te guste.', action: 'Comparar selección', items: ['Casa en Nordelta · Guardada hace 2 días', 'Departamento Palermo · Guardada hace 5 días', 'Loft en Colegiales · Guardada hace 1 semana'] },
  'Visitas agendadas': { eyebrow: 'Tu agenda', title: 'Tus próximos recorridos', description: 'Organizá tus visitas y tené toda la información a mano.', action: 'Agendar visita', items: ['Casa en Nordelta · Mañana, 11:30', 'Departamento Palermo · Viernes, 16:00', 'Loft en Colegiales · 18 de octubre'] },
  'Mis consultas': { eyebrow: 'Comunicación', title: 'Conversaciones abiertas', description: 'Seguí tus conversaciones con propietarios y asesores desde un solo lugar.', action: 'Nueva consulta', items: ['María González · Respondió hace 20 min', 'GreenHouse Palermo · En espera de respuesta', 'Estudio Norte · Consulta resuelta'] },
  Documentación: { eyebrow: 'Centro de documentos', title: 'Tus archivos importantes', description: 'Accedé a contratos, comprobantes y documentos de tus operaciones.', action: 'Subir documento', items: ['Contrato de reserva.pdf · Actualizado hoy', 'Comprobante de ingresos.pdf · Revisado', 'Ficha de propiedad.pdf · Disponible'] },
  Perfil: { eyebrow: 'Tu información', title: 'Tu perfil, a tu medida', description: 'Mantené tus datos actualizados para recibir una mejor experiencia.', action: 'Editar perfil', items: ['Información personal', 'Preferencias de búsqueda', 'Datos de contacto'] },
  Configuración: { eyebrow: 'Preferencias', title: 'Configurá tu espacio', description: 'Administrá notificaciones, privacidad y preferencias de tu cuenta.', action: 'Guardar cambios', items: ['Notificaciones por email', 'Privacidad de la cuenta', 'Preferencias de comunicación'] },
  Propiedades: { eyebrow: 'Inventario', title: 'Tu cartera de propiedades', description: 'Gestioná publicaciones, precios y disponibilidad en tiempo real.', action: 'Agregar propiedad', items: ['Casa Nordelta · Publicada · 12 consultas', 'Departamento Palermo · Publicada · 8 visitas', 'PH Villa Urquiza · Borrador'] },
  Captaciones: { eyebrow: 'Nuevas oportunidades', title: 'Captaciones en curso', description: 'Convertí nuevas oportunidades en propiedades publicadas.', action: 'Nueva captación', items: ['Estudio Norte · Reunión mañana', 'Casa Martínez · Documentación pendiente', 'Local Belgrano · Tasación solicitada'] },
  Clientes: { eyebrow: 'Relaciones', title: 'Clientes y contactos', description: 'Conocé el estado de cada relación y mantené el seguimiento al día.', action: 'Agregar contacto', items: ['María González · Búsqueda activa', 'Tomás Ruiz · Solicita tasación', 'Estudio Norte · Propietario'] },
  Agentes: { eyebrow: 'Equipo', title: 'El equipo que mueve tu negocio', description: 'Acompañá a tus agentes con información clara y accionable.', action: 'Invitar agente', items: ['Sofía Martínez · 18 leads activos', 'Lucas Fernández · 12 cierres este mes', 'Carla López · 9 propiedades'] },
  Publicaciones: { eyebrow: 'Visibilidad', title: 'Publicaciones que convierten', description: 'Revisá el alcance y rendimiento de cada propiedad publicada.', action: 'Nueva publicación', items: ['Casa Nordelta · 1.240 vistas', 'Departamento Palermo · 860 vistas', 'PH Villa Urquiza · Pendiente de publicar'] },
  Agenda: { eyebrow: 'Organización', title: 'La agenda de tu equipo', description: 'Coordiná visitas, reuniones y tareas sin perder el ritmo.', action: 'Crear evento', items: ['Visita con María · Hoy, 15:30', 'Tasación Casa Martínez · Mañana, 10:00', 'Reunión de equipo · Viernes, 09:00'] },
  Reportes: { eyebrow: 'Análisis', title: 'Entendé tus resultados', description: 'Tomá decisiones con una lectura clara de tus resultados comerciales.', action: 'Exportar reporte', items: ['Rendimiento comercial · Octubre', 'Origen de leads · Últimos 30 días', 'Ventas por zona · Trimestre actual'] },
  Emprendimientos: { eyebrow: 'Portfolio', title: 'Tus proyectos en perspectiva', description: 'Supervisá el estado de cada desarrollo y sus principales indicadores.', action: 'Nuevo emprendimiento', items: ['Torre Norte · En construcción · 64% avance', 'Paseo Verde · Preventa · 38% vendido', 'Altos del Lago · Finalizado · 92% vendido'] },
  Obras: { eyebrow: 'Ejecución', title: 'El avance de cada obra', description: 'Mantené bajo control hitos, responsables y fechas de cada desarrollo.', action: 'Agregar hito', items: ['Torre Norte · Estructura · 78%', 'Paseo Verde · Fundaciones · 42%', 'Altos del Lago · Terminaciones · 96%'] },
  Unidades: { eyebrow: 'Inventario', title: 'Disponibilidad de unidades', description: 'Consultá precios, tipologías y estado de cada unidad.', action: 'Ver inventario', items: ['Torre Norte 8A · Disponible · USD 198.000', 'Paseo Verde 2C · Reservada · USD 142.000', 'Altos del Lago 4B · Vendida'] },
  Reservas: { eyebrow: 'Comercial', title: 'Reservas que avanzan', description: 'Seguí cada reserva desde el primer contacto hasta el cierre.', action: 'Nueva reserva', items: ['Unidad 8A · Torre Norte · En revisión', 'Unidad 2C · Paseo Verde · Confirmada', 'Unidad 4B · Altos del Lago · Convertida'] },
  Ventas: { eyebrow: 'Resultados', title: 'Ventas y conversiones', description: 'Medí el ritmo de ventas y la evolución de tu portfolio.', action: 'Ver detalle', items: ['Torre Norte · 24 unidades vendidas', 'Paseo Verde · 38% de conversión', 'Altos del Lago · Objetivo alcanzado'] },
};

function MetricCards({ stats }: { stats: readonly Stat[] }) {
  return <section className="grid gap-3 md:grid-cols-3" aria-label="Métricas principales">{stats.map(([value, label, detail]) => <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><p className="text-3xl font-semibold tracking-tight">{value}</p><span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Activo</span></div><p className="mt-3 text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></article>)}</section>;
}

function OverviewView({ role, data }: { role: Role; data: ViewData }) {
  const label = role === 'CLIENT' ? 'Tu búsqueda' : role === 'AGENCY' ? 'Rendimiento comercial' : 'Evolución del portfolio';
  return <><div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.85fr]"><section className="rounded-2xl border border-border bg-card p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{label}</p><h2 className="mt-2 text-3xl tracking-wide">{role === 'CLIENT' ? 'Propiedades que pueden interesarte' : role === 'AGENCY' ? 'Actividad de los últimos 30 días' : 'Avance general de proyectos'}</h2><div className="mt-8 flex h-44 items-end gap-2 sm:gap-4">{[42, 58, 48, 72, 64, 86, 76, 94, 81, 100, 88, 96].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-md transition group-hover:bg-primary ${index === 9 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${height}%` }} /><span className="text-[10px] text-muted-foreground">{['E','F','M','A','M','J','J','A','S','O','N','D'][index]}</span></div>)}</div></section><ActionCard title={role === 'CLIENT' ? 'Agendá una visita' : role === 'AGENCY' ? 'Respondé tus leads' : 'Revisá los hitos'} text={role === 'CLIENT' ? 'Tenés tres propiedades listas para conocer esta semana.' : role === 'AGENCY' ? 'Hay 6 consultas nuevas esperando respuesta.' : 'Dos proyectos tienen avances para validar hoy.'} action="Abrir actividad" /></div><ListCard title="Actividad reciente" items={data.items} /></>;
}

function ActionCard({ title, text, action }: { title: string; text: string; action: string }) {
  return <section className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Siguiente paso</p><h2 className="mt-3 text-3xl tracking-wide">{title}</h2><p className="mt-3 text-sm leading-6 opacity-80">{text}</p><button type="button" className="mt-8 rounded-xl bg-primary-foreground px-4 py-3 text-sm font-bold text-primary transition hover:opacity-90">{action}</button></section>;
}

function ListCard({ title, items, action = 'Ver todo' }: { title: string; items: string[]; action?: string }) {
  return <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">{title}</h2><span className="text-xs font-bold text-primary">{action}</span></div><div className="mt-5 divide-y divide-border">{items.map((item, index) => <div key={item} className="flex items-center gap-3 py-3 text-sm"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">{String(index + 1).padStart(2, '0')}</span><span>{item}</span><span className="ml-auto text-xs text-muted-foreground">Ver</span></div>)}</div></section>;
}

function PropertiesView({ role, data }: { role: Role; data: ViewData }) {
  if (role === 'CLIENT') return <div className="mt-8"><div className="mb-4 flex flex-wrap gap-2"><button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Todas</button>{['Casa', 'Departamento', 'En venta', 'En alquiler'].map((item) => <button key={item} type="button" className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-muted-foreground">{item}</button>)}</div><div className="grid gap-4 md:grid-cols-3">{['Casa Nordelta', 'Palermo Soho', 'Loft Colegiales'].map((item, index) => <article key={item} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="flex h-32 items-end bg-muted p-4"><span className="rounded-full bg-card px-2 py-1 text-[10px] font-bold uppercase text-primary">{index === 0 ? 'Recomendada' : 'Nueva'}</span></div><div className="p-4"><h3 className="font-semibold">{item}</h3><p className="mt-1 text-sm text-muted-foreground">{['USD 420.000 · 4 ambientes', 'USD 185.000 · 2 ambientes', 'USD 230.000 · 3 ambientes'][index]}</p><button type="button" className="mt-4 text-xs font-bold text-primary">Ver propiedad</button></div></article>)}</div></div>;
  return <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Inventario activo</p><h2 className="mt-1 text-2xl tracking-wide">{role === 'AGENCY' ? 'Propiedades publicadas' : 'Unidades del portfolio'}</h2></div><button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">{data.action}</button></div><div className="divide-y divide-border">{data.items.concat(['Nueva oportunidad · En revisión']).map((item, index) => <div key={item} className="flex flex-wrap items-center gap-4 px-5 py-4 text-sm"><span className="size-2 rounded-full bg-primary" /><span className="min-w-52 flex-1 font-semibold">{item.split(' · ')[0]}</span><span className="text-muted-foreground">{item.split(' · ').slice(1).join(' · ')}</span><button type="button" className="text-xs font-bold text-primary">Gestionar</button></div>)}</div></div>;
}

function CalendarView({ data }: { data: ViewData }) { return <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"><section className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl tracking-wide">Octubre 2026</h2><div className="flex gap-2"><button type="button" className="rounded-lg border border-border px-3 py-2 text-sm">Anterior</button><button type="button" className="rounded-lg border border-border px-3 py-2 text-sm">Siguiente</button></div></div><div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map((day) => <span key={day} className="py-2 font-bold">{day}</span>)}{Array.from({ length: 35 }, (_, index) => <span key={index} className={`flex aspect-square items-center justify-center rounded-lg ${[7, 15, 22].includes(index) ? 'bg-primary font-bold text-primary-foreground' : 'bg-muted/40'}`}>{index + 1}</span>)}</div></section><ListCard title="Próximos eventos" items={data.items} action={data.action} /></div>; }

function DocumentsView({ data }: { data: ViewData }) { return <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm"><div className="flex items-center justify-between border-b border-border p-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Archivos</p><h2 className="mt-1 text-2xl tracking-wide">Documentación reciente</h2></div><button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">{data.action}</button></div><div className="divide-y divide-border">{data.items.map((item, index) => <div key={item} className="flex items-center gap-4 p-5"><div className="flex size-10 items-center justify-center rounded-xl bg-muted text-xs font-bold text-primary">PDF</div><div className="flex-1"><p className="text-sm font-semibold">{item.split(' · ')[0]}</p><p className="mt-1 text-xs text-muted-foreground">{item.split(' · ')[1]}</p></div><button type="button" className="text-xs font-bold text-primary">Descargar</button></div>)}</div></div>; }

function SettingsView({ data }: { data: ViewData }) { return <div className="mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="space-y-2">{data.items.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-border py-5 last:border-0"><div className="flex-1"><p className="text-sm font-semibold">{item}</p><p className="mt-1 text-xs text-muted-foreground">Configurá esta opción según tus preferencias.</p></div><button type="button" aria-label={`Activar ${item}`} className={`h-6 w-11 rounded-full p-1 ${index === 0 ? 'bg-primary' : 'bg-muted'}`}><span className={`block size-4 rounded-full bg-background transition ${index === 0 ? 'ml-5' : ''}`} /></button></div>)}</div><button type="button" className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">{data.action}</button></div>; }

function ProfileView({ data, name }: { data: ViewData; name: string }) { return <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]"><section className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground"><div className="flex size-16 items-center justify-center rounded-full bg-primary-foreground text-xl font-bold text-primary">{name.slice(0, 2).toUpperCase()}</div><h2 className="mt-5 text-3xl tracking-wide">{name}</h2><p className="mt-2 text-sm opacity-75">Perfil activo en GreenHouse</p></section><section className="rounded-2xl border border-border bg-card p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Datos personales</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{['Nombre completo', 'Correo electrónico', 'Teléfono', 'Ciudad'].map((label, index) => <label key={label} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}<input readOnly value={index === 0 ? name : index === 1 ? 'usuario@greenhouse.com' : index === 2 ? '+54 11 5555 5555' : 'Buenos Aires'} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-normal text-foreground outline-none" /></label>)}</div><button type="button" className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">{data.action}</button></section></div>; }

function GenericView({ data }: { data: ViewData }) { return <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><ListCard title={data.title} items={data.items} action={data.action} /><ActionCard title={data.action} text={data.description} action="Abrir sección" /></div>; }

export function RoleDashboard({ role, name }: RoleDashboardProps) {
  const config = roleConfig[role];
  const [active, setActive] = useState<string>(config.nav[0]);
  const router = useRouter();
  const data: ViewData = viewData[active] ?? viewData.Inicio!;

  async function signOut() { await createClient().auth.signOut(); router.push('/auth/login'); router.refresh(); }

  function renderView() {
    if (active === config.nav[0]) return <OverviewView role={role} data={data} />;
    if (active === 'Buscar propiedades' || active === 'Propiedades' || active === 'Unidades' || active === 'Emprendimientos') return <PropertiesView role={role} data={data} />;
    if (active === 'Visitas agendadas' || active === 'Agenda' || active === 'Obras') return <CalendarView data={data} />;
    if (active === 'Documentación') return <DocumentsView data={data} />;
    if (active === 'Perfil') return <ProfileView data={data} name={name} />;
    if (active === 'Configuración') return <SettingsView data={data} />;
    return <GenericView data={data} />;
  }

  return <div className="min-h-screen bg-background text-foreground lg:flex"><aside className="border-b border-border bg-card lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r"><div className="flex items-center justify-between px-6 py-6 lg:block"><div><p className="font-bebas text-3xl tracking-wide text-primary">GreenHouse</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{config.label}</p></div><button type="button" onClick={signOut} className="text-sm text-muted-foreground transition hover:text-foreground lg:mt-10">Salir</button></div><nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:px-3" aria-label={`Navegación de ${config.label}`}>{config.nav.map((item, index) => <button key={item} type="button" onClick={() => setActive(item)} className={`group flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition lg:mb-1 lg:w-full ${active === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><span className={`flex size-6 items-center justify-center rounded-md text-[10px] font-bold ${active === item ? 'bg-primary-foreground/20' : 'bg-muted'}`}>{String(index + 1).padStart(2, '0')}</span>{item}</button>)}</nav><div className="mt-auto hidden border-t border-border p-5 lg:block"><p className="text-xs leading-5 text-muted-foreground">Tu espacio de trabajo está actualizado.</p><button type="button" onClick={signOut} className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">Cerrar sesión</button></div></aside><main className="flex-1 px-5 py-7 sm:px-8 lg:px-12 lg:py-10"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary"><span className="size-2 rounded-full bg-primary" />{data.eyebrow}</div><h1 className="mt-3 max-w-3xl text-5xl leading-[0.95] tracking-wide sm:text-7xl">{data.title}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Hola, {name}. {data.description}</p></div><div className="flex items-center gap-3"><span className="hidden text-xs text-muted-foreground sm:block">Última actualización · Hoy, 09:42</span><div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{name.slice(0, 2).toUpperCase()}</div></div></header><MetricCards stats={config.stats} />{renderView()}</div></main></div>;
}
