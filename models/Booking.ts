import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
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
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Compound index to prevent double booking
BookingSchema.index({ roomNumber: 1, checkInDate: 1, checkOutDate: 1 });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);