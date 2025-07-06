"use client"
import Image from 'next/image';
import React, { useState } from 'react';

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
  Utensils,
  Send,
  ChevronUp,
  Youtube,
  Linkedin,
  Globe,
  Clock,
  Star,
  Award,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const footerLinks = [
  {
    title: "Accommodations",
    icon: <Users className="h-5 w-5" />,
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
    icon: <Waves className="h-5 w-5" />,
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
    icon: <Award className="h-5 w-5" />,
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
    icon: <Globe className="h-5 w-5" />,
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cancellation Policy", href: "/cancellation" },
      { label: "Contact Us", href: "/contact" }
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      // You can add toast notification here
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background relative overflow-hidden bg-[url('/seabeach.png')] bg-fixed bg-cover bg-center bg-no-repeat">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/95 to-black/98"></div>
      
      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-10 opacity-10"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Waves className="h-24 w-24 text-primary" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-20 opacity-10"
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <PalmtreeIcon className="h-32 w-32 text-primary" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10"
      >

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 xl:col-span-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center space-x-3 mb-6 sm:mb-8"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                <Waves className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl lg:text-3xl text-white">Rupa's Surf</span>
                <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-primary/30">
                  Resort
                </Badge>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/80 mb-8 max-w-sm leading-relaxed text-sm sm:text-base"
            >
              Experience the perfect blend of luxury and adventure at our oceanfront surf resort, where every wave tells a story and every sunset creates memories.
            </motion.p>
            
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
                  123 Ocean Drive, Surf Bay<br />
                  Paradise Coast, Arugam Bay<br />
                  Sri Lanka, PC 98765
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <PhoneCall className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <a href="tel:+94701234567" className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
                  +94 (70) 123-4567
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@rupasurf.com" className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
                  contact@rupasurf.com
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <Clock className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
                  24/7 Customer Support
                </div>
              </motion.div>
            </div>

            {/* Awards/Certifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
                <Star className="h-3 w-3 mr-1" />
                5-Star Rated
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
                <Award className="h-3 w-3 mr-1" />
                ISA Certified
              </Badge>
            </motion.div>
          </motion.div>
          
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerLinks.map((column, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      {column.icon}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-white">{column.title}</h3>
                  </motion.div>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <motion.li 
                        key={linkIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: linkIndex * 0.1, duration: 0.5 }}
                        whileHover={{ x: 10 }}
                      >
                        <Link 
                          href={link.href} 
                          className="text-sm sm:text-base text-white/70 hover:text-primary transition-colors duration-300 flex items-center group"
                        >
                          <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8 sm:my-12 bg-white/10" />
        
        {/* Social Media and Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="space-y-8"
        >
          {/* Social Media Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 sm:order-1"
            >
              <h4 className="text-white font-semibold mb-4 text-center sm:text-left text-lg">Follow Our Journey</h4>
              <div className="flex justify-center sm:justify-start space-x-4">
                {[
                  { 
                    icon: <Instagram className="h-5 w-5" />, 
                    href: "https://instagram.com/rupasurf", 
                    label: "Instagram",
                    color: "hover:bg-pink-500/20 hover:text-pink-400" 
                  },
                  { 
                    icon: <Facebook className="h-5 w-5" />, 
                    href: "https://facebook.com/rupasurf", 
                    label: "Facebook",
                    color: "hover:bg-blue-500/20 hover:text-blue-400" 
                  },
                  { 
                    icon: <Twitter className="h-5 w-5" />, 
                    href: "https://twitter.com/rupasurf", 
                    label: "Twitter",
                    color: "hover:bg-sky-500/20 hover:text-sky-400" 
                  },
                  { 
                    icon: <Youtube className="h-5 w-5" />, 
                    href: "https://youtube.com/rupasurf", 
                    label: "YouTube",
                    color: "hover:bg-red-500/20 hover:text-red-400" 
                  },
                  { 
                    icon: <Linkedin className="h-5 w-5" />, 
                    href: "https://linkedin.com/company/rupasurf", 
                    label: "LinkedIn",
                    color: "hover:bg-blue-600/20 hover:text-blue-300" 
                  }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -5, 5, 0],
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`bg-white/10 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-white/20 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 sm:order-2 text-center sm:text-right"
            >
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2 text-lg">Quick Contact</h4>
                <div className="flex flex-col sm:items-end gap-2">
                  <motion.a
                    href="tel:+94701234567"
                    whileHover={{ scale: 1.05 }}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    +94 (70) 123-4567
                  </motion.a>
                  <motion.a
                    href="mailto:contact@rupasurf.com"
                    whileHover={{ scale: 1.05 }}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    contact@rupasurf.com
                  </motion.a>
                </div>
              </div>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary/20 hover:bg-primary/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-primary/30 text-primary"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
          
          {/* Bottom Copyright Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="pt-6 sm:pt-8 border-t border-white/10"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="text-sm sm:text-base text-white/70 text-center lg:text-left">
                © {new Date().getFullYear()} Rupa's Surf Resort. All rights reserved.
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 text-sm sm:text-base">
                <Link 
                  href="/privacy" 
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/cookies" 
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
                <Link 
                  href="/sitemap" 
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Developer Credit Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 200 }}
          className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 sm:px-6 py-3 sm:py-4 border border-white/20"
            >
              <span className="text-sm sm:text-base text-white">
                Developed with
              </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-red-500 text-red-500" />
              </motion.div>
              <span className="text-sm sm:text-base text-white/90">by</span>
              <motion.a 
                href="https://trimids.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  color: "rgb(59 130 246)"
                }}
                className="text-primary hover:text-primary/80 font-bold text-sm sm:text-base transition-all duration-300 relative"
              >
                <Image 
                  src="/trimids.png"
                  alt="TRIMIDS Logo"
                  width={100}
                  height={30}
                  className="w-auto h-[16px] sm:h-[20px] md:h-[20px]"
                  priority
                />
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button (Mobile) */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 lg:hidden"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
