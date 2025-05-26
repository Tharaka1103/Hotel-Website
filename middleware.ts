import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/jwt';

// Updated protected routes to match new structure
const protectedRoutes = ['/adminDashboard', '/admins', '/bookings', '/packages'];
const publicRoutes = ['/adminLogin'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // Skip middleware for API routes, static files, and non-relevant paths
  if (path.startsWith('/api') || path.startsWith('/_next') || path.includes('.') || path === '/') {
    return NextResponse.next();
  }

  let session = null;
  
  try {
    const cookie = req.cookies.get('session')?.value;
    if (cookie && cookie.trim() !== '') {
      session = await decrypt(cookie);
    }
  } catch (error) {
    console.error('Middleware session error:', error);
    session = null;
  }

  // Check if session is expired
  if (session && session.expiresAt) {
    const expiresAt = new Date(session.expiresAt);
    if (expiresAt < new Date()) {
      session = null;
    }
  }

  // Redirect to login if trying to access protected route without valid session
  if (isProtectedRoute && !session?.userId) {
    const loginUrl = path.startsWith('/adminDashboard') ? '/adminLogin' : '/adminLogin';
    return NextResponse.redirect(new URL(loginUrl, req.nextUrl));
  }

  // Redirect to dashboard if already logged in and trying to access login page
  if (isPublicRoute && session?.userId) {
    const dashboardUrl = path === '/adminLogin' ? '/adminDashboard' : '/adminDashboard';
    return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl));
  }

  // Clear expired session cookie
  if (isProtectedRoute && !session?.userId) {
    const response = NextResponse.redirect(new URL('/adminLogin', req.nextUrl));
    response.cookies.set('session', '', { 
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};
