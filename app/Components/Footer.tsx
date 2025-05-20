"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  PhoneCall, 
  MapPin, 
  ArrowRight,
  Heart,
  PalmtreeIcon,
  AnchorIcon,
  SunIcon,
  Ship,
  Music,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const footerLinks = [
  {
    title: "Accommodations",
    links: [
      { label: "Ocean View Suites", href: "/rooms/ocean-view" },
      { label: "Beachfront Villas", href: "/rooms/beachfront" },
      { label: "Garden Bungalows", href: "/rooms/garden" },
      { label: "Special Offers", href: "/special-offers" },
      { label: "Group Bookings", href: "/group-bookings" }
    ]
  },
  {
    title: "Experiences",
    links: [
      { label: "Surf Lessons", href: "/experiences/surf-lessons" },
      { label: "Island Tours", href: "/experiences/island-tours" },
      { label: "Wellness & Spa", href: "/experiences/wellness" },
      { label: "Yoga Classes", href: "/experiences/yoga" },
      { label: "Local Cuisine", href: "/experiences/dining" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Press & Media", href: "/press" }
    ]
  },
  {
    title: "Information",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cancellation Policy", href: "/cancellation" },
      { label: "Contact Us", href: "/contact" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-background relative overflow-hidden">
    
      
      {/* Newsletter Section */}
      <div className="relative overflow-hidden bg-primary/5">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start justify-between">
              <div className="md:max-w-md">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="outline" className="mb-4 text-primary bg-primary/10">
                    Stay Connected
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Ocean Loving Community</h3>
                  <p className="text-muted-foreground mb-2">
                    Subscribe to our newsletter for exclusive offers, travel tips, and the latest surf conditions.
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:max-w-sm"
              >
                <div className="bg-card rounded-xl p-4">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <div className="flex">
                        <Input
                          type="email"
                          id="email"
                          placeholder="youremail@example.com"
                          className="rounded-r-none focus-visible:ring-primary"
                        />
                        <Button type="submit" className="rounded-l-none">
                          Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from our resort.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
        {/* Activities Icons */}
        <div className="pt-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 text-center">
            {[
              { icon: <PalmtreeIcon className="h-5 w-5" />, label: "Beach" },
              { icon: <AnchorIcon className="h-5 w-5" />, label: "Surfing" },
              { icon: <SunIcon className="h-5 w-5" />, label: "Sunshine" },
              { icon: <Ship className="h-5 w-5" />, label: "Cruises" },
              { icon: <Music className="h-5 w-5" />, label: "Events" },
              { icon: <Utensils className="h-5 w-5" />, label: "Dining" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-primary/10 mb-2">
                  <div className="text-primary">{item.icon}</div>
                </div>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 relative z-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Waves className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-bold text-xl">Rupa&apos;s Surf</span>
                <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary">Resort</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Experience the perfect blend of luxury and adventure at our oceanfront surf resort, where every wave tells a story.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  123 Ocean Drive, Surf Bay<br />
                  Paradise Coast, PC 98765
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">contact@rupasurf.com</span>
              </div>
            </div>
          </div>
          
          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                    >
                      <span className="mr-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Media and Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-6 sm:mb-0">
              <a href="#" className="bg-background hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-background hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-background hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rupa&apos;s Surf Resort. All rights reserved.
            </div>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Designed and developed with <Heart className="h-3 w-3 inline fill-red-500 text-red-500" /> by <a href="https://trimids.com" className="text-primary hover:underline">TRIMIDS Innovations</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
