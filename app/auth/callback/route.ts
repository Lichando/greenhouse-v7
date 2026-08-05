import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');
  const next = url.searchParams.get('next') ?? '/auth/verified';
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/auth/verified';
  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL(`/auth/login?error=verification_failed`, url.origin));
    }
  } else if (tokenHash && (type === 'signup' || type === 'email')) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    if (error) {
      return NextResponse.redirect(new URL(`/auth/login?error=verification_failed`, url.origin));
    }
  } else {
    return NextResponse.redirect(new URL('/auth/login?error=missing_verification', url.origin));
  }

  return NextResponse.redirect(new URL(safeNext, url.origin));
}
