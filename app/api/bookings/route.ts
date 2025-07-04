import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Package from '@/models/Package';
import { NotificationService } from '@/lib/notificationService';

// Hardcoded packages to match frontend
const HARDCODED_PACKAGES = {
  "basic-surf-pack": {
    _id: "basic-surf-pack",
    title: "Basic Surf Pack",
    description: "Perfect for beginners or casual surfers, this package includes everything you need to get started.",
    features: [
      "7 nights accommodation (Dorm or Private Room)",
      "Breakfast x 7",
      "5 x Unlimited Local Buffet (Lunch or Dinner)",
      "Surf course 6 x 1.5 hours",
      "Surf equipment (2 hours x 2 Daily)",
      "Transport to surf spots",
      "Surf theory",
      "2 video analysis sessions",
      "2 ice bath recovery sessions"
    ],
    price: 699
  },
  "surf-and-safari-retreat": {
    _id: "surf-and-safari-retreat",
    title: "Surf & Safari Retreat",
    description: "A balanced mix of surf, nature and relaxation, this retreat is for those wanting more than just waves.",
    features: [
      "7 nights accommodation (Dorm or Private Room)",
      "Breakfast x 7",
      "5 x Unlimited Local Buffet (Lunch or Dinner)",
      "Surf course 5 x 1.5 hours",
      "Surf equipment (2 hours x 2 Daily)",
      "Transport to surf spots",
      "Surf theory",
      "2 video analysis sessions",
      "5 ice bath recovery sessions",
      "1 x surf skate session",
      "Kumana Safari (Half Day)",
      "Sunset Lagoon Tour",
      "Sunset BBQ"
    ],
    price: 750
  },
  "surf-guiding-pack": {
    _id: "surf-guiding-pack",
    title: "Surf Guiding Pack",
    description: "Tailored for seasoned surfers, this premium option offers expert-guided surf trips, in-depth analysis, and daily briefings.",
    features: [
      "7 nights accommodation (Dorm or Private Room)",
      "Breakfast x 7",
      "5 x Unlimited Local Buffet (Lunch or Dinner)",
      "Meet your new surf buddies and feel part of the crew instantly",
      "Surf the top local spots with a knowledgeable local guide",
      "Transportation included to all surf spots - no rental car required.",
      "5 days of surf guiding, with 2 sessions each day",
      "Daily updates on surf spots and conditions",
      "3 video analysis sessions"
    ],
    price: 1200
  }
};

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
      });
    } else {
      bookings = await Booking.find().sort({ createdAt: -1 });
    }

    // Manually populate package data for each booking
    const populatedBookings = bookings.map(booking => {
      const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];
      return {
        ...booking.toObject(),
        packageId: packageData || { title: 'Unknown Package', price: 0 }
      };
    });

    return NextResponse.json({ bookings: populatedBookings });
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

    const { 
      packageId, 
      personCount, 
      roomType, 
      roomNumbers = [], 
      bedNumbers = [], 
      customerName, 
      customerEmail, 
      customerPhone, 
      checkInDate 
    } = requestData;

    console.log('Received booking data:', requestData);

    // Validate required fields
    if (!packageId || !personCount || !roomType || !customerName || !customerEmail || !customerPhone || !checkInDate) {
      return NextResponse.json({ 
        error: 'All fields are required',
        received: { 
          packageId: !!packageId, 
          personCount: !!personCount, 
          roomType: !!roomType,
          customerName: !!customerName, 
          customerEmail: !!customerEmail, 
          customerPhone: !!customerPhone, 
          checkInDate: !!checkInDate 
        }
      }, { status: 400 });
    }

    // Validate person count
    const persons = Number(personCount);
    if (isNaN(persons) || persons < 1 || persons > 6) {
      return NextResponse.json({ error: 'Person count must be between 1 and 6' }, { status: 400 });
    }

    // Validate room type
    if (!['room', 'dome'].includes(roomType)) {
      return NextResponse.json({ error: 'Room type must be either "room" or "dome"' }, { status: 400 });
    }

    // Validate room/bed selection based on type
    if (roomType === 'room') {
      if (!Array.isArray(roomNumbers) || roomNumbers.length === 0) {
        return NextResponse.json({ error: 'At least one room must be selected' }, { status: 400 });
      }
      // Check if rooms can accommodate all persons
      const totalBeds = roomNumbers.length * 2;
      if (totalBeds < persons) {
        return NextResponse.json({ error: 'Selected rooms do not have enough beds for all persons' }, { status: 400 });
      }
      // Validate room numbers
      for (const roomNum of roomNumbers) {
        if (isNaN(Number(roomNum)) || roomNum < 1 || roomNum > 5) {
          return NextResponse.json({ error: 'Invalid room number. Must be between 1 and 5' }, { status: 400 });
        }
      }
    } else if (roomType === 'dome') {
      if (!Array.isArray(bedNumbers) || bedNumbers.length !== persons) {
        return NextResponse.json({ error: `Exactly ${persons} bed${persons > 1 ? 's' : ''} must be selected for dome accommodation` }, { status: 400 });
      }
      // Validate bed numbers
      for (const bedNum of bedNumbers) {
        if (isNaN(Number(bedNum)) || bedNum < 1 || bedNum > 6) {
          return NextResponse.json({ error: 'Invalid bed number. Must be between 1 and 6' }, { status: 400 });
        }
      }
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

    // Get package details from hardcoded packages
    const packageDetails = HARDCODED_PACKAGES[packageId as keyof typeof HARDCODED_PACKAGES];
    if (!packageDetails) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7); // 7-day stay

    // Check availability for rooms/beds for the selected dates
    if (roomType === 'room') {
      // Check room availability
      for (const roomNum of roomNumbers) {
        const existingBooking = await Booking.findOne({
          roomType: 'room',
          roomNumbers: roomNum,
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
            error: `Room ${roomNum} is not available for selected dates. Please choose different rooms or dates.` 
          }, { status: 400 });
        }
      }
    } else if (roomType === 'dome') {
      // Check bed availability in dome
      for (const bedNum of bedNumbers) {
        const existingBooking = await Booking.findOne({
          roomType: 'dome',
          bedNumbers: bedNum,
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
            error: `Bed ${bedNum} in dome is not available for selected dates. Please choose different beds or dates.` 
          }, { status: 400 });
        }
      }
    }

    // Generate unique booking ID
    const bookingId = `SP${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Calculate total price based on room type
    let pricePerPerson;
    if (roomType === 'room') {
      pricePerPerson = 750; // Room price per person
    } else if (roomType === 'dome') {
      pricePerPerson = 500; // Dome price per person
    } else {
      pricePerPerson = packageDetails.price; // Default package price
    }

    const totalPrice = pricePerPerson * persons;

    // Create booking with proper field names
    const bookingData = {
      bookingId,
      packageId,
      personCount: persons,
      roomType,
      roomNumbers: roomType === 'room' ? roomNumbers : [],
      bedNumbers: roomType === 'dome' ? bedNumbers : [],
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: cleanPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      pricePerPerson,
      totalPrice,
      status: 'pending',
      bookingDate: new Date(),
      adminNotes: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Creating booking with data:', bookingData);

    // Create booking
    const booking = await Booking.create(bookingData);

    // Since we're using hardcoded packages, we'll manually populate the package data
    const populatedBooking = {
      ...booking.toObject(),
      packageId: packageDetails
    };

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

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ 
        error: 'Validation failed',
        details: validationErrors
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
    );

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Manually populate package data
    const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];
    const populatedBooking = {
      ...booking.toObject(),
      packageId: packageData || { title: 'Unknown Package', price: 0 }
    };

    // Create notification for booking update (with error handling)
    try {
      if (NotificationService && typeof NotificationService.createBookingNotification === 'function') {
        if (status === 'cancelled') {
          await NotificationService.createBookingNotification('booking_cancelled', populatedBooking);
        } else if (status) {
          await NotificationService.createBookingNotification('booking_updated', populatedBooking);
        }
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return NextResponse.json({ 
      booking: populatedBooking,
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
    
    const booking = await Booking.findOne(searchCriteria);
    
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

    // Manually populate package data for notification
    const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];
    const populatedBooking = {
      ...booking.toObject(),
      packageId: packageData || { title: 'Unknown Package', price: 0 }
    };

    // Create notification for booking deletion (with error handling)
    try {
      if (NotificationService && typeof NotificationService.createBookingNotification === 'function') {
        await NotificationService.createBookingNotification('booking_cancelled', populatedBooking);
      }
    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    return NextResponse.json({ 
      message: 'Booking deleted successfully',
      deletedBooking: {
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        packageTitle: packageData?.title || 'Unknown Package'
      }
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ 
      error: 'Failed to delete booking. Please try again.' 
    }, { status: 500 });
  }
}
