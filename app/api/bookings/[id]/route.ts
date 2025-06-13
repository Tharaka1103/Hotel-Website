import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

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
    }).populate('packageId');

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Format the response for customer view
    const bookingDetails = {
      _id: booking._id,
      bookingId: booking.bookingId,
      packageTitle: booking.packageId?.title || 'Unknown Package',
      packageDescription: booking.packageId?.description || '',
      packagePrice: booking.packageId?.price || booking.pricePerPerson,
      packageFeatures: booking.packageId?.features || [],
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
      pricePerPerson: booking.pricePerPerson,
      status: booking.status,
      adminNotes: booking.adminNotes || ''
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
    ).populate('packageId');

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
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
    
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }
    
    const booking = await Booking.findOne({ bookingId: id }).populate('packageId');
    
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
