// POST /api/auth/login — verify credentials and start a session.
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { verifyPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from 'src/lib/auth';
import { isValidEmail } from 'src/utils/validators';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!isValidEmail(email ?? '') || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase().trim() } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await createSessionToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  } catch (err) {
    console.error('POST /api/auth/login failed', err);
    return NextResponse.json({ error: 'Could not sign in.' }, { status: 500 });
  }
}
