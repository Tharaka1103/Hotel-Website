import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getSession } from '@/lib/jwt';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only super admins can delete admin accounts.' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const adminId = params.id;

    // Prevent super admin from deleting themselves
    if (adminId === session.userId) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await Admin.findByIdAndUpdate(adminId, { isActive: false });

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}