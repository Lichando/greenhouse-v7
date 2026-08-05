import { randomUUID } from 'crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import { hashPassword, verifyPassword } from '../../../core/security/password';
import { createJWT, verifyJWT } from '../../../core/auth/jwt';
import { AppError } from '../../../core/errors';
import { logger } from '../../../core/logger';
import { LoginInput, RegisterInput } from '../validation';

export class AuthService {
  constructor(private supabase: SupabaseClient) {}

  async register(input: RegisterInput) {
    try {
      // Check if user exists
      const { data: existingUser } = await this.supabase
        .from('users')
        .select('id')
        .eq('email', input.email)
        .maybeSingle();

      if (existingUser) {
        throw new AppError('Email already in use', 400);
      }

      // Create user
      const hashedPassword = await hashPassword(input.password);
      const now = new Date().toISOString();
      const { data: user, error } = await this.supabase
        .from('users')
        .insert({
          id: randomUUID(),
          email: input.email,
          name: input.name,
          password: hashedPassword,
          role: 'USER',
          status: 'ACTIVE',
          created_at: now,
          updated_at: now,
        })
        .select('id, email, name')
        .single();

      if (error || !user) {
        throw new AppError('Registration failed', 500);
      }

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
      const { data: user } = await this.supabase
        .from('users')
        .select('id, email, name, password, role, status')
        .eq('email', input.email)
        .maybeSingle();

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
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      // Store session in database
      const { data: session, error } = await this.supabase
        .from('sessions')
        .insert({
          id: randomUUID(),
          token,
          user_id: user.id,
          expires_at: expiresAt.toISOString(),
        })
        .select('id')
        .single();

      if (error || !session) {
        throw new AppError('Login failed', 500);
      }

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
      await verifyJWT(token);

      const { data: session } = await this.supabase
        .from('sessions')
        .select('expires_at, users ( id, email, name, role )')
        .eq('token', token)
        .maybeSingle();

      if (!session || new Date(session.expires_at) < new Date()) {
        throw new AppError('Session expired', 401);
      }

      const sessionUser = Array.isArray(session.users) ? session.users[0] : session.users;

      return {
        user: {
          id: sessionUser.id,
          email: sessionUser.email,
          name: sessionUser.name,
          role: sessionUser.role,
        },
      };
    } catch (error) {
      logger.error('Token verification failed', error);
      throw new AppError('Invalid or expired token', 401);
    }
  }

  async logout(token: string) {
    try {
      await this.supabase.from('sessions').delete().eq('token', token);
      logger.info('User logged out');
    } catch (error) {
      logger.error('Logout failed', error);
    }
  }
}
