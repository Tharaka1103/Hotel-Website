import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'super_admin' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);