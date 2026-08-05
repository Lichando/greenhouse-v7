import { NextResponse } from 'next/server';
import { LoginSchema } from '@/src/modules/auth/validation';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = LoginSchema.parse(body);
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword(input);

    if (error) {
      const message = error.message.toLowerCase().includes('email not confirmed')
        ? 'Confirmá tu correo electrónico antes de ingresar.'
        : 'Correo o contraseña incorrectos.';
      return NextResponse.json({ message }, { status: 401 });
    }

    return NextResponse.json({
      user: data.user ? { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.name ?? '' } : null,
    });
  } catch {
    return NextResponse.json({ message: 'Los datos enviados no son válidos.' }, { status: 400 });
  }
}
