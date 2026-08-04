import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword } from '../../../core/security/password';
import { createJWT, verifyJWT } from '../../../core/auth/jwt';
import { AppError } from '../../../core/errors';
import { logger } from '../../../core/logger';
import { LoginInput, RegisterInput } from '../validation';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async register(input: RegisterInput) {
    try {
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new AppError('Email already in use', 400);
      }

      // Create user
      const hashedPassword = await hashPassword(input.password);
      const user = await this.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
        },
      });

      logger.info(`User registered: ${user.id}`);
      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Registration failed', error);
      throw new AppError('Registration failed', 500);
    }
  }

  async login(input: LoginInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      if (user.status !== 'ACTIVE') {
        throw new AppError('Account is not active', 403);
      }

      // Verify password
      const isValidPassword = await verifyPassword(input.password, user.password);
      if (!isValidPassword) {
        throw new AppError('Invalid email or password', 401);
      }

      // Create session token
      const token = await createJWT({ userId: user.id });

      // Store session in database
      const session = await this.prisma.session.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      logger.info(`User logged in: ${user.id}`);

      return {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
        sessionId: session.id,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Login failed', error);
      throw new AppError('Login failed', 500);
    }
  }

  async verifyToken(token: string) {
    try {
      const payload = await verifyJWT(token);
      const session = await this.prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!session || session.expiresAt < new Date()) {
        throw new AppError('Session expired', 401);
      }

      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
        },
      };
    } catch (error) {
      logger.error('Token verification failed', error);
      throw new AppError('Invalid or expired token', 401);
    }
  }

  async logout(token: string) {
    try {
      await this.prisma.session.deleteMany({
        where: { token },
      });
      logger.info('User logged out');
    } catch (error) {
      logger.error('Logout failed', error);
    }
  }
}
