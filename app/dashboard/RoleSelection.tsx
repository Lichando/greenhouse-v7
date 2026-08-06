'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Role = 'CLIENT' | 'AGENCY' | 'DEVELOPER';

const options: Array<{ role: Role; label: string; description: string; action: string; accent: string }> = [
  { role: 'CLIENT', label: 'Cliente', description: 'Buscá, comprá o alquilá tu próxima propiedad.', action: 'Quiero buscar propiedades', accent: 'bg-emerald-500/10 text-emerald-600' },
  { role: 'AGENCY', label: 'Inmobiliaria', description: 'Administrá propiedades, agentes y clientes.', action: 'Soy una inmobiliaria', accent: 'bg-sky-500/10 text-sky-600' },
  { role: 'DEVELOPER', label: 'Desarrolladora', description: 'Gestioná proyectos y comercializá unidades.', action: 'Soy una desarrolladora', accent: 'bg-amber-500/10 text-amber-600' },
];

export function RoleSelection({ userId }: { userId: string }) {
  const [loading, setLoading] = useState<Role | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  async function chooseRole(role: Role) {
    setLoading(role);
    setError('');
    const { error: updateError } = await createClient().from('profiles').update({ role }).eq('id', userId);
    if (updateError) {
      setError('No pudimos guardar tu perfil. Intentá nuevamente.');
      setLoading(null);
      return;
    }
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-bebas text-3xl tracking-wide text-primary">GreenHouse</p>
        <div className="mt-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Primer paso</p>
          <h1 className="mt-3 text-5xl tracking-wide sm:text-7xl">¿Cómo querés utilizar GreenHouse?</h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground">Elegí el perfil que mejor represente tu actividad. Siempre podrás agregar nuevos perfiles más adelante.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {options.map((option) => (
            <button key={option.role} onClick={() => chooseRole(option.role)} disabled={loading !== null} className="group rounded-3xl border border-border bg-card p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl disabled:cursor-wait disabled:opacity-60">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold ${option.accent}`}>{option.label.slice(0, 2).toUpperCase()}</div>
              <h2 className="mt-8 text-3xl tracking-wide">{option.label}</h2>
              <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{option.description}</p>
              <span className="mt-8 inline-flex text-sm font-semibold text-primary">{loading === option.role ? 'Guardando…' : option.action} <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
            </button>
          ))}
        </div>
        {error ? <p role="alert" className="mt-6 text-sm text-destructive">{error}</p> : null}
      </div>
    </main>
  );
}
