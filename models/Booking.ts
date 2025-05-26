import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true  // This creates the index automatically, no need for separate schema.index()
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  roomNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], // Added 'confirmed' to the enum
    default: 'confirmed'
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking
BookingSchema.index({ roomNumber: 1, checkInDate: 1, checkOutDate: 1 });
// Remove the duplicate bookingId index since unique: true already creates it

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
