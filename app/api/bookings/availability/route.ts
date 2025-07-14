import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// Hardcoded packages for pricing context
const HARDCODED_PACKAGES = {
  "basic-surf-pack": {
    _id: "basic-surf-pack",
    title: "Basic Surf Pack",
    doubleRoomPrice: 750,
    dormRoomPrice: 550,
    singleRoomPrice: 900,
    familyRoomPrice: 650
  },
  "surf-and-safari-retreat": {
    _id: "surf-and-safari-retreat",
    title: "Surf & Safari Retreat",
    doubleRoomPrice: 850,
    dormRoomPrice: 650,
    singleRoomPrice: 1000,
    familyRoomPrice: 750
  },
  "surf-guiding-pack": {
    _id: "surf-guiding-pack",
    title: "Surf Guiding Pack",
    doubleRoomPrice: 1350,
    dormRoomPrice: 1150,
    singleRoomPrice: 1500,
    familyRoomPrice: 1250
  }
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const packageId = url.searchParams.get('packageId');
    const checkInDate = url.searchParams.get('checkInDate');
    const roomType = url.searchParams.get('roomType');

    // Validate required parameters
    if (!packageId || !checkInDate || !roomType) {
      return NextResponse.json({ 
        error: 'Package ID, check-in date, and room type are required' 
      }, { status: 400 });
    }

    // Validate package exists
    const packageDetails = HARDCODED_PACKAGES[packageId as keyof typeof HARDCODED_PACKAGES];
    if (!packageDetails) {
      return NextResponse.json({ 
        error: 'Invalid package ID' 
      }, { status: 400 });
    }

    // Validate room type
    if (!['room', 'dorm', 'single', 'family'].includes(roomType)) {
      return NextResponse.json({ 
        error: 'Room type must be "room", "dorm", "single", or "family"' 
      }, { status: 400 });
    }

    // Validate and parse check-in date
    const checkIn = new Date(checkInDate);
    if (isNaN(checkIn.getTime())) {
      return NextResponse.json({ 
        error: 'Invalid check-in date format' 
      }, { status: 400 });
    }

    // Validate check-in date is a Sunday
    if (checkIn.getDay() !== 0) {
      return NextResponse.json({ 
        error: 'Check-in must be on a Sunday' 
      }, { status: 400 });
    }

    // Validate check-in date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    if (checkIn < today) {
      return NextResponse.json({ 
        error: 'Check-in date cannot be in the past' 
      }, { status: 400 });
    }

    // Calculate checkout date (7 days later)
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7);

    if (roomType === 'room' || roomType === 'single' || roomType === 'family') {
      // Check room availability (rooms 1-5 for each type)
      const bookedRooms = await Booking.find({
        roomType: roomType,
        status: { $in: ['confirmed', 'pending'] },
        $or: [
          {
            // Existing booking starts before or on check-in and ends after check-in
            checkInDate: { $lte: checkIn },
            checkOutDate: { $gt: checkIn }
          },
          {
            // Existing booking starts before check-out and ends on or after check-out
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gte: checkOut }
          },
          {
            // Existing booking is completely within the requested period
            checkInDate: { $gte: checkIn },
            checkOutDate: { $lte: checkOut }
          },
          {
            // Existing booking completely encompasses the requested period
            checkInDate: { $lte: checkIn },
            checkOutDate: { $gte: checkOut }
          }
        ]
      }).select('roomNumbers');

      const bookedRoomNumbers = bookedRooms.flatMap(booking => booking.roomNumbers || []);
      const allRooms = [1, 2, 3, 4, 5]; // 5 rooms available for each type
      const availableRooms = allRooms.filter(room => !bookedRoomNumbers.includes(room));

      // Get pricing information for the room type
      let roomPrice;
      if (roomType === 'room') {
        roomPrice = packageDetails.doubleRoomPrice;
      } else if (roomType === 'single') {
        roomPrice = packageDetails.singleRoomPrice;
      } else if (roomType === 'family') {
        roomPrice = packageDetails.familyRoomPrice;
      }

      return NextResponse.json({
        availableRooms,
        bookedRooms: bookedRoomNumbers,
        roomType: roomType,
        totalRooms: allRooms.length,
        availableCount: availableRooms.length,
        pricePerPerson: roomPrice,
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0],
        packageTitle: packageDetails.title
      });

    } else if (roomType === 'dorm') {
      // Check dorm bed availability (beds 1-6 in shared dorm)
      const bookedBeds = await Booking.find({
        roomType: 'dorm',
        status: { $in: ['confirmed', 'pending'] },
        $or: [
          {
            // Existing booking starts before or on check-in and ends after check-in
            checkInDate: { $lte: checkIn },
            checkOutDate: { $gt: checkIn }
          },
          {
            // Existing booking starts before check-out and ends on or after check-out
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gte: checkOut }
          },
          {
            // Existing booking is completely within the requested period
            checkInDate: { $gte: checkIn },
            checkOutDate: { $lte: checkOut }
          },
          {
            // Existing booking completely encompasses the requested period
            checkInDate: { $lte: checkIn },
            checkOutDate: { $gte: checkOut }
          }
        ]
      }).select('bedNumbers');

      const bookedBedNumbers = bookedBeds.flatMap(booking => booking.bedNumbers || []);
      const allBeds = [1, 2, 3, 4, 5, 6]; // 6 beds in dorm accommodation
      const availableBeds = allBeds.filter(bed => !bookedBedNumbers.includes(bed));

      // Get pricing information for the dorm type
      const dormPrice = packageDetails.dormRoomPrice;

      return NextResponse.json({
        availableBeds,
        bookedBeds: bookedBedNumbers,
        roomType: 'dorm',
        totalBeds: allBeds.length,
        availableCount: availableBeds.length,
        pricePerPerson: dormPrice,
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0],
        packageTitle: packageDetails.title
      });
    }

    return NextResponse.json({ 
      error: 'Invalid room type specified' 
    }, { status: 400 });

  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ 
      error: 'Failed to check availability. Please try again.' 
    }, { status: 500 });
  }
}
