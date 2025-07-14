'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Search, 
  Filter, 
  Users, 
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  RefreshCw,
  Home,
  Bed,
  Waves,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Building,
  TrendingUp,
  Calendar as CalendarIcon,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

interface Booking {
  _id: string;
  bookingId: string;
  packageId: {
    _id: string;
    title: string;
    description: string;
    doubleRoomPrice?: number;
    dormRoomPrice?: number;
    singleRoomPrice?: number;
    familyRoomPrice?: number;
    features: string[];
  };
  personCount: number;
  roomType: 'room' | 'dorm' | 'single' | 'family';
  roomNumbers: number[];
  bedNumbers: number[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
  totalPrice: number;
  pricePerPerson: number;
  status: string;
  adminNotes?: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter, dateFilter, roomTypeFilter]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      toast.error('Failed to fetch bookings', {
                position: 'bottom-right'
              });
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.packageId?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Room type filter
    if (roomTypeFilter !== 'all') {
      filtered = filtered.filter(booking => booking.roomType === roomTypeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(booking => {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);
        
        switch (dateFilter) {
          case 'today':
            return checkInDate <= today && checkOutDate > today;
          case 'upcoming':
            return checkInDate > today;
          case 'past':
            return checkOutDate <= today;
          default:
            return true;
        }
      });
    }

    setFilteredBookings(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-lg';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-lg';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStats = () => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { total, confirmed, pending, totalRevenue };
  };

