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
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact Us", href: "/#contact" }
    ]
  },
  {
    title: "Information",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cancellation Policy", href: "/cancellation" }
    ]
  },
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12">
                <Image 
                  src="/logo.png"
                  alt="Rupa's Surf Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <p className="text-xl font-bold text-white tanHeading">Rupa's Surf Camp</p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-sm">Beach road, Arugam Bay, Sri Lanka, 32500</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="tel:+94701234567" className="text-sm hover:text-blue-400 transition-colors">
                  +94 (76) 233-2335
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="mailto:rupassurfcamp@gmail.com" className="text-sm hover:text-blue-400 transition-colors">
                  rupassurfcamp@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-sm">24/7 Customer Support</span>
              </div>
            </div>
          </div>
          
          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-blue-500/20 p-2.5 rounded-full transition-all duration-200 group"
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
        
        <Separator className="my-8 bg-gray-700" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Rupa's Surf Resort. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
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
    </footer>
  );
};

export default Footer;
