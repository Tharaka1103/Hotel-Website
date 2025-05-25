'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Home, 
  Calendar,
  Users,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Waves
} from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/app/Components/ProductCard';
import { MorphingText } from '@/components/magicui/morphing-text';

export default function SurfPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/me');
        const data = await response.json();
        setIsAdmin(data.success);
      } catch (error) {
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  const hotelFeatures = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: 'Restaurant' },
    { icon: Waves, label: 'Pool' },
  ];

  const rooms = [
    {
      imageUrl: '/images/room1.jpg',
      title: 'Ocean View Suite',
      description: 'Luxury suite with panoramic ocean views',
      price: 299,
      link: '/booking/ocean-suite'
    },
    {
      imageUrl: '/images/room2.jpg',
      title: 'Deluxe Room',
      description: 'Comfortable room with modern amenities',
      price: 199,
      link: '/booking/deluxe-room'
    },
    {
      imageUrl: '/images/room3.jpg',
      title: 'Family Suite',
      description: 'Spacious suite perfect for families',
      price: 399,
      link: '/booking/family-suite'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <MorphingText 
            texts={['Welcome to Surf Hotel', 'Ocean Paradise', 'Luxury Awaits']}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          />
          <p className="text-xl text-gray-600 mb-8">
            Experience luxury and comfort at our oceanfront hotel with world-class amenities
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              5-Star Rated
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Oceanfront Location
            </Badge>
          </div>
          <Button size="lg" className="text-lg px-8 py-4">
            <Calendar className="h-5 w-5 mr-2" />
            Book Your Stay
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hotel Amenities</h2>
          <p className="text-gray-600">Enjoy our premium facilities and services</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hotelFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{feature.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Rooms</h2>
          <p className="text-gray-600">Choose from our selection of luxury accommodations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {rooms.map((room, index) => (
            <ProductCard key={index} {...room} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Guests</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50</div>
              <div className="text-blue-100">Luxury Rooms</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Surf Hotel</span>
              </div>
              <p className="text-gray-400">
                Your luxury oceanfront destination for unforgettable experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link></li>
                <li><Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Room Service</li>
                <li>Spa & Wellness</li>
                <li>Restaurant</li>
                <li>Event Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>123 Ocean Drive</p>
                <p>Surf City, SC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@surfhotel.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Surf Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
