import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

export async function GET() {
  try {
    await dbConnect();
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { title, description, features, price } = await request.json();

    if (!title || !description || !features || !price) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!Array.isArray(features) || features.length === 0) {
      return NextResponse.json({ error: 'Features must be a non-empty array' }, { status: 400 });
    }

    const packageData = await Package.create({
      title,
      description,
      features,
      price: Number(price), // Price per person
      pricePerPerson: Number(price) // Explicitly store as per person price
    });

    return NextResponse.json({ package: packageData }, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
