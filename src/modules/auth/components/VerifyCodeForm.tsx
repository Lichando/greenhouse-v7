'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') ?? '';
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !/^\d{6}$/.test(code)) {
      setError('Ingresá el correo y el código de 6 dígitos que recibiste.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup',
      });

      if (verifyError) {
        setError('El código es incorrecto o ya venció.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setMessage(null);
    if (!email) {
      setError('Ingresá tu correo electrónico para reenviar el código.');
      return;
    }

    setResending(true);
    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (resendError) {
        setError('No pudimos reenviar el código. Esperá un momento e intentá nuevamente.');
        return;
      }

      setMessage('Te enviamos un nuevo código de verificación.');
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 font-montserrat text-sm leading-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}
      {message && (
        <div role="status" className="rounded-xl border border-primary/20 bg-primary/10 p-4 font-montserrat text-sm leading-5 text-primary">
          {message}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="verify-email" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Correo electrónico</label>
        <input
          id="verify-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="nombre@ejemplo.com"
          required
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-sm text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="verification-code" className="block font-montserrat text-sm font-semibold text-neutral-800 dark:text-neutral-200">Código de verificación</label>
        <input
          id="verification-code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          autoComplete="one-time-code"
          placeholder="000000"
          required
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-montserrat text-center text-lg tracking-[0.35em] text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-white"
        />
        <p className="font-montserrat text-xs leading-5 text-neutral-500">Revisá tu bandeja de entrada y spam. El código es de un solo uso.</p>
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3 font-montserrat text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? 'Verificando...' : 'Verificar cuenta'}
      </button>

      <div className="flex flex-col items-center gap-3 pt-1 text-center font-montserrat text-sm">
        <button type="button" onClick={handleResend} disabled={resending} className="font-bold text-primary transition hover:text-primary/80 disabled:opacity-50">
          {resending ? 'Reenviando...' : 'Reenviar código'}
        </button>
        <Link href="/auth/login" className="text-neutral-600 transition hover:text-primary dark:text-neutral-400">Volver a iniciar sesión</Link>
      </div>
    </form>
  );
}
