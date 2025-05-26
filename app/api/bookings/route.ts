import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Package from '@/models/Package';
import { NotificationService } from '@/lib/notificationService';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const packageId = url.searchParams.get('packageId');

    let bookings;
    if (packageId) {
      bookings = await Booking.find({ 
        packageId,
        status: 'active',
        checkOutDate: { $gte: new Date() }
      }).populate('packageId');
    } else {
      bookings = await Booking.find().populate('packageId').sort({ createdAt: -1 });
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { packageId, customerName, customerEmail, customerPhone, checkInDate, roomNumber } = await request.json();

    if (!packageId || !customerName || !customerEmail || !customerPhone || !checkInDate || !roomNumber) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate room number
    if (roomNumber < 1 || roomNumber > 5) {
      return NextResponse.json({ error: 'Room number must be between 1 and 5' }, { status: 400 });
    }

    // Get package details
    const packageDetails = await Package.findById(packageId);
    if (!packageDetails) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7); // 7-day stay

    // Check if room is available
    const existingBooking = await Booking.findOne({
      roomNumber,
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

    if (existingBooking) {
      return NextResponse.json({ error: 'Room is not available for selected dates' }, { status: 400 });
    }

    const booking = await Booking.create({
      packageId,
      roomNumber,
      customerName,
      customerEmail,
      customerPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: packageDetails.price
    });

    const populatedBooking = await Booking.findById(booking._id).populate('packageId');

    // Create notification for new booking
    try {
      await NotificationService.createBookingNotification('booking_created', populatedBooking);
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the booking creation if notification fails
    }

    return NextResponse.json({ booking: populatedBooking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get ID from URL query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const { status } = await request.json();

    if (!['active', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('packageId');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create notification for booking update
    try {
      if (status === 'cancelled') {
        await NotificationService.createBookingNotification('booking_cancelled', booking);
      } else {
        await NotificationService.createBookingNotification('booking_updated', booking);
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get ID from URL query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking deleted permanently' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
