import { MainLayout } from '@/src/components/layout/MainLayout';
import { LoginForm } from '@/src/modules/auth/components/LoginForm';

export const metadata = {
  title: 'Iniciar sesión | GREEN HOUSE',
  description: 'Accede a tu cuenta de GREEN HOUSE y continúa buscando tu próxima propiedad.',
};

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden bg-gradient-to-br from-primary to-secondary p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="font-bebas text-2xl tracking-widest">GREEN HOUSE</p>
              <p className="mt-20 max-w-xs font-bebas text-5xl leading-none">Tu próximo hogar empieza acá.</p>
              <p className="mt-5 max-w-sm font-montserrat text-sm leading-6 text-white/80">
                Guardá tus propiedades favoritas, contactá profesionales y encontrá oportunidades pensadas para vos.
              </p>
            </div>
            <p className="font-montserrat text-xs text-white/70">Una forma más simple de vivir el mercado inmobiliario.</p>
          </div>
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mb-8">
              <p className="mb-3 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-primary">Bienvenido de nuevo</p>
              <h1 className="font-bebas text-5xl tracking-tight text-neutral-900 dark:text-white">Iniciá sesión</h1>
              <p className="mt-2 font-montserrat text-sm leading-6 text-neutral-600 dark:text-neutral-400">Ingresá a tu cuenta para continuar.</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
