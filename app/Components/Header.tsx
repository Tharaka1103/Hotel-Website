"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "./ThemeSwitch";
// Navigation links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/surf", label: "Surf Lessons" },
  { href: "/rooms", label: "Accommodation" },
  { href: "/tours", label: "Tours & Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-background backdrop-blur-md py-2 shadow-md" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">R</div>
              </div>
              <div className={cn(
                "transition-all duration-300",
                scrolled ? "text-primary" : "text-white"
              )}>
                <h1 className="text-xl font-bold">Rupa&apos;s Surf</h1>
                <p className="text-xs -mt-1 opacity-90">by rupa</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  scrolled 
                    ? "hover:bg-primary hover:text-white hover:rounded-full" 
                    : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Call to Action Button and Theme Switch */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitch />
            <Button 
              className={cn(
                "rounded-full transition-all duration-300",
                scrolled 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20"
              )}
            >
              Book Now
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={cn("h-6 w-6", scrolled ? "text-gray-800" : "text-white")} />
              ) : (
                <Menu className={cn("h-6 w-6", scrolled ? "text-gray-800" : "text-white")} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-full mt-4">
                  Book Now
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
