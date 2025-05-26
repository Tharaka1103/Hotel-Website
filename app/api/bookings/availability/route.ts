import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const checkInDate = url.searchParams.get('checkInDate');
    const packageId = url.searchParams.get('packageId');

    if (!checkInDate || !packageId) {
      return NextResponse.json({ error: 'checkInDate and packageId are required' }, { status: 400 });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7);

    // Get all active bookings that overlap with the requested dates
    const overlappingBookings = await Booking.find({
      packageId,
      status: 'active',
      $or: [
        {
          checkInDate: { $lte: checkIn },
          checkOutDate: { $gt: checkIn }
        },
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gte: checkOut }
        },
        {
          checkInDate: { $gte: checkIn },
          checkOutDate: { $lte: checkOut }
        }
      ]
    });

    const bookedRooms = overlappingBookings.map(booking => booking.roomNumber);
    const availableRooms = [1, 2, 3, 4, 5].filter(room => !bookedRooms.includes(room));

    return NextResponse.json({
      availableRooms,
      bookedRooms,
      checkInDate: checkIn,
      checkOutDate: checkOut
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}