  const stats = getStats();

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/bookings?bookingId=${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
              toast.success('Booking deleted successfully', {
                position: 'bottom-right'
              });
              fetchBookings();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete booking', {
                position: 'bottom-right'
              });
      }
    } catch (error) {
      toast.error('Failed to delete booking', {
                position: 'bottom-right'
              });
    }
  };

  const getRoomTypePrice = (booking: Booking) => {
    if (booking.roomType === 'room') {
      return booking.packageId?.doubleRoomPrice || booking.pricePerPerson;
    } else if (booking.roomType === 'dorm') {
      return booking.packageId?.dormRoomPrice || booking.pricePerPerson;
    } else if (booking.roomType === 'single') {
      return booking.packageId?.singleRoomPrice || booking.pricePerPerson;
    } else if (booking.roomType === 'family') {
      return booking.packageId?.familyRoomPrice || booking.pricePerPerson;
    } else {
      return booking.pricePerPerson;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
            
            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            
            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
                <Waves className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                Bookings Dashboard
              </h1>
              <p className="text-muted-foreground mt-3 text-lg">Manage all surf package bookings</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={fetchBookings}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 px-6 py-3 rounded-full shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <CalendarIcon className="w-12 h-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Confirmed</p>
                    <p className="text-3xl font-bold">{stats.confirmed}</p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending</p>
                    <p className="text-3xl font-bold">{stats.pending}</p>
                  </div>
                  <Clock className="w-12 h-12 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-xl border-0 mb-8 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-slate-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-2 focus:border-primary rounded-lg"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary rounded-lg">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary rounded-lg">
                    <SelectValue placeholder="Filter by Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Room Types</SelectItem>
                    <SelectItem value="room">Double Rooms</SelectItem>
                    <SelectItem value="dorm">Dorm</SelectItem>
                    <SelectItem value="single">Single Rooms</SelectItem>
                    <SelectItem value="family">Family Rooms</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary rounded-lg">
                    <SelectValue placeholder="Filter by Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Current Stays</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setRoomTypeFilter('all');
                    setDateFilter('all');
                  }}
                  variant="outline"
                  className="h-12 border-2 hover:bg-gray-50 rounded-lg font-medium"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Building className="w-8 h-8" />
                All Bookings ({filteredBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No bookings found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="grid gap-6 p-6">
                    {filteredBookings.map((booking) => (
                      <Card key={booking._id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-r from-white to-gray-50 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            {/* Main Info */}
                            <div className="lg:col-span-8 p-6">
                              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                {/* Customer & Package Info */}
                                <div className="flex-1 space-y-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                      <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.customerName}</h3>
                                      <p className="text-primary font-semibold text-lg">{booking.packageId?.title}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${getStatusColor(booking.status)} px-4 py-2 text-sm font-semibold`}>
                                        {getStatusIcon(booking.status)}
                                        <span className="ml-2">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                          <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <p className="text-gray-500 text-xs">Booking ID</p>
                                          <p className="font-semibold text-gray-800">{booking.bookingId}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-green-100 rounded-full">
                                          <Mail className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-gray-500 text-xs">Email</p>
                                          <p className="font-semibold text-gray-800 truncate">{booking.customerEmail}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-purple-100 rounded-full">
                                          <Phone className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                          <p className="text-gray-500 text-xs">Phone</p>
                                          <p className="font-semibold text-gray-800">{booking.customerPhone}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-orange-100 rounded-full">
                                          <Users className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                          <p className="text-gray-500 text-xs">Party Size</p>
                                          <p className="font-semibold text-gray-800">{booking.personCount} person{booking.personCount > 1 ? 's' : ''}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-indigo-100 rounded-full">
                                          {booking.roomType === 'room' ? (
                                            <Home className="w-4 h-4 text-indigo-600" />
                                          ) : (
                                            <Bed className="w-4 h-4 text-indigo-600" />
                                          )}
                                        </div>
                                        <div>
                                          <p className="text-gray-500 text-xs">Accommodation</p>
                                          <p className="font-semibold text-gray-800">
                                          {booking.roomType === 'room' ? (
                                          `Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')}`
                                          ) : booking.roomType === 'single' ? (
                                          `Single Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')}`
                                          ) : booking.roomType === 'family' ? (
                                              `Family Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')}`
                                            ) : (
                                            `Dorm - Bed${booking.bedNumbers.length > 1 ? 's' : ''} ${booking.bedNumbers.join(', ')}`
                                            )}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            ${booking.pricePerPerson}/person ({booking.roomType === 'room' ? 'Double Room' : booking.roomType === 'single' ? 'Single Room' : booking.roomType === 'family' ? 'Family Room' : 'Dorm'})
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-teal-100 rounded-full">
                                          <DollarSign className="w-4 h-4 text-teal-600" />
                                        </div>
                                        <div>
                                          <p className="text-gray-500 text-xs">Total Amount</p>
                                          <p className="font-bold text-xl text-teal-600">${booking.totalPrice}</p>
                                          <p className="text-xs text-gray-500">
                                            ${booking.pricePerPerson} × {booking.personCount} person{booking.personCount > 1 ? 's' : ''}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Dates & Actions */}
                            <div className="lg:col-span-4 bg-gradient-to-br from-gray-50 to-white p-6 border-l lg:border-l-2 lg:border-l-gray-200">
                              <div className="space-y-4">
                                {/* Dates */}
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                      <Calendar className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Check-in</p>
                                      <p className="font-semibold text-gray-800">{formatDate(booking.checkInDate)}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-full">
                                      <Calendar className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Check-out</p>
                                      <p className="font-semibold text-gray-800">{formatDate(booking.checkOutDate)}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="pt-2 border-t">
                                    <div className="text-center p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg">
                                      <p className="text-xs opacity-90">Duration</p>
                                      <p className="font-bold">7 Days</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2 pt-4 border-t">
                                  <div className="grid grid-cols-2 gap-2">
                                    <Link href={`/bookings/${booking.bookingId}`}>
                                      <Button className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                    </Link>
                                    <Button
                                      onClick={() => deleteBooking(booking.bookingId)}
                                      variant="outline"
                                      className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-2 text-sm rounded-lg transition-all duration-300"
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                  
                                  <div className="text-center">
                                    <p className="text-xs text-gray-500">
                                      Booked {formatDate(booking.bookingDate)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Package Features Preview */}
                          {booking.packageId?.features && booking.packageId.features.length > 0 && (
                            <div className="border-t bg-gradient-to-r from-gray-50 to-blue-50 p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-gray-700">Package Features</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {booking.packageId.features.slice(0, 4).map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs bg-white/80 text-gray-700 border border-gray-200 px-2 py-1">
                                    {feature}
                                  </Badge>
                                ))}
                                {booking.packageId.features.length > 4 && (
                                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1">
                                    +{booking.packageId.features.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Admin Notes Preview */}
                          {booking.adminNotes && (
                            <div className="border-t bg-yellow-50 p-4">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="text-sm font-semibold text-yellow-800">Admin Notes:</span>
                                  <p className="text-sm text-yellow-700 mt-1 line-clamp-2">{booking.adminNotes}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination (if needed) */}
          {filteredBookings.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="bg-white rounded-full shadow-lg px-6 py-3">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredBookings.length}</span> of{' '}
                  <span className="font-semibold">{bookings.length}</span> bookings
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="flex flex-col gap-3">
              <Button
                onClick={fetchBookings}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
                title="Refresh bookings"
              >
                <RefreshCw className="w-6 h-6 text-white" />
              </Button>
              
              <Button
                className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
                title="Export data"
              >
                <Download className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
