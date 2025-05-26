import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const packageId = url.searchParams.get('packageId');
    const checkInDate = url.searchParams.get('checkInDate');
    
    if (!packageId || !checkInDate) {
      return NextResponse.json({ 
        error: 'Package ID and check-in date are required' 
      }, { status: 400 });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7); // 7-day stay

    // Find all bookings that conflict with the requested dates
    const conflictingBookings = await Booking.find({
      packageId,
      status: { $in: ['confirmed', 'pending'] },
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
        },
        {
          checkInDate: { $lte: checkIn },
          checkOutDate: { $gte: checkOut }
        }
      ]
    });

    // Get booked room numbers
    const bookedRooms = conflictingBookings.map(booking => booking.roomNumber);
    
    // All available rooms (1-5)
    const allRooms = [1, 2, 3, 4, 5];
    const availableRooms = allRooms.filter(room => !bookedRooms.includes(room));

    return NextResponse.json({
      availableRooms,
      bookedRooms,
      checkInDate: checkIn.toISOString().split('T')[0],
      checkOutDate: checkOut.toISOString().split('T')[0]
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ 
      error: 'Failed to check availability' 
    }, { status: 500 });
  }
}
