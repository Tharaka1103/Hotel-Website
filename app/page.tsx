"use client";

import React, { useRef, useState } from "react";
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
  MapPin,
  Coffee,
  Users,
  Star,
  Car,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      
      {/* Video controls */}
      <div className="absolute bottom-8 right-8 z-10">
        <Button 
          onClick={togglePlay} 
          size="icon" 
          variant="outline" 
          className="rounded-full border border-primary bg-black/20 backdrop-blur-md hover:bg-black/40"
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
          <span className="text-lg font-bold text-blue-500">{name.charAt(0)}</span>
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

// Main Page Component
export default function HomePage() {
  // Images for gallery
  const galleryImages = Array(9).fill(0).map((_, i) => i % 2 === 0 ? "/beach.jpg" : "/about.jpg");

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Hero Section with Full Video */}
      <section id="home" className="h-screen relative">
        <VideoHero>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge 
                variant="outline" 
                className="border-primary bg-primary/10 backdrop-blur-md px-6 py-1.5 text-lg font-normal mb-6 text-white"
              >
                Welcome to Paradise
              </Badge>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold mb-8 drop-shadow-lg tracking-tight text-white"
              >
                Surf, Relax, <span className="text-primary">Explore</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90"
              >
                Your perfect beach getaway with world-class surfing, authentic experiences, and unforgettable adventures.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg"
                  className="text-xl px-10 py-6 rounded-full shadow-xl transition-all duration-300"
                >
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-xl px-10 py-6 rounded-full shadow-lg transition-all duration-300 "
                >
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </VideoHero>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Bar */}
      <section className="bg-blue-900 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { icon: <MapPin className="h-6 w-6" />, label: "Beachfront Location" },
              { icon: <Waves className="h-6 w-6" />, label: "World-Class Surfing" },
              { icon: <Coffee className="h-6 w-6" />, label: "Authentic Cuisine" },
              { icon: <Users className="h-6 w-6" />, label: "Personalized Service" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-3 rounded-full bg-blue-800 text-white">
                  {feature.icon}
                </div>
                <span className="font-medium text-white">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
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
              <Badge 
                variant="outline" 
                className="mb-6 border border-primary text-black bg-blue-100 px-5 py-1.5 text-lg shadow"
              >
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Your Beach Home <span className="text-blue-500">Away From Home</span>
              </h2>
              <div className="space-y-6">
                <p className="text-xl leading-relaxed">
                  Nestled on the pristine shores of Sri Lanka, Rupa&apos;s Surf Resort was born from a passion for the ocean and a dream to create an authentic surf experience for travelers from around the world.
                </p>
                <p className="text-xl leading-relaxed">
                  Founded in 2015 by professional surfer Rupa Hiranya, our boutique resort combines luxury accommodation with world-class surf instruction, creating the perfect balance of adventure and relaxation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 rounded-full px-8 py-6 text-lg shadow-md"
                  >
                    Our Story
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 h-[500px] rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <Image
                src="/about.jpg"
                alt="About Us"
                fill
                className="object-cover"
                priority
              />
              
              {/* Stats overlay */}
              <div className="absolute -bottom-1 -left-1 bg-white p-4 rounded-xl shadow-xl border border-blue-100 z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-5xl font-bold text-blue-500">8+</p>
                    <p className="">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-500">5k+</p>
                    <p className="">Happy Guests</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-blue-100/60 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge 
              variant="outline" 
              className="mb-6 border border-primary text-black bg-blue-100 px-5 py-1.5 text-lg shadow"
            >
              Experience Paradise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              What We <span className="text-blue-500">Offer</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto ">
              From comfortable accommodations to exciting adventures, we have everything you need for an amazing stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Luxury Rooms",
                description: "Comfortable beachfront accommodations with stunning ocean views",
                icon: <Users className="h-10 w-10 text-blue-500" />,
                image: "/about.jpg",
                link: "/rooms",
              },
              {
                title: "Surf Camp",
                description: "Professional lessons and guided sessions for all skill levels",
                icon: <Waves className="h-10 w-10 text-red-500" />,
                image: "/beach.jpg",
                link: "/surf",
              },
              {
                title: "Safari Tours",
                description: "Explore the local wildlife and natural wonders of Sri Lanka",
                icon: <Palmtree className="h-10 w-10 text-green-500" />,
                image: "/about.jpg",
                link: "/safari",
              },
              {
                title: "Beach Restaurant",
                description: "Fresh local cuisine with panoramic ocean views",
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
                      className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-full px-6 py-3 w-full shadow-md"
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

      {/* Testimonials Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-blue-100/60 to-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge 
              variant="outline" 
              className="mb-6 border border-primary text-black bg-blue-100 px-5 py-1.5 text-lg shadow"
            >
              Guest Experiences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              What Our Guests <span className="text-blue-500">Say</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto ">
              Don&apos;t just take our word for it, hear from those who have experienced our hospitality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "Los Angeles, USA",
                rating: 5,
                text: "My first surfing experience and it was amazing! The instructors were patient and friendly, and the accommodation was perfect.",
              },
              {
                name: "Marcus Torres",
                location: "Sydney, Australia",
                rating: 5,
                text: "As an experienced surfer, I was blown away by the quality of waves and the convenience of the location. The team went above and beyond.",
              },
              {
                name: "Emma Chen",
                location: "Tokyo, Japan",
                rating: 5,
                text: "The safari tour was the highlight of my trip! Got to see elephants up close and our guide was so knowledgeable.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Simplified */}
      <section className="py-10 md:py-16 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge 
              variant="outline" 
              className="mb-6 border border-primary text-black bg-blue-100 px-5 py-1.5 text-lg shadow"
            >
              Our Paradise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Experience <span className="text-blue-500">The Beauty</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto ">
              Explore our breathtaking location through our gallery of stunning images.
            </p>
          </div>
          
          {/* Simplified Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-xl h-64 md:h-80"
              >
                <Image 
                  src={image}
                  alt={`Gallery image ${index}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-8 py-6 text-lg shadow-lg">
              View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Activities Preview Section - Simplified */}
      <section className="py-10 md:py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge 
              variant="outline" 
              className="mb-6 border border-primary text-black bg-blue-100 px-5 py-1.5 text-lg shadow"
            >
              Experiences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              More Than Just <span className="text-blue-500">Surfing</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto ">
              Discover all the exciting activities we offer for a complete Sri Lankan experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Surf Lessons",
                description: "Learn to ride the waves with our expert instructors in private or group sessions.",
                icon: <Waves className="h-8 w-8 text-blue-500" />,
                image: "/beach.jpg",
              },
              {
                title: "Wildlife Safari",
                description: "Explore local national parks and encounter exotic wildlife in their natural habitat.",
                icon: <Palmtree className="h-8 w-8 text-green-500" />,
                image: "/about.jpg",
              },
              {
                title: "Taxi Services",
                description: "Convenient transportation to nearby attractions, airports, and local markets.",
                icon: <Car className="h-8 w-8 text-yellow-500" />,
                image: "/beach.jpg",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border group"
              >
                <div className="h-60 relative overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/10 backdrop-blur-md">{activity.icon}</div>
                      <h3 className="text-2xl font-bold">{activity.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-6">{activity.description}</p>
                  <Button className="w-full rounded-full bg-blue-500 hover:bg-blue-600 shadow">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <Badge 
              variant="outline" 
              className="mb-6 border-white/30 bg-white/10 backdrop-blur-md px-6 py-1.5 text-lg font-normal"
            >
              Book Your Escape
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg leading-tight">
              Ready for Your Perfect Beach Adventure?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
              Book your stay now and get ready for sun, surf, and unforgettable memories. 
              Special offers available for early bookings!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300 text-xl px-10 py-7 rounded-full shadow-xl"
              >
                Book Your Stay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white text-xl px-10 py-7 rounded-full shadow-lg hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-0 transform -translate-y-1/2 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-blue-300/30 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none">
          <div className="w-80 h-80 rounded-full bg-blue-300/30 blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
