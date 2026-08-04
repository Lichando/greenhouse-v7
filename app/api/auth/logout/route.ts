import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/src/modules/auth/service';
import { prisma } from '@/src/core/database/prisma';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const authService = new AuthService(prisma);
    await authService.logout(token);

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('[v0] Logout error:', error);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}
