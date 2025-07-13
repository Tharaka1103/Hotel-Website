'use client';

import React, { useState, useEffect, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Waves,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Star,
  Settings,
  Save,
  ArrowLeft,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Sunrise,
  Sunset,
  Camera,
  Mountain,
  TreePine,
  Fish,
  Gamepad2,
  Music,
  Shield,
  Heart,
  Zap,
  Gift,
  Home,
  Bed,
  Users,
  DollarSign,
  CreditCard,
  Building,
  Info,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

interface BookingDetails {
  _id: string;
  bookingId: string;
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  personCount: number;
  roomType: 'room' | 'dome';
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
  basePackagePrice?: number;
  doubleRoomPrice?: number;
  domeRoomPrice?: number;
  status: string;
  adminNotes?: string;
}

interface AdminBookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminBookingPage({ params }: AdminBookingPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchBookingDetails();
  }, [resolvedParams.id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${resolvedParams.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setBooking(data.booking);
        setStatus(data.booking.status);
        setAdminNotes(data.booking.adminNotes || '');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Booking not found');
      }
    } catch (error) {
      setError('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async () => {
    if (!booking) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminNotes
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBooking(data.booking);
        toast.success('Booking updated successfully!', {
                position: 'bottom-right'
              });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update booking', {
                position: 'bottom-right'
              });
      }
    } catch (error) {
      toast.error('Failed to update booking', {
                position: 'bottom-right'
              });
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'pending':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) 
      return <Wifi className="w-4 h-4 text-blue-500" />;
    if (lowerFeature.includes('parking') || lowerFeature.includes('car')) 
      return <Car className="w-4 h-4 text-gray-600" />;
    if (lowerFeature.includes('breakfast') || lowerFeature.includes('coffee')) 
      return <Coffee className="w-4 h-4 text-amber-600" />;
    if (lowerFeature.includes('restaurant') || lowerFeature.includes('dining')) 
      return <Utensils className="w-4 h-4 text-green-600" />;
    if (lowerFeature.includes('gym') || lowerFeature.includes('fitness')) 
      return <Dumbbell className="w-4 h-4 text-red-500" />;
    if (lowerFeature.includes('sunrise') || lowerFeature.includes('morning')) 
      return <Sunrise className="w-4 h-4 text-orange-500" />;
    if (lowerFeature.includes('sunset') || lowerFeature.includes('evening')) 
      return <Sunset className="w-4 h-4 text-purple-500" />;
    if (lowerFeature.includes('photo') || lowerFeature.includes('camera')) 
      return <Camera className="w-4 h-4 text-pink-500" />;
    if (lowerFeature.includes('mountain') || lowerFeature.includes('hiking')) 
      return <Mountain className="w-4 h-4 text-stone-600" />;
    if (lowerFeature.includes('forest') || lowerFeature.includes('nature')) 
      return <TreePine className="w-4 h-4 text-green-700" />;
    if (lowerFeature.includes('fishing') || lowerFeature.includes('fish')) 
      return <Fish className="w-4 h-4 text-blue-600" />;
    if (lowerFeature.includes('game') || lowerFeature.includes('entertainment')) 
      return <Gamepad2 className="w-4 h-4 text-indigo-500" />;
    if (lowerFeature.includes('music') || lowerFeature.includes('sound')) 
      return <Music className="w-4 h-4 text-violet-500" />;
    if (lowerFeature.includes('security') || lowerFeature.includes('safe')) 
      return <Shield className="w-4 h-4 text-emerald-600" />;
    if (lowerFeature.includes('24') || lowerFeature.includes('hour')) 
      return <Clock className="w-4 h-4 text-slate-600" />;
    if (lowerFeature.includes('spa') || lowerFeature.includes('wellness')) 
      return <Heart className="w-4 h-4 text-rose-500" />;
    if (lowerFeature.includes('energy') || lowerFeature.includes('power')) 
      return <Zap className="w-4 h-4 text-yellow-500" />;
    if (lowerFeature.includes('gift') || lowerFeature.includes('bonus')) 
      return <Gift className="w-4 h-4 text-teal-500" />;
    if (lowerFeature.includes('beach') || lowerFeature.includes('ocean') || lowerFeature.includes('surf')) 
      return <Waves className="w-4 h-4 text-cyan-500" />;
    
    return <CheckCircle2 className="w-4 h-4 text-primary" />;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !booking) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-l-4 border-red-500">
              <div className="text-red-500 text-6xl mb-6">🚨</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Booking Not Found</h1>
              <p className="text-gray-600 mb-8 text-lg">
                {error || 'The booking you are looking for does not exist or has been removed.'}
              </p>
              <Link href="/bookings">
                <Button className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Back to Admin Dashboard
                </Button>
              </Link>
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
            <Link href="/bookings">
              <Button
                variant="outline"
                className="flex items-center gap-3 px-6 py-3 rounded-full border-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Dashboard</span>
              </Button>
            </Link>
            <div className="text-center lg:text-right">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
                <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                Admin Control Panel
              </h1>
              <p className="text-muted-foreground mt-3 text-lg">Manage booking details and customer information</p>
            </div>
          </div>

          {/* Status Banner */}
          <div className="mb-8">
            <div className="text-center">
              <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl shadow-2xl ${getStatusColor(booking.status)} transform hover:scale-105 transition-all duration-300`}>
                {getStatusIcon(booking.status)}
                <span className="text-xl font-bold">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-2xl font-bold text-gray-800">Booking ID: {booking.bookingId}</p>
                <p className="text-gray-600">Booked on {formatDate(booking.bookingDate)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Package Information - Highlighted */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-primary/5 via-cyan-50 to-blue-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary to-cyan-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <Waves className="w-8 h-8" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="text-center border-b pb-6">
                      <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{booking.packageTitle}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{booking.packageDescription}</p>
                      
                      {/* Enhanced Pricing Display */}
                      <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Home className="w-5 h-5" />
                              <span className="font-semibold">Double Room</span>
                            </div>
                            <p className="text-2xl font-bold">
                              ${booking.doubleRoomPrice || 'N/A'}
                            </p>
                            <p className="text-sm opacity-90">per person</p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Bed className="w-5 h-5" />
                              <span className="font-semibold">Dome Room</span>
                            </div>
                            <p className="text-2xl font-bold">
                              ${booking.domeRoomPrice || 'N/A'}
                            </p>
                            <p className="text-sm opacity-90">per person</p>
                          </div>
                        </div>
                        
                        {/* Selected Price Highlight */}
                        <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg">
                          <div className="flex items-center justify-center gap-3">
                            <Tag className="w-6 h-6" />
                            <div className="text-center">
                              <p className="font-semibold">Customer Selected: {booking.roomType === 'room' ? 'Double Room' : 'Dome Room'}</p>
                              <p className="text-2xl font-bold">${booking.pricePerPerson} per person</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                        <Star className="w-6 h-6 mr-3 text-yellow-500" />
                        Package Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {booking.packageFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-white hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-100">
                            {getFeatureIcon(feature)}
                            <span className="font-medium text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information - Highlighted */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <User className="w-8 h-8" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-green-500">
                        <div className="p-3 bg-green-100 rounded-full">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Full Name</p>
                          <p className="text-xl font-bold text-gray-800">{booking.customerName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-500">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 font-medium">Email Address</p>
                          <p className="text-lg font-semibold text-gray-800 break-words">{booking.customerEmail}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-purple-500">
                        <div className="p-3 bg-purple-100 rounded-full">
                          <Phone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                          <p className="text-xl font-bold text-gray-800">{booking.customerPhone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-orange-500">
                        <div className="p-3 bg-orange-100 rounded-full">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Party Size</p>
                          <p className="text-xl font-bold text-gray-800">{booking.personCount} person{booking.personCount > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accommodation & Dates - Highlighted */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <Building className="w-8 h-8" />
                    Accommodation & Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Accommodation Details */}
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl">
                        {booking.roomType === 'room' ? (
                          <Home className="w-12 h-12 mx-auto mb-4" />
                        ) : (
                          <Bed className="w-12 h-12 mx-auto mb-4" />
                        )}
                        <h3 className="text-2xl font-bold mb-2">
                          {booking.roomType === 'room' ? 'Double Room(s)' : 'Dome Accommodation'}
                        </h3>
                        <div className="text-lg opacity-90">
                          {booking.roomType === 'room' ? (
                            <div>
                              <p className="font-semibold">Room{booking.roomNumbers.length > 1 ? 's' : ''}: {booking.roomNumbers.join(', ')}</p>
                              <p className="text-sm mt-1">({booking.roomNumbers.length * 2} beds total)</p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-semibold">Bed{booking.bedNumbers.length > 1 ? 's' : ''}: {booking.bedNumbers.join(', ')}</p>
                              <p className="text-sm mt-1">(Dome accommodation)</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 p-3 bg-white/20 rounded-lg">
                          <p className="text-sm font-medium">Rate: ${booking.pricePerPerson}/person</p>
                        </div>
                      </div>
                    </div>

                    {/* Date Information */}
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-green-500">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-700">Check-in</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 ml-10">{formatDate(booking.checkInDate)}</p>
                      </div>
                      
                      <div className="p-4 bg-white rounded-xl shadow-md border-l-4 border-red-500">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-red-100 rounded-full">
                            <Calendar className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-700">Check-out</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 ml-10">{formatDate(booking.checkOutDate)}</p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
                        <div className="text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-bold text-lg">7-Day Surf Adventure</p>
                          <p className="text-sm opacity-90">Sunday to Sunday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Pricing Information */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <CreditCard className="w-8 h-8" />
                    Pricing Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100">
                        <Tag className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-gray-500 font-medium">Room Type Selected</p>
                        <p className="text-xl font-bold text-gray-800">
                          {booking.roomType === 'room' ? 'Double Room' : 'Dome Room'}
                        </p>
                      </div>
                      
                      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100">
                        <DollarSign className="w-10 h-10 mx-auto mb-3 text-green-600" />
                        <p className="text-sm text-gray-500 font-medium">Price per Person</p>
                        <p className="text-2xl font-bold text-gray-800">${booking.pricePerPerson}</p>
                      </div>
                      
                      <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100">
                        <Users className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                        <p className="text-sm text-gray-500 font-medium">Number of Persons</p>
                        <p className="text-2xl font-bold text-gray-800">{booking.personCount}</p>
                      </div>
                    </div>
                    
                    {/* Total Section */}
                    <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl shadow-xl">
                      <div className="text-center">
                        <CreditCard className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-lg opacity-90 font-medium">Total Amount</p>
                        <p className="text-4xl font-bold">${booking.totalPrice}</p>
                        <p className="text-sm opacity-90 mt-2">
                          ${booking.pricePerPerson} × {booking.personCount} person{booking.personCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    
                    {/* Pricing Comparison */}
                    <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200">
                      <div className="text-center mb-4">
                        <Info className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                        <p className="text-indigo-800 font-semibold text-lg">Pricing Details</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-sm font-medium text-gray-600">Double Room Rate</p>
                          <p className="text-lg font-bold text-blue-600">
                            ${booking.doubleRoomPrice || 'N/A'}/person
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-sm font-medium text-gray-600">Dome Room Rate</p>
                          <p className="text-lg font-bold text-green-600">
                            ${booking.domeRoomPrice || 'N/A'}/person
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <p className="text-center text-yellow-800 font-semibold">
                          Customer paid: <span className="text-lg">${booking.pricePerPerson}/person</span> 
                          <span className="text-sm"> ({booking.roomType === 'room' ? 'Double Room' : 'Dome Room'} rate)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Controls Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Status Management */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-slate-100 sticky top-6">
                <CardHeader className="bg-gradient-to-r from-gray-700 to-slate-700 text-white p-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="w-5 h-5" />
                    Admin Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Status
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="confirmed">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Confirmed
                          </div>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Cancelled
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            Completed
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Notes
                    </label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes about this booking..."
                      className="min-h-[100px] resize-vertical"
                    />
                  </div>

                  <Button
                    onClick={updateBooking}
                    disabled={updating}
                    className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {updating ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Update Booking
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Enhanced Quick Stats */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">Duration</span>
                      <span className="font-bold text-blue-600">7 Days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">Room Type</span>
                      <span className="font-bold text-purple-600">
                        {booking.roomType === 'room' ? 'Double Room' : 'Dome'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">Accommodation</span>
                      <span className="font-bold text-indigo-600">
                        {booking.roomType === 'room' 
                          ? `${booking.roomNumbers.length} Room${booking.roomNumbers.length > 1 ? 's' : ''}`
                          : `${booking.bedNumbers.length} Bed${booking.bedNumbers.length > 1 ? 's' : ''}`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">Total Beds</span>
                      <span className="font-bold text-green-600">
                        {booking.roomType === 'room' 
                          ? booking.roomNumbers.length * 2
                          : booking.bedNumbers.length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium">Revenue</span>
                      <span className="font-bold text-lg">${booking.totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Timeline */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-100">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-sm">Booking Created</p>
                        <p className="text-xs text-gray-500">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        booking.status === 'confirmed' || booking.status === 'completed' 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-sm">Booking Confirmed</p>
                        <p className="text-xs text-gray-500">
                          {booking.status === 'confirmed' || booking.status === 'completed' 
                            ? 'Confirmed' 
                            : 'Pending confirmation'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        booking.status === 'completed' 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-sm">Experience Completed</p>
                        <p className="text-xs text-gray-500">
                          {booking.status === 'completed' 
                            ? 'Completed successfully' 
                            : 'Awaiting completion'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
