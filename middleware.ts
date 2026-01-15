import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware for Authentication
 * 
 * WHY MIDDLEWARE?
 * - Runs on the Edge before any page rendering
 * - Prevents unauthorized users from accessing protected routes
 * - No client-side flicker or hydration issues
 * - More secure than client-side route guards
 * 
 * EDGE RUNTIME CONSTRAINTS:
 * - Cannot use Node.js APIs (fs, path, etc.)
 * - Cannot use Axios (uses Node.js http module)
 * - Cannot use React hooks or browser APIs
 * - Must be lightweight and fast
 * 
 * AUTHENTICATION FLOW:
 * 1. Extract accessToken from cookies
 * 2. If accessing protected route without token → redirect to /login
 * 3. If accessing /login with valid token → redirect to /dashboard
 * 4. Otherwise, allow the request to proceed
 */

// Route configuration
const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/login'];
// const PUBLIC_ROUTES = ['/'];

/**
 * Helper function to check if user is authenticated
 * In production, this could validate JWT signature
 * For now, we just check token existence
 */
function isAuthenticated(request: NextRequest): boolean {
    const accessToken = request.cookies.get('accessToken');

    // TODO: In production, validate JWT signature here
    // For now, just check if token exists and is not empty
    return !!accessToken && accessToken.value.length > 0;
}

/**
 * Helper function to check if route requires authentication
 */
function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
}

/**
 * Helper function to check if route is an auth route (login, register, etc.)
 */
function isAuthRoute(pathname: string): boolean {
    return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Main Middleware Function
 * Executed on every request matching the matcher config
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authenticated = isAuthenticated(request);

    // Case 1: Accessing protected route without authentication
    if (isProtectedRoute(pathname) && !authenticated) {
        const loginUrl = new URL('/login', request.url);
        // Optional: Add redirect parameter to return after login
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Case 2: Accessing auth routes (login) when already authenticated
    if (isAuthRoute(pathname) && authenticated) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // Case 3: All other cases - allow the request
    return NextResponse.next();
}

/**
 * Matcher Configuration
 * Specifies which routes this middleware should run on
 * 
 * PERFORMANCE NOTE:
 * Only run middleware on routes that need auth checking
 * Exclude static files, API routes (unless needed), and public assets
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico (favicon)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif).*)',
    ],
};
