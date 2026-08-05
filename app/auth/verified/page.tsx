import Link from 'next/link';

export default function VerifiedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Green House</p>
        <h1 className="text-balance text-3xl font-bold text-foreground">Cuenta verificada</h1>
        <p className="mt-4 leading-6 text-muted-foreground">Tu correo electrónico fue confirmado correctamente. Ya podés ingresar a tu cuenta.</p>
        <Link href="/auth/login" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">Ir a iniciar sesión</Link>
      </section>
    </main>
  );
}
