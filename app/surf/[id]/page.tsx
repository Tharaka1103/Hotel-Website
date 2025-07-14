'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Waves,
  CheckCircle2,
  Copy,
  Share2,
  ArrowLeft,
  Star,
  Clock,
  ExternalLink,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Sunrise,
  Sunset,
  Camera,
  Mountain,
  TreePine,
  Fish,
  Gamepad2,
  Music,
  Shield,
  Heart,
  Zap,
  Gift,
  Home,
  Bed,
  Users,
  DollarSign,
  FileText,
  Download,
  AlertCircle,
  Info,
  Tag,
  Package
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// PDF generation imports
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';

interface BookingDetails {
  _id: string;
  bookingId: string;
  packageId: string;
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  personCount: number;
  roomType: 'room' | 'dorm' | 'single' | 'family';
  roomNumbers: number[];
  bedNumbers: number[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
  totalPrice: number;
  pricePerPerson: number;
  basePackagePrice: number;
  doubleRoomPrice?: number;
  dormRoomPrice?: number;
  singleRoomPrice?: number;
  familyRoomPrice?: number;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;
  
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching booking details for ID:', bookingId);
      
      const response = await fetch(`/api/bookings/${bookingId}`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Booking data received:', data);
        setBooking(data.booking);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.error || 'Booking not found');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyBookingLink = async () => {
    const bookingUrl = `${window.location.origin}/surf/${bookingId}`;
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast.success('Booking link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareBooking = async () => {
    const bookingUrl = `${window.location.origin}/surf/${bookingId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Surf Paradise Booking - ${booking?.bookingId}`,
          text: `Booking confirmation for ${booking?.customerName}`,
          url: bookingUrl
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      copyBookingLink();
    }
  };

  const downloadBookingPDF = async () => {
    if (!booking) return;
    
    try {
      setGeneratingPDF(true);
      toast.info('Generating PDF...');

      // Create new PDF document
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Colors
      const primaryColor = [59, 130, 246]; // Blue
      const secondaryColor = [16, 185, 129]; // Green
      const textColor = [31, 41, 55]; // Gray-800
      const lightGray = [243, 244, 246]; // Gray-100
      
      let yPosition = 20;
      
      // Header Background
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      // Company Logo/Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text("Rupa's Surf Camp", 20, 25);
      
      // Booking Status
      const statusX = pageWidth - 60;
      const statusColor = booking.status === 'confirmed' ? secondaryColor : [234, 179, 8];
      doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.rect(statusX, 10, 50, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(booking.status.toUpperCase(), statusX + 25, 22, { align: 'center' });
      
      yPosition = 60;
      
      // Booking Confirmation Title
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('BOOKING CONFIRMATION', 20, yPosition);
      
      yPosition += 15;
      
      // Booking ID
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(`Booking ID: ${booking.bookingId}`, 20, yPosition);
      
      yPosition += 10;
      
      // Generation Date
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, 20, yPosition);
      
      yPosition += 20;
      
      // Customer Information Section
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOMER INFORMATION', 25, yPosition + 5);
      
      yPosition += 15;
      
      // Customer Details
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      const customerInfo = [
        ['Name:', booking.customerName],
        ['Email:', booking.customerEmail],
        ['Phone:', booking.customerPhone],
        ['Booking Date:', formatDate(booking.bookingDate)]
      ];
      
      customerInfo.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 70, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Package Information Section
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PACKAGE DETAILS', 25, yPosition + 5);
      
      yPosition += 15;
      
      // Package Title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(booking.packageTitle, 25, yPosition);
      
      yPosition += 10;
      
      // Package Description
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const splitDescription = doc.splitTextToSize(booking.packageDescription, pageWidth - 50);
      doc.text(splitDescription, 25, yPosition);
      yPosition += splitDescription.length * 5 + 5;
      
      // Booking Details
      const bookingDetails = [
        ['Duration:', '7 Days / 6 Nights'],
        ['Check-in:', formatDate(booking.checkInDate)],
        ['Check-out:', formatDate(booking.checkOutDate)],
        ['Persons:', booking.personCount.toString()],
        ['Accommodation:', booking.roomType === 'room' 
          ? `Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')}`
          : `Dorm - Bed${booking.bedNumbers.length > 1 ? 's' : ''} ${booking.bedNumbers.join(', ')}`
        ]
      ];
      
      bookingDetails.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 70, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Package Features
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PACKAGE INCLUSIONS', 25, yPosition + 5);
      
      yPosition += 15;
      
      // Features List
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      
      booking.packageFeatures.forEach((feature, index) => {
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(`• ${feature}`, 25, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
      
      // Check if we need a new page for pricing
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Pricing Section
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PRICING BREAKDOWN', 25, yPosition + 5);
      
      yPosition += 20;
      
      // Pricing Table
      const roomTypeText = booking.roomType === 'room' ? 'Double Room' : booking.roomType === 'single' ? 'Single Room' : booking.roomType === 'family' ? 'Family Room' : 'Dorm Room';
      const pricingData = [
        ['Package', booking.packageTitle],
        ['Accommodation Type', roomTypeText],
        ['Price per Person', `$${booking.pricePerPerson}`],
        ['Number of Persons', booking.personCount.toString()],
        ['Subtotal', `$${booking.pricePerPerson * booking.personCount}`],
        ['Total Amount', `$${booking.totalPrice}`]
      ];
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(10);
      
      pricingData.forEach(([label, value], index) => {
        const isTotal = index === pricingData.length - 1;
        
        if (isTotal) {
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(20, yPosition - 3, pageWidth - 40, 10, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setFont('helvetica', 'normal');
        }
        
        doc.text(label, 25, yPosition);
        doc.text(value, pageWidth - 25, yPosition, { align: 'right' });
        yPosition += isTotal ? 15 : 8;
      });
      
      yPosition += 10;
      
      // Admin Notes (if available)
      if (booking.adminNotes) {
        doc.setFillColor(251, 146, 60); // Orange
        doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('IMPORTANT NOTES', 25, yPosition + 5);
        
        yPosition += 15;
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitNotes = doc.splitTextToSize(booking.adminNotes, pageWidth - 50);
        doc.text(splitNotes, 25, yPosition);
        yPosition += splitNotes.length * 5 + 15;
      }
      
      // Check if we need a new page for the footer section
      if (yPosition > pageHeight - 120) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Contact Information
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CONTACT INFORMATION', 25, yPosition + 5);
      
      yPosition += 15;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const contactInfo = [
        'Surf Paradise Resort, Arugam Bay, Sri Lanka',
        'Phone: +94 77 123 4567',
        'Email: info@surfparadise.com',
        'Website: www.rufassurf.com'
      ];
      
      contactInfo.forEach((info) => {
        doc.text(info, 25, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Terms and Conditions
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TERMS & CONDITIONS', 25, yPosition + 5);
      
      yPosition += 15;
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      
      const terms = [
        '• Check-in time: 2:00 PM on Sunday | Check-out time: 11:00 AM on Sunday',
        '• Cancellation policy: Free cancellation up to 7 days before check-in',
        '• Full payment required at time of booking confirmation',
        '• Valid ID required at check-in',
        '• Surfing activities are subject to weather conditions',
        '• Age restriction: Minimum 16 years for surf lessons',
        '• Travel insurance is recommended for all guests',
        '• Surf Paradise reserves the right to modify itinerary due to weather conditions'
      ];
      
      terms.forEach((term) => {
        if (yPosition > pageHeight - 15) {
          doc.addPage();
          yPosition = 20;
        }
        
        const splitTerm = doc.splitTextToSize(term, pageWidth - 50);
        doc.text(splitTerm, 25, yPosition);
        yPosition += splitTerm.length * 4 + 2;
      });
      
      yPosition += 10;
      
      // Generate QR Code for booking link
      const bookingUrl = `${window.location.origin}/surf/${bookingId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(bookingUrl, {
        width: 100,
        margin: 2,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF'
        }
      });
      
      // QR Code Section
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('BOOKING VERIFICATION', 25, yPosition + 5);
      
      yPosition += 15;
      
      // Add QR Code
      doc.addImage(qrCodeDataUrl, 'PNG', 25, yPosition, 30, 30);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Scan QR code to view booking online', 60, yPosition + 8);
      doc.text('or visit:', 60, yPosition + 16);
      doc.setFont('helvetica', 'bold');
      doc.text(bookingUrl, 60, yPosition + 24);
      
      yPosition += 40;
      
      // Footer
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('© 2024 Surf Paradise Resort. All rights reserved.', pageWidth / 2, pageHeight - 12, { align: 'center' });
      doc.text('Thank you for choosing Surf Paradise for your surf adventure!', pageWidth / 2, pageHeight - 6, { align: 'center' });
      
      // Add page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
      }
      
      // Save the PDF
      const fileName = `Surf_Paradise_Booking_${booking.bookingId}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      toast.success('PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const getDaysUntilCheckIn = () => {
    if (!booking) return 0;
    const checkIn = new Date(booking.checkInDate);
    const today = new Date();
    const diffTime = checkIn.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <ExternalLink className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) 
      return <Wifi className="w-4 h-4 text-blue-500" />;
    if (lowerFeature.includes('parking') || lowerFeature.includes('car')) 
      return <Car className="w-4 h-4 text-gray-600" />;
    if (lowerFeature.includes('breakfast') || lowerFeature.includes('coffee')) 
      return <Coffee className="w-4 h-4 text-amber-600" />;
    if (lowerFeature.includes('restaurant') || lowerFeature.includes('dining')) 
      return <Utensils className="w-4 h-4 text-green-600" />;
    if (lowerFeature.includes('gym') || lowerFeature.includes('fitness')) 
      return <Dumbbell className="w-4 h-4 text-red-500" />;
    if (lowerFeature.includes('sunrise') || lowerFeature.includes('morning')) 
      return <Sunrise className="w-4 h-4 text-orange-500" />;
    if (lowerFeature.includes('sunset') || lowerFeature.includes('evening')) 
      return <Sunset className="w-4 h-4 text-purple-500" />;
    if (lowerFeature.includes('photo') || lowerFeature.includes('camera')) 
      return <Camera className="w-4 h-4 text-pink-500" />;
    if (lowerFeature.includes('mountain') || lowerFeature.includes('hiking')) 
      return <Mountain className="w-4 h-4 text-stone-600" />;
    if (lowerFeature.includes('forest') || lowerFeature.includes('nature')) 
      return <TreePine className="w-4 h-4 text-green-700" />;
    if (lowerFeature.includes('fishing') || lowerFeature.includes('fish')) 
      return <Fish className="w-4 h-4 text-blue-600" />;
    if (lowerFeature.includes('game') || lowerFeature.includes('entertainment')) 
      return <Gamepad2 className="w-4 h-4 text-indigo-500" />;
    if (lowerFeature.includes('music') || lowerFeature.includes('sound')) 
      return <Music className="w-4 h-4 text-violet-500" />;
    if (lowerFeature.includes('security') || lowerFeature.includes('safe')) 
      return <Shield className="w-4 h-4 text-emerald-600" />;
    if (lowerFeature.includes('24') || lowerFeature.includes('hour')) 
      return <Clock className="w-4 h-4 text-slate-600" />;
    if (lowerFeature.includes('spa') || lowerFeature.includes('wellness')) 
      return <Heart className="w-4 h-4 text-rose-500" />;
    if (lowerFeature.includes('energy') || lowerFeature.includes('power')) 
      return <Zap className="w-4 h-4 text-yellow-500" />;
    if (lowerFeature.includes('gift') || lowerFeature.includes('bonus')) 
      return <Gift className="w-4 h-4 text-teal-500" />;
    if (lowerFeature.includes('beach') || lowerFeature.includes('ocean') || lowerFeature.includes('surf')) 
      return <Waves className="w-4 h-4 text-cyan-500" />;
    
    return <CheckCircle2 className="w-4 h-4 text-primary" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || 'The booking you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/surf">
              <Button className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const daysUntilCheckIn = getDaysUntilCheckIn();

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <Link href="/surf">
            <Button
              variant="outline"
              className="mb-4 sm:mb-0 flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Packages
            </Button>
          </Link>
          <div className="text-center sm:text-right">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary flex items-center gap-2">
              <Waves className="w-6 h-6 sm:w-8 sm:h-8" />
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mt-2">Your surf adventure awaits</p>
          </div>
        </div>

        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <p className="text-lg sm:text-xl text-green-600 font-semibold">
            Booking ID: {booking.bookingId}
          </p>
          <div className="mt-2">
            <Badge 
              className={`${getStatusColor(booking.status)} border flex items-center gap-2 w-fit mx-auto`}
            >
              {getStatusIcon(booking.status)}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-semibold">{booking.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm break-all">{booking.customerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold">{booking.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Date</p>
                        <p className="font-semibold">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Package className="w-5 h-5" />
                  Package Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Waves className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Package Selected</p>
                      <h3 className="font-bold text-xl text-primary">{booking.packageTitle}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{booking.packageDescription}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Selected Room Type</p>
                      <p className="text-xl font-bold text-blue-900">
                        {booking.roomType === 'room' ? 'Double Room' : booking.roomType === 'single' ? 'Single Room' : booking.roomType === 'family' ? 'Family Room' : 'Dorm Room'}
                      </p>
                      <p className="text-xs text-blue-600">
                        ${booking.pricePerPerson} per person
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Total Price</p>
                      <p className="text-xl font-bold text-green-900">${booking.totalPrice}</p>
                      <p className="text-xs text-green-600">
                        for {booking.personCount} person{booking.personCount > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Room Type Pricing Info */}
                  {booking.doubleRoomPrice && booking.dormRoomPrice && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Pricing Options:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className={`p-2 rounded ${booking.roomType === 'room' ? 'bg-blue-100 border border-blue-300' : 'bg-white'}`}>
                          <span className="font-medium">Double Room:</span> ${booking.doubleRoomPrice}/person
                          {booking.roomType === 'room' && <span className="text-blue-600 ml-1">(Selected)</span>}
                        </div>
                        <div className={`p-2 rounded ${booking.roomType === 'dorm' ? 'bg-blue-100 border border-blue-300' : 'bg-white'}`}>
                          <span className="font-medium">Dorm Room:</span> ${booking.dormRoomPrice}/person
                          {booking.roomType === 'dorm' && <span className="text-blue-600 ml-1">(Selected)</span>}
                        </div>
                        {booking.singleRoomPrice && (
                          <div className={`p-2 rounded ${booking.roomType === 'single' ? 'bg-blue-100 border border-blue-300' : 'bg-white'}`}>
                            <span className="font-medium">Single Room:</span> ${booking.singleRoomPrice}/person
                            {booking.roomType === 'single' && <span className="text-blue-600 ml-1">(Selected)</span>}
                          </div>
                        )}
                        {booking.familyRoomPrice && (
                          <div className={`p-2 rounded ${booking.roomType === 'family' ? 'bg-blue-100 border border-blue-300' : 'bg-white'}`}>
                            <span className="font-medium">Family Room:</span> ${booking.familyRoomPrice}/person
                            {booking.roomType === 'family' && <span className="text-blue-600 ml-1">(Selected)</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="w-5 h-5" />
                  Stay Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Number of Guests</p>
                        <p className="font-semibold">{booking.personCount} person{booking.personCount > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">7 Days / 6 Nights</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-semibold">{formatDate(booking.checkInDate)}</p>
                        <p className="text-xs text-muted-foreground">2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-semibold">{formatDate(booking.checkOutDate)}</p>
                        <p className="text-xs text-muted-foreground">11:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accommodation Details */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    {booking.roomType === 'room' ? (
                      <Home className="w-5 h-5 text-blue-600" />
                    ) : booking.roomType === 'single' ? (
                      <User className="w-5 h-5 text-blue-600" />
                    ) : booking.roomType === 'family' ? (
                      <Users className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Bed className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-semibold text-blue-800">
                      {booking.roomType === 'room' ? 'Private Room(s)' : booking.roomType === 'single' ? 'Single Room(s)' : booking.roomType === 'family' ? 'Family Room(s)' : 'Dorm Accommodation'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-blue-700 text-sm">
                      {booking.roomType === 'room' 
                        ? `Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')} - ${booking.roomNumbers.length * 2} beds total`
                        : booking.roomType === 'single'
                        ? `Single Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')} - ${booking.roomNumbers.length * 1} bed total`
                        : booking.roomType === 'family'
                        ? `Family Room${booking.roomNumbers.length > 1 ? 's' : ''} ${booking.roomNumbers.join(', ')} - ${booking.roomNumbers.length * 4} beds total`
                        : `Bed${booking.bedNumbers.length > 1 ? 's' : ''} ${booking.bedNumbers.join(', ')} in shared dorm`
                      }
                    </p>
                    <div className="flex items-center gap-4 text-xs text-blue-600">
                      <span>• Private bathroom</span>
                      <span>• Air conditioning</span>
                      <span>• Free WiFi</span>
                      <span>• Daily housekeeping</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Features */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="w-5 h-5" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {booking.packageFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background hover:shadow-md transition-shadow rounded-lg border">
                      {getFeatureIcon(feature)}
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            {booking.adminNotes && (
              <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <AlertCircle className="w-5 h-5" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">{booking.adminNotes}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary to-cyan-600 text-white sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Total Amount</h3>
                  <div className="text-4xl font-bold">${booking.totalPrice}</div>
                  <p className="text-blue-100 text-sm mt-2">7-day surf adventure</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Package</span>
                    <span className="font-semibold">{booking.packageTitle}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Room Type</span>
                    <span className="font-semibold">
                      {booking.roomType === 'room' ? 'Double Room' : booking.roomType === 'single' ? 'Single Room' : booking.roomType === 'family' ? 'Family Room' : 'Dorm Room'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Price per person</span>
                    <span className="font-semibold">${booking.pricePerPerson}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Number of persons</span>
                    <span className="font-semibold">{booking.personCount}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Duration</span>
                    <span className="font-semibold">7 Days</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Accommodation</span>
                    <span className="font-semibold">
                      {booking.roomType === 'room' 
                        ? `${booking.roomNumbers.length} Room${booking.roomNumbers.length > 1 ? 's' : ''}`
                        : `${booking.bedNumbers.length} Bed${booking.bedNumbers.length > 1 ? 's' : ''}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg">${booking.totalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Countdown to Check-in */}
            {daysUntilCheckIn > 0 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-2">Check-in Countdown</h3>
                  <div className="text-3xl font-bold mb-2">{daysUntilCheckIn}</div>
                  <p className="text-sm text-orange-100">
                    {daysUntilCheckIn === 1 ? 'day' : 'days'} until your surf adventure begins!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Booking Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={downloadBookingPDF}
                  disabled={generatingPDF}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 flex items-center gap-2"
                >
                  {generatingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </>
                  )}
                </Button>
                <Button
                  onClick={copyBookingLink}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <Button
                  onClick={shareBooking}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Booking
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-100 to-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                  <Info className="w-5 h-5 text-primary" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">+94 (76) 233-2335</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">rupassurfcamp@gmail.com</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Contact us if you have any questions about your booking or need to make changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
