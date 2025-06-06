'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Waves,
  Users,
  Home,
  Utensils,
  Coffee,
  Camera,
  Binoculars,
  Car,
  Calendar,
  Star,
  Heart,
  Video,
  Award,
  Clock,
  Anchor,
  Shield,
  Trophy,
  Gift,
  Music,
  Leaf,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Wifi
} from 'lucide-react';
import Image from 'next/image';

const facilities = [
  {
    title: "Sea-View Rooms",
    description: "Clean, cozy rooms with stunning ocean views and island charm",
    icon: <Home className="w-6 h-6" />,
    features: ["Ocean Views", "Island Charm", "Comfortable Beds", "Daily Cleaning"]
  },
  {
    title: "Beachfront Restaurant",
    description: "Epic ocean views with laid-back meals and authentic Sri Lankan cuisine",
    icon: <Utensils className="w-6 h-6" />,
    features: ["Ocean Views", "Local Cuisine", "Fresh Seafood", "Relaxed Atmosphere"]
  },
  {
    title: "Cozy Café",
    description: "Perfect for pre-surf coffee or a chilled afternoon hangout",
    icon: <Coffee className="w-6 h-6" />,
    features: ["Fresh Coffee", "Light Snacks", "Chill Vibes", "Free WiFi"]
  },
  {
    title: "Sri Lankan Buffet",
    description: "All-you-can-eat unlimited buffet with authentic home-cooked flavors",
    icon: <Utensils className="w-6 h-6" />,
    features: ["Unlimited Food", "Home Cooking", "Live Music", "Traditional Recipes"]
  }
];

const activities = [
  {
    title: "Surf Lessons",
    description: "Professional instruction for all levels with video coaching",
    icon: <Waves className="w-6 h-6" />,
    highlight: "Video Analysis"
  },
  {
    title: "Lagoon Tours",
    description: "Scenic boat tours through beautiful lagoon landscapes",
    icon: <Binoculars className="w-6 h-6" />,
    highlight: "Wildlife Spotting"
  },
  {
    title: "Wildlife Safaris",
    description: "Explore Sri Lanka's incredible wildlife and nature",
    icon: <Camera className="w-6 h-6" />,
    highlight: "Photography Tours"
  },
  {
    title: "Surf Day Trips",
    description: "Visit epic surf spots along the stunning east coast",
    icon: <Car className="w-6 h-6" />,
    highlight: "Hidden Spots"
  }
];

