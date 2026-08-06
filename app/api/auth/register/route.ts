import { NextResponse } from 'next/server';
import { RegisterSchema } from '@/src/modules/auth/validation';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = RegisterSchema.parse(body);
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/callback?next=/auth/verified`,
        data: { name: input.name },
      },
    });

    if (error) {
      return NextResponse.json({ message: 'No pudimos crear tu cuenta. Revisá los datos e intentá nuevamente.' }, { status: 400 });
    }

    return NextResponse.json({
      message: data.session ? 'Registro exitoso.' : 'Revisá tu correo para confirmar la cuenta.',
      user: data.user ? { id: data.user.id, email: data.user.email, name: input.name } : null,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Los datos enviados no son válidos.' }, { status: 400 });
  }
}
