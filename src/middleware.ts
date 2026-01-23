import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware
 *
 * PURPOSE:
 * - Runs on the Edge before route handling
 * - Protects authenticated routes
 * - Redirects users based on auth state
 *
 * EDGE CONSTRAINTS:
 * - No Node.js APIs
 * - No Axios / fs / path
 * - Must be fast & lightweight
 */

// ================= ROUTE CONFIG =================
const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/login'];

// ================= HELPERS =================

function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken');
  return !!accessToken?.value;
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

// ================= MIDDLEWARE HANDLER =================

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);

  // 🔐 Protected route without auth → redirect to login
  if (isProtectedRoute(pathname) && !authenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔁 Auth route with valid token → redirect to dashboard
  if (isAuthRoute(pathname) && authenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ Allow request
  return NextResponse.next();
}

// ================= MATCHER =================

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif).*)',
  ],
};

