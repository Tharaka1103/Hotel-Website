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
        status: { $in: ['confirmed', 'pending'] },
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
    
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }

    const { packageId, customerName, customerEmail, customerPhone, checkInDate, roomNumber } = requestData;

    console.log('Received booking data:', { packageId, customerName, customerEmail, customerPhone, checkInDate, roomNumber });

    // Validate required fields
    if (!packageId || !customerName || !customerEmail || !customerPhone || !checkInDate || !roomNumber) {
      return NextResponse.json({ 
        error: 'All fields are required',
        received: { packageId: !!packageId, customerName: !!customerName, customerEmail: !!customerEmail, customerPhone: !!customerPhone, checkInDate: !!checkInDate, roomNumber: !!roomNumber }
      }, { status: 400 });
    }

    // Validate room number
    const roomNum = Number(roomNumber);
    if (isNaN(roomNum) || roomNum < 1 || roomNum > 5) {
      return NextResponse.json({ error: 'Room number must be between 1 and 5' }, { status: 400 });
    }

    // Validate check-in date
    const checkIn = new Date(checkInDate);
    if (isNaN(checkIn.getTime())) {
      return NextResponse.json({ error: 'Invalid check-in date' }, { status: 400 });
    }

    // Validate check-in date is a Sunday
    if (checkIn.getDay() !== 0) {
      return NextResponse.json({ error: 'Check-in must be on a Sunday' }, { status: 400 });
    }

    // Validate check-in date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    if (checkIn < today) {
      return NextResponse.json({ error: 'Check-in date cannot be in the past' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Validate phone format
    const phoneRegex = /^([0]|\+)[0-9]{9,14}$/;
    const cleanPhone = customerPhone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    // Validate name length
    if (customerName.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    // Get package details
    const packageDetails = await Package.findById(packageId);
    if (!packageDetails) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7); // 7-day stay

    // Check if room is available for the selected dates
    const existingBooking = await Booking.findOne({
      roomNumber: roomNum,
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

    if (existingBooking) {
      return NextResponse.json({ 
        error: 'Room is not available for selected dates. Please choose a different room or date.' 
      }, { status: 400 });
    }

    // Generate unique booking ID
    const bookingId = `SP${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create booking
    const booking = await Booking.create({
      bookingId,
      packageId,
      roomNumber: roomNum,
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: cleanPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: packageDetails.price,
      status: 'pending',
      bookingDate: new Date(),
      adminNotes: '',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Populate the booking with package details
    const populatedBooking = await Booking.findById(booking._id).populate('packageId');

    // Create notification for new booking (with error handling)
    try {
      if (NotificationService && typeof NotificationService.createBookingNotification === 'function') {
        await NotificationService.createBookingNotification('booking_created', populatedBooking);
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the booking creation if notification fails
    }

    return NextResponse.json({ 
      booking: populatedBooking,
      bookingId: booking.bookingId,
      message: 'Booking created successfully!'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating booking:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'A booking with this information already exists' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to create booking. Please try again.',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const bookingId = url.searchParams.get('bookingId');
    
    const searchCriteria = id ? { _id: id } : { bookingId: bookingId };
    
    if (!id && !bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const { status, adminNotes } = await request.json();

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be one of: pending, confirmed, cancelled, completed' 
      }, { status: 400 });
    }

    const updateData: { 
      updatedAt: Date;
      status?: string;
      adminNotes?: string;
    } = {
      updatedAt: new Date()
    };

    if (status) {
      updateData.status = status;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    const booking = await Booking.findOneAndUpdate(
      searchCriteria,
      updateData,
      { new: true }
    ).populate('packageId');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create notification for booking update (with error handling)
    try {
      if (NotificationService && typeof NotificationService.createBookingNotification === 'function') {
        if (status === 'cancelled') {
          await NotificationService.createBookingNotification('booking_cancelled', booking);
        } else if (status) {
          await NotificationService.createBookingNotification('booking_updated', booking);
        }
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return NextResponse.json({ 
      booking,
      message: 'Booking updated successfully!'
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ 
      error: 'Failed to update booking. Please try again.' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const bookingId = url.searchParams.get('bookingId');
    
    const searchCriteria = id ? { _id: id } : { bookingId: bookingId };
    
    if (!id && !bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const booking = await Booking.findOne(searchCriteria).populate('packageId');
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Check if booking can be deleted
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (booking.checkInDate < today && booking.status !== 'cancelled') {
      return NextResponse.json({ 
        error: 'Cannot delete past bookings that are not cancelled' 
      }, { status: 400 });
    }

    await Booking.findOneAndDelete(searchCriteria);

    // Create notification for booking deletion (with error handling)
    try {
      if (NotificationService && typeof NotificationService.createBookingNotification === 'function') {
        await NotificationService.createBookingNotification('booking_cancelled', booking);
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return NextResponse.json({ 
      message: 'Booking deleted successfully',
      deletedBooking: {
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        packageTitle: booking.packageId?.title
      }
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ 
      error: 'Failed to delete booking. Please try again.' 
    }, { status: 500 });
  }
}
