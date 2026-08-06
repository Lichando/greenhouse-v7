import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MainLayout } from '@/src/components/layout/MainLayout';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Mi cuenta',
  description: 'Gestioná tu cuenta y tus propiedades guardadas en Green House.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const name = user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'usuario';

  return (
    <MainLayout user={{ id: user.id, email: user.email ?? '', name }}>
      <section className="min-h-[70vh] bg-neutral-50 px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:text-accent">
              Mi cuenta
            </p>
            <h1 className="mt-3 font-bebas text-5xl tracking-wide text-neutral-900 dark:text-white sm:text-6xl">
              Hola, {name}
            </h1>
            <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
              Desde acá podés gestionar tus propiedades guardadas y seguir buscando tu próximo hogar.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/properties"
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="font-bebas text-2xl text-neutral-900 dark:text-white">Explorar propiedades</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                Encontrá oportunidades nuevas en nuestra plataforma.
              </p>
            </Link>

            <Link
              href="/profile"
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="font-bebas text-2xl text-neutral-900 dark:text-white">Mi perfil</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                Revisá y actualizá tus datos personales.
              </p>
            </Link>

            <Link
              href="/contact"
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="font-bebas text-2xl text-neutral-900 dark:text-white">Necesito ayuda</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                Contactá a nuestro equipo para recibir asesoramiento.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
