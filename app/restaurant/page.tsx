'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Utensils, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Coffee,
  Wine,
  ChefHat,
  Leaf,
  Heart,
  Award
} from 'lucide-react';
import Image from 'next/image';

const restaurantSections = [
  {
    id: 1,
    title: "Oceanfront Fine Dining",
    description: "Experience culinary excellence with breathtaking ocean views. Our signature restaurant offers an exquisite menu featuring fresh seafood, premium steaks, and innovative fusion cuisine. Every dish is crafted with the finest local ingredients and presented with artistic flair.",
    features: ["Fresh Seafood Daily", "Premium Wine Selection", "Ocean Views", "Chef's Specials"],
    image: "/images/restaurent1.jpg",
    badge: "Signature Restaurant",
    icon: <ChefHat className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Restaurant Foods",
    description: "Experience our diverse menu featuring international cuisine, local specialties, and chef-crafted dishes. From appetizers to desserts, our restaurant offers a delightful selection of traditional favorites and innovative creations, all prepared with the finest ingredients.",
    features: ["Signature Dishes", "International Cuisine", "Chef Specials", "Fresh Ingredients"],
    image: "/images/restaurent2.jpg",
    badge: "Casual Dining",
    icon: <Coffee className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Indoor Fine Dining",
    description: "Experience elegant dining in our sophisticated indoor restaurant. Enjoy expertly crafted dishes in an intimate atmosphere with refined decor and ambient lighting. Perfect for elegant dinners and special occasions with our extensive menu and attentive service.",
    features: ["Elegant Ambiance", "Fine Cuisine", "Private Dining", "Intimate Setting"],
    image: "/images/restaurent3.jpg",
    badge: "Premium Lounge",
    icon: <Wine className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Beach Side View",
    description: "Enjoy breathtaking ocean views while dining at our beachfront restaurant. From fresh seafood platters to refreshing cocktails, experience the perfect blend of coastal cuisine and stunning scenery. Watch the sunset while enjoying our carefully curated menu of local and international dishes.",
    features: ["Ocean Views", "Fresh Seafood", "Sunset Dining", "Beachfront Location"],
    image: "/images/restaurent4.jpg",
    badge: "Healthy Options",
    icon: <Leaf className="w-6 h-6" />
  }
];

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/restaurent2.jpg"
            alt="Restaurant Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative container mt-4 mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Culinary 
            <span className="block">Excellence</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed px-4">
            Discover exceptional dining experiences with breathtaking ocean views, fresh local ingredients, and world-class cuisine that will delight your senses.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              <span className="text-white font-medium text-sm sm:text-base">4 Dining Venues</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              <span className="text-white font-medium text-sm sm:text-base">Open All Day</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              <span className="text-white font-medium text-sm sm:text-base">Award Winning</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-12">
            <Button 
              size="lg" 
              className="bg-card text-foreground hover:bg-card/90 font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Locations
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Sections */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-16 sm:space-y-24">
            {restaurantSections.map((section, index) => (
              <div key={section.id} className="relative">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Image Section */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-card text-card-foreground font-bold px-3 py-1 flex items-center gap-2">
                          {section.icon}
                          {section.badge}
                        </Badge>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-lg">{section.id}</span>
                        </div>
                        <div className="h-px bg-primary flex-1"></div>
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                        {section.title}
                      </h2>
                      
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {section.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Hours Section */}
      <div className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
              Visit Our Restaurants
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience exceptional dining at any of our four unique restaurant venues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info */}
            <Card className="bg-background border-border shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Reservations</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-background border-border shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Location</h3>
                  <p className="text-muted-foreground">123 Ocean View Drive</p>
                  <p className="text-sm text-muted-foreground mt-1">Paradise Beach Resort</p>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="bg-background border-border shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">Hours</h3>
                  <p className="text-muted-foreground">Breakfast: 6:00 AM - 11:00 AM</p>
                  <p className="text-muted-foreground">Lunch: 12:00 PM - 4:00 PM</p>
                  <p className="text-muted-foreground">Dinner: 6:00 PM - 11:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Special Features Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Makes Us Special
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the unique features that set our dining experience apart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="bg-card border-border text-center space-y-4 group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Award Winning</h3>
                <p className="text-sm text-muted-foreground">Recognized by culinary experts and food critics worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center space-y-4 group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Farm to Table</h3>
                <p className="text-sm text-muted-foreground">Fresh, locally sourced ingredients from sustainable farms</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center space-y-4 group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Passionate Chefs</h3>
                <p className="text-sm text-muted-foreground">Culinary artists dedicated to creating memorable experiences</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border text-center space-y-4 group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">5-Star Service</h3>
                <p className="text-sm text-muted-foreground">Exceptional hospitality and attention to every detail</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready for an Unforgettable Dining Experience?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Book your table now and taste the difference that passion and quality make
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-card text-card-foreground hover:bg-card/90 font-bold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Make Reservation
            </Button>
            
            <Button 
              size="lg" 
              className="border-white border text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold px-8 py-4 text-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>dining@hotelwebsite.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Ocean View Drive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
