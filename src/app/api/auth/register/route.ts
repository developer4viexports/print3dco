// POST /api/auth/register — create an account and start a session.
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { hashPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from 'src/lib/auth';
import { isValidEmail, required } from 'src/utils/validators';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!required(name) || !isValidEmail(email ?? '') || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Name, a valid email, and a 6+ character password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(password),
      },
    });

    const token = await createSessionToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return res;
  } catch (err) {
    console.error('POST /api/auth/register failed', err);
    return NextResponse.json({ error: 'Could not create account.' }, { status: 500 });
  }
}
