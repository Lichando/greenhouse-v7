import type { SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '../../../core/errors';
import { logger } from '../../../core/logger';
import { LoginInput, RegisterInput } from '../validation';

export class AuthService {
  constructor(private supabase: SupabaseClient) {}

  async register(input: RegisterInput) {
    const { data, error } = await this.supabase.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: false,
      user_metadata: { name: input.name },
    });

    if (error || !data.user) {
      logger.error('Registration failed', error);
      throw new AppError('No pudimos crear tu cuenta', 400);
    }

    return { id: data.user.id, email: data.user.email, name: input.name };
  }

  async login(input: LoginInput) {
    const { data, error } = await this.supabase.auth.signInWithPassword(input);
    if (error || !data.user || !data.session) {
      throw new AppError('Correo o contraseña incorrectos', 401);
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name ?? '',
        role: data.user.user_metadata?.role ?? 'USER',
      },
      token: data.session.access_token,
      sessionId: data.session.refresh_token,
    };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) logger.error('Logout failed', error);
  }
}
