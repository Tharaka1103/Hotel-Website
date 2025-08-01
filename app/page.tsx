"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
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

// Lazy load non-critical components for better performance
const InteractiveMap = dynamic(() => import('./Components/InteractiveMap'), {
  loading: () => (
    <div className="flex justify-center items-center h-64 bg-gray-100 rounded-3xl animate-pulse">
      <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
    </div>
  ),
  ssr: false
});

// Create a loading fallback component
const SectionLoader = ({ height = "h-96" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 animate-pulse rounded-3xl flex items-center justify-center`}>
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Optimized Animation variants with will-change for better performance
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    y: 0,
    willChange: 'auto'
  },
  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1] // Custom easing for smoother animation
  }
};

const fadeInDown = {
  initial: {
    opacity: 0,
    y: -60,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    y: 0,
    willChange: 'auto'
  },
  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1]
  }
};

const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -60,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    x: 0,
    willChange: 'auto'
  },
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  }
};

const fadeInRight = {
  initial: {
    opacity: 0,
    x: 60,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    x: 0,
    willChange: 'auto'
  },
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  }
};

const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    scale: 1,
    willChange: 'auto'
  },
  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1]
  }
};

const slideInBottom = {
  initial: {
    opacity: 0,
    y: 60,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    y: 0,
    willChange: 'auto'
  },
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
    willChange: 'transform, opacity'
  },
  animate: {
    opacity: 1,
    y: 0,
    willChange: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
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
      style={{
        y,
        x,
        rotate,
        scale,
        opacity,
        willChange: 'transform, opacity'
      }}
      className={`absolute pointer-events-none select-none ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="w-full h-full object-contain drop-shadow-2xl"
        priority={false}
        loading="lazy"
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLidCPgPY7h1/qQYWtWxdLGmJE3FzWGhf9kPH0nZZkBL4k/wAVkCBmknnRf/Z"
      />
    </motion.div>
  );
};
// Image Slider Component
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Image data with titles and descriptions
  const images = [
    {
      src: "/images/image1.jpg",
      title: "Trusted Since 1978",
      description: "One of the original surf stays in Arugam Bay, with a legacy of happy surfers from around the world. Decades of experience you can count on."
    },
    {
      src: "/images/image2.jpg",
      title: "Central Location",
      description: "Perfectly situated in the heart of Arugam Bay — just steps from the beach, surf points, cafes, and shops. Everything you need, all in one place."
    },
    {
      src: "/images/image4.jpg",
      title: "Modern & Affordable Rooms",
      description: "Comfortable, stylish accommodations with modern amenities — ideal for relaxing after a day in the waves."
    },
    {
      src: "/images/image5.jpg",
      title: "Certified ISA Instructors",
      description: "Learn from experienced, internationally certified ISA surf instructors committed to safe, professional, and fun surf lessons."
    },
    {
      src: "/images/image6.jpg",
      title: "Best Café in Town – Meori Café",
      description: "Relax at Meori Café, loved for fresh dishes, great coffee, and a laid-back surf vibe. Plus, browse their small concept store with curated coastal-inspired items."
    },
    {
      src: "/images/image7.jpg",
      title: "Shady Garden & Spacious Grounds",
      description: "Rupa’s Surf Camp sits on spacious land with natural shade and a peaceful garden atmosphere — perfect for unwinding between surf sessions."
    },
    {
      src: "/images/image6.jpg",
      title: "Buffet Arugam Bay – By Rupa’s",
      description: "Enjoy our famous Sri Lankan rice & curry buffet with fresh daily dishes, seafood specials, and a friendly, social setting right by the beach."
    },
    {
      src: "/images/image7.jpg",
      title: "East Coast Safaris & Adventures",
      description: "Join guided safaris to nearby national parks, spot elephants and wildlife, explore scenic viewpoints, and end your day with sunset BBQs by the bay."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging && !isTransitioning) {
      const interval = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isDragging, isTransitioning, images.length]);

  const handleSlideChange = (newIndex: number | ((prev: number) => number)) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      handleSlideChange(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  // Enhanced touch handlers for smooth swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isTransitioning) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    setTouchEnd(currentTouch);
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) {
      setIsDragging(false);
      setDragOffset(0);
      setTimeout(() => setIsAutoPlaying(true), 1000);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  // Mouse events for desktop drag support
  const onMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || !isDragging || isTransitioning) return;

    const diff = touchStart - e.clientX;
    setTouchEnd(e.clientX);
    setDragOffset(diff);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd || isTransitioning) {
      setIsDragging(false);
      setDragOffset(0);
      setTimeout(() => setIsAutoPlaying(true), 1000);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  const getPrevIndex = () => (currentIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (currentIndex + 1) % images.length;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Main Slider Container */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseEnter={() => !isDragging && setIsAutoPlaying(false)}
        onMouseOut={() => !isDragging && setIsAutoPlaying(true)}
      >
        <div className="flex items-center justify-center relative">
          {/* Previous Image - Left Side */}
          <div
            className="hidden sm:block absolute left-0 sm:left-4 md:left-8 lg:left-16 z-10 cursor-pointer select-none"
            onClick={prevSlide}
          >
            <div className="relative w-[80px] h-[120px] sm:w-[100px] sm:h-[150px] md:w-[200px] md:h-[280px] lg:w-[250px] lg:h-[350px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl opacity-85 hover:opacity-95 transition-opacity duration-300">
              <Image
                src={images[getPrevIndex()].src}
                alt={images[getPrevIndex()].title}
                fill
                className="object-cover"
                draggable={false}
                loading="lazy"
                quality={60}
                sizes="(max-width: 768px) 100px, (max-width: 1024px) 200px, 250px"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* Current Image - Center */}
          <div className="relative z-20 w-full sm:w-auto">
            <div
              className="relative w-full h-[350px] sm:w-[240px] sm:h-[180px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[375px] xl:w-[600px] xl:h-[450px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{
                transform: isDragging
                  ? `translateX(${-dragOffset * 0.3}px) scale(0.98) rotateY(${dragOffset * 0.02}deg)`
                  : isTransitioning
                    ? 'translateX(0px) scale(1.02) rotateY(0deg)'
                    : 'translateX(0px) scale(1) rotateY(0deg)',
                transition: isDragging
                  ? 'transform 0.1s ease-out'
                  : isTransitioning
                    ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out'
                    : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isDragging ? 0.9 : isTransitioning ? 0.95 : 1,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                draggable={false}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 240px, (max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
                style={{
                  transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

              {/* Title Overlay - Top Center */}
              <div
                className="absolute top-0 left-0 right-0 p-2 sm:p-3 md:p-6 lg:p-8 text-white text-center"
                style={{
                  opacity: isDragging ? 0.7 : isTransitioning ? 0.9 : 1,
                  transform: isTransitioning ? 'translateY(-10px)' : 'translateY(0px)',
                  transition: 'opacity 0.3s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold drop-shadow-lg mb-1 sm:mb-2 bg-primary rounded-lg sm:rounded-2xl md:rounded-3xl px-2 sm:px-3 md:px-5 py-1 sm:py-2 inline-block tanHeading">
                  {images[currentIndex].title}
                </h3>
              </div>

              {/* Description Overlay - Bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-6 lg:p-8 text-white"
              >
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white drop-shadow leading-relaxed text-center ">
                  {images[currentIndex].description}
                </p>
              </div>

            </div>
          </div>

          {/* Next Image - Right Side */}
          <div
            className="hidden sm:block absolute right-0 sm:right-4 md:right-8 lg:right-16 z-10 cursor-pointer select-none"
            onClick={nextSlide}
          >
            <div className="relative w-[80px] h-[120px] sm:w-[100px] sm:h-[150px] md:w-[200px] md:h-[280px] lg:w-[250px] lg:h-[350px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl opacity-85 hover:opacity-95 transition-opacity duration-300">
              <Image
                src={images[getNextIndex()].src}
                alt={images[getNextIndex()].title}
                fill
                className="object-cover"
                draggable={false}
                loading="lazy"
                quality={60}
                sizes="(max-width: 768px) 100px, (max-width: 1024px) 200px, 250px"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Desktop Only */}
        <div className="hidden md:block">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
            <Button
              onClick={prevSlide}
              size="icon"
              variant="outline"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
            <Button
              onClick={nextSlide}
              size="icon"
              variant="outline"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
          </div>
        </div>

      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-500 rounded-full ${index === currentIndex
              ? 'w-10 h-4 bg-primary shadow-lg transform scale-110'
              : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 hover:scale-105'
              }`}
            style={{
              transform: index === currentIndex && isTransitioning ? 'scale(1.2)' : undefined,
            }}
          />
        ))}
      </div>

      {/* Mobile Swipe Indicator - Enhanced */}
      <div className="md:hidden text-center mt-4">
        <div className="flex items-center justify-center gap-3 bg-gray-50/80 backdrop-blur-sm rounded-full px-4 py-2 mx-auto w-fit">
          <div className="flex items-center gap-1 text-text">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Swipe</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-text">Tap sides to navigate</span>
        </div>
      </div>
    </div>
  );
};


// Optimized Video Hero Section with lazy loading and fallback
const VideoHero = ({ children }: { children: React.ReactNode }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
    <div className="relative min-h-screen w-full overflow-hidden">

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        onCanPlay={() => setIsVideoLoaded(true)}
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/videos/hero-new-bg.webm" type="video/webm" />
        <source src="/videos/hero-new-bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50" />

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
    <div className={`relative min-h-screen rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
    icon: <Image src="/icons/wavesnew.png" alt="Waves" width={100} height={100} quality={75} />,
    title: "Waves for all",
    description:
      "Whether you're just starting out your surfing journey or chasing barrels, Arugam Bay has surf spots for all levels.",
  },
  {
    icon: <Image src="/icons/cave.png" alt="Sun" width={100} height={100} quality={75} />,
    title: "More Than Just Surf",
    description:
      "With culture-rich villages, stunning view points, parties & music – the vibe will make you want to stay forever.",
  },
  {
    icon: <Image src="/icons/zoo.png" alt="Mountain" width={100} height={100} quality={75} />,
    title: "Surrounded by Wildlife",
    description:
      "From elephants and monkeys to vibrant birdlife and even leopards, the area teems with natural wonders. Just a short drive away, Kumana National Park offers some of Sri Lanka's best wildlife safaris.",
  },
  {
    icon: <Image src="/icons/discovery.png" alt="Globe" width={100} height={100} quality={75} />,
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
    whileHover={{
      y: -8,
      scale: 1.01,
      willChange: 'transform'
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8
    }}
    style={{ willChange: 'transform' }}
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
{/* Magical Arugambay Image Slider Component */ }
const MagicalArugambaySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Image data - Replace these paths with your actual images
  const images = [
    {
      src: "/images/lepord.jpg", // Replace with actual elephant image
      title: "Wild Elephants",
      description: "Majestic elephants roaming freely in their natural habitat"
    },
    {
      src: "/images/lepord.jpg", // Replace with actual lagoon image
      title: "Glowing Lagoons",
      description: "Spectacular lagoons that shimmer golden during sunset"
    },
    {
      src: "/images/lepord.jpg", // Replace with actual jungle image
      title: "Dense Jungles",
      description: "Thick tropical jungles teeming with diverse wildlife"
    },
    {
      src: "/images/lepord.jpg", // Replace with actual safari image
      title: "Safari Adventures",
      description: "Thrilling safari rides through untamed wilderness"
    },
    {
      src: "/images/lepord.jpg", // Replace with actual sunset image
      title: "Breathtaking Sunsets",
      description: "Spectacular sunset views that paint the sky in vivid colors"
    },
    {
      src: "/images/lepord.jpg", // Replace with actual wildlife image
      title: "Rich Wildlife",
      description: "Home to leopards, peacocks, and countless exotic species"
    }
  ];

  // Auto-play functionality with 2-second intervals
  useEffect(() => {
    if (isAutoPlaying && !isTransitioning) {
      const interval = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % images.length);
      }, 2000); // 2 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isTransitioning, images.length]);

  const handleSlideChange = (newIndex: number | ((prev: number) => number)) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const goToSlide = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      handleSlideChange(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 4000);
    }
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isTransitioning) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) {
      setTimeout(() => setIsAutoPlaying(true), 2000);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleSlideChange((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      handleSlideChange((prev) => (prev - 1 + images.length) % images.length);
    }

    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center">
      {/* Main Slider Container */}
      <div
        className="relative overflow-hidden rounded-3xl w-full"
      >
        {/* Black Background to prevent white flash */}
        <div className="absolute inset-0 bg-black z-0" />

        {/* Image Container */}
        <div className="relative w-full aspect-[16/9] max-w-3xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                fill
                className="object-cover rounded-3xl"
                priority={currentIndex === 0}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                sizes="(max-width: 480px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, 60vw"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLidCPgPY7h1/qQYWtWxdLGmJE3FzWGhf9kPH0nZZkBL4k/wAVkCBmknnRf/Z"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              {/* Content Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex flex-col items-center text-center"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 customtext text-white"
                >
                  {images[currentIndex].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-xl px-2"
                >
                  {images[currentIndex].description}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            handleSlideChange((prev) => (prev - 1 + images.length) % images.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 4000);
          }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            handleSlideChange((prev) => (prev + 1) % images.length);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 4000);
          }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </motion.button>
      </div>
      {/* Auto-play Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="hidden sm:flex absolute top-3 right-3 items-center gap-1.5 bg-black/20 backdrop-blur-md rounded-full px-2 py-0.5 text-white text-xs"
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
        <span className="text-xs font-medium">
          {isAutoPlaying ? 'Auto-playing' : 'Paused'}
        </span>
      </motion.div>
    </div>
  );
};



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

  // Fetch packages on component mount with priority scheduling
  useEffect(() => {
    // Defer package fetching to avoid blocking initial render
    const timeoutId = setTimeout(() => {
      fetchPackages();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages', {
        // Add cache control for better performance
        cache: 'force-cache',
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      // Don't show toast error on initial load to avoid disrupting UX
      if (packages.length === 0) {
        console.warn('Package loading failed, using fallback');
      }
    } finally {
      setLoading(false);
    }
  };

  // Get package image
  const getPackageImage = (index: number) => {
    return "/surfer-blue-wave.jpg";
  };

  {/* Food experience section */ }
  const images = ['/images/image1.jpg', '/images/image2.jpg', '/images/image3.jpg', '/images/image4.jpg']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className=" w-full overflow-x-hidden bg-background relative">
      {/* Hero Section with Full Video and Floating Images */}
      <section id="home" className="relative overflow-hidden h-screen">
        <VideoHero>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-30 h-screen flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center flex-grow pt-10"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-xl md:text-4xl mb-20 mt-10 max-w-2xl mx-auto leading-relaxed text-white/90 customtext "
              >
                Rupa's Surf Camp
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-extrabold drop-shadow-lg tracking-tight text-white customtext pt-10"
              >
                Arugam Bay
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="text-md md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed text-white/90 mt-5"
              >
                Sri Lanka's surfing paradise - the iconic surf town
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 200 }}
              className="mb-16 sm:mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className=""
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
          </div>
        </VideoHero>


      </section>
      <section className="relative overflow-hidden h-[150px] sm:h-[180px] md:h-[150px]">
        {/* Bottom Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-30 px-2 sm:px-5"
        >
          <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 sm:gap-4 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="flex items-center gap-3 sm:gap-8 text-center md:text-left md:col-span-3"
              >
                <div className="hidden md:block">
                  <h3 className="text-lg sm:text-xl font-bold text-primary text-center tanHeading">Arugam Bay</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-text text-justify">Rich wildlife, deep-rooted Sri Lankan culture and breath-taking scenery, it's more than a surfing description - it's a once-in-a-lifetime experience.</p>
              </motion.div>

              <div className="hidden md:flex justify-center items-center md:col-span-1">
                <span className="text-xl sm:text-2xl text-primary font-bold w-4">×</span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="flex items-center gap-3 sm:gap-8 text-center md:text-right md:col-span-3"
              >
                <p className="text-xs sm:text-sm md:text-base text-text text-justify">Join the <b>best Surf Camp in Sri Lanka</b> whether you dream of learning to surf or just love chasing advanced breaks, we  will  take you there!</p>
                <div className="hidden md:block">
                  <h3 className="text-lg sm:text-xl font-bold text-primary text-center tanHeading">Rupa's Surf</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* About Us Section with Video and Floating Leaf */}
      <section className="py-16 mb-10 md:px-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl text-text font-bold mb-8 leading-tight customtext"
              >
                Welcome to <span className="text-primary">Rupa's Surf Camp</span>
              </motion.p>
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg leading-relaxed text-text text-justify"
                >
                  Rupa's Surf Camp, part of the legendary Rupa's Hotel, has been a trusted home for surfers since 1978 — making it one of the very first surf stays in Arugam Bay. we're proud to continue offering a laid-back, welcoming space for everyone chasing waves and good vibes.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg leading-relaxed text-text text-justify"
                >
                  We're located right in front of Arugam Bay's Baby Point — one of the best spots for beginners to catch their first waves. Whether you're just learning or ready to explore more challenging reef breaks, our local certified pro surf instructors are friendly, experienced, and stoked to show you the best waves along Sri Lanka's beautiful east coast.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                <video
                  src="/heronew.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-3xl"
                />
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
        className="relative bg-[#04444C] py-8 sm:py-8 md:py-8 px-4 sm:px-6 md:px-20 text-white overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto relative z-20"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-4xl font-semibold leading-tight customtext"
          >
            What&apos;s so special about
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-4xl font-bold text-cyan-300 mt-2 customtext"
          >
            Arugambay?
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Highlights Section with Floating Surfboard */}
      <section className="relative bg-transparent py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            quality={75}
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-[98%] md:h-[88.89%] bg-[#048697e8] z-[1]" />

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
              className="h-full flex justify-center md:justify-start"
            >
              <Card className="bg-transparent border-none hover:shadow-xl transition-all text-white h-full group w-full max-w-[90%] md:max-w-full">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center md:items-start md:flex-row gap-3 sm:gap-4 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="p-2 sm:p-3 rounded-full shrink-0 group-hover:bg-white/10 transition-all duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="text-xl sm:text-xl font-bold mb-1 tanHeading"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                      className="text-base font-bold sm:text-md text-white/90 leading-relaxed"
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
      <section className="py-16 bg-background overflow-hidden relative mt-10">
        {/* Floating Leaf 1 - Different Position */}
        {/*<FloatingScrollImage
          src="/images/leaf1.png"
          alt="Leaf 1"
          className="hidden md:block top-60 left-4 sm:left-10 lg:left-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-96 h-24 sm:h-40 md:h-56 lg:h-72 xl:h-96 z-30"
          scrollRange={[1200, 2200]}
          yRange={[0, -200]}
          xRange={[0, 100]}
          rotateRange={[0, -90]}
          scaleRange={[1, 1.4]}
          opacityRange={[0.5, 1]}
        />*/}

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl text-text font-bold leading-tight customtext mb-6 z-50"
            >
              Why learn to surf with <span className="text-primary">Rupa's </span>Surf Camp?
            </motion.p>
          </motion.div>

          <ImageSlider />
        </div>
      </section>

      {/* All Awesome Stuff Section with Enhanced Videos */}
      <section className="py-8 px-6 md:px-10 bg-background relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-20"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold customtext text-text"
          >
            All the Awesome Stuff at <span className="text-primary">Rupa's</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg mt-2 text-text"
          >
            Whether you're here to ride waves, explore wild nature, or just vibe with the rhythm of the coast — we've got it all waiting for you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto max-w-7xl relative z-20"
        >
          {[
            { src: "/videos/surf.webm", title: "Perfect Waves", description: "Surf coaching for all levels, led by local certified pros — right at the break." },
            { src: "/videos/sunset.webm", title: "Sunset Surfing", description: "Comfy, modern rooms just steps from the surf and perfect for winding down" },
            { src: "/vides/wildlife.webm", title: "Pro Techniques", description: "Explore national parks, scenic lagoons - the wild and unique beauty of Arugambay" },
            { src: "/videos/food.webm", title: "Beach Vibes", description: "Sri Lankan buffet, cozy café, and a full à la carte menu with global flavors." }
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-sm text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{video.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Most Popular Package Section with Floating Elements */}
      <section className="py-16 md:px-20 bg-white relative overflow-hidden">
        {/* Floating Leaf 2 - Different Position */}
        {/*<FloatingScrollImage
          src="/images/flower1.png"
          alt="Leaf 2"
          className="top-24 w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64 h-16 sm:h-24 md:h-32 lg:h-48 xl:h-64 z-10"
          scrollRange={[2200, 3200]}
          yRange={[0, -120]}
          xRange={[0, 80]}
          rotateRange={[0, 45]}
          scaleRange={[1, 1.2]}
          opacityRange={[0.7, 1]}
        />*/}

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
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300">
                  Starting from $599
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
              <div className="w-full max-w-7xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-lg text-primary text-center mb-4"
                    >
                      Included in your package
                    </motion.p>
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center"
                    >
                      {[
                        { icon: "/icons/wifiicon.png", text: "HIGH SPEED Wi-Fi", description: "Stay connected with our high-speed internet access throughout your stay", type: "Free Services" },
                        { icon: "/icons/surfeq.png", text: "SURF EQUIPMENT", description: "Complete set of quality surfing gear including boards and wetsuits", type: "Free Services" },
                        { icon: "/icons/videoi.png", text: "SURF VIDEOS & PHOTOS", description: "Professional photography and video coverage of your surfing sessions", type: "Free Services" },
                        { icon: "/icons/tukicon.png", text: "TRANSPORT TO ACTIVITIES", description: "Convenient transportation to all surfing spots and activities", type: "Free Services" },
                        { icon: "/icons/towelicon.png", text: "LINEN & TOWEL SERVICE", description: "Fresh linens and towels provided daily for your comfort", type: "Free Services" },
                        { icon: "/icons/iceicon.png", text: "ICE BATH RECOVERY", description: "Rejuvenate with our ice bath facilities after surfing sessions", type: "Free Services" },
                        { icon: "/icons/beachfront.png", text: "BEACHFRONT LOUNGE", description: "Exclusive access to our comfortable beachfront lounge area", type: "Free Services" },
                        { icon: "/icons/10-percent.png", text: "10% OFF RESTAURENT", description: "Exclusive access to our comfortable beachfront lounge area", type: "Free Services" },
                      ].map((service, index) => (
                        <motion.div
                          key={index}
                          variants={staggerItem}
                          className="perspective-1000"
                        >
                          <motion.div
                            className="relative w-14 h-20 cursor-pointer"
                            initial={false}
                            style={{ transformStyle: "preserve-3d" }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="absolute w-full h-full flex flex-col items-center backface-hidden">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative w-10 h-10 mb-2"
                              >
                                <Image
                                  src={service.icon}
                                  alt={service.text}
                                  fill
                                  className="object-contain"
                                />
                              </motion.div>
                              <span className="text-[10px] font-semibold text-text text-center">{service.text}</span>
                            </div>
                            <div
                              className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                              style={{ transform: "rotateY(180deg)" }}
                            >
                              <p className="text-[8px] text-text text-center">{service.description}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div className="flex-1 lg:border-l-2 border-primary lg:pl-8">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-lg text-primary text-center mb-4"
                    >
                      Extra services
                    </motion.p>
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center"
                    >
                      {[
                        { icon: "/icons/caricon.png", text: "AIRPORT PICKUP & DROPOFF", description: "Convenient door-to-door transfer service from and to the airport", type: "Extra Services" },
                        { icon: "/icons/sunsetbbq.png", text: "SUNSET BARBEQUE", description: "Enjoy delicious BBQ meals while watching beautiful sunsets", type: "Extra Services" },
                        { icon: "/icons/safariwild.png", text: "SAFARI TRIPS", description: "Exciting safari adventures to explore local wildlife and nature", type: "Extra Services" },
                        { icon: "/icons/scooter.png", text: "MOTORBIKE RENTAL", description: "Freedom to explore with our quality motorbike rentals", type: "Extra Services" }
                      ].map((service, index) => (
                        <motion.div
                          key={index}
                          variants={staggerItem}
                          className="perspective-1000"
                        >
                          <motion.div
                            className="relative w-14 h-20 cursor-pointer"
                            initial={false}
                            style={{ transformStyle: "preserve-3d" }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="absolute w-full h-full flex flex-col items-center backface-hidden">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative w-10 h-10 mb-2"
                              >
                                <Image
                                  src={service.icon}
                                  alt={service.text}
                                  fill
                                  className="object-contain"
                                />
                              </motion.div>
                              <span className="text-[10px] font-semibold text-text text-center">{service.text}</span>
                            </div>
                            <div
                              className="absolute w-full h-full p-2 bg-primary/10 rounded-lg flex items-center justify-center backface-hidden"
                              style={{ transform: "rotateY(180deg)" }}
                            >
                              <p className="text-[8px] text-text text-center">{service.description}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            <style jsx global>
              {`
                .perspective-1000 {
                  perspective: 1000px
                }
                .backface-hidden {
                  backface-visibility: hidden
                }
              `}
            </style>
          </motion.div>


          <motion.div
            className="flex justify-center pt-5"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/surf">
              <Button className="border-primary text-primary hover:bg-primary bg-primary text-white hover:text-white rounded-full transition-all duration-300  cursor-pointer">
                Explore packages
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-primary customtext mb-4"
            >
              Accommodation Options
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-text max-w-2xl mx-auto"
            >
              Choose between our shared dorms for a social vibe or private rooms for added comfort and privacy. All options are just steps from the waves and designed for relaxation after a day in the surf.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-white rounded-3xl shadow-lg border-2 border-primary overflow-hidden p-5"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
            >
              <div className="relative h-64 bg-black rounded-3xl">
                <motion.div
                  animate={{ opacity: [1, 0, 0, 0, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/proom1.jpg"
                    alt="Luxury Suite View 1"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 0, 0, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/proom2.jpg"
                    alt="Luxury Suite View 2"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 0, 1, 0, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/proom3.jpg"
                    alt="Luxury Suite View 3"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-text mb-4">Private Double</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Air Conditioning</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Spacious Bathroom with Hot Water</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Handcrafted Furniture</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Garden View Sitting Area</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Wi-Fi</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Towels & Toiletries</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Daily Room Cleaning</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Surfboard Storage</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-white rounded-3xl shadow-lg border-2 border-primary overflow-hidden p-5"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
            >
              <div className="relative h-64 bg-black  rounded-3xl">
                <motion.div
                  animate={{ opacity: [1, 0, 0, 0, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/image1.jpg"
                    alt="Luxury Suite View 1"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 0, 0, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/image3.jpg"
                    alt="Luxury Suite View 2"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 0, 1, 0, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/image4.jpg"
                    alt="Luxury Suite View 3"
                    fill
                    quality={75}
                    className="object-cover transition-opacity duration-1000 rounded-3xl"
                  />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-text mb-4">Shared Dorm Beds</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Comfy bunk bed with clean linens and towel</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Air Conditioning Spacious Bathroom with Hot Water</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Hot water showers</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Shared bathroom (cleaned daily)</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Wi-Fi</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Private Locker</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Surfboard Storage</span>
                  </li>
                  <li className="flex items-center text-text">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Daily room cleaning</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <section className="py-8 sm:py-12 md:py-16 md:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-10">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold customtext text-primary mb-4 sm:mb-6">The Food Experience at the Camp</p>
              <p className="text-base sm:text-lg text-text leading-relaxed text-justify">
                Get ready to eat like a local! Our daily unlimited buffets are packed with authentic Sri Lankan flavors and change every day, so there's always something new to try. From creamy curries and spicy sambols to fresh tropical fruits, it's a tasty adventure at every meal. Whether you're fueling up after a surf session or just here for the food, you're in for a delicious ride.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative h-[250px] sm:h-[300px] md:h-[350px] bg-black rounded-3xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/images/image${currentImageIndex + 1}.jpg`}
                    alt={`Culinary Experience ${currentImageIndex + 1}`}
                    fill
                    quality={75}
                    className="object-cover rounded-3xl"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative h-[250px] sm:h-[300px] md:h-[350px]"
            >
              <Image
                src="/images/image2.jpg"
                alt="Local Cuisine"
                fill
                quality={75}
                className="object-cover rounded-3xl"
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <p className="text-base sm:text-lg text-text leading-relaxed mb-4 sm:mb-6 text-justify">
                When you're craving something beyond rice and curry, we've got you covered. Head over to Rupa's, our laid-back international restaurant, serving up everything from juicy burgers to fresh seafood and comfort food from around the world. And for your daily dose of beachside bliss, our cozy café is the go-to spot for smoothie bowls, proper coffee, and tropical drinks that taste like vacation in a cup. Whether you're refueling after a surf or just chilling out, there's always something tasty waiting.
              </p>

            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Arugambay - Truly Magical Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-4xl font-bold text-text customtext mb-6"
            >
              Arugambay - <span className="text-primary">Truly Magical</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-text max-w-4xl mx-auto leading-relaxed"
            >
              Arugambay isn't just about the waves - it's a place where wild elephants roam, lagoons glow at sunset, and wildlife thrives in thick jungles. Experience adventurous safari rides, breathtaking views and more at this unique paradise.
            </motion.p>
          </motion.div>

          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative max-w-6xl mx-auto"
          >
            <MagicalArugambaySlider />
          </motion.div>
        </div>
      </section>


      <section className="relative py-16" style={{
        backgroundImage: "url('/images/review.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative container mx-auto px-4"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white customtext mb-4">
            What our guests say!
          </p>
          <p className="text-lg md:text-xl text-center text-white/90 max-w-2xl mx-auto mb-12">
            Hear from surfers, travelers, and new friends who’ve lived the Rupa’s experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 md:gap-8 items-center justify-center mt-20 md:mx-10">
            {/* First Review Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-white rounded-3xl p-6 relative"
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src="/images/client1.jpg"
                    alt="Guest 1"
                    width={96}
                    quality={75}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text mt-2">"I came for the waves but found so much more — amazing energy, soulful sunsets, and the kindest crew. The surf theory sessions really helped, and I’ll never forget the bonfire nights."</p>
                <p className="font-bold text-text">— Anika Stein, 31, yoga teacher from Berlin</p>
              </div>
            </motion.div>

            {/* Middle Review Card (Larger) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full bg-white rounded-3xl p-8 relative lg:scale-110 z-10"
            >
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src="/images/client1.jpg"
                    alt="Guest 2"
                    width={112}
                    quality={75}
                    height={112}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text mt-2">“I came for the waves, stayed for the chaos — and left with better balance (on the board and in life). The instructors were total legends, the food slapped, and the sunsets? Unreal. I didn’t know I needed a wildlife safari between surf sessions, but now I want leopards with my vacation. Rupa’s knows how to mix chill vibes with real adventure. 11/10 — would paddle out (and party) again.”</p>
                <p className=" font-bold text-text">— Lola D., global thrill-seeker & sun-chaser</p>
              </div>
            </motion.div>

            {/* Third Review Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full bg-white rounded-3xl p-6 relative"
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src="/images/client1.jpg"
                    alt="Guest 3"
                    width={96}
                    quality={75}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text mt-2">"First time surfing and I actually stood up on day one — the instructors were chill but knew their stuff. The food was unreal, and the lagoon tour was the perfect midweek reset. This place hits different."</p>
                <p className="font-bold text-text">— Jake Rivers, 26, freelance designer from Melbourne</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>


      <section id='contact' className="relative py-16 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4 relative">
              {/* Mobile Map - Draggable */}
              <div className="block lg:hidden">
                <InteractiveMap />
              </div>

              {/* Desktop Map - Static */}
              <div className="hidden lg:block">
                <Image
                  src="/images/map.png"
                  alt="Location Map"
                  width={1200}
                  height={675}
                  quality={75}
                  className="rounded-3xl object-cover w-full aspect-auto"
                />
              </div>

              <div className="mt-8 space-y-4 max-w-[700px]">
                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Card */}
                  <motion.a
                    href="mailto:contact@rupassurf.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text group-hover:text-text transition-colors duration-300">Email Us</p>
                        <p className="text-sm font-semibold text-text group-hover:text-blue-600 transition-colors duration-300 truncate">
                          rupassurfcamp.gmail.com
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>

                  {/* Website Card */}
                  <motion.a
                    href="https://www.rupassurf.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#4caf50" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffc107" d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"></path><path fill="#4caf50" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffc107" d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"></path><path fill="#f44336" d="M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"></path><path fill="#dd2c00" d="M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"></path><path fill="#558b2f" d="M23.157,44l8.934-16.059L28,25L23.157,44z"></path><path fill="#f9a825" d="M41.865,15H24l-1.579,4.58L41.865,15z"></path><path fill="#fff" d="M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"></path><path fill="#2196f3" d="M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"></path>
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white animate-bounce"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text group-hover:text-text transition-colors duration-300">Visit Us</p>
                        <p className="text-sm font-semibold text-text group-hover:text-purple-600 transition-colors duration-300 truncate">
                          www.rupassurf.com
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Card - Full Width */}
                  <motion.a
                    href="https://wa.link/iz5wh6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl block w-full"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text group-hover:text-text transition-colors duration-300">Chat with Us</p>
                        <p className="text-lg font-semibold text-text group-hover:text-green-600 transition-colors duration-300">
                          +94 762332355
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center space-x-2">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.a>

                  {/* Location Card - Full Width */}
                  <motion.a
                    href="https://maps.app.goo.gl/NNi4kDjn1nyrwEPB6"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl block w-full"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"></path><path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"></path><path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"></path><path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"></path><path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"></path>
                          </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white animate-bounce"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text group-hover:text-text transition-colors duration-300">Find Us</p>
                        <p className="text-base font-semibold text-text group-hover:text-orange-600 transition-colors duration-300">
                          Beach road, Arugam Bay 32500
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center space-x-2">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>

              </div>
            </div>

            <div className="lg:w-4/12 lg:absolute lg:right-20 lg:top-2/4 lg:transform lg:-translate-y-1/2">
              <div className="bg-primary p-8 rounded-3xl shadow-lg backdrop-blur-lg bg-opacity-95">
                <div className="text-center mb-12">
                  <p className="text-2xl font-bold text-white customtext">Talk to Us</p>
                </div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-white mb-1">
                      Mobile
                    </label>
                    <input
                      type="mobile"
                      id="mobile"
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your mobile number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-primary border-2 border-white transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}


