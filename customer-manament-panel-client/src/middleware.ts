import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Array of protected routes that require authentication
    const protectedRoutes = ['/', '/profile'];

    // Array of auth routes that should redirect to home if already logged in
    const authRoutes = ['/login', '/register'];

    // Get the token from the cookies
    const token = request.cookies.get('authToken')?.value;

    // Function to verify JWT token
    const verifyToken = async (token: string) => {
        try {
            // Replace with your actual JWT secret key
            // In production, use environment variables
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            
            const { payload } = await jose.jwtVerify(token, secret);
            return payload;
        } catch (error) {
            console.log('Token verification error:', error);
            return null;
        }
    };

    // If there's a token, verify it
    let isValidToken = false;

    if (token) {
        const payload = await verifyToken(token);
        isValidToken = !!payload;
    }

    // If user is logged in (valid token) and tries to access auth routes, redirect to home
    if (isValidToken && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is not logged in (no token or invalid token) and tries to access protected routes,
    // redirect to login
    if (!isValidToken && protectedRoutes.includes(pathname)) {
        const loginUrl = new URL('/login', request.url);
        // Store the attempted URL to redirect back after login
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Add security headers to all responses
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};