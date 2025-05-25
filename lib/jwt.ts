import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-characters-long');

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
  try {
    if (!input || input.trim() === '') {
      return null;
    }
    
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('JWT decrypt error:', error);
    return null;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function createSession(userId: string, email: string, role: string) {
  try {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, email, role, expiresAt: expiresAt.toISOString() });
    
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    
    return { success: true };
  } catch (error) {
    console.error('Create session error:', error);
    throw new Error('Failed to create session');
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.set('session', '', { 
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { success: true };
  } catch (error) {
    console.error('Delete session error:', error);
    return { success: false };
  }
}
