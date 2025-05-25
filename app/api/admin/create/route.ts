import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getSession } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    const admin = await Admin.create({
      email,
      password,
      name,
      role: role || 'admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}