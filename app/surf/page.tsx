'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  User, 
  Waves,
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
  Clock,
  Heart,
  Zap,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Package {
  _id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
}

interface FormErrors {
  checkInDate?: string;
  name?: string;
  email?: string;
  phone?: string;
  room?: string;
}

export default function SurfPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [availableRooms, setAvailableRooms] = useState<number[]>([]);
  const [bookedRooms, setBookedRooms] = useState<number[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (packageId: string, date: string) => {
    try {
      const response = await fetch(`/api/bookings/availability?packageId=${packageId}&checkInDate=${date}`);
      const data = await response.json();
      
      if (response.ok) {
        setAvailableRooms(data.availableRooms);
        setBookedRooms(data.bookedRooms);
      } else {
        setErrors(prev => ({ ...prev, checkInDate: data.error || 'Failed to check availability' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, checkInDate: 'Failed to check availability' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!checkInDate) {
      newErrors.checkInDate = 'Please select a check-in date';
    } else {
      const selectedDate = new Date(checkInDate);
      if (selectedDate.getDay() !== 0) {
        newErrors.checkInDate = 'Check-in must be on a Sunday';
      }
    }

    if (!selectedRoom) {
      newErrors.room = 'Please select a room';
    }

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^([0]|\+)[0-9]{9,14}$/.test(customerInfo.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    if (!selectedPackage) return;

    if (!validateForm()) return;

    setBookingLoading(true);
    try {
      const bookingData = {
        packageId: selectedPackage._id,
        roomNumber: selectedRoom,
        customerName: customerInfo.name.trim(),
        customerEmail: customerInfo.email.trim(),
        customerPhone: customerInfo.phone.trim(),
        checkInDate
      };

      console.log('Sending booking data:', bookingData);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        toast.success('Booking created successfully!');
        
        // Reset form and close dialog
        resetBookingForm();
        setIsDialogOpen(false);
        
        // Redirect to booking details page
        router.push(`/surf/${responseData.bookingId}`);
      } else {
        toast.error(responseData.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const resetBookingForm = () => {
    setSelectedPackage(null);
    setSelectedRoom(null);
    setCheckInDate('');
    setAvailableRooms([]);
    setBookedRooms([]);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const getNextSunday = () => {
    const today = new Date();
    const nextSunday = new Date(today);
    const daysUntilSunday = 7 - today.getDay();
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday.toISOString().split('T')[0];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCheckOutDate = (checkInDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 7);
    return checkOut.toISOString().split('T')[0];
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

  const getPackageImage = (index: number) => {
    return "/surfer-blue-wave.jpg";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading amazing surf packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/surfbg.jpg"
            alt="Surf Paradise Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-cyan-800/70 to-blue-900/80" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center min-h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <Waves className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-bounce" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Surf Paradise
            <span className="block text-cyan-200">Packages</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our amazing surf packages and book your perfect getaway. 
            Weekly stays from Sunday to Sunday in our premium oceanfront accommodations.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-200" />
              <span className="text-white font-medium text-sm sm:text-base">7-Day Stays</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-200" />
              <span className="text-white font-medium text-sm sm:text-base">Oceanfront Rooms</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-200" />
              <span className="text-white font-medium text-sm sm:text-base">5 Premium Rooms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm sm:text-base">Happy Surfers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm sm:text-base">Surf Spots</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm sm:text-base">Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary">5⭐</div>
              <div className="text-sm sm:text-base">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Package Section */}
      {packages.length > 0 && (
        <div className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary">Featured Package</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Most Popular Choice
              </h2>
              <p className="max-w-2xl mx-auto px-4">
                Join hundreds of satisfied customers who chose our premium surf experience
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-2xl border-0 bg-card backdrop-blur-sm">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={getPackageImage(0)}
                      alt={packages[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Waves className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                      <p className="text-sm font-semibold">Premium Ocean View</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 sm:p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <CardTitle className="text-xl sm:text-2xl font-bold">
                          {packages[0].title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xl sm:text-2xl font-bold bg-primary text-white px-3 sm:px-4 py-2 self-start">
                          ${packages[0].price}
                        </Badge>
                      </div>
                      <p className="mt-4 text-sm sm:text-base">{packages[0].description}</p>
                    </CardHeader>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Package Features
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {packages[0].features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            {getFeatureIcon(feature)}
                            <span className="ml-3">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Dialog open={isDialogOpen && selectedPackage?._id === packages[0]._id} onOpenChange={(open) => {
                        if (!open) resetBookingForm();
                        setIsDialogOpen(open);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full text-white font-semibold py-3 mt-6"
                            onClick={() => {
                              setSelectedPackage(packages[0]);
                              setIsDialogOpen(true);
                            }}
                          >
                            Book This Featured Package
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* All Packages Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              All Surf Packages
            </h2>
            <p className="max-w-2xl mx-auto px-4">
              Choose from our carefully curated selection of surf packages, each designed to give you the ultimate beach experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, index) => (
              <Card key={pkg._id} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-card overflow-hidden transform hover:-translate-y-2">
                {/* Package Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={getPackageImage(index)}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-black font-bold">
                      ${pkg.price}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                    {pkg.title}
                  </CardTitle>
                  <p className="text-sm leading-relaxed">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Package Features
                    </h4>
                    <div className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          {getFeatureIcon(feature)}
                          <span className="ml-3">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background p-4 rounded-lg space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      7-day stay (Sunday to Sunday)
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      Premium oceanfront rooms
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      5 rooms available
                    </div>
                  </div>

                  <Dialog open={isDialogOpen && selectedPackage?._id === pkg._id} onOpenChange={(open) => {
                    if (!open) resetBookingForm();
                    setIsDialogOpen(open);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full text-white font-semibold py-3 group-hover:shadow-lg transition-all"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setIsDialogOpen(true);
                        }}
                      >
                        Book This Package
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      {selectedPackage && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) resetBookingForm();
          setIsDialogOpen(open);
        }}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
            <div className="sticky top-0 bg-white z-10 border-b">
              <DialogHeader className="p-4 sm:p-6">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  Book {selectedPackage.title}
                </DialogTitle>
              </DialogHeader>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              {/* Package Summary */}
              <Card className="bg-gradient-to-r from-primary/5 to-cyan-600/5 border-primary/20">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold">Total Price (7 days)</span>
                      <p className="text-sm mt-1">Sunday to Sunday stay</p>
                    </div>
                    <span className="text-2xl sm:text-3xl font-bold text-primary">${selectedPackage.price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Check-in Date (Sunday)
                </label>
                <Input
                  type="date"
                  value={checkInDate}
                  min={getNextSunday()}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    setCheckInDate(e.target.value);
                    setErrors(prev => ({ ...prev, checkInDate: undefined }));
                    setSelectedRoom(null); // Reset room selection
                    
                    if (selectedDate.getDay() !== 0) {
                      setErrors(prev => ({ ...prev, checkInDate: 'Check-in must be on a Sunday' }));
                      return;
                    }
                    
                    if (selectedPackage) {
                      checkAvailability(selectedPackage._id, e.target.value);
                    }
                  }}
                  className={`w-full ${errors.checkInDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.checkInDate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="w-4 h-4">⚠️</span>
                    {errors.checkInDate}
                  </p>
                )}
                {checkInDate && !errors.checkInDate && (
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Check-out: {formatDate(getCheckOutDate(checkInDate))}
                  </p>
                )}
              </div>

              {/* Room Selection */}
              {checkInDate && !errors.checkInDate && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Select Room
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((roomNum) => (
                      <button
                        key={roomNum}
                        onClick={() => {
                          if (availableRooms.includes(roomNum)) {
                            setSelectedRoom(roomNum);
                            setErrors(prev => ({ ...prev, room: undefined }));
                          }
                        }}
                        disabled={bookedRooms.includes(roomNum)}
                        className={`
                          p-3 sm:p-4 rounded-lg border-2 transition-all transform hover:scale-105
                          ${bookedRooms.includes(roomNum) 
                            ? 'bg-red-50 border-red-300 text-red-600 cursor-not-allowed opacity-60' 
                            : selectedRoom === roomNum
                            ? 'bg-primary border-primary text-white shadow-lg'
                            : 'bg-background border hover:border-primary hover:shadow-md cursor-pointer'
                          }
                        `}
                      >
                        <div className="text-center">
                          <div className="font-bold text-sm sm:text-lg">Room {roomNum}</div>
                          <div className="text-xs mt-1">
                            {bookedRooms.includes(roomNum) ? 'Booked' : 'Available'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.room && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.room}
                    </p>
                  )}
                </div>
              )}

              {/* Customer Information */}
              {selectedRoom && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Customer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <Input
                        value={customerInfo.name}
                        onChange={(e) => {
                          setCustomerInfo(prev => ({ ...prev, name: e.target.value }));
                          setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="w-4 h-4">⚠️</span>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => {
                          setCustomerInfo(prev => ({ ...prev, phone: e.target.value }));
                          setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="w-4 h-4">⚠️</span>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => {
                        setCustomerInfo(prev => ({ ...prev, email: e.target.value }));
                        setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Enter your email"
                      className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="w-4 h-4">⚠️</span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedRoom && customerInfo.name && customerInfo.email && customerInfo.phone && !Object.keys(errors).length && (
                <Card className="bg-background border-green-200">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      Booking Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Package:</span>
                          <span className="font-medium">{selectedPackage.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="font-medium">Room {selectedRoom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-in:</span>
                          <span className="font-medium">{formatDate(checkInDate)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Check-out:</span>
                          <span className="font-medium">{formatDate(getCheckOutDate(checkInDate))}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3 text-base font-bold text-green-800">
                          <span>Total:</span>
                          <span>${selectedPackage.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 sticky bottom-0 bg-white border-t -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetBookingForm();
                    setIsDialogOpen(false);
                  }}
                  className="flex-1 order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="flex-1 order-1 sm:order-2"
                >
                  {bookingLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Empty State */}
      {packages.length === 0 && (
        <div className="text-center py-20 bg-white">
          <div className="text-6xl mb-6">🏄‍♂️</div>
          <p className="text-2xl mb-4">No packages available</p>
          <p className="">Check back soon for amazing surf packages!</p>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose Surf Paradise?
            </h2>
            <p className="max-w-2xl mx-auto px-4">
              Experience the ultimate surf vacation with our premium amenities and unmatched service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Perfect Waves</h3>
              <p className="text-sm">Access to the best surf spots with perfect wave conditions year-round</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Safe & Secure</h3>
              <p className="text-sm">24/7 security and professional lifeguards ensure your safety</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Premium Service</h3>
              <p className="text-sm">Exceptional hospitality and personalized service for every guest</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">5-Star Experience</h3>
              <p className="text-sm">Luxury accommodations with world-class amenities and facilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
