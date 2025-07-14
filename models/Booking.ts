import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  packageId: {
    type: String,
    required: true
  },
  personCount: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  roomType: {
    type: String,
    required: true,
    enum: ['room', 'dorm', 'single', 'family']
  },
  roomNumbers: [{
    type: Number,
    min: 1,
    max: 5
  }],
  bedNumbers: [{
    type: Number,
    min: 1,
    max: 6
  }],
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true,
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
  pricePerPerson: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  adminNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add validation to ensure proper room/bed selection
BookingSchema.pre('validate', function(next) {
  if (this.roomType === 'room' || this.roomType === 'single' || this.roomType === 'family') {
    if (!this.roomNumbers || this.roomNumbers.length === 0) {
      this.invalidate('roomNumbers', 'At least one room must be selected for room type');
    }
    // Clear bed numbers for room type
    this.bedNumbers = [];
  } else if (this.roomType === 'dorm') {
    if (!this.bedNumbers || this.bedNumbers.length === 0) {
      this.invalidate('bedNumbers', 'At least one bed must be selected for dorm type');
    }
    if (this.bedNumbers && this.bedNumbers.length !== this.personCount) {
      this.invalidate('bedNumbers', `Number of beds (${this.bedNumbers.length}) must match person count (${this.personCount})`);
    }
    // Clear room numbers for dorm type
    this.roomNumbers = [];
  }
  next();
});

// Update the updatedAt field before saving
BookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
