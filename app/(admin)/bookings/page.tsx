'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar, Mail, Phone, User, MapPin, Package, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, Edit, Settings, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Booking {
  _id: string;
  bookingId: string;
  packageId: {
    _id: string;
    title: string;
    price: number;
  };
  roomNumber: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  adminNotes?: string;
}

// Booking Card Skeleton Component
const BookingCardSkeleton = () => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3 sm:pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
          <Skeleton className="h-5 w-32 sm:h-6 sm:w-48" />
        </div>
        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <Skeleton className="h-5 w-16 sm:h-6 sm:w-20" />
          <Skeleton className="h-5 w-12 sm:h-6 sm:w-16" />
        </div>
      </div>
    </CardHeader>
    
    <CardContent className="space-y-3 sm:space-y-4">
      {/* Customer Info Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-24 sm:h-4 sm:w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-32 sm:h-4 sm:w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-20 sm:h-4 sm:w-28" />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
          </div>
        </div>
      </div>

      {/* Booking Details Skeleton */}
      <div className="bg-muted/50 p-3 rounded-lg">
        <Skeleton className="h-2 w-12 sm:h-3 sm:w-16 mb-1" />
        <Skeleton className="h-3 w-24 sm:h-4 sm:w-32" />
      </div>

      {/* Actions Skeleton */}
      <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
        <Skeleton className="h-8 sm:h-9 flex-1" />
        <Skeleton className="h-8 sm:h-9 flex-1" />
        <Skeleton className="h-8 sm:h-9 flex-1" />
      </div>
    </CardContent>
  </Card>
);

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      
      if (response.ok) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.error || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.packageId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    setActionLoading(bookingId);
    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Booking ${newStatus} successfully`);
        await fetchBookings(); // Refresh the bookings list
      } else {
        toast.error(data.error || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteClick = (booking: Booking) => {
    setBookingToDelete(booking);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/bookings?id=${bookingToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Booking deleted successfully');
        await fetchBookings(); // Refresh the bookings list
        setIsDeleteDialogOpen(false);
        setBookingToDelete(null);
      } else {
        toast.error(data.error || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const handleManageBooking = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'pending':
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  const isCheckoutPassed = (checkOutDate: string) => {
    return new Date(checkOutDate) < new Date();
  };

  const getBookingActions = (booking: Booking) => {
    const isLoading = actionLoading === booking._id;
    const checkoutPassed = isCheckoutPassed(booking.checkOutDate);
    
    return (
      <div className="space-y-2">
        {/* Primary Action Row - Manage Button + Quick Status Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Manage Button - Always visible */}
          <Button
            onClick={() => handleManageBooking(booking.bookingId)}
            disabled={isLoading}
            size="sm"
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Manage</span>
            </div>
          </Button>

          {/* Quick Status Actions */}
          {booking.status === 'pending' && (
            <>
              <Button
                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                disabled={isLoading}
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                ) : (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Confirm</span>
                    <span className="sm:hidden">✓</span>
                  </div>
                )}
              </Button>
              <Button
                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                disabled={isLoading}
                variant="destructive"
                size="sm"
                className="flex-1 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                ) : (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                    <span className="sm:hidden">✗</span>
                  </div>
                )}
              </Button>
            </>
          )}

          {booking.status === 'confirmed' && (
            <>
              <Button
                onClick={() => updateBookingStatus(booking._id, 'completed')}
                disabled={isLoading}
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                ) : (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Complete</span>
                    <span className="sm:hidden">Done</span>
                  </div>
                )}
              </Button>
              <Button
                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                disabled={isLoading}
                variant="destructive"
                size="sm"
                className="flex-1 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                ) : (
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                    <span className="sm:hidden">✗</span>
                  </div>
                )}
              </Button>
            </>
          )}

          {booking.status === 'cancelled' && (
            <Button
              onClick={() => updateBookingStatus(booking._id, 'confirmed')}
              disabled={isLoading}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Reactivate</span>
                  <span className="sm:hidden">Restore</span>
                </div>
              )}
            </Button>
          )}

          {booking.status === 'completed' && (
            <Button
              onClick={() => updateBookingStatus(booking._id, 'confirmed')}
              disabled={isLoading}
              size="sm"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Reopen</span>
                  <span className="sm:hidden">Edit</span>
                </div>
              )}
            </Button>
          )}
        </div>

        {/* Secondary Actions Row - Delete and Customer View */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Delete Action - Only for cancelled/completed */}
          {(booking.status === 'cancelled' || booking.status === 'completed') && (
            <Button
              onClick={() => handleDeleteClick(booking)}
              disabled={isLoading}
              variant="destructive"
              size="sm"
              className="flex-1 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
              ) : (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Delete</span>
                  <span className="sm:hidden">Del</span>
                </div>
              )}
            </Button>
          )}

          {/* Customer View Link */}
          <Link href={`/surf/${booking.bookingId}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Customer View</span>
                <span className="sm:hidden">View</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Warning for overdue bookings */}
        {booking.status === 'confirmed' && checkoutPassed && (
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Check-out date passed</span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (  
      <AdminLayout>
        <div className="container mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-2">
                <Skeleton className="h-7 w-48 sm:h-9 sm:w-64" />
                <Skeleton className="h-4 w-64 sm:w-96" />
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Skeleton className="h-5 w-16 sm:h-6 sm:w-20" />
                <Skeleton className="h-5 w-20 sm:h-6 sm:w-24" />
                <Skeleton className="h-5 w-18 sm:h-6 sm:w-22" />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 sm:p-6 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
                      <Skeleton className="h-6 w-8 sm:h-8 sm:w-12" />
                    </div>
                    <Skeleton className="h-8 w-8 sm:h-12 sm:w-12 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Skeleton className="h-9 sm:h-10 flex-1" />
              <Skeleton className="h-9 w-full sm:h-10 sm:w-32" />
            </div>
          </div>

          {/* Booking Cards Skeleton */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <BookingCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Booking Management</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage customer bookings and reservations</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs sm:text-sm px-2 py-1">
                {bookings.filter(b => b.status === 'pending').length} Pending
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs sm:text-sm px-2 py-1">
                {bookings.filter(b => b.status === 'confirmed').length} Confirmed
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs sm:text-sm px-2 py-1">
                {bookings.filter(b => b.status === 'completed').length} Completed
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs sm:text-sm px-2 py-1">
                {bookings.filter(b => b.status === 'cancelled').length} Cancelled
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Total Bookings</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900">{bookings.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-green-600">Active Bookings</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-purple-600">Total Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900">
                    ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm sm:text-lg font-bold text-purple-600">$</span>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-orange-600">Pending Review</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-900">
                    {bookings.filter(b => b.status === 'pending').length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Input
              placeholder="Search by customer name, email, booking ID, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-sm sm:text-base"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {filteredBookings.map((booking) => (
            <Card key={booking._id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="line-clamp-2 sm:line-clamp-1">{booking.packageId.title}</span>
                  </CardTitle>
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <Badge className={`${getStatusColor(booking.status)} font-medium text-xs sm:text-sm px-2 py-1 flex items-center gap-1`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <span className="text-base sm:text-lg font-bold text-primary">${booking.totalPrice}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Booking ID: {booking.bookingId}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4">
                {/* Customer Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium truncate">{booking.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground break-all text-xs sm:text-sm">{booking.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{booking.customerPhone}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-muted space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium">Room {booking.roomNumber}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Check-in: {formatDate(booking.checkInDate)}
                          </span>
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            Check-out: {formatDate(booking.checkOutDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Booked on</div>
                  <div className="text-sm font-medium">
                    {formatDate(booking.createdAt)}
                  </div>
                </div>

                {/* Admin Notes */}
                {booking.adminNotes && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1 font-medium">Admin Notes</div>
                    <div className="text-sm text-blue-800 line-clamp-2">
                      {booking.adminNotes}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2">
                  {getBookingActions(booking)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">📅</div>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-2 sm:mb-4 px-4">
              {searchTerm || statusFilter !== 'all' ? 'No bookings match your filters' : 'No bookings found'}
            </p>
            <p className="text-muted-foreground px-4 text-sm sm:text-base">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search criteria' : 'Bookings will appear here once customers start booking'}
            </p>
            {(searchTerm || statusFilter !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="mt-4 text-sm sm:text-base px-4 py-2"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                Confirm Deletion
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                Are you sure you want to permanently delete this booking? 
                This action cannot be undone.
              </p>
              {bookingToDelete && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm sm:text-base">{bookingToDelete.packageId.title}</span>
                      <Badge className={getStatusColor(bookingToDelete.status)}>
                        {bookingToDelete.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                      <p><strong>Booking ID:</strong> {bookingToDelete.bookingId}</p>
                      <p><strong>Customer:</strong> {bookingToDelete.customerName}</p>
                      <p><strong>Email:</strong> {bookingToDelete.customerEmail}</p>
                      <p><strong>Room:</strong> {bookingToDelete.roomNumber}</p>
                      <p><strong>Check-in:</strong> {formatDate(bookingToDelete.checkInDate)}</p>
                      <p><strong>Total:</strong> ${bookingToDelete.totalPrice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={handleDeleteCancel}
                className="w-full sm:w-auto text-sm sm:text-base"
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                className="w-full sm:w-auto text-sm sm:text-base"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </div>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Booking
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

