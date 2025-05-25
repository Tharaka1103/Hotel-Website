import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getSession } from '@/lib/jwt';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const admin = await Admin.findById(session.userId).select('-password');
    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { success: false, error: 'Admin not found or inactive' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error('Get current admin error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
