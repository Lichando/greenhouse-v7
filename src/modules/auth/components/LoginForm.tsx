'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoginSchema } from '../validation';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const validatedData = LoginSchema.parse(formData);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'No pudimos iniciar sesión. Revisá tus datos e intentá nuevamente.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error. Intentá nuevamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 font-montserrat text-sm leading-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="nombre@ejemplo.com"
          required
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="password" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Contraseña
          </label>
          <span className="font-montserrat text-xs text-neutral-500">Mínimo 8 caracteres</span>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          placeholder="Ingresá tu contraseña"
          required
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-4 py-3 font-montserrat text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>

      <p className="pt-2 text-center font-montserrat text-sm text-neutral-600 dark:text-neutral-400">
        ¿Todavía no tenés una cuenta?{' '}
        <Link href="/auth/register" className="font-bold text-primary transition hover:text-primary/80">
          Registrate
        </Link>
      </p>
    </form>
  );
}
