// Auth API calls.
import api from 'src/lib/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function apiRegister(input: { name: string; email: string; password: string }): Promise<AuthUser> {
  const { data } = await api.post<AuthUser>('/auth/register', input);
  return data;
}

export async function apiLogin(input: { email: string; password: string }): Promise<AuthUser> {
  const { data } = await api.post<AuthUser>('/auth/login', input);
  return data;
}

export async function apiLogout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function apiMe(): Promise<AuthUser | null> {
  const { data } = await api.get<{ user: AuthUser | null }>('/auth/me');
  return data.user;
}
