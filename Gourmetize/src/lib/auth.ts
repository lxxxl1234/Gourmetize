import api from './api';

export type SessionUser = { id: string; name: string; email: string; role: 'consumer' | 'producer' | 'admin' };

export async function registerAccount(data: FormData) {
  const email = String(data.get('email') ?? '').trim().toLowerCase();
  if (email !== String(data.get('email_confirmation') ?? '').trim().toLowerCase()) throw new Error('Os campos de email precisam ser iguais.');
  if (String(data.get('password') ?? '').length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
  if (data.get('password') !== data.get('password_confirmation')) throw new Error('As senhas precisam ser iguais.');
  return (await api.post('/register', data, { headers: { 'Content-Type': 'multipart/form-data' } })).data;
}

export async function verifyAccount(email: string, code: string) {
  return (await api.post('/verify-email', { email, code })).data;
}

export async function loginAccount(email: string, password: string) {
  return (await api.post('/login', { email, password })).data;
}

export function startSession(token: string, user: SessionUser) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function sessionUser(): SessionUser | null {
  try { return JSON.parse(localStorage.getItem('user') ?? 'null'); } catch { return null; }
}

export async function logout() {
  try { await api.post('/logout'); } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}
