"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Waves,
  Palmtree,
  ChevronDown,
  Play,
  ArrowRight,
  Pause,
  Users,
  Star,
  Car,
  Map,
  Utensils,
  CheckCircle,
  Home,
  Shield,
  Camera,
  Wifi,
  Bath,
  Coffee,
  PlaneTakeoff,
  UtensilsCrossed,
  Compass,
  Globe,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sun,
  Trees,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Crown,
  FireExtinguisher as Fire,
  Sunrise,
  Sunset,
  Mountain,
  TreePine,
  Fish,
  Gamepad2,
  Music,
  Clock,
  Gift,
  CheckCircle2,
  Dumbbell,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Package interface
interface Package {
  _id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
}

// Simplified Hero Section with Full Video Background
const VideoHero = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/heronew.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content in front of video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>
      
    </div>
  );
};

// Video Section Component for About Us and Invite sections
const VideoSection = ({ 
  videoSrc, 
  children, 
  className = "" 
}: { 
  videoSrc: string; 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`relative h-[500px] rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content overlay */}
      {children}
      
      {/* Video controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button 
          onClick={togglePlay} 
          size="icon" 
          variant="outline" 
          className="rounded-full border border-white/30 bg-black/20 backdrop-blur-md hover:bg-black/40"
        >
          {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
        </Button>
      </div>
    </div>
  );
};

// Simplified Testimonial Card
const TestimonialCard = ({ name, location, rating, text }: { 
  name: string, 
  location: string, 
  rating: number, 
  text: string 
}) => (
  <Card className="bg-card border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl h-full">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-blue-200 shadow bg-blue-100 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">{name.charAt(0)}</span>
        </div>
        <div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="text-base">{location}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex mb-4">
        {Array(rating).fill(0).map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-lg">{text}</p>
    </CardContent>
  </Card>
);

// Feature icon helper function
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

// Main Page Component
export default function HomePage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  // Get package image
  const getPackageImage = (index: number) => {
    return "/surfer-blue-wave.jpg";
  };

  // Images for gallery
  const galleryImages = Array(9).fill(0).map((_, i) => i % 2 === 0 ? "/beach.jpg" : "/about.jpg");

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Hero Section with Full Video */}
      <section id="home" className="h-screen relative">
        <VideoHero>
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className=""
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 drop-shadow-lg tracking-tight text-white customtext"
              >
                Arugam Bay
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed text-white/90"
              >
                Sri Lanka's surfing paradise - the iconic surf town
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90 customtext"
              >
                Rupa's Surf Camp
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex justify-center"
              >
                <Button 
                  size="lg"
                  className="text-lg md:text-xl bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-xl hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                >
                  Book Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </VideoHero>

        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-center md:text-left md:col-span-1.6"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold text-primary customtext">Arugam Bay</h3>
                </div>
                <p className="text-sm md:text-base text-black/90">Rich wildlife, deep-rooted Sri Lankan culture and breath-taking scenery, it's more than a surfing description - it's a once-in-a-lifetime experience.</p>
              </motion.div>
              
              <div className="hidden md:flex items-center justify-center md:col-span-0.1">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-6 h-6 text-black hover:text-primary transition-colors cursor-pointer" />
                </button>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-center md:text-right md:col-span-1.6"
              >
                <p className="text-sm md:text-base text-black/90">Join Sri Lanka's best Surf Camp - from beginners to advanced surfers, we've got you covered!</p>
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold text-primary customtext">Rupa's Surf</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>      
      </section>

      {/* About Us Section with Video */}
      <section className="py-10 md:py-16 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Welcome to <span className="text-primary">Rupa&apos;s Surf Camp</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl leading-relaxed">
                  Rupa&apos;s Surf Camp, part of the legendary Rupa&apos;s Hotel, has been a trusted home for surfers since 1978 — making it one of the very first surf stays in Arugam Bay. we&apos;re proud to continue offering a laid-back, welcoming space for everyone chasing waves and good vibes.
                </p>
                <p className="text-xl leading-relaxed">
                  We&apos;re located right in front of Arugam Bay&apos;s Baby Point — one of the best spots for beginners to catch their first waves. Whether you&apos;re just learning or ready to explore more challenging reef breaks, our local certified pro surf instructors are friendly, experienced, and stoked to show you the best waves along Sri Lanka&apos;s beautiful east coast.          
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <VideoSection videoSrc="/heronew.mp4">
                {/* Stats overlay */}
                <div className="absolute -bottom-1 -left-1 bg-white p-4 rounded-xl shadow-xl border border-blue-100 z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-5xl font-bold text-primary">8+</p>
                      <p className="text-black">Years Experience</p>
                    </div>
                    <div>
                      <p className="text-5xl font-bold text-primary">5k+</p>
                      <p className="text-black">Happy Guests</p>
                    </div>
                  </div>
                </div>
              </VideoSection>
            </motion.div>
          </div>
        </div>
      </section>
                        {/* Popular Surf Packages Section */}
                        <section className="py-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-primary/10 relative overflow-hidden">
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-cyan-300/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-blue-300/20 to-primary/20 rounded-full blur-2xl"></div>
                          </div>
                          <div className="container mx-auto px-4 relative z-10">
                            {/* Section Header */}
                            <div className="text-center mb-10">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                              >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                  Our most popular package
                                </h2>
                                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                                  Discover our signature surf package designed for the ultimate wave-riding adventure
                                </p>
                              </motion.div>
                            </div>

                            {/* Package Display */}
                            {loading ? (
                              <div className="text-center py-8">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full mx-auto"
                                ></motion.div>
                              </div>
                            ) : packages.length > 0 ? (
                              <div className="max-w-6xl mx-auto">
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6 }}
                                  className="group"
                                >
                                  <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                      {/* Left side - Image */}
                                      <div className="h-[400px] lg:h-full relative overflow-hidden">
                                        <Image
                                          src={getPackageImage(0)}
                                          alt={packages[0].title}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                          <Badge className="bg-white/90 text-primary px-4 py-2 text-sm font-bold">
                                            Most Popular Choice
                                          </Badge>
                                        </div>
                                      </div>

                                      {/* Right side - Package Details */}
                                      <div className="p-8 lg:p-10">
                                        <div className="flex justify-between items-start mb-6">
                                          <h3 className="text-3xl font-bold text-gray-900">{packages[0].title}</h3>
                                          <div className="bg-primary text-white px-6 py-3 rounded-full font-bold text-2xl shadow-lg">
                                            ${packages[0].price}
                                          </div>
                                        </div>

                                        <div className="space-y-6">
                                          <p className="text-gray-600 text-lg leading-relaxed">{packages[0].description}</p>
                  
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {packages[0].features.map((feature, index) => (
                                              <div key={index} 
                                                className="flex items-center p-4 bg-blue-50/50 rounded-xl border-l-2 border-primary hover:bg-blue-50 transition-colors group-hover:transform group-hover:scale-105 duration-300"
                                              >
                                                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                                                  {getFeatureIcon(feature)}
                                                </div>
                                                <span className="text-gray-700 font-medium">{feature}</span>
                                              </div>
                                            ))}
                                          </div>

                                          <div className="pt-6">
                                            <Link href="/surf">
                                              <Button className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:opacity-90 text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                                                Book Your Adventure Now
                                                <ArrowRight className="w-6 h-6 ml-2" />
                                              </Button>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </motion.div>
                              </div>
                            ) : (
                              <div className="text-center py-10">
                                <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
                                <p className="text-gray-600">We're preparing something special for you</p>
                              </div>
                            )}
                          </div>
                        </section>
      {/* Offerings Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-blue-100/60 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Everything <span className="text-primary">We Provide</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto ">
              From comfortable accommodations to exciting adventures, we have everything you need for an amazing stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Rooms & Rates",
                description: "Crazy, simple luxury rooms just 50m from the beach - with sea views right in front of the bay.",
                icon: <Users className="h-10 w-10 text-blue-500" />,
                image: "/about.jpg",
                link: "/rooms",
              },
              {
                title: "Surf Camp Packs",
                description: "lessons and guiding for all levels with top local pros at the best East Coast surf spo.",
                icon: <Waves className="h-10 w-10 text-red-500" />,
                image: "/beach.jpg",
                link: "/surf",
              },
              {
                title: "Safari & Tours",
                description: "Explore national parks, scenic lagoons, and the hidden beauty of Arugam Bay with us.",
                icon: <Palmtree className="h-10 w-10 text-green-500" />,
                image: "/about.jpg",
                link: "/safari",
              },
              {
                title: "Restaurant & Local buffet",
                description: "Authentic Sri lankan food, beachside vibes, and all-you-can-eat buffet with live music.",
                icon: <Utensils className="h-10 w-10 text-yellow-500" />,
                image: "/beach.jpg",
                link: "/restaurant",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border"
              >
                <div className="h-60 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold drop-shadow">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-15rem)]">
                  <div className="mb-4 p-3 rounded-lg w-fit bg-blue-50 shadow-md">{item.icon}</div>
                  <p className="mb-6 flex-grow">{item.description}</p>
                  <Link href={item.link}>
                    <Button
                      className=" hover:bg-primary transition-colors duration-300 rounded-full px-6 py-3 w-full shadow-md"
                    >
                      Explore <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-blue-100/60 to-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Why Choose <span className="text-primary">Arugam bay?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Waves className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">Waves for Everyone</h3>
                  <h3 className="text-sm">Whether you&apos;re just starting out or chasing barrels, Arugam Bay has surf spots for all levels.</h3>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Globe className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">Globally Recognized</h3>
                  <h3 className="text-sm">One of the top surf destinations in the world, loved by surfers from every corner of the globe.</h3>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Compass className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">Surf Variety</h3>
                  <h3 className="text-sm">Multiple breaks all within easy reach - from mellow points to punchy reef waves.</h3>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Trees className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">Wild Nature All Around</h3>
                  <h3 className="text-sm">From elephants to lagoons, the surrounding wildlife is like nowhere else in Sri Lanka.</h3>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Palmtree className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">More Than Just Surf</h3>
                  <h3 className="text-sm">Explore jungles, culture-rich villages, stunning viewpoints, parties, music & good vibes.</h3>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Sun className="h-12 w-12 text-primary mb-3" />
                  <h3 className="font-extrabold">East Coast Vibes</h3>
                  <h3 className="text-sm">Warm, welcoming, and full of soul - the east coast has its own special rhythm.</h3>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 bg-primary p-10 rounded-3xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                Why Learn to Surf with <span className="text-primary">Rupa's Surf Camp</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Shield className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">Closest to the surf</p>
                    <p className="text-sm">We&apos;re right in front of the AArugam Bay&apos;s main surf point.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Users className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">Trusted since 1978</p>
                    <p className="text-sm">One of the original surf stays in town, with a legacy of happy surfers from around the world.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Camera className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">Modern & Affordable rooms</p>
                    <p className="text-sm">Clean, specious, sea-view cozy simple luxurious rooms with all the comfort you need after a surf sessions. </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <ShieldCheck className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">Legendary Food</p>
                    <p className="text-sm">All-day Sri Lankan buffet, a buzzing café, and plenty of tasty international options.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <GraduationCap className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">Certified surf instructors</p>
                    <p className="text-sm">Young passionate local pros ready to get you riding waves safely and confidenty. </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-primary/10 rounded-lg transition-all">
                  <Heart className="h-10 w-10 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-lg font-extrabold">More than surf</p>
                    <p className="text-sm">Live music, wildlife safaries, lagoon tours, camping and chilled-out vibes every day.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Beginners Surf & Stay Section */}
      <section className="py-10 md:py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:scale-105 transition-transform">
              Beginners <span className="text-primary animate-pulse">Surf & Stay</span> Packages
            </h2>
            <p className="text-xl max-w-3xl mx-auto hover:text-primary transition-colors">
              Start your surfing journey with our comprehensive packages designed for beginners
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Left Side - Main Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className=""
            >
              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Waves className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">Surf Guiding</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Users className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">Surf theory class</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Camera className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">Video analysis & photos</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <UtensilsCrossed className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">Unlimited local buffet</h3>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className=""
            >
              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Coffee className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">breakfasts</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Bath className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">ice bath</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Wifi className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">internet</h3>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all transform hover:scale-105 cursor-pointer">
                <Car className="h-12 w-12 text-primary hover:animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold m-2 uppercase hover:text-primary">Transportation & surf equipments</h3>
                </div>
              </div>
            </motion.div>
            {/* Right Side - Additional Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className=""
            >
              <div className="p-8 bg-primary/5 rounded-3xl hover:bg-primary/10 transition-all">
                <h4 className="text-2xl font-semibold mb-6 text-primary">Extra Options:</h4>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-2 hover:translate-x-2 transition-transform cursor-pointer">
                    <span className="text-primary">•</span>
                    <span>Safari in national park</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:translate-x-2 transition-transform cursor-pointer">
                    <span className="text-primary">•</span>
                    <span>Sunset BBQ</span>
                  </li>
                </ul>
              </div>
              <Link href="/surf">
                <Button className="w-full mt-8 hover:bg-primary rounded-full px-8 py-6 text-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  Book Package Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
