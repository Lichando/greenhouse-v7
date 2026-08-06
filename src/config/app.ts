export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'GreenHouse Brokers';
export const TOKEN_EXPIRES_IN = parseInt(process.env.AUTH_TOKEN_EXPIRES_IN || '604800', 10);
