import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/jwt';

export async function POST() {
  try {
    const result = await deleteSession();
    
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });

    // Additional cookie clearing
    response.cookies.set('session', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    const response = NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );

    // Force clear session cookie even on error
    response.cookies.set('session', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  }
}
