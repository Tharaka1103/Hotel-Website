"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Navigation links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/surf", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about-us", label: "About Us" },
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
                <Image
                  src="/logo.png"
                  alt="Rupa's Surf House Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 uppercase absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-white  text-md font-normal transition-colors duration-200",
                  scrolled 
                    ? "hover:bg-primary hover:text-white hover:rounded-full text-text" 
                    : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Call to Action Button and Theme Switch */}
          <div className="hidden md:flex items-center space-x-4 ">
            <Link href="/contact" className="text-md font-medium">
              <Button 
                className={cn(
                  "rounded-full transition-all duration-300 text-md uppercase",
                  scrolled 
                    ? "bg-primary hover:bg-blue-600" 
                    : "bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20"
                )}
              >
                Contact Us
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={cn("h-6 w-6", scrolled ? "text-text" : "text-white")} />
              ) : (
                <Menu className={cn("h-6 w-6", scrolled ? "text-text" : "text-white")} />
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
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-primary px-3 py-2 rounded-md text-base text-text font-medium hover:bg-blue-50"
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" className="text-xl font-medium">
                  <Button className="bg-primary hover:bg-blue-600 rounded-full mt-4">
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
