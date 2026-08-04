import { NextRequest, NextResponse } from 'next/server';
import { RegisterSchema } from '@/src/modules/auth/validation';
import { AuthService } from '@/src/modules/auth/service';
import { prisma } from '@/src/core/database/prisma';
import { AppError } from '@/src/core/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterSchema.parse(body);

    const authService = new AuthService(prisma);
    const user = await authService.register(validatedData);

    return NextResponse.json(
      { message: 'Registration successful', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Registration error:', error);

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
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}
