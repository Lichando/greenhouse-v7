import { z } from 'zod';

const requiredMessage = (field: string) => `${field} es obligatorio.`;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function getAuthValidationMessage(error: unknown) {
  if (!(error instanceof z.ZodError)) {
    return null;
  }

  const issue = error.issues[0];
  const field = issue?.path[0];

  if (issue?.code === 'too_small' && field === 'password') {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (issue?.code === 'too_small' && field === 'name') {
    return 'El nombre debe tener al menos 2 caracteres.';
  }

  if (issue?.code === 'invalid_format' && field === 'email') {
    return 'Ingresá un correo electrónico válido.';
  }

  if (issue?.code === 'custom' && field === 'confirmPassword') {
    return 'Las contraseñas no coinciden.';
  }

  if (field === 'email') return requiredMessage('El correo electrónico');
  if (field === 'name') return requiredMessage('El nombre');
  if (field === 'password') return requiredMessage('La contraseña');
  if (field === 'confirmPassword') return requiredMessage('La confirmación de contraseña');

  return 'Revisá los datos ingresados e intentá nuevamente.';
}

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
