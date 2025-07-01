"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue } from "framer-motion";
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
  X,
  LucideGlobe,
  LucideMountainSnow,
  LucideSun,
  LucideWaves,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

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

// Package interface
interface Package {
  _id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
}

// Scroll-based Floating Image Component
const FloatingScrollImage = ({ 
  src, 
  alt, 
  className = "", 
  scrollRange = [0, 1], 
  yRange = [0, -100],
  xRange = [0, 0],
  rotateRange = [0, 0],
  scaleRange = [1, 1],
  opacityRange = [0.7, 1]
}: {
  src: string;
  alt: string;
  className?: string;
  scrollRange?: [number, number];
  yRange?: [number, number];
  xRange?: [number, number];
  rotateRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, scrollRange, yRange);
  const x = useTransform(scrollY, scrollRange, xRange);
  const rotate = useTransform(scrollY, scrollRange, rotateRange);
  const scale = useTransform(scrollY, scrollRange, scaleRange);
  const opacity = useTransform(scrollY, scrollRange, opacityRange);

  return (
    <motion.div
      style={{ y, x, rotate, scale, opacity }}
      className={`absolute pointer-events-none select-none ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="w-full h-full object-contain drop-shadow-2xl"
        priority
      />
    </motion.div>
  );
};

// Image Slider Component
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Image data with titles and descriptions
  const images = [
    {
      src: "/images/image1.jpg",
      title: "Luxurious Room Interior",
      description: "Modern, comfortable rooms with premium amenities and stunning ocean views"
    },
    {
      src: "/images/image2.jpg",
      title: "Freedom Outside",
      description: "Explore the beautiful surroundings and enjoy outdoor activities at your leisure"
    },
    {
      src: "/images/image3.jpg",
      title: "Quality Room Equipment",
      description: "Top-grade amenities, furniture, and comfort essentials provided in all rooms"
    },
    {
      src: "/images/image4.jpg",
      title: "Best Bathware Facilities",
      description: "Modern bathrooms with premium fixtures, hot water, and luxurious amenities for your comfort"
    },
    {
      src: "/images/image5.jpg",
      title: "Calm Location",
      description: "Situated in a peaceful and tranquil environment perfect for relaxation"
    },
    {
      src: "/images/image6.jpg",
      title: "Professional Instructors",
      description: "ISA certified surf coaches with years of experience in teaching all skill levels"
    },
    {
      src: "/images/image7.jpg",
      title: "Cultural Experience",
      description: "Learn about local surf culture and the rich heritage of Arugam Bay"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main Slider Container */}
      <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;
            const isVisible = isActive || isPrev || isNext;

            if (!isVisible) return null;

            return (
              <motion.div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out cursor-pointer ${
                  isActive 
                    ? 'z-30 scale-100 opacity-100' 
                    : isPrev 
                    ? 'z-20 scale-[0.6] sm:scale-[0.65] md:scale-75 opacity-40 -translate-x-16 sm:-translate-x-24 md:-translate-x-48 lg:-translate-x-64' 
                    : isNext 
                    ? 'z-20 scale-[0.6] sm:scale-[0.65] md:scale-75 opacity-40 translate-x-16 sm:translate-x-24 md:translate-x-48 lg:translate-x-64'
                    : 'z-10 scale-50 opacity-0'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isActive ? 1 : isVisible ? 0.4 : 0,
                  scale: isActive ? 1 : isVisible ? 0.75 : 0.5,
                  x: isNext ? 250 : isPrev ? -250 : 0
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={() => !isActive && goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl group ${
                  isActive 
                    ? 'w-[280px] h-[180px] sm:w-[320px] sm:h-[220px] md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[400px] xl:w-[700px] xl:h-[450px]' 
                    : 'w-[200px] h-[120px] sm:w-[250px] sm:h-[160px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[400px]'
                }`}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index < 3}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content Overlay - Only show on active image */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white"
                    >
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                        {image.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-200 drop-shadow line-clamp-2 md:line-clamp-none">
                        {image.description}
                      </p>
                    </motion.div>
                  )}
                  
                  {/* Hover Effect for Non-Active Images */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3">
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40">
          <Button
            onClick={prevSlide}
            size="icon"
            variant="outline"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Button>
        </div>
        
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40">
          <Button
            onClick={nextSlide}
            size="icon"
            variant="outline"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-40">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


// Enhanced Video Hero Section with Floating Images
const VideoHero = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
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
      
      {/* Floating Surfboard - Large and Prominent */}
      <FloatingScrollImage
        src="/images/surfboard.png"
        alt="Surfboard"
        className="top-10 sm:top-20 right-4 sm:right-10 lg:right-20 w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 h-24 sm:h-32 md:h-48 lg:h-64 xl:h-80 z-50"
        scrollRange={[0, 1000]}
        yRange={[0, -200]}
        rotateRange={[0, 45]}
        scaleRange={[1, 1.2]}
        opacityRange={[0.8, 1]}
      />
      
      {/* Floating Leaf 1 - Top Left */}
      <FloatingScrollImage
        src="/images/leaf1.png"
        alt="Leaf 1"
        className="top-4 sm:top-8 left-4 sm:left-8 lg:left-16 w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-16 sm:h-24 md:h-32 lg:h-40 xl:h-48 z-50"
        scrollRange={[0, 800]}
        yRange={[0, -100]}
        xRange={[0, 50]}
        rotateRange={[0, -30]}
        scaleRange={[1, 1.1]}
        opacityRange={[0.7, 1]}
      />
      
      {/* Content in front of video */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
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
    <div className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ${className}`}>
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

const highlights = [
  {
    icon: <LucideWaves className="w-20 h-20 text-white" />,
    title: "Waves for all",
    description:
      "Whether you're just starting out your surfing journey or chasing barrels, Arugam Bay has surf spots for all levels.",
  },
  {
    icon: <LucideSun className="w-20 h-20 text-white" />,
    title: "More Than Just Surf",
    description:
      "With culture-rich villages, stunning view points, parties & music – the vibe will make you want to stay forever.",
  },
  {
    icon: <LucideMountainSnow className="w-20 h-20 text-white" />,
    title: "Surrounded by Wildlife",
    description:
      "From elephants and monkeys to vibrant birdlife and even leopards, the area teams with natural wonders.",
  },
  {
    icon: <LucideGlobe className="w-20 h-20 text-white" />,
    title: "Globally Recognized",
    description:
      "One of the top surf destinations in the world, loved by surfers from every corner of the globe.",
  },
]

// Simplified Testimonial Card with Enhanced Animation
const TestimonialCard = ({ name, location, rating, text }: { 
  name: string, 
  location: string, 
  rating: number, 
  text: string 
}) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="bg-card border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl h-full overflow-hidden">
      <CardHeader className="pb-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="h-14 w-14 rounded-full overflow-hidden border-2 border-blue-200 shadow bg-blue-100 flex items-center justify-center"
          >
            <span className="text-lg font-bold text-primary">{name.charAt(0)}</span>
          </motion.div>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="text-base">{location}</CardDescription>
          </div>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex mb-4"
        >
          {Array(rating).fill(0).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
            >
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg"
        >
          {text}
        </motion.p>
      </CardContent>
    </Card>
  </motion.div>
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
  const { scrollY } = useScroll();

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

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background relative">
      {/* Hero Section with Full Video and Floating Images */}
      <section id="home" className="h-screen relative overflow-hidden">
        <VideoHero>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-4xl mb-16 max-w-2xl mx-auto leading-relaxed text-white/90 customtext"
              >
                Rupa's Surf Camp
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 drop-shadow-lg tracking-tight text-white customtext"
              >
                Arugam Bay
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed text-white/90"
              >
                Sri Lanka's surfing paradise - the iconic surf town
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    className="text-lg md:text-xl bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-xl hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">Book Now</span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </VideoHero>

        {/* Bottom Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-30"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="flex items-center gap-4 text-center md:text-left md:col-span-1.6"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold text-primary customtext">Arugam Bay</h3>
                </div>
                <p className="text-sm md:text-base text-black/90">Rich wildlife, deep-rooted Sri Lankan culture and breath-taking scenery, it's more than a surfing description - it's a once-in-a-lifetime experience.</p>
              </motion.div>
              
              <div className="hidden md:flex items-center justify-center md:col-span-0.1">
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-black hover:text-primary transition-colors cursor-pointer" />
                </motion.button>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="flex items-center gap-4 text-center md:text-right md:col-span-1.6"
              >
                <p className="text-sm md:text-base text-black/90">Join Sri Lanka's best Surf Camp - from beginners to advanced surfers, we've got you covered!</p>
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold text-primary customtext">Rupa's Surf</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>      
      </section>

      {/* About Us Section with Video and Floating Leaf */}
      <section className="py-16 md:px-5 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-8 leading-tight customtext"
              >
                Welcome to <span className="text-primary">Rupa&apos;s Surf Camp</span>
              </motion.h2>
              <div className="space-y-6 text-justify">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl leading-relaxed"
                >
                  Rupa&apos;s Surf Camp, part of the legendary Rupa&apos;s Hotel, has been a trusted home for surfers since 1978 — making it one of the very first surf stays in Arugam Bay. we&apos;re proud to continue offering a laid-back, welcoming space for everyone chasing waves and good vibes.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl leading-relaxed"
                >
                  We&apos;re located right in front of Arugam Bay&apos;s Baby Point — one of the best spots for beginners to catch their first waves. Whether you&apos;re just learning or ready to explore more challenging reef breaks, our local certified pro surf instructors are friendly, experienced, and stoked to show you the best waves along Sri Lanka&apos;s beautiful east coast.          
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative w-full h-[500px]">
                
              <VideoSection videoSrc="/heronew.mp4">
                <div>
                </div>
              </VideoSection>
                <div className="absolute top-1 -left-20 w-1/2 h-1/2">
                  <FloatingScrollImage
                    src="/images/flower1.png"
                    alt="Leaf 2"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special About Arugam Bay Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#04444C] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-20 text-white overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto relative z-20"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-4xl font-semibold leading-tight customtext"
          >
            What&apos;s so special about
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-4xl font-bold text-cyan-300 mt-2 customtext"
          >
            Arugambay?
          </motion.h2>
        </motion.div>
      </motion.section>

      {/* Highlights Section with Floating Surfboard */}
      <section className="relative bg-[#19818f] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid min-h-[24rem] sm:min-h-[28rem] md:h-96 grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto relative z-10"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-full"
            >
              <Card className="bg-transparent border-none hover:shadow-xl transition-all text-white h-full group">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 h-full">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="p-2 sm:p-3 rounded-full shrink-0 group-hover:bg-white/10 transition-all duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="text-xl sm:text-2xl font-bold mb-1"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                      className="text-base sm:text-lg text-white/90 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Learn to Surf Section with Image Slider and Floating Leaf */}
      <section className="py-16 mt-10 bg-background overflow-hidden relative">
        {/* Floating Leaf 1 - Different Position */}
        <FloatingScrollImage
          src="/images/leaf1.png"
          alt="Leaf 1"
          className="top-20 left-4 sm:left-10 lg:left-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-96 h-24 sm:h-40 md:h-56 lg:h-72 xl:h-96 z-10"
          scrollRange={[1200, 2200]}
          yRange={[0, -200]}
          xRange={[0, 100]}
          rotateRange={[0, -90]}
          scaleRange={[1, 1.4]}
          opacityRange={[0.5, 1]}
        />

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl md:text-4xl font-bold leading-tight customtext mb-6"
            >
              Why learn to surf with <span className="text-primary">Rupa's Surf Camp?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Experience the best surfing education with our professional instructors and perfect conditions
            </motion.p>
          </motion.div>

          <ImageSlider />
        </div>
      </section>
      
      {/* All Awesome Stuff Section with Enhanced Videos */}
      <section className="py-16 px-6 md:px-20 bg-background relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-20"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold customtext"
          >
            All the Awesome Stuff at <span className="text-primary">Rupa's</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl mt-2"
          >
            Whether you're here to ride waves, explore wild nature, or just vibe with the rhythm of the coast — we've got it all waiting for you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-auto max-w-7xl relative z-20"
        >
          {[
            { src: "/heronew.mp4", title: "Perfect Waves", description: "Experience world-class waves perfect for both beginners and pros" },
            { src: "/heronew.mp4", title: "Sunset Surfing", description: "Catch the perfect wave while the sun sets in paradise" },
            { src: "/heronew.mp4", title: "Pro Techniques", description: "Learn from the best surfers in Arugambay" },
            { src: "/heronew.mp4", title: "Beach Vibes", description: "Immerse yourself in the laid-back surfing culture" }
          ].map((video, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="relative group rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <video
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
                loop
                autoPlay
                muted
                playsInline
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-0 left-0 right-0 p-4 text-white"
                >
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-200">{video.description}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Most Popular Package Section with Floating Elements */}
      <section className="py-16 md:px-5 bg-white relative overflow-hidden">
        {/* Floating Leaf 2 - Different Position */}
        <FloatingScrollImage
          src="/images/flower1.png"
          alt="Leaf 2"
          className="top-24 w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64 h-16 sm:h-24 md:h-32 lg:h-48 xl:h-64 z-10"
          scrollRange={[2200, 3200]}
          yRange={[0, -120]}
          xRange={[0, 80]}
          rotateRange={[0, 45]}
          scaleRange={[1, 1.2]}
          opacityRange={[0.7, 1]}
        />

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
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300">
                  Starting from $599
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300">
                  Explore packages
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
                    <div className="p-6">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1  }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                        className="text-6xl font-bold text-primary mb-2 flex flex-row items-center"
                      >
                        {item.number && <span>{item.number} <span className="font-normal ml-4"> x</span></span>}
                        <div className="relative h-20 w-20 ml-5">
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
                        className="text-gray-600 text-sm"
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
      
      {/* Offerings Section with Floating Leaf */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-blue-100/60 overflow-hidden relative">
        {/* Floating Leaf 1 - Top Right */}
        <FloatingScrollImage
          src="/images/leaf1.png"
          alt="Leaf 1"
          className="top-10 left-4 sm:right-10 lg:right-20 w-32 sm:w-48 md:w-64 lg:w-96 xl:w-[32rem] h-32 sm:h-48 md:h-64 lg:h-96 xl:h-[32rem] z-50 inset-0"
          scrollRange={[2000, 6000]}
          yRange={[0, -240]}
          xRange={[0, -160]}
          rotateRange={[0, -90]}
          scaleRange={[1, 1.5]}
          opacityRange={[0.6, 1]}
        />

        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 max-w-4xl mx-auto leading-tight customtext"
            >
              Everything <span className="text-primary">We Provide</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl max-w-3xl mx-auto"
            >
              From comfortable accommodations to exciting adventures, we have everything you need for an amazing stay.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
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
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border"
              >
                <div className="h-60 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="absolute bottom-4 left-4 text-white"
                  >
                    <h3 className="text-2xl font-bold drop-shadow">{item.title}</h3>
                  </motion.div>
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-15rem)]">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="mb-4 p-3 rounded-lg w-fit bg-blue-50 shadow-md"
                  >
                    {item.icon}
                  </motion.div>
                  <p className="mb-6 flex-grow">{item.description}</p>
                  <Link href={item.link}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="hover:bg-primary transition-colors duration-300 rounded-full px-6 py-3 w-full shadow-md"
                      >
                        Explore <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section with Floating Surfboard */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-blue-100/60 to-transparent overflow-hidden relative">
    
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-8 leading-tight customtext"
              >
                Why Choose <span className="text-primary">Arugam bay?</span>
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  {
                    icon: <Waves className="h-12 w-12 text-primary mb-3" />,
                    title: "Waves for Everyone",
                    description: "Whether you're just starting out or chasing barrels, Arugam Bay has surf spots for all levels."
                  },
                  {
                    icon: <Globe className="h-12 w-12 text-primary mb-3" />,
                    title: "Globally Recognized",
                    description: "One of the top surf destinations in the world, loved by surfers from every corner of the globe."
                  },
                  {
                    icon: <Compass className="h-12 w-12 text-primary mb-3" />,
                    title: "Surf Variety",
                    description: "Multiple breaks all within easy reach - from mellow points to punchy reef waves."
                  },
                  {
                    icon: <Trees className="h-12 w-12 text-primary mb-3" />,
                    title: "Wild Nature All Around",
                    description: "From elephants to lagoons, the surrounding wildlife is like nowhere else in Sri Lanka."
                  },
                  {
                    icon: <Palmtree className="h-12 w-12 text-primary mb-3" />,
                    title: "More Than Just Surf",
                    description: "Explore jungles, culture-rich villages, stunning viewpoints, parties, music & good vibes."
                  },
                  {
                    icon: <Sun className="h-12 w-12 text-primary mb-3" />,
                    title: "East Coast Vibes",
                    description: "Warm, welcoming, and full of soul - the east coast has its own special rhythm."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center text-center p-4 hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-extrabold mb-2">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 bg-primary p-10 rounded-3xl text-white"
            >
              <motion.h2 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold mb-8 leading-tight customtext"
              >
                Why Learn to Surf with <span className="text-white">Rupa's Surf Camp</span>
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  {
                    icon: <Shield className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "Closest to the surf",
                    description: "We're right in front of the Arugam Bay's main surf point."
                  },
                  {
                    icon: <Users className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "Trusted since 1978",
                    description: "One of the original surf stays in town, with a legacy of happy surfers from around the world."
                  },
                  {
                    icon: <Camera className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "Modern & Affordable rooms",
                    description: "Clean, spacious, sea-view cozy simple luxurious rooms with all the comfort you need after a surf session."
                  },
                  {
                    icon: <ShieldCheck className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "Legendary Food",
                    description: "All-day Sri Lankan buffet, a buzzing café, and plenty of tasty international options."
                  },
                  {
                    icon: <GraduationCap className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "Certified surf instructors",
                    description: "Young passionate local pros ready to get you riding waves safely and confidently."
                  },
                  {
                    icon: <Heart className="h-10 w-10 flex-shrink-0 text-white" />,
                    title: "More than surf",
                    description: "Live music, wildlife safaris, lagoon tours, camping and chilled-out vibes every day."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-4 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex flex-col">
                      <p className="text-lg font-extrabold">{item.title}</p>
                      <p className="text-sm text-white/90">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Beginners Surf & Stay Section with Final Floating Elements */}
      <section className="py-10 md:py-16 bg-background overflow-hidden relative">
        {/* Final Floating Leaf 2 - Bottom Left */}
        <FloatingScrollImage
          src="/images/leaf2.png"
          alt="Leaf 2"
          className="bottom-10 left-4 sm:left-10 lg:left-20 w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 h-24 sm:h-32 md:h-48 lg:h-64 xl:h-80 z-10"
          scrollRange={[4600, 5600]}
          yRange={[0, 150]}
          xRange={[0, 100]}
          rotateRange={[0, 75]}
          scaleRange={[1, 1.4]}
          opacityRange={[0.5, 1]}
        />

        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="text-3xl md:text-4xl font-bold mb-6 transition-transform customtext"
            >
              Beginners <span className="text-primary animate-pulse">Surf & Stay</span> Packages
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl max-w-3xl mx-auto hover:text-primary transition-colors"
            >
              Start your surfing journey with our comprehensive packages designed for beginners
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Left Side - Main Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className=""
            >
              {[
                {
                  icon: <Waves className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "Surf Guiding"
                },
                {
                  icon: <Users className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "Surf theory class"
                },
                {
                  icon: <Camera className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "Video analysis & photos"
                },
                {
                  icon: <UtensilsCrossed className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "Unlimited local buffet"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold m-2 uppercase hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=""
            >
              {[
                {
                  icon: <Coffee className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "breakfasts"
                },
                {
                  icon: <Bath className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "ice bath"
                },
                {
                  icon: <Wifi className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "internet"
                },
                {
                  icon: <Car className="h-12 w-12 text-primary hover:animate-bounce" />,
                  title: "Transportation & surf equipments"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-start space-x-6 p-6 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold m-2 uppercase hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side - Additional Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=""
            >
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 bg-primary/5 rounded-3xl hover:bg-primary/10 transition-all"
              >
                <h4 className="text-2xl font-semibold mb-6 text-primary">Extra Options:</h4>
                <ul className="space-y-4">
                  {[
                    "Safari in national park",
                    "Sunset BBQ"
                  ].map((option, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-2 transition-transform cursor-pointer"
                    >
                      <motion.span 
                        whileHover={{ scale: 1.5 }}
                        className="text-primary"
                      >
                        •
                      </motion.span>
                      <span>{option}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <Link href="/surf">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full mt-8 hover:bg-primary rounded-full px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                    Book Package Now
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}


