'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus, Shield, Users, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminList from '@/components/admin/AdminList';
import CreateAdminModal from '@/components/admin/CreateAdminModal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: string;
}

export default function AdminsPage() {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentAdmin();
    fetchAdmins();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const response = await fetch('/api/admin/me');
      const data = await response.json();
      if (data.success) {
        setCurrentAdmin(data.admin);
      } else {
        router.push('/adminLogin');
      }
    } catch (error) {
      console.error('Error fetching current admin:', error);
      setError('Failed to fetch admin information');
      router.push('/adminLogin');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/list');
      const data = await response.json();
      if (data.success) {
        setAdmins(data.admins);
      } else {
        setError('Failed to fetch admins list');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Network error while fetching admins');
    }
  };

  const handleAdminCreated = () => {
    fetchAdmins();
    setShowCreateModal(false);
  };

  const handleAdminUpdated = () => {
    fetchAdmins();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Stats Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Admin Management
              </h1>
            </div>
            <p className=" text-sm lg:text-base">
              Manage administrator accounts, roles, and permissions for your hotel management system.
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm">
                  {isSuperAdmin ? 'Full Access' : 'View Only'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">
                  {admins.filter(admin => admin.isActive).length} Active Admins
                </span>
              </div>
            </div>
          </div>
          
          {isSuperAdmin && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Admin
              </Button>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Access Level Notice for Regular Admins */}
        {!isSuperAdmin && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You have view-only access to admin management. Only Super Admins can create, edit, or delete administrator accounts.
            </AlertDescription>
          </Alert>
        )}

        {/* Admin List */}
        <AdminList 
          admins={admins} 
          currentAdmin={currentAdmin} 
          onAdminUpdated={handleAdminUpdated}
        />

        {/* Empty State */}
        {admins.length === 0 && !loading && (
          <div className="text-center py-12 rounded-lg border ">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Administrators Found
            </h3>
            <p className="mb-6 max-w-sm mx-auto">
              Get started by adding your first administrator to manage the hotel system.
            </p>
            {isSuperAdmin && (
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add First Admin
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <CreateAdminModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onAdminCreated={handleAdminCreated}
        />
      )}
    </AdminLayout>
  );
}
