'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegisterSchema } from '../validation';
import { createClient } from '@/lib/supabase/client';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const validatedData = RegisterSchema.parse(formData);

      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
          data: { name: validatedData.name },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('password')) {
          throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }
        if (error.message.toLowerCase().includes('rate limit')) {
          throw new Error('Demasiados intentos. Esperá unos minutos e intentá nuevamente.');
        }
        throw new Error('No pudimos crear tu cuenta. Revisá tus datos e intentá nuevamente.');
      }

      router.push(`/auth/verify?email=${encodeURIComponent(validatedData.email)}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error. Intentá nuevamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 font-montserrat text-sm leading-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Nombre completo</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" placeholder="Tu nombre y apellido" required className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white" />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Correo electrónico</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="nombre@ejemplo.com" required className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white" />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Contraseña</label>
        <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" placeholder="Elegí una contraseña segura" required className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white" />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Repetir contraseña</label>
        <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" placeholder="Volvé a ingresar tu contraseña" required className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white" />
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3 font-montserrat text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
      </button>

      <p className="pt-2 text-center font-montserrat text-sm text-neutral-600 dark:text-neutral-400">
        ¿Ya tenés una cuenta?{' '}
        <Link href="/auth/login" className="font-bold text-primary transition hover:text-primary/80">Iniciá sesión</Link>
      </p>
    </form>
  );
}
