import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { getSession } from '@/lib/jwt';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const admins = await Admin.find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      admins,
    });
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}