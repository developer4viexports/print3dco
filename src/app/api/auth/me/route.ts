// GET /api/auth/me — return the current session user (or null).
import { NextResponse } from 'next/server';
import { getSession } from 'src/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: { id: session.sub, name: session.name, email: session.email, role: session.role },
  });
}
