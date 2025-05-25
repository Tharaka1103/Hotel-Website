'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

interface DeleteAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminDeleted: () => void;
  admin: Admin | null;
}

export default function DeleteAdminDialog({
  isOpen,
  onClose,
  onAdminDeleted,
  admin,
}: DeleteAdminDialogProps) {
  const [loading, setLoading] = useState(false);
  const { successt, errort } = useToast();

  const handleDelete = async () => {
    if (!admin) return;

    setLoading(true);
    
    try {
      const response = await fetch(`/api/admin/delete/${admin._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        successt({
          title: 'Success',
          description: 'Admin deleted successfully',
        });
        onAdminDeleted();
        onClose();
      } else {
        errort({
          title: 'Error',
          description: data.error || 'Failed to delete admin',
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

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span className='text-white'>Delete Admin</span>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white'>
            Are you sure you want to delete <strong className='text-primary'>{admin?.name}</strong>? 
            This action will deactivate their account and they will no longer be able to access the system.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Admin'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}