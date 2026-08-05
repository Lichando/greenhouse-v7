// Database access is handled by Supabase. This compatibility module intentionally
// exposes no Prisma client so legacy imports cannot create a second database connection.
export const prisma = null;
export default prisma;
