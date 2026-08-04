import { SignJWT, jwtVerify } from 'jose';
import { UnauthorizedError } from '@/src/core/errors';

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  const expiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || '604800'; // 7 days default
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${expiresIn}s`)
    .sign(getSecret());

  return token;
}

export async function verifyToken(token: string): Promise<Record<string, unknown>> {
  try {
    const verified = await jwtVerify(token, getSecret());
    return verified.payload;
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token');
  }
}
