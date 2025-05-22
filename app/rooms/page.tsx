"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wifi,
  Coffee,
  Utensils,
  Bath,
  Tv,
  Users,
  Wind,
  Waves,
  TreePalm,
  Check,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


export default function RoomsPage() {
  
    // Room feature component
    const RoomFeature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-2 ">
        <div className="text-primary">{icon}</div>
        <span className="text-sm md:text-base">{text}</span>
    </div>
    );

    // Room card component
    const RoomCard = ({
    title,
    price,
    image,
    features,
    reverse = false,
    index,
    guestCount,
    }: {
    title: string;
    price: number;
    image: string;
    features: { icon: React.ReactNode; text: string }[];
    reverse?: boolean;
    index: number;
    guestCount: number;
    }) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className={cn(
            "flex flex-col lg:flex-row gap-8 py-8 border-b border-gray-200",
            reverse ? "lg:flex-row-reverse" : ""
        )}
        >
        {/* Image Container */}
        <div className="w-full lg:w-2/3 relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
            <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
            >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
            </motion.div>
            <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white px-3 py-1.5 text-sm font-medium">
                {index % 2 === 0 ? "Popular Choice" : "Best Value"}
            </Badge>
            </div>
        </div>

        {/* Content Container */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
            <div className="flex justify-between items-start mb-4">
                <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
                <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm ">
                    Accommodates {guestCount} guests
                    </span>
                </div>
                </div>
                <div className="text-right">
                <p className="text-sm ">per night</p>
                <p className="text-3xl font-bold text-primary">${price}</p>
                </div>
            </div>

            <h3 className="font-semibold text-lg mb-4">Room Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 mb-6">
                {features.map((feature, i) => (
                <RoomFeature key={i} icon={feature.icon} text={feature.text} />
                ))}
            </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all duration-300"
            >
                Book Now <CalendarDays className="ml-2 h-5 w-5" />
            </Button>
            <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
            >
                View Details
            </Button>
            </div>
        </div>
        </motion.div>
    );
    };
  const rooms = [
    {
      title: "Deluxe Ocean View Suite",
      price: 299,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
      guestCount: 4,
      features: [
        { icon: <Wifi className="h-4 w-4" />, text: "Free high-speed WiFi" },
        { icon: <Bath className="h-4 w-4" />, text: "Luxury bathroom" },
        { icon: <Tv className="h-4 w-4" />, text: "55\" Smart TV" },
        { icon: <Coffee className="h-4 w-4" />, text: "Coffee maker" },
        { icon: <Wind className="h-4 w-4" />, text: "Air conditioning" },
        { icon: <Waves className="h-4 w-4" />, text: "Ocean view" },
      ],
    },
    {
      title: "Premium Garden Bungalow",
      price: 249,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
      guestCount: 3,
      features: [
        { icon: <Wifi className="h-4 w-4" />, text: "Free high-speed WiFi" },
        { icon: <TreePalm className="h-4 w-4" />, text: "Garden view" },
        { icon: <Waves className="h-4 w-4" />, text: "Pool access" },
        { icon: <Tv className="h-4 w-4" />, text: "50\" Smart TV" },
        { icon: <Wind className="h-4 w-4" />, text: "Air conditioning" },
        { icon: <Utensils className="h-4 w-4" />, text: "Mini kitchen" },
      ],
    },
    {
      title: "Beachfront Villa",
      price: 499,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
      guestCount: 6,
      features: [
        { icon: <Wifi className="h-4 w-4" />, text: "Free high-speed WiFi" },
        { icon: <Users className="h-4 w-4" />, text: "2 bedrooms" },
        { icon: <Utensils className="h-4 w-4" />, text: "Full kitchen" },
        { icon: <Waves className="h-4 w-4" />, text: "Beachfront" },
        { icon: <Bath className="h-4 w-4" />, text: "Outdoor shower" },
        { icon: <Check className="h-4 w-4" />, text: "Private terrace" },
      ],
    },
    {
      title: "Surf Enthusiast Room",
      price: 189,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
      guestCount: 2,
      features: [
        { icon: <Wifi className="h-4 w-4" />, text: "Free high-speed WiFi" },
        { icon: <Waves className="h-4 w-4" />, text: "Surf board storage" },
        { icon: <Wind className="h-4 w-4" />, text: "Air conditioning" },
        { icon: <Coffee className="h-4 w-4" />, text: "Coffee maker" },
        { icon: <Tv className="h-4 w-4" />, text: "42\" Smart TV" },
        { icon: <Check className="h-4 w-4" />, text: "Balcony" },
      ],
    },
    {
      title: "Family Suite",
      price: 349,
      image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80",
      guestCount: 5,
      features: [
        { icon: <Wifi className="h-4 w-4" />, text: "Free high-speed WiFi" },
        { icon: <Users className="h-4 w-4" />, text: "Fits up to 5 guests" },
        { icon: <Tv className="h-4 w-4" />, text: "Two TVs" },
        { icon: <Wind className="h-4 w-4" />, text: "Air conditioning" },
        { icon: <Utensils className="h-4 w-4" />, text: "Mini kitchen" },
        { icon: <Bath className="h-4 w-4" />, text: "Two bathrooms" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80"
            alt="Accommodations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge
              variant="outline"
              className="border-white bg-white/10 backdrop-blur-md px-6 py-1.5 text-lg font-normal mb-6 text-white"
            >
              Luxury Accommodations
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Find Your Perfect <span className="text-primary">Beach Retreat</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience the ultimate in comfort and luxury with our range of carefully designed
              accommodations, each with stunning views and premium amenities.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Explore Rooms</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Room Listings */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our <span className="text-primary">Accommodations</span>
          </h2>

          <div className="space-y-16">
            {rooms.map((room, index) => (
              <RoomCard
                key={index}
                index={index}
                title={room.title}
                price={room.price}
                image={room.image}
                features={room.features}
                reverse={index % 2 !== 0}
                guestCount={room.guestCount}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
