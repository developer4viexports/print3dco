// Route protection: /account requires a session, /admin requires an ADMIN role.
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from 'src/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  // nextUrl.clone() preserves the configured basePath on redirects.
  const loginRedirect = () => {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?redirect=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  };
  const homeRedirect = () => {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  };

  if (pathname.startsWith('/admin')) {
    if (!session) return loginRedirect();
    if (session.role !== 'ADMIN') return homeRedirect();
  }

  if (pathname.startsWith('/account')) {
    if (!session) return loginRedirect();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
};
