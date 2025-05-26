import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

export async function PUT(
  request: NextRequest
) {
  try {
    await dbConnect();
    const id = request.url.split('/').pop();
    const { title, description, features, price } = await request.json();

    if (!title || !description || !features || !price) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      {
        title,
        description,
        features,
        price: Number(price)
      },
      { new: true }
    );

    if (!updatedPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ package: updatedPackage });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}
export async function DELETE(
  request: NextRequest
) {
  try {
    await dbConnect();
    const id = request.url.split('/').pop();
    
    const packageData = await Package.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}