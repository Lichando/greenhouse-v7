import { MainLayout } from '@/src/components/layout/MainLayout';
import { RegisterForm } from '@/src/modules/auth/components/RegisterForm';

export const metadata = {
  title: 'Crear cuenta | GREEN HOUSE',
  description: 'Creá tu cuenta en GREEN HOUSE para descubrir y guardar propiedades.',
};

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mb-8">
              <p className="mb-3 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-primary">Empezá hoy</p>
              <h1 className="font-bebas text-5xl tracking-tight text-neutral-900 dark:text-white">Creá tu cuenta</h1>
              <p className="mt-2 font-montserrat text-sm leading-6 text-neutral-600 dark:text-neutral-400">Sumate a GREEN HOUSE y encontrá tu próximo lugar.</p>
            </div>
            <RegisterForm />
          </div>
          <div className="hidden bg-gradient-to-br from-secondary to-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="font-bebas text-2xl tracking-widest">GREEN HOUSE</p>
              <p className="mt-20 max-w-xs font-bebas text-5xl leading-none">Encontrá un lugar para lo que viene.</p>
              <p className="mt-5 max-w-sm font-montserrat text-sm leading-6 text-white/80">
                Explorá propiedades, conectate con expertos y tomá decisiones con información clara.
              </p>
            </div>
            <p className="font-montserrat text-xs text-white/70">Tu búsqueda, tus decisiones, tu próximo hogar.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
