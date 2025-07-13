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
  CheckCircle2,
  Home,
  Bed,
  UserPlus,
  Minus,
  Plus,
  MessageCircle,
  X,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

interface Package {
  _id: string;
  title: string;
  description: string;
  features: string[];
  doubleRoomPrice: number;
  domeRoomPrice: number;
  popular: boolean
}

interface FormErrors {
  checkInDate?: string;
  personCount?: string;
  roomType?: string;
  roomSelection?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface AvailabilityData {
  availableRooms?: number[];
  bookedRooms?: number[];
  availableBeds?: number[];
  bookedBeds?: number[];
  roomType: string;
}

// Add this component before the main SurfPage component
const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none focus:bg-gray-100/50"
      >
        <span className={`text-lg font-semibold ${isOpen ? 'text-primary' : 'text-text'} pr-4`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 bg-primary rounded-full"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5">
          <p className="text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function SurfPage() {
  const router = useRouter();
  const [packages] = useState<Package[]>([
    {
      _id: 'basic-surf-pack',
      title: 'Basic Surf Pack',
      description: 'Perfect for beginners or casual surfers, this package includes everything you need to get started.',
      features: [
        '7 nights accommodation (Dorm or Private Room)',
        'Breakfast x 7',
        '5 x Unlimited Local Buffet (Lunch or Dinner)',
        'Surf course 6 x 1.5 hours',
        'Surf equipment (2 hours x 2 Daily)',
        'Transport to surf spots',
        'Surf theory',
        '2 video analysis sessions',
        '2 ice bath recovery sessions'
      ],
      doubleRoomPrice: 750,
      domeRoomPrice: 550,
      popular: false
    },
    {
      _id: 'surf-and-safari-retreat',
      title: 'Surf & Safari Retreat',
      description: 'A balanced mix of surf, nature and relaxation, this retreat is for those wanting more than just waves.',
      features: [
        '7 nights accommodation (Dorm or Private Room)',
        'Breakfast x 7',
        '5 x Unlimited Local Buffet (Lunch or Dinner)',
        'Surf course 5 x 1.5 hours',
        'Surf equipment (2 hours x 2 Daily)',
        'Transport to surf spots',
        'Surf theory',
        '2 video analysis sessions',
        '5 ice bath recovery sessions',
        '1 x surf skate session',
        'Kumana Safari (Half Day)',
        'Sunset Lagoon Tour',
        'Sunset BBQ'
      ],
      doubleRoomPrice: 850,
      domeRoomPrice: 650,
      popular: true
    },
    {
      _id: 'surf-guiding-pack',
      title: 'Surf Guiding Pack',
      description: 'Tailored for seasoned surfers, this premium option offers expert-guided surf trips, in-depth analysis, and daily briefings.',
      features: [
        '7 nights accommodation (Dorm or Private Room)',
        'Breakfast x 7',
        '5 x Unlimited Local Buffet (Lunch or Dinner)',
        'Meet your new surf buddies and feel part of the crew instantly',
        'Surf the top local spots with a knowledgeable local guide',
        'Transportation included to all surf spots - no rental car required.',
        '5 days of surf guiding, with 2 sessions each day',
        'Daily updates on surf spots and conditions',
        '3 video analysis sessions'
      ],
      doubleRoomPrice: 1350,
      domeRoomPrice: 1150,
      popular: false
    }
  ]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [personCount, setPersonCount] = useState(1);
  const [roomType, setRoomType] = useState<'room' | 'dome' | ''>('');
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const checkAvailability = async (packageId: string, date: string, roomTypeSelected: string) => {
    setAvailabilityLoading(true);
    try {
      const response = await fetch(`/api/bookings/availability?packageId=${packageId}&checkInDate=${date}&roomType=${roomTypeSelected}`);
      const data = await response.json();

      if (response.ok) {
        setAvailabilityData(data);
        setSelectedRooms([]);
        setSelectedBeds([]);
      } else {
        setErrors(prev => ({ ...prev, checkInDate: data.error || 'Failed to check availability' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, checkInDate: 'Failed to check availability' }));
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const handlePersonCountChange = (increment: boolean) => {
    const newCount = increment ? personCount + 1 : personCount - 1;
    if (newCount >= 1 && newCount <= 6) {
      setPersonCount(newCount);
      setErrors(prev => ({ ...prev, personCount: undefined }));

      // Reset room selections when person count changes
      setSelectedRooms([]);
      setSelectedBeds([]);

      // If dome is selected and we have fewer beds selected than persons, reset
      if (roomType === 'dome') {
        setSelectedBeds([]);
      }
    }
  };

  const handleRoomSelection = (roomNum: number) => {
    if (!availabilityData?.availableRooms?.includes(roomNum)) return;

    setSelectedRooms(prev => {
      const isSelected = prev.includes(roomNum);
      let newSelection;

      if (isSelected) {
        newSelection = prev.filter(r => r !== roomNum);
      } else {
        newSelection = [...prev, roomNum];
      }

      // Check if total beds can accommodate person count
      const totalBeds = newSelection.length * 2;
      if (totalBeds < personCount && !isSelected) {
        // Allow selection if it helps meet the requirement
        return newSelection;
      } else if (totalBeds >= personCount || isSelected) {
        return newSelection;
      }

      return prev;
    });

    setErrors(prev => ({ ...prev, roomSelection: undefined }));
  };

  const handleBedSelection = (bedNum: number) => {
    if (!availabilityData?.availableBeds?.includes(bedNum)) return;

    setSelectedBeds(prev => {
      const isSelected = prev.includes(bedNum);

      if (isSelected) {
        return prev.filter(b => b !== bedNum);
      } else if (prev.length < personCount) {
        return [...prev, bedNum];
      }

      return prev;
    });

    setErrors(prev => ({ ...prev, roomSelection: undefined }));
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

    if (personCount < 1 || personCount > 6) {
      newErrors.personCount = 'Person count must be between 1 and 6';
    }

    if (!roomType) {
      newErrors.roomType = 'Please select a room type';
    }

    if (roomType === 'room') {
      if (selectedRooms.length === 0) {
        newErrors.roomSelection = 'Please select at least one room';
      } else {
        const totalBeds = selectedRooms.length * 2;
        if (totalBeds < personCount) {
          newErrors.roomSelection = 'Selected rooms do not have enough beds for all persons';
        }
      }
    } else if (roomType === 'dome') {
      if (selectedBeds.length !== personCount) {
        newErrors.roomSelection = `Please select exactly ${personCount} bed${personCount > 1 ? 's' : ''}`;
      }
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
        personCount,
        roomType,
        roomNumbers: roomType === 'room' ? selectedRooms : [],
        bedNumbers: roomType === 'dome' ? selectedBeds : [],
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
    setPersonCount(1);
    setRoomType('');
    setSelectedRooms([]);
    setSelectedBeds([]);
    setCheckInDate('');
    setAvailabilityData(null);
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

  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0;
    const roomPrice = roomType === 'room' ? selectedPackage.doubleRoomPrice : selectedPackage.domeRoomPrice;
    return roomPrice * personCount;
  };

  const getRoomPrice = () => {
    if (!selectedPackage || !roomType) return 0;
    return roomType === 'room' ? selectedPackage.doubleRoomPrice : selectedPackage.domeRoomPrice;
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();

    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet'))
      return <Wifi className="w-4 h-4 text-blue-500" />;
    if (lowerFeature.includes('parking') || lowerFeature.includes('car'))
      return <Car className="w-4 h-4 text-lime-600" />;
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


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen md:h-[85vh] lg:h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg2.jpg"
            alt="Surf Paradise Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>
        </div>

        {/* Mobile Layout */}
        <div className="relative md:hidden h-full flex flex-col">
          {/* Mobile Text Content - Full Screen */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl customtext sm:text-5xl font-bold text-text mb-6 leading-tight drop-shadow-lg"
            >
              Surf camp
              <span className="customtext text-primary drop-shadow-lg"> Packs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-white max-w-sm mx-auto leading-relaxed drop-shadow-md"
            >
              Book your ideal beach escape — 7-night surf stays from Sunday to Sunday in premium comfort.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-col items-center text-white/80"
            >
              <span className="text-sm font-medium mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative container mx-auto px-4 sm:px-6 h-[60vh] lg:h-[70vh] flex flex-col justify-center items-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl customtext md:text-5xl font-bold text-text mb-8 leading-tight drop-shadow-lg text-center"
            >
              Surf camp
              <span className="customtext text-primary drop-shadow-lg"> Packs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-text max-w-4xl mx-auto leading-relaxed drop-shadow-md text-center"
            >
              Book your ideal beach escape — 7-night surf stays from Sunday to Sunday in premium comfort.
            </motion.p>
          </div>

          {/* Desktop Bottom Icons Section - Reduced Height */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-2 shadow-xl">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3"
              >
                {[
                  { icon: "/icons/mappin.png", text: "BEST LOCATION TO SURF", description: "Prime surfing location with consistent waves year-round" },
                  { icon: "/icons/verify.png", text: "ISA CERTIFIED INSTRUCTORS", description: "Professional certified instructors for all skill levels" },
                  { icon: "/icons/double.png", text: "MODERN, AFFORDABLE ROOMS", description: "Comfortable accommodation with modern amenities" },
                  { icon: "/icons/cutlery.png", text: "RESTAURANT & CAFE", description: "Delicious local and international cuisine on-site" },
                  { icon: "/icons/sunbed.png", text: "BEACHFRONT LOUNGE", description: "Exclusive beachfront relaxation area" },
                  { icon: "/icons/userlevel.png", text: "ALL SKILL LEVELS", description: "Programs designed for beginners to advanced surfers" },
                  { icon: "/icons/sunrise.png", text: "FUN ACTIVITIES", description: "Diverse activities beyond surfing" },
                  { icon: "/icons/tuktukc.png", text: "TRANSPORT SERVICE", description: "Convenient transportation to surf spots" },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="group perspective-1000"
                  >
                    <motion.div
                      className="relative w-full aspect-[4/3] cursor-pointer"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden bg-white rounded-lg p-1 transition-all duration-300 group-hover:shadow-lg border border-gray-100">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-1"
                        >
                          <Image
                            src={service.icon}
                            alt={service.text}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 text-center uppercase leading-tight">
                          {service.text}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Icons Section - Scroll Triggered */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white py-6 shadow-lg"
        >
          <div className="max-w-full mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: "/icons/mappin.png", text: "BEST LOCATION", description: "Prime surfing location with consistent waves" },
                { icon: "/icons/verify.png", text: "ISA CERTIFIED", description: "Professional certified instructors" },
                { icon: "/icons/double.png", text: "MODERN ROOMS", description: "Comfortable modern accommodation" },
                { icon: "/icons/cutlery.png", text: "RESTAURANT", description: "Delicious on-site dining" },
                { icon: "/icons/sunbed.png", text: "BEACHFRONT", description: "Exclusive beachfront access" },
                { icon: "/icons/userlevel.png", text: "ALL LEVELS", description: "Programs for all skill levels" },
                { icon: "/icons/sunrise.png", text: "FUN ACTIVITIES", description: "Diverse activity programs" },
                { icon: "/icons/tuktukc.png", text: "TRANSPORT", description: "Convenient transport service" },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group"
                >
                  <motion.div
                    className="relative w-full cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl p-4 transition-all duration-300 group-hover:shadow-lg border border-gray-100 group-hover:border-primary/20">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-8 h-8 sm:w-10 sm:h-10 mb-2"
                      >
                        <Image
                          src={service.icon}
                          alt={service.text}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      <span className="text-xs font-semibold text-gray-700 text-center uppercase leading-tight mb-1">
                        {service.text}
                      </span>
                      <span className="text-[10px] text-gray-500 text-center leading-tight">
                        {service.description}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>


      <section className="py-16 md:px-20 bg-white relative overflow-hidden">
        {/* Floating Leaf 2 - Different Position */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-3xl md:text-4xl font-bold customtext text-text">
              Most Popular <span className="text-primary">Surf Camp </span> Package
            </p>
            <p className="text-xl mt-4 text-text">
              The package our guests love the most — surf every day, eat well, explore wildlife and soak up the Arugam Bay vibe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center mb-5"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold text-primary px-4 mb-6 md:mb-0 tanHeading"
            >
              Surf & Safari Retreat
            </motion.div>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" className="border-primary text-primary rounded-full transition-all duration-300">
                  Starting from $650
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-[url('/bg.jpg')] w-full p-5 bg-fixed bg-cover bg-center bg-no-repeat relative rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 rounded-3xl"></div>
            <div className="relative">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
              >
                {[
                  {
                    number: "7",
                    icon: "/icons/sleeping.png",
                    title: "7 Nights Stay",
                    description: "Sleep close to the surf — pick a dorm or a private room, all with A/C and hot water."
                  },
                  {
                    number: "6",
                    icon: "/icons/mansurf.png",
                    title: "Guided Surf Lessons",
                    description: "6 guided sessions with ISA-certified instructors, plus video analysis and chill surf theory chats to help you level up."
                  },
                  {
                    number: "",
                    icon: "/icons/foods.png",
                    title: "Delicious Food",
                    description: "Choose two meals a day with Rupa's all-day local buffet — plus tasty international dishes from our restaurant and café."
                  },
                  {
                    number: "",
                    icon: "/icons/safari.png",
                    title: "Safari & Tours",
                    description: "Go wild with a real Sri Lankan safari — think elephants, leopards, and jungle vibes — then wind down with local sights, bonfire & live music."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="p-6 flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                        className="text-6xl font-bold text-primary mb-2 flex flex-row items-center"
                      >
                        {item.number && <span>{item.number} <span className="font-normal ml-4 mr-4"> x</span></span>}
                        <div className="relative h-20 w-20">
                          <Image
                            src={item.icon}
                            alt="Package feature"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className="text-xl font-bold text-text mb-2 flex flex-row items-center justify-center"
                      >
                        {item.title}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                        className="text-text text-sm text-justify"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex justify-center items-center"
            >
              <div className="space-y-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl">
                <div className="flex justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 overflow-x-auto">
                    <div className="gap-6 flex flex-col w-full md:w-auto px-2 md:pl-5 mt-4 md:mt-0 items-center">
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-lg text-primary text-center"
                      >
                        Free services included with your package
                      </motion.p>
                      <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="flex flex-row gap-4 md:gap-6 flex-wrap justify-center"
                      >
                        {[
                          { icon: "/icons/wifiicon.png", text: "HIGH SPEED Wi-Fi", description: "Stay connected with our high-speed internet access throughout your stay", type: "Free Services" },
                          { icon: "/icons/surfeq.png", text: "SURF EQUIPMENT", description: "Complete set of quality surfing gear including boards and wetsuits", type: "Free Services" },
                          { icon: "/icons/videoi.png", text: "SURF VIDEOS & PHOTOS", description: "Professional photography and video coverage of your surfing sessions", type: "Free Services" },
                          { icon: "/icons/tukicon.png", text: "TRANSPORT TO ACTIVITIES", description: "Convenient transportation to all surfing spots and activities", type: "Free Services" },
                          { icon: "/icons/towelicon.png", text: "LINEN & TOWEL SERVICE", description: "Fresh linens and towels provided daily for your comfort", type: "Free Services" },
                          { icon: "/icons/iceicon.png", text: "ICE BATH RECOVERY", description: "Rejuvenate with our ice bath facilities after surfing sessions", type: "Free Services" },
                          { icon: "/icons/beachfront.png", text: "BEACHFRONT LOUNGE", description: "Exclusive access to our comfortable beachfront lounge area", type: "Free Services" },
                        ].map((service, index) => (
                          <motion.div
                            key={index}
                            variants={staggerItem}
                            className="perspective-1000"
                          >
                            <motion.div
                              className="relative w-16 md:w-20 h-24 md:h-28 cursor-pointer"
                              initial={false}
                              whileHover={{ rotateY: 180, scale: 1.05 }}
                              style={{ transformStyle: "preserve-3d" }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Front of card */}
                              <div className="absolute w-full h-full flex flex-col items-center backface-hidden">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative w-12 md:w-12 h-10 md:h-10 mb-2"
                                >
                                  <Image
                                    src={service.icon}
                                    alt={service.text}
                                    fill
                                    className="object-contain"
                                  />
                                </motion.div>
                                <span className="text-[10px] md:text-xs font-semibold text-text text-center">{service.text}</span>
                              </div>

                              {/* Back of card */}
                              <div
                                className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                                style={{ transform: "rotateY(180deg)" }}
                              >
                                <p className="text-[8px] md:text-[10px] text-text text-center">{service.description}</p>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <div className="gap-6 flex flex-col w-full md:w-auto px-2 md:pl-5 pt-4 items-center">
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-lg text-primary text-center"
                      >
                        Extra services
                      </motion.p>
                      <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="flex flex-row gap-4 md:gap-6 md:border-l-2 border-t-2 md:border-t-0 border-primary pt-6 md:pt-0 md:pl-10 flex-wrap justify-center"
                      >
                        {[
                          { icon: "/icons/caricon.png", text: "AIRPORT PICKUP & DROPOFF", description: "Convenient door-to-door transfer service from and to the airport", type: "Extra Services" },
                          { icon: "/icons/sunsetbbq.png", text: "SUNSET BARBEQUE", description: "Enjoy delicious BBQ meals while watching beautiful sunsets", type: "Extra Services" }
                        ].map((service, index) => (
                          <motion.div
                            key={index}
                            variants={staggerItem}
                            className="perspective-1000"
                          >
                            <motion.div
                              className="relative w-20 md:w-24 h-28 md:h-32 cursor-pointer"
                              initial={false}
                              whileHover={{ rotateY: 180, scale: 1.05 }}
                              style={{ transformStyle: "preserve-3d" }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Front of card */}
                              <div className="absolute w-full h-full flex flex-col items-center backface-hidden">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative w-10 md:w-10 h-8 md:h-8 mb-2"
                                >
                                  <Image
                                    src={service.icon}
                                    alt={service.text}
                                    fill
                                    className="object-contain"
                                  />
                                </motion.div>
                                <span className="text-[10px] md:text-xs font-semibold text-text text-center">{service.text}</span>
                              </div>

                              {/* Back of card */}
                              <div
                                className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                                style={{ transform: "rotateY(180deg)" }}
                              >
                                <p className="text-[10px] md:text-xs text-text text-center">{service.description}</p>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <style jsx global>{`
                    .perspective-1000 {
                      perspective: 1000px
                    }
                    .backface-hidden {
                      backface-visibility: hidden
                    }
                  `}</style>
          </motion.div>


          <motion.div
            className="flex justify-center pt-5"
            whileHover={{ scale: 1.05 }}
          >
            <Button className="border-primary text-primary hover:bg-primary bg-primary text-white hover:text-white rounded-full transition-all duration-300  cursor-pointer">
              Scroll down for packages
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* All Packages Section */}
      <div className="py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold p-6 bg-primary customtext bg-clip-text text-transparent">
              Our Surf & Stay Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={pkg._id} className="relative">
                <Card className="group hover:shadow-2xl rounded-3xl transition-all duration-500 border border-gray-200 bg-card overflow-hidden transform hover:-translate-y-2 h-full">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="bg-card p-6 text-white">
                      <div className="flex justify-center items-start">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-text mb-2 tanHeading">{pkg.title}</h3>
                          <p className="text-text text-sm">{pkg.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-text flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          What's Included
                        </h4>
                        <div className="space-y-2 pr-2">
                          {pkg.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3 text-sm">
                              {getFeatureIcon(feature)}
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            Starting from ${pkg.domeRoomPrice}
                          </div>
                          <p className="text-sm text-gray-600">per person (dome room)</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-700 mb-1">Pricing options:</div>
                            <div className="flex justify-between text-sm">
                              <span>Dome Room:</span>
                              <span className="font-semibold text-green-600">${pkg.domeRoomPrice}/person</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Double Room:</span>
                              <span className="font-semibold text-blue-600">${pkg.doubleRoomPrice}/person</span>
                            </div>
                          </div>
                        </div>

                        {/* Book Now Button */}
                        <Dialog open={isDialogOpen && selectedPackage?._id === pkg._id} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Waves className="w-5 h-5 mr-2" />
                              Book This Package
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-primary">
                                Book {selectedPackage?.title}
                              </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                              {/* Check-in Date */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Check-in Date (Sunday only)</label>
                                <Input
                                  type="date"
                                  value={checkInDate}
                                  onChange={(e) => {
                                    setCheckInDate(e.target.value);
                                    setErrors(prev => ({ ...prev, checkInDate: undefined }));
                                    if (e.target.value && roomType) {
                                      checkAvailability(selectedPackage?._id || '', e.target.value, roomType);
                                    }
                                  }}
                                  min={getNextSunday()}
                                  className={errors.checkInDate ? 'border-red-500' : ''}
                                />
                                {errors.checkInDate && (
                                  <p className="text-red-500 text-sm">{errors.checkInDate}</p>
                                )}
                                {checkInDate && (
                                  <p className="text-sm text-gray-600">
                                    Check-out: {formatDate(getCheckOutDate(checkInDate))}
                                  </p>
                                )}
                              </div>

                              {/* Number of Guests */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Number of Guests (1-6)</label>
                                <div className="flex items-center gap-3">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePersonCountChange(false)}
                                    disabled={personCount <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-12 text-center font-semibold">{personCount}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePersonCountChange(true)}
                                    disabled={personCount >= 6}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                                {errors.personCount && (
                                  <p className="text-red-500 text-sm">{errors.personCount}</p>
                                )}
                              </div>

                              {/* Room Type Selection */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Accommodation Type</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${roomType === 'room'
                                        ? 'border-blue-400 bg-blue-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    onClick={() => {
                                      setRoomType('room');
                                      setErrors(prev => ({ ...prev, roomType: undefined }));
                                      if (checkInDate) {
                                        checkAvailability(selectedPackage?._id || '', checkInDate, 'room');
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Home className="w-5 h-5 text-blue-600" />
                                      <div>
                                        <h4 className="font-semibold">Double Room</h4>
                                        <p className="text-sm text-gray-600">Private room with 2 beds</p>
                                        <p className="text-sm font-semibold text-blue-600">
                                          ${selectedPackage?.doubleRoomPrice}/person
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${roomType === 'dome'
                                        ? 'border-green-400 bg-green-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                    onClick={() => {
                                      setRoomType('dome');
                                      setErrors(prev => ({ ...prev, roomType: undefined }));
                                      if (checkInDate) {
                                        checkAvailability(selectedPackage?._id || '', checkInDate, 'dome');
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Bed className="w-5 h-5 text-green-600" />
                                      <div>
                                        <h4 className="font-semibold">Dome Room</h4>
                                        <p className="text-sm text-gray-600">Shared dome accommodation</p>
                                        <p className="text-sm font-semibold text-green-600">
                                          ${selectedPackage?.domeRoomPrice}/person
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {errors.roomType && (
                                  <p className="text-red-500 text-sm">{errors.roomType}</p>
                                )}
                              </div>

                              {/* Room/Bed Selection */}
                              {availabilityLoading && (
                                <div className="text-center py-4">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                  <p className="text-sm text-gray-600 mt-2">Checking availability...</p>
                                </div>
                              )}

                              {availabilityData && !availabilityLoading && (
                                <div className="space-y-4">
                                  {roomType === 'room' && (
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Select Rooms (2 beds per room)</label>
                                      <div className="grid grid-cols-5 gap-2">
                                        {[1, 2, 3, 4, 5].map((roomNum) => {
                                          const isAvailable = availabilityData.availableRooms?.includes(roomNum);
                                          const isSelected = selectedRooms.includes(roomNum);
                                          return (
                                            <button
                                              key={roomNum}
                                              type="button"
                                              disabled={!isAvailable}
                                              onClick={() => handleRoomSelection(roomNum)}
                                              className={`p-3 rounded-lg border-2 transition-all duration-200 ${isSelected
                                                  ? 'border-primary bg-primary text-white'
                                                  : isAvailable
                                                    ? 'border-gray-300 hover:border-primary'
                                                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                              <Home className="w-4 h-4 mx-auto mb-1" />
                                              <div className="text-xs">Room {roomNum}</div>
                                            </button>
                                          );
                                        })}
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Selected: {selectedRooms.length} room(s) = {selectedRooms.length * 2} beds
                                      </p>
                                    </div>
                                  )}

                                  {roomType === 'dome' && (
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Select Beds ({personCount} needed)</label>
                                      <div className="grid grid-cols-6 gap-2">
                                        {[1, 2, 3, 4, 5, 6].map((bedNum) => {
                                          const isAvailable = availabilityData.availableBeds?.includes(bedNum);
                                          const isSelected = selectedBeds.includes(bedNum);
                                          return (
                                            <button
                                              key={bedNum}
                                              type="button"
                                              disabled={!isAvailable || (selectedBeds.length >= personCount && !isSelected)}
                                              onClick={() => handleBedSelection(bedNum)}
                                              className={`p-2 rounded-lg border-2 transition-all duration-200 ${isSelected
                                                  ? 'border-primary bg-primary text-white'
                                                  : isAvailable && selectedBeds.length < personCount
                                                    ? 'border-gray-300 hover:border-primary'
                                                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                              <Bed className="w-3 h-3 mx-auto mb-1" />
                                              <div className="text-xs">Bed {bedNum}</div>
                                            </button>
                                          );
                                        })}
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Selected: {selectedBeds.length} of {personCount} beds
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {errors.roomSelection && (
                                <p className="text-red-500 text-sm">{errors.roomSelection}</p>
                              )}

                              {/* Customer Information */}
                              <div className="space-y-4">
                                <h4 className="font-semibold">Customer Information</h4>
                                <div className="grid grid-cols-1 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input
                                      type="text"
                                      value={customerInfo.name}
                                      onChange={(e) => {
                                        setCustomerInfo(prev => ({ ...prev, name: e.target.value }));
                                        setErrors(prev => ({ ...prev, name: undefined }));
                                      }}
                                      placeholder="Enter your full name"
                                      className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input
                                      type="email"
                                      value={customerInfo.email}
                                      onChange={(e) => {
                                        setCustomerInfo(prev => ({ ...prev, email: e.target.value }));
                                        setErrors(prev => ({ ...prev, email: undefined }));
                                      }}
                                      placeholder="Enter your email"
                                      className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input
                                      type="tel"
                                      value={customerInfo.phone}
                                      onChange={(e) => {
                                        setCustomerInfo(prev => ({ ...prev, phone: e.target.value }));
                                        setErrors(prev => ({ ...prev, phone: undefined }));
                                      }}
                                      placeholder="Enter your phone number"
                                      className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Price Summary */}
                              {roomType && selectedPackage && (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                  <h4 className="font-semibold">Price Summary</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span>Package:</span>
                                      <span>{selectedPackage.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Room Type:</span>
                                      <span>{roomType === 'room' ? 'Double Room' : 'Dome Room'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Price per person:</span>
                                      <span>${getRoomPrice()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Number of guests:</span>
                                      <span>{personCount}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-base border-t pt-2">
                                      <span>Total:</span>
                                      <span>${calculateTotalPrice()}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-3 pt-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setIsDialogOpen(false);
                                    resetBookingForm();
                                  }}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleBooking}
                                  disabled={bookingLoading}
                                  className="flex-1 bg-primary hover:bg-primary/90"
                                >
                                  {bookingLoading ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Booking...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Confirm Booking
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our surf packages
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {[
                {
                  question: "What's included in the accommodation?",
                  answer: "All rooms come with air conditioning, hot water, free WiFi, and daily housekeeping. Double rooms are private with 2 beds, while dome rooms are shared accommodation with individual beds."
                },
                {
                  question: "Do I need to be an experienced surfer?",
                  answer: "Not at all! Our packages are designed for all skill levels. We have ISA-certified instructors who will assess your level and provide appropriate guidance, from complete beginners to advanced surfers."
                },
                {
                  question: "What should I bring?",
                  answer: "Just bring yourself, swimwear, sunscreen, and personal items. We provide all surfing equipment including boards, wetsuits, and safety gear. We also provide fresh towels and linens daily."
                },
                {
                  question: "Can I change my booking dates?",
                  answer: "Yes, you can modify your booking up to 7 days before your check-in date, subject to availability. Changes within 7 days may incur additional charges."
                },
                {
                  question: "What's the cancellation policy?",
                  answer: "Free cancellation up to 7 days before check-in. Cancellations within 7 days are subject to a 50% charge. No refunds for no-shows or early departures."
                },
                {
                  question: "Is transportation included?",
                  answer: "Transportation to surf spots and activities is included in all packages. Airport pickup and drop-off are available as an extra service for an additional fee."
                }
              ].map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-br from-primary to-cyan-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Catch Some Waves?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions about our packages? Need help with your booking?
            Our team is here to help you plan the perfect surf adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+94 77 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span className="font-semibold">info@surfparadise.com</span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
