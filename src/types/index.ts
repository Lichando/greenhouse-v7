export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PageProps = {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type UserRole = 'ADMIN' | 'MANAGER' | 'EDITOR' | 'USER';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}
