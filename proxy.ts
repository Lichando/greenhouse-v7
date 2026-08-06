import { updateSession } from '@/lib/supabase/proxy';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const hasAuthCode = searchParams.has('code') || searchParams.has('token_hash');

  // Supabase can fall back to the Site URL (`/`) when the callback URL is not
  // allow-listed. Forward that confirmation payload to the real callback.
  if (pathname === '/' && hasAuthCode) {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = '/auth/callback';
    if (!callbackUrl.searchParams.has('next')) {
      callbackUrl.searchParams.set('next', '/auth/verified');
    }
    return NextResponse.redirect(callbackUrl);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