const surfingFeatures = [
  {
    title: "Qualified Instructors",
    description: "Passionate local surf guides with years of experience",
    icon: <Users className="w-8 h-8" />,
    stats: "15+ Years"
  },
  {
    title: "Video Coaching",
    description: "Analyze your technique with professional video feedback",
    icon: <Video className="w-8 h-8" />,
    stats: "HD Analysis"
  },
  {
    title: "All Levels Welcome",
    description: "From first wave to advanced breaks, we've got you covered",
    icon: <Award className="w-8 h-8" />,
    stats: "Beginner to Pro"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90" />
        </div>
        
        <div className="relative container mt-4 mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center min-h-screen flex flex-col justify-center">
          
          <Badge className="mx-auto mb-6 bg-card text-card-foreground px-6 py-2 text-base font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Since 1978
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
            RUPA'S
            <span className="block">SURF HOUSE</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
            Your home for waves, good vibes, and island adventures right in front of Arugam Bay's main beginners' surf point
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 px-4">
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 " />
              <span className=" font-medium text-sm sm:text-base">Arugam Bay</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Anchor className="w-4 h-4 sm:w-5 sm:h-5 " />
              <span className=" font-medium text-sm sm:text-base">Beachfront Location</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 " />
              <span className=" font-medium text-sm sm:text-base">Family Legacy</span>
            </div>
          </div>

          <div className="mt-12">
            <Button 
              size="lg" 
              className="bg-card text-card-foreground hover:bg-card/90 font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              Welcome Home
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Your Gateway to Arugam Bay's Best Waves
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Welcome to Rupa's Surf House! Located right in front of Arugam Bay's main beginners' surf point, 
                we're your home for waves, good vibes, and island adventures. Whether you're just starting out on 
                your surfing journey or chasing advanced breaks, our top-ranked local surf guides will take you to 
                the best spots on Sri Lanka's east coast.
              </p>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We offer comfortable sea-view rooms, a cozy hotel restaurant, a chilled-out café, and our signature 
                all-you-can-eat authentic Sri Lankan buffet—with live music to set the vibe.
              </p>
              
              <div className="flex items-center justify-center gap-4 pt-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Waves className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">Come surf, eat, relax, and feel like family.</span>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground leading-tight mb-4">
              Beyond the Waves
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              When you're not surfing the main break, join us for scenic lagoon tours, wildlife safaris, 
              and surf day trips to epic local spots along Sri Lanka's stunning east coast. Explore the 
              best of Arugam Bay—on and off the waves!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activities.map((activity, index) => (
              <Card key={index} className="bg-background border-border hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{activity.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {activity.highlight}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-primary">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Available Daily</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              A Family Legacy Since 1978
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              We grew up with the ocean in front of us and a family legacy behind us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/restaurent1.jpg"
                    alt="Rupa's Beach Hotel 1978"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">Est. 1978</span>
                    </div>
                    <p className="text-xs">Rupa's Beach Hotel - The Beginning</p>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">Our Beginning</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Four decades of hospitality
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Our story begins in 1978, when our grandparents opened <strong>Rupa's Beach Hotel</strong> — 
                      one of the very first beach hotels in Arugam Bay. Today, we carry that same passion forward 
                      with Rupa's Surf House, a place for surfers, travelers, and wave-lovers from around the world 
                      to come together, ride, relax, and feel at home.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                          <Trophy className="w-5 h-5" />
                          45+
                        </div>
                        <div className="text-xs text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                          <Users className="w-5 h-5" />
                          3
                        </div>
                        <div className="text-xs text-muted-foreground">Generations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
              Our Facilities
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for the perfect surf vacation, designed for comfort, connection, and good vibes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="bg-background border-border group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {facility.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{facility.title}</h3>
                      <p className="text-sm text-muted-foreground">{facility.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {facility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Surfing Focus Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Waves className="w-10 h-10 text-primary-foreground" />
              </div>
              
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Surfing is What We Live and Breathe
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Our team of qualified, passionate surf instructors are here to help you start your journey or 
                push your surfing to the next level. We take time to analyze your skills, offer video coaching, 
                and give you tips that actually help you improve — all in a fun, supportive atmosphere.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
                {surfingFeatures.map((feature, index) => (
                  <Card key={index} className="bg-card border-border p-6 text-center group hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {feature.stats}
                    </Badge>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Stats */}
      <div className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-primary" />
              <Award className="w-6 h-6 text-primary" />
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Our Achievements</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <Card className="bg-background border-border p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="text-2xl sm:text-3xl font-bold text-primary">1978</div>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">Established</div>
            </Card>
            
            <Card className="bg-background border-border p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <div className="text-2xl sm:text-3xl font-bold text-primary">45+</div>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">Years Experience</div>
            </Card>
            
            <Card className="bg-background border-border p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-2xl sm:text-3xl font-bold text-primary">1000+</div>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">Happy Surfers</div>
            </Card>
            
            <Card className="bg-background border-border p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <div className="text-2xl sm:text-3xl font-bold text-primary">★★★★★</div>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">Family Vibes</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">Eco-Friendly Practices</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  We're committed to preserving the natural beauty of Arugam Bay for future generations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Sustainable tourism practices</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Ocean conservation support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Local community involvement</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">Cultural Experience</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Immerse yourself in authentic Sri Lankan culture and traditions during your stay.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Live traditional music nights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Authentic Sri Lankan cuisine</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Local cultural tours</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="py-8 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Safe & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Free WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span className="text-sm">Free Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="text-sm">Special Packages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

