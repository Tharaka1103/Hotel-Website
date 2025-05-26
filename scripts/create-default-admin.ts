import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

async function createDefaultAdmin() {
  try {
    await dbConnect();
    
    // Check if default admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@hotel.com' });
    
    if (existingAdmin) {
      console.log('Default admin already exists');
      return;
    }
    
    // Create default admin
    const admin = await Admin.create({
      email: 'admin@hotel.com',
      password: 'admin123',
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    });
    
    console.log('Default admin created successfully:', {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}

createDefaultAdmin();