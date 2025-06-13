import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const packageId = url.searchParams.get('packageId');
    const checkInDate = url.searchParams.get('checkInDate');
    const roomType = url.searchParams.get('roomType');

    if (!packageId || !checkInDate || !roomType) {
      return NextResponse.json({ 
        error: 'Package ID, check-in date, and room type are required' 
      }, { status: 400 });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7);

    if (roomType === 'room') {
      // Check room availability (rooms 1-5, each with 2 beds)
      const bookedRooms = await Booking.find({
        roomType: 'room',
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
      }).select('roomNumbers');

      const bookedRoomNumbers = bookedRooms.flatMap(booking => booking.roomNumbers || []);
      const allRooms = [1, 2, 3, 4, 5];
      const availableRooms = allRooms.filter(room => !bookedRoomNumbers.includes(room));

      return NextResponse.json({
        availableRooms,
        bookedRooms: bookedRoomNumbers,
        roomType: 'room'
      });

    } else if (roomType === 'dome') {
      // Check dome bed availability (beds 1-6)
      const bookedBeds = await Booking.find({
        roomType: 'dome',
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
      }).select('bedNumbers');

      const bookedBedNumbers = bookedBeds.flatMap(booking => booking.bedNumbers || []);
      const allBeds = [1, 2, 3, 4, 5, 6];
      const availableBeds = allBeds.filter(bed => !bookedBedNumbers.includes(bed));

      return NextResponse.json({
        availableBeds,
        bookedBeds: bookedBedNumbers,
        roomType: 'dome'
      });
    }

    return NextResponse.json({ error: 'Invalid room type' }, { status: 400 });

  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ 
      error: 'Failed to check availability' 
    }, { status: 500 });
  }
}
