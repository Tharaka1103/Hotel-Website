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
  Link,
  MessageCircle,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


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
  price: number;
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

export default function SurfPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [personCount, setPersonCount] = useState(1);
  const [roomType, setRoomType] = useState<'room' | 'dome' | ''>('');
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
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
    return selectedPackage.price * personCount;
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
      <div className="relative h-screen md:h-screen">
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

        {/* Mobile Layout */}
        <div className="relative md:hidden h-full flex flex-col">
          {/* Mobile Text Content */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Surf camp
              <span className="customtext text-primary"> Packs</span>
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-sm mx-auto leading-relaxed">
              Book your ideal beach escape — 7-night surf stays from Sunday to Sunday in premium comfort.
            </p>
          </div>

          {/* Mobile Icon Section */}
          <div className="bg-white/95 backdrop-blur-sm p-3 shadow-xl">
            <div className="max-w-full mx-auto">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-2"
              >
                {[
                  { icon: "/icons/mappin.png", text: "BEST LOCATION" },
                  { icon: "/icons/verify.png", text: "ISA CERTIFIED" },
                  { icon: "/icons/double.png", text: "MODERN ROOMS" },
                  { icon: "/icons/cutlery.png", text: "RESTAURANT" },
                  { icon: "/icons/sunbed.png", text: "BEACHFRONT" },
                  { icon: "/icons/userlevel.png", text: "ALL LEVELS" },
                  { icon: "/icons/sunrise.png", text: "FUN ACTIVITIES" },
                  { icon: "/icons/tuktukc.png", text: "TRANSPORT" },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="perspective-1000"
                  >
                    <motion.div
                      className="relative w-full cursor-pointer group"
                      initial={false}
                    >
                      <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg p-2 transition-all duration-300 group-hover:shadow-lg border border-gray-100">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative w-6 h-6 mb-1"
                        >
                          <Image
                            src={service.icon}
                            alt={service.text}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                        <span className="text-[10px] font-semibold text-gray-700 text-center uppercase leading-tight">
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

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative container mx-auto px-4 sm:px-6 h-[70vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl customtext sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Surf camp
              <span className="customtext text-primary"> Packs</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Book your ideal beach escape — 7-night surf stays from Sunday to Sunday in premium comfort.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white p-2 md:p-2 shadow-xl">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6"
              >
                {[
                  { icon: "/icons/mappin.png", text: "BEST LOCATION TO SURF", description: "Stay connected with our high-speed internet access throughout your stay", type: "Free Services" },
                  { icon: "/icons/verify.png", text: "ISA Certified instructors", description: "Complete set of quality surfing gear including boards and wetsuits", type: "Free Services" },
                  { icon: "/icons/double.png", text: "MODERN, AFFORDABLE ROOMS", description: "Professional photography and video coverage of your surfing sessions", type: "Free Services" },
                  { icon: "/icons/cutlery.png", text: "RESTAURANT & CAFE", description: "Convenient transportation to all surfing spots and activities", type: "Free Services" },
                  { icon: "/icons/sunbed.png", text: "BEACHFRONT LOUNGE", description: "Fresh linens and towels provided daily for your comfort", type: "Free Services" },
                  { icon: "/icons/userlevel.png", text: "ALL SKILL LEVELS", description: "Rejuvenate with our ice bath facilities after surfing sessions", type: "Free Services" },
                  { icon: "/icons/sunrise.png", text: "FUN ACTIVITIES", description: "Exclusive access to our comfortable beachfront lounge area", type: "Free Services" },
                  { icon: "/icons/tuktukc.png", text: "TRANSPORT SERVICE", description: "Convenient door-to-door transfer service from and to the airport", type: "Extra Services" },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="perspective-1000"
                  >
                    <motion.div
                      className="relative w-full aspect-[3/4] cursor-pointer group"
                      initial={false}
                    >
                      {/* Front of card */}
                      <div className="absolute w-full flex flex-col items-center justify-center backface-hidden bg-white rounded-lg p-3 transition-all duration-300 group-hover:shadow-lg">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3"
                        >
                          <Image
                            src={service.icon}
                            alt={service.text}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center uppercase leading-tight">{service.text}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>


      {/* Most Popular Package Section with Floating Elements */}
      <section className="py-16 md:px-5 bg-white relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold customtext">
              Most Popular <span className="text-primary">Surf Camp </span> Package
            </h2>
            <p className="text-xl mt-4 text-gray-600">
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
              className="text-3xl font-bold text-primary mb-6 md:mb-0 tanHeading"
            >
              Surf & Safari Retreat
            </motion.div>
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
                    icon: "/icons/jeep.png",
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
                        className="text-xl font-bold text-gray-800 mb-2 flex flex-row items-center justify-center"
                      >
                        {item.title}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                        className="text-gray-600 text-sm text-justify"
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
              className="mt-10"
            >
              <div className="space-y-8 bg-white/95 backdrop-blur-sm rounded-3xl p-4 shadow-xl">
                <div className="">
                  <div className="flex flex-col md:flex-row items-center gap-6 overflow-x-auto pb-4">
                    <div className="gap-6 flex flex-col w-full md:w-auto px-2 md:pl-5">
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
                          { icon: "/icons/wifi.png", text: "HIGH SPEED Wi-Fi", description: "Stay connected with our high-speed internet access throughout your stay", type: "Free Services" },
                          { icon: "/icons/surf.png", text: "SURF EQUIPMENT", description: "Complete set of quality surfing gear including boards and wetsuits", type: "Free Services" },
                          { icon: "/icons/media.png", text: "SURF VIDEOS & PHOTOS", description: "Professional photography and video coverage of your surfing sessions", type: "Free Services" },
                          { icon: "/icons/tuktuk.png", text: "TRANSPORT TO ACTIVITIES", description: "Convenient transportation to all surfing spots and activities", type: "Free Services" },
                          { icon: "/icons/towel.png", text: "LINEN & TOWEL SERVICE", description: "Fresh linens and towels provided daily for your comfort", type: "Free Services" },
                          { icon: "/icons/cool.png", text: "ICE BATH RECOVERY", description: "Rejuvenate with our ice bath facilities after surfing sessions", type: "Free Services" },
                          { icon: "/icons/sunset.png", text: "BEACHFRONT LOUNGE", description: "Exclusive access to our comfortable beachfront lounge area", type: "Free Services" },
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
                                  className="relative w-12 md:w-16 h-12 md:h-16 mb-2"
                                >
                                  <Image
                                    src={service.icon}
                                    alt={service.text}
                                    fill
                                    className="object-contain"
                                  />
                                </motion.div>
                                <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">{service.text}</span>
                              </div>

                              {/* Back of card */}
                              <div
                                className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                                style={{ transform: "rotateY(180deg)" }}
                              >
                                <p className="text-[10px] md:text-xs text-gray-700 text-center">{service.description}</p>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <div className="gap-6 flex flex-col w-full md:w-auto px-2 md:pl-5 mt-8 md:mt-0">
                      <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
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
                          { icon: "/icons/car.png", text: "AIRPORT PICKUP & DROPOFF", description: "Convenient door-to-door transfer service from and to the airport", type: "Extra Services" },
                          { icon: "/icons/bbq.png", text: "SUNSET BARBEQUE", description: "Enjoy delicious BBQ meals while watching beautiful sunsets", type: "Extra Services" }
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
                                  className="relative w-12 md:w-16 h-12 md:h-16 mb-2"
                                >
                                  <Image
                                    src={service.icon}
                                    alt={service.text}
                                    fill
                                    className="object-contain"
                                  />
                                </motion.div>
                                <span className="text-xs md:text-sm font-semibold text-gray-700 text-center">{service.text}</span>
                              </div>

                              {/* Back of card */}
                              <div
                                className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                                style={{ transform: "rotateY(180deg)" }}
                              >
                                <p className="text-[10px] md:text-xs text-gray-700 text-center">{service.description}</p>
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
            {/* Package 1 - Essential */}
            <div className="relative">
              <Card className="group hover:shadow-2xl rounded-3xl transition-all duration-500 border border-gray-200 bg-card overflow-hidden transform hover:-translate-y-2 h-full">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-card p-6 text-white">
                    <div className="flex justify-center items-start">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-black mb-2">Basic Surf Pack</h3>
                        <p className="text-black text-sm">Perfect for beginners or casual surfers, this package includes everything you need to get started.</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center justify-center text-black">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        What's Included
                      </h4>
                      <div className="space-y-3">
                        {[
                          "7 nights accommodation (Dorm or Private Room)",
                          "Breakfast x 7",
                          "5 x Unlimited Local Buffet (Lunch or Dinner)",
                          "Surf course 6 x 1.5 hours",
                          "Surf equipment (2 hours x 2 Daily)",
                          "Transport to surf spots",
                          "Surf theory",
                          "2 video analysis sessions",
                          "2 ice bath recovery sessions"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white w-3/4 p-2 rounded-full border-2 border-primary space-y-2 mx-auto">
                      <div className="flex items-center text-l justify-center text-primary font-bold">
                        Starting from $699
                      </div>
                    </div>

                    <Dialog open={isDialogOpen && selectedPackage?.title === "Essential Surf"} onOpenChange={(open) => {
                      if (!open) resetBookingForm();
                      setIsDialogOpen(open);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-black text-white font-bold py-4 rounded-full group-hover:shadow-lg transition-all"
                          onClick={() => {
                            setSelectedPackage({
                              _id: "basic-surf-pack",
                              title: "Basic Surf Pack",
                              description: "Perfect for beginners or casual surfers, this package includes everything you need to get started.",
                              features: [
                                "7 nights accommodation (Dorm or Private Room)",
                                "Breakfast x 7",
                                "5 x Unlimited Local Buffet (Lunch or Dinner)",
                                "Surf course 6 x 1.5 hours",
                                "Surf equipment (2 hours x 2 Daily)",
                                "Transport to surf spots",
                                "Surf theory",
                                "2 video analysis sessions",
                                "2 ice bath recovery sessions"
                              ],
                              price: 699
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          Book Now
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Package 2 - Most Popular */}
            <div className="relative lg:scale-105 z-10">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
                <div className="bg-primary text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                  🔥 MOST POPULAR
                </div>
              </div>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-2 border-cyan-700 rounded-3xl bg-cyan-700 overflow-hidden transform hover:-translate-y-2 h-full shadow-xl">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-6 text-white flex items-center justify-center">
                    <div className="flex justify-center items-center">
                      <div className="text-center">
                        <h3 className="text-2xl text-white font-bold mb-2">Surf & Safari Retreat</h3>
                        <p className="text-white text-sm">A balanced mix of surf, nature and relaxation, this retreat is for those wanting more than just waves.</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center justify-center text-white">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        What's Included
                      </h4>
                      <div className="space-y-3">
                        {[
                          "7 nights accommodation (Dorm or Private Room)",
                          "Breakfast x 7",
                          "5 x Unlimited Local Buffet (Lunch or Dinner)",
                          "Surf course 5 x 1.5 hours",
                          "Surf equipment (2 hours x 2 Daily)",
                          "Transport to surf spots",
                          "Surf theory",
                          "2 video analysis sessions",
                          "5 ice bath recovery sessions",
                          "1 x surf skate session",
                          "Kumana Safari (Half Day)",
                          "Sunset Lagoon Tour",
                          "Sunset BBQ"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-white">
                            <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Dialog open={isDialogOpen && selectedPackage?.title === "Ultimate Surf & Safari"} onOpenChange={(open) => {
                      if (!open) resetBookingForm();
                      setIsDialogOpen(open);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary border-2 border-primary hover:bg-black text-white hover:text-white font-bold py-3 rounded-full group-hover:shadow-lg transition-all transform hover:scale-105"
                          onClick={() => {
                            setSelectedPackage({
                              _id: "surf-and-safari-retreat",
                              title: "Surf & Safari Retreat",
                              description: "A balanced mix of surf, nature and relaxation, this retreat is for those wanting more than just waves.",
                              features: [
                                "7 nights accommodation (Dorm or Private Room)",
                                "Breakfast x 7",
                                "5 x Unlimited Local Buffet (Lunch or Dinner)",
                                "Surf course 5 x 1.5 hours",
                                "Surf equipment (2 hours x 2 Daily)",
                                "Transport to surf spots",
                                "Surf theory",
                                "2 video analysis sessions",
                                "5 ice bath recovery sessions",
                                "1 x surf skate session",
                                "Kumana Safari (Half Day)",
                                "Sunset Lagoon Tour",
                                "Sunset BBQ"
                              ],
                              price: 750
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          Book Now
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Package 3 - Luxury */}
            <div className="relative">
              <Card className="group hover:shadow-2xl rounded-3xl transition-all duration-500 border border-gray-200 bg-card overflow-hidden transform hover:-translate-y-2 h-full">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-6 flex items-center justify-center">
                    <div className="flex justify-center items-center">
                      <div className="text-center">
                        <h3 className="text-2xl text-black font-bold mb-2">Surf Guiding Pack</h3>
                        <p className="text-black text-sm">Tailored for seasoned surfers, this premium option offers expert-guided surf trips, in-depth analysis, and daily briefings.</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center text-gray-800">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Luxury Amenities
                      </h4>
                      <div className="space-y-3">
                        {[
                          "7 nights accommodation (Dorm or Private Room)",
                          "Breakfast x 7",
                          "5 x Unlimited Local Buffet (Lunch or Dinner)",
                          "Meet your new surf buddies and feel part of the crew instantly",
                          "Surf the top local spots with a knowledgeable local guide",
                          "Transportation included to all surf spots - no rental car required.",
                          "5 days of surf guiding, with 2 sessions each day",
                          "Daily updates on surf spots and conditions",
                          "3 video analysis sessions"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Dialog open={isDialogOpen && selectedPackage?.title === "Luxury Surf Retreat"} onOpenChange={(open) => {
                      if (!open) resetBookingForm();
                      setIsDialogOpen(open);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-black text-white font-bold py-4 rounded-full group-hover:shadow-lg transition-all"
                          onClick={() => {
                            setSelectedPackage({
                              _id: "surf-guiding-pack",
                              title: "Surf Guiding Pack",
                              description: "Tailored for seasoned surfers, this premium option offers expert-guided surf trips, in-depth analysis, and daily briefings.",
                              features: [
                                "7 nights accommodation (Dorm or Private Room)",
                                "Breakfast x 7",
                                "5 x Unlimited Local Buffet (Lunch or Dinner)",
                                "Meet your new surf buddies and feel part of the crew instantly",
                                "Surf the top local spots with a knowledgeable local guide",
                                "Transportation included to all surf spots - no rental car required.",
                                "5 days of surf guiding, with 2 sessions each day",
                                "Daily updates on surf spots and conditions",
                                "3 video analysis sessions"
                              ],
                              price: 1200
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          Book Now
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>


      {/* Booking Dialog */}
      {selectedPackage && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) resetBookingForm();
          setIsDialogOpen(open);
        }}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
            <div className="sticky top-0 bg-card z-10 border-b">
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
                      <span className="text-lg font-semibold">Price per person (7 days)</span>
                      <p className="text-sm mt-1 text-muted-foreground">Sunday to Sunday stay</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">${selectedPackage.price}</span>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
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
                    setRoomType(''); // Reset room type selection
                    setAvailabilityData(null);

                    if (selectedDate.getDay() !== 0) {
                      setErrors(prev => ({ ...prev, checkInDate: 'Check-in must be on a Sunday' }));
                      return;
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

              {/* Person Count Selection */}
              {checkInDate && !errors.checkInDate && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Persons (1-6)
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handlePersonCountChange(false)}
                      disabled={personCount <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-semibold min-w-[2rem] text-center">{personCount}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handlePersonCountChange(true)}
                      disabled={personCount >= 6}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground ml-2">
                      Total: ${calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  {errors.personCount && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.personCount}
                    </p>
                  )}
                </div>
              )}

              {/* Room Type Selection */}
              {personCount > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    <Home className="w-4 h-4 inline mr-2" />
                    Select Room Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className={`cursor-pointer transition-all ${roomType === 'room' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}>
                      <CardContent
                        className="p-4"
                        onClick={() => {
                          setRoomType('room');
                          setErrors(prev => ({ ...prev, roomType: undefined }));
                          checkAvailability(selectedPackage._id, checkInDate, 'room');
                        }}
                      >
                        <div className="text-center space-y-2">
                          <Home className="w-8 h-8 mx-auto text-primary" />
                          <h3 className="font-semibold">Double Rooms ( $750 / per person )</h3>
                          <p className="text-sm text-muted-foreground">5 rooms available, 2 beds each</p>
                          <p className="text-xs text-muted-foreground">Select multiple rooms if needed</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer transition-all ${roomType === 'dome' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}>
                      <CardContent
                        className="p-4"
                        onClick={() => {
                          setRoomType('dome');
                          setErrors(prev => ({ ...prev, roomType: undefined }));
                          checkAvailability(selectedPackage._id, checkInDate, 'dome');
                        }}
                      >
                        <div className="text-center space-y-2">
                          <Bed className="w-8 h-8 mx-auto text-primary" />
                          <h3 className="font-semibold">Dome ( $500 / per person )</h3>
                          <p className="text-sm text-muted-foreground">6 individual beds</p>
                          <p className="text-xs text-muted-foreground">Select individual beds</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {errors.roomType && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.roomType}
                    </p>
                  )}
                </div>
              )}

              {/* Room/Bed Selection */}
              {roomType && availabilityData && (
                <div className="space-y-3">
                  {availabilityLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Checking availability...</p>
                    </div>
                  ) : (
                    <>
                      {roomType === 'room' && (
                        <>
                          <label className="block text-sm font-medium">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Select Rooms (Need {Math.ceil(personCount / 2)} room{Math.ceil(personCount / 2) > 1 ? 's' : ''} minimum)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {[1, 2, 3, 4, 5].map((roomNum) => (
                              <button
                                key={roomNum}
                                onClick={() => handleRoomSelection(roomNum)}
                                disabled={availabilityData.bookedRooms?.includes(roomNum)}
                                className={`
                                  p-3 sm:p-4 rounded-lg border-2 transition-all transform hover:scale-105
                                  ${availabilityData.bookedRooms?.includes(roomNum)
                                    ? 'bg-red-50 border-red-300 text-red-600 cursor-not-allowed opacity-60'
                                    : selectedRooms.includes(roomNum)
                                      ? 'bg-primary border-primary text-white shadow-lg'
                                      : 'bg-background border hover:border-primary hover:shadow-md cursor-pointer'
                                  }
                                `}
                              >
                                <div className="text-center">
                                  <Home className="w-5 h-5 mx-auto mb-1" />
                                  <div className="font-bold text-sm">Room {roomNum}</div>
                                  <div className="text-xs mt-1">
                                    {availabilityData.bookedRooms?.includes(roomNum) ? 'Booked' : '2 beds'}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                          {selectedRooms.length > 0 && (
                            <p className="text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Selected {selectedRooms.length} room{selectedRooms.length > 1 ? 's' : ''}
                              ({selectedRooms.length * 2} beds total)
                            </p>
                          )}
                        </>
                      )}

                      {roomType === 'dome' && (
                        <>
                          <label className="block text-sm font-medium">
                            <Bed className="w-4 h-4 inline mr-2" />
                            Select {personCount} Bed{personCount > 1 ? 's' : ''} in Dome
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((bedNum) => (
                              <button
                                key={bedNum}
                                onClick={() => handleBedSelection(bedNum)}
                                disabled={availabilityData.bookedBeds?.includes(bedNum)}
                                className={`
                                  p-3 sm:p-4 rounded-lg border-2 transition-all transform hover:scale-105
                                  ${availabilityData.bookedBeds?.includes(bedNum)
                                    ? 'bg-red-50 border-red-300 text-red-600 cursor-not-allowed opacity-60'
                                    : selectedBeds.includes(bedNum)
                                      ? 'bg-primary border-primary text-white shadow-lg'
                                      : 'bg-background border hover:border-primary hover:shadow-md cursor-pointer'
                                  }
                                `}
                              >
                                <div className="text-center">
                                  <Bed className="w-5 h-5 mx-auto mb-1" />
                                  <div className="font-bold text-sm">Bed {bedNum}</div>
                                  <div className="text-xs mt-1">
                                    {availabilityData.bookedBeds?.includes(bedNum) ? 'Booked' : 'Available'}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                          {selectedBeds.length > 0 && (
                            <p className="text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Selected {selectedBeds.length} of {personCount} bed{personCount > 1 ? 's' : ''}
                            </p>
                          )}
                        </>
                      )}

                      {errors.roomSelection && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="w-4 h-4">⚠️</span>
                          {errors.roomSelection}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Customer Information */}
              {((roomType === 'room' && selectedRooms.length > 0) ||
                (roomType === 'dome' && selectedBeds.length === personCount)) && (
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
              {customerInfo.name && customerInfo.email && customerInfo.phone &&
                ((roomType === 'room' && selectedRooms.length > 0) ||
                  (roomType === 'dome' && selectedBeds.length === personCount)) && (
                  <Card className="bg-muted/50 border-green-200">
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
                            <span>Persons:</span>
                            <span className="font-medium">{personCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Accommodation:</span>
                            <span className="font-medium">
                              {roomType === 'room'
                                ? `Room${selectedRooms.length > 1 ? 's' : ''} ${selectedRooms.join(', ')}`
                                : `Dome - Bed${selectedBeds.length > 1 ? 's' : ''} ${selectedBeds.join(', ')}`
                              }
                            </span>
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
                          <div className="flex justify-between">
                            <span>Price per person:</span>
                            <span className="font-medium">${selectedPackage.price}</span>
                          </div>
                          <div className="flex justify-between border-t pt-3 text-base font-bold text-green-800">
                            <span>Total:</span>
                            <span>${calculateTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 sticky bottom-0 bg-card border-t -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
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
    </div>
  );
}
