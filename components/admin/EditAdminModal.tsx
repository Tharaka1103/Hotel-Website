'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Edit } from 'lucide-react';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
}

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminUpdated: () => void;
  admin: Admin | null;
  currentUserId: string;
}

export default function EditAdminModal({
  isOpen,
  onClose,
  onAdminUpdated,
  admin,
  currentUserId,
}: EditAdminModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin' as 'admin' | 'super_admin',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const { successt, errort } = useToast();

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      });
    }
  }, [admin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!admin) return;
    
    if (!formData.name || !formData.email) {
      errort({
        title: 'Error',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`/api/admin/update/${admin._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        successt({
          title: 'Success',
          description: 'Admin updated successfully',
        });
        onAdminUpdated();
        onClose();
      } else {
        errort({
          title: 'Error',
          description: data.error || 'Failed to update admin',
        });
      }
    } catch (error) {
      errort({
        title: 'Error',
        description: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isOwnAccount = admin?._id === currentUserId;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Edit Admin</span>
          </DialogTitle>
          <DialogDescription>
            Update administrator information and permissions.
            <span className='text-red-600'>{isOwnAccount && " (Note: You're editing your own account)"}</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleInputChange('role', value)}
                disabled={loading || isOwnAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
              {isOwnAccount && (
                <p className="text-xs text-gray-500">You cannot change your own role</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="edit-active">Active Status</Label>
                <p className="text-xs text-gray-500">
                  Inactive admins cannot log in
                </p>
              </div>
              <Switch
                id="edit-active"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                disabled={loading || isOwnAccount}
              />
            </div>
            {isOwnAccount && (
              <p className="text-xs text-gray-500">You cannot deactivate your own account</p>
            )}
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Admin'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}