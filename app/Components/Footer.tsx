"use client"
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp,
  Youtube,
  Linkedin,
  Clock,
  Star,
  Award,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = [
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
  },
  {
    title: "Services",
    links: [
      { label: "Surf Lessons", href: "/surf-lessons" },
      { label: "Equipment Rental", href: "/equipment" },
      { label: "Accommodation", href: "/rooms" },
      { label: "Restaurant", href: "/restaurant" },
      { label: "Spa & Wellness", href: "/spa" }
    ]
  }
];

const socialLinks = [
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 lg:h-16 lg:w-16">
                <Image 
                  src="/logo.png"
                  alt="Rupa's Surf Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-white tanHeading">Rupa's Surf Camp</p>
              </div>
            </div>
            
            <p className="text-gray-300 max-w-md leading-relaxed">
              Experience the perfect blend of luxury and adventure at our oceanfront surf resort, where every wave tells a story.
            </p>
            
            {/* Awards */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                <Award className="h-4 w-4" />
                <span>ISA Certified</span>
              </div>
            </div>
          </div>
          
          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        {/* Contact & Social Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-sm">Beach road, Arugam Bay, Sri Lanka, 32500</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="tel:+94701234567" className="text-sm hover:text-blue-400 transition-colors">
                  +94 (76) 233-2335
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="mailto:contact@rupasurf.com" className="text-sm hover:text-blue-400 transition-colors">
                  rupassurfcamp@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-sm">24/7 Customer Support</span>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-blue-500/20 p-3 rounded-full transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <div className="text-gray-300 group-hover:text-blue-400 transition-colors">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Rupa's Surf Resort. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          {/* Developer Credit */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                <span>Developed with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </motion.div>
                <span>by</span>
                <motion.a 
                  href="https://trimids.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  <Image 
                    src="/trimids.png"
                    alt="TRIMIDS Logo"
                    width={80}
                    height={20}
                    className="w-auto h-[16px]"
                    priority
                  />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
