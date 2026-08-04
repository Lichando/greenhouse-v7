import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@/src/modules/auth/validation';
import { AuthService } from '@/src/modules/auth/service';
import { prisma } from '@/src/core/database/prisma';
import { AppError } from '@/src/core/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = LoginSchema.parse(body);

    const authService = new AuthService(prisma);
    const result = await authService.login(validatedData);

    const response = NextResponse.json(result, { status: 200 });

    // Set HTTP-only cookie
    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[v0] Login error:', error);

    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { message: 'Invalid input data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}
