'use client';

import React, { useState, useEffect } from 'react';
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
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BookingDetails {
  _id: string;
  bookingId: string;
    packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  roomNumber: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
  status: string;
  adminNotes?: string;
}

interface AdminBookingPageProps {
  params: {
    id: string;
  };
}

export default function AdminBookingPage({ params }: AdminBookingPageProps) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchBookingDetails();
  }, [params.id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${params.id}`);
      
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
      const response = await fetch(`/api/admin/bookings/${params.id}`, {
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
        toast.success('Booking updated successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update booking');
      }
    } catch (error) {
      toast.error('Failed to update booking');
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || 'The booking you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/admin">
              <Button className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <Link href="/admin">
            <Button
              variant="outline"
              className="mb-4 sm:mb-0 flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Button>
          </Link>
          <div className="text-center sm:text-right">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary flex items-center gap-2">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
              Admin - Booking Management
            </h1>
            <p className="text-muted-foreground mt-2">Review and manage booking details</p>
          </div>
        </div>

        {/* Booking ID and Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              <span className="font-semibold">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
            </div>
          </div>
          <p className="text-lg sm:text-xl font-semibold">
            Booking ID: {booking.bookingId}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-semibold">{booking.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm break-all">{booking.customerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold">{booking.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Date</p>
                        <p className="font-semibold">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Waves className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Package</p>
                        <p className="font-bold text-lg text-primary">{booking.packageTitle}</p>
                        <p className="text-sm text-muted-foreground mt-1">{booking.packageDescription}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Room Number</p>
                        <p className="font-semibold">Room {booking.roomNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-semibold">{formatDate(booking.checkInDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-semibold">{formatDate(booking.checkOutDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <p className="text-center text-blue-800 font-semibold">
                    🏄‍♂️ 7-Day Surf Adventure Experience
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Package Features */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="w-5 h-5" />
                  Package Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {booking.packageFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      {getFeatureIcon(feature)}
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Controls Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Total Amount</h3>
                  <div className="text-4xl font-bold">${booking.packagePrice}</div>
                  <p className="text-blue-100 text-sm mt-2">7-day stay included</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Package Price</span>
                    <span className="font-semibold">${booking.packagePrice}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Duration</span>
                    <span className="font-semibold">7 Days</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Room</span>
                    <span className="font-semibold">Room {booking.roomNumber}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg">${booking.packagePrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Controls */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  Admin Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Booking Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Notes</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this booking..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={updateBooking}
                  disabled={updating}
                  className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white font-semibold py-3 flex items-center gap-2"
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Booking
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 hover:bg-green-50 border-green-200 text-green-700"
                  onClick={() => setStatus('confirmed')}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setStatus('cancelled')}
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 hover:bg-blue-50 border-blue-200 text-blue-700"
                  onClick={() => setStatus('completed')}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </Button>
              </CardContent>
            </Card>

            {/* Customer Link */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-purple-800 mb-3">Customer View</h3>
                <p className="text-sm text-purple-700 mb-4">
                  View this booking from customer perspective
                </p>
                <Link href={`/booking/${booking.bookingId}`}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-700 hover:bg-purple-500 hover:text-white flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Customer View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Admin Notes Display */}
        {booking.adminNotes && (
          <div className="mt-8">
            <Card className="shadow-lg border-0 bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-yellow-800">
                  <AlertTriangle className="w-5 h-5" />
                  Current Admin Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 whitespace-pre-wrap">{booking.adminNotes}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

