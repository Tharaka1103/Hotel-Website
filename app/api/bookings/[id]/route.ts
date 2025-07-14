import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

// Hardcoded packages to match the frontend
const HARDCODED_PACKAGES = {
  'basic-surf-pack': {
    _id: 'basic-surf-pack',
    title: 'Basic Surf Pack',
    description: 'Perfect for beginners or casual surfers, this package includes everything you need to get started.',
    features: [
      '7 nights accommodation',
      'Breakfast x 7',
      '2 x Unlimited Local Buffet (Lunch or Dinner)',
      'Surf course twise a day',
      'Surf equipment (2 hours x 2 Daily)',
      'Transport to surf spots',
      'Surf theory',
      'Video analysis sessions',
      '2 ice bath recovery sessions',
      '10% off in restaurant',
      'Surf photo/video package',
    ],
    doubleRoomPrice: 750,
    dormRoomPrice: 550,
    singleRoomPrice: 900,
    familyRoomPrice: 650
  },
  'surf-and-safari-retreat': {
    _id: 'surf-and-safari-retreat',
    title: 'Surf & Safari Retreat',
    description: 'A balanced mix of surf, nature and relaxation, this retreat is for those wanting more than just waves.',
    features: [
      '7 nights accommodation',
      'Breakfast x 7',
      '2 x Unlimited Local Buffet (Lunch or Dinner)',
      'Surf course 5 x 1.5 hours',
      'Surf equipment (2 hours x 2 Daily)',
      'Transport to surf spots',
      'Surf theory',
      'Video analysis sessions',
      'Ice bath recovery sessions',
      '1 x surf skate session',
      'Kumana national park (Half Day)',
      'Sunset Lagoon Tour',
      '10% off in restaurant',
      'Surf photo/video package',
      'Sunset BBQ'
    ],
    doubleRoomPrice: 850,
    dormRoomPrice: 650,
    singleRoomPrice: 1000,
    familyRoomPrice: 750
  },
  'surf-guiding-pack': {
    _id: 'surf-guiding-pack',
    title: 'Surf Guiding Pack',
    description: 'Tailored for seasoned surfers, this premium option offers expert-guided surf trips, in-depth analysis, and daily briefings.',
    features: [
      '7 nights accommodation',
      'Breakfast x 7',
      '2 x Unlimited Local Buffet (Lunch or Dinner)',
      'Meet your new surf buddies and feel part of the crew instantly',
      'Surf the top local spots with a knowledgeable local guide',
      'Transportation included to all surf spots - no rental car required.',
      '5 days of surf guiding, with 2 sessions each day',
      'Daily updates on surf spots and conditions',
      '3 video analysis sessions',
      '10% off in restaurant',
      'Surf photo/video package',
    ],
    doubleRoomPrice: 1350,
    dormRoomPrice: 1150,
    singleRoomPrice: 1500,
    familyRoomPrice: 1250
  }
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    // Find booking by bookingId (not _id)
    const booking = await Booking.findOne({
      bookingId: id
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Get package details from hardcoded packages
    const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];
    
    if (!packageData) {
      return NextResponse.json(
        { error: 'Package information not found' },
        { status: 404 }
      );
    }

    // Calculate pricing based on room type - use actual booking price
    let actualPricePerPerson = booking.pricePerPerson || packageData.doubleRoomPrice;
    let basePackagePrice = packageData.doubleRoomPrice; // Show double room as base price

    // If room type exists in booking, use the correct price from package
    if (booking.roomType === 'room') {
      basePackagePrice = packageData.doubleRoomPrice;
    } else if (booking.roomType === 'dorm') {
      basePackagePrice = packageData.dormRoomPrice;
    } else if (booking.roomType === 'single') {
      basePackagePrice = packageData.singleRoomPrice;
    } else if (booking.roomType === 'family') {
      basePackagePrice = packageData.familyRoomPrice;
    }

    // Format the response for customer view
    const bookingDetails = {
      _id: booking._id,
      bookingId: booking.bookingId,
      packageId: booking.packageId,
      packageTitle: packageData.title,
      packageDescription: packageData.description,
      packagePrice: basePackagePrice, // Price for the selected room type
      packageFeatures: packageData.features,
      personCount: booking.personCount,
      roomType: booking.roomType,
      roomNumbers: booking.roomNumbers || [],
      bedNumbers: booking.bedNumbers || [],
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      checkInDate: booking.checkInDate.toISOString().split('T')[0],
      checkOutDate: booking.checkOutDate.toISOString().split('T')[0],
      bookingDate: booking.bookingDate ? booking.bookingDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      totalPrice: booking.totalPrice,
      pricePerPerson: actualPricePerPerson,
      basePackagePrice: basePackagePrice, // Price for the selected room type
      doubleRoomPrice: packageData.doubleRoomPrice, // For display purposes
      dormRoomPrice: packageData.dormRoomPrice, // For display purposes
      singleRoomPrice: packageData.singleRoomPrice, // For display purposes
      familyRoomPrice: packageData.familyRoomPrice, // For display purposes
      status: booking.status,
      adminNotes: booking.adminNotes || '',
      createdAt: booking.createdAt || booking.bookingDate,
      updatedAt: booking.updatedAt || booking.bookingDate
    };

    return NextResponse.json({ booking: bookingDetails });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
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
      { bookingId: id },
      updateData,
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Get package details from hardcoded packages
    const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];
    
    const bookingWithPackage = {
      ...booking.toObject(),
      packageTitle: packageData?.title || 'Unknown Package',
      packageDescription: packageData?.description || '',
      packageFeatures: packageData?.features || [],
      packagePrice: packageData?.doubleRoomPrice || 0, // Default to double room price
      doubleRoomPrice: packageData?.doubleRoomPrice || 0,
      dormRoomPrice: packageData?.dormRoomPrice || 0,
      singleRoomPrice: packageData?.singleRoomPrice || 0,
      familyRoomPrice: packageData?.familyRoomPrice || 0
    };

    return NextResponse.json({ 
      booking: bookingWithPackage,
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
    
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const booking = await Booking.findOne({ bookingId: id });
    
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

    await Booking.findOneAndDelete({ bookingId: id });

    // Get package details for response
    const packageData = HARDCODED_PACKAGES[booking.packageId as keyof typeof HARDCODED_PACKAGES];

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
