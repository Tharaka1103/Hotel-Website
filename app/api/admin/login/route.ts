import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { createSession } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check for default admin credentials
    if (email === 'admin@hotel.com' && password === 'admin123') {
      try {
        // Create default admin if not exists
        let admin = await Admin.findOne({ email });
        if (!admin) {
          admin = await Admin.create({
            email: 'admin@hotel.com',
            password: 'admin123', // This will be hashed by the Admin model pre-save hook
            name: 'Super Admin',
            role: 'super_admin',
            isActive: true,
          });
        }
        
        const sessionResult = await createSession(admin._id.toString(), admin.email, admin.role);
        
        if (!sessionResult.success) {
          return NextResponse.json(
            { success: false, error: 'Failed to create session' },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          message: 'Login successful',
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          },
        });
      } catch (sessionError) {
        console.error('Session creation error:', sessionError);
        return NextResponse.json(
          { success: false, error: 'Failed to create session' },
          { status: 500 }
        );
      }
    }

    // Check regular admin credentials
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    try {
      const sessionResult = await createSession(admin._id.toString(), admin.email, admin.role);
      
      if (!sessionResult.success) {
        return NextResponse.json(
          { success: false, error: 'Failed to create session' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    } catch (sessionError) {
      console.error('Session creation error:', sessionError);
      return NextResponse.json(
        { success: false, error: 'Failed to create session' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
