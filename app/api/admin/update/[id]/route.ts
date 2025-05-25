import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getSession } from '@/lib/jwt';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only super admins can update admin accounts.' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const { email, name, role, isActive } = await request.json();
    const adminId = params.id;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Check if email is already taken by another admin
    const existingAdmin = await Admin.findOne({ 
      email, 
      _id: { $ne: adminId } 
    });
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Email is already taken by another admin' },
        { status: 400 }
      );
    }

    // Prevent super admin from demoting themselves
    if (adminId === session.userId && role !== 'super_admin') {
      return NextResponse.json(
        { error: 'You cannot change your own role' },
        { status: 400 }
      );
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      {
        email,
        name,
        role: role || 'admin',
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin updated successfully',
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}