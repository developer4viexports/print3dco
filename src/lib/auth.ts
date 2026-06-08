// Node-only auth helpers: password hashing + reading the current session.
// Token sign/verify live in session.ts (edge-safe); re-exported here for convenience.
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from 'src/lib/session';

export {
  SESSION_COOKIE,
  sessionCookieOptions,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Read the current session inside server routes / server components.
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
