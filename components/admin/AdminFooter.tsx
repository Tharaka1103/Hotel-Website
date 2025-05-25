'use client';

import { Shield, Heart } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Brand */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-blue-600" />
          <span>Admin Panel</span>
          <span className="text-gray-400">•</span>
          <span>Rupa&apos;s Serf Hotel</span>
        </div>

        {/* Center - Quick Stats or Info */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-gray-500">
          <span>System Status: <span className="text-green-600 font-medium">Online</span></span>
          <span>Version: 1.0.0</span>
          <span>Last Update:  {new Date().toLocaleTimeString()}</span>
        </div>

        {/* Right side - Copyright */}
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <span>&copy; {currentYear} Developed with</span>
          <Heart className="h-4 w-4 text-red-500 fill-current" />
          <span>by TRIMIDS Innovations</span>
        </div>
      </div>

      {/* Mobile version - simplified */}
      <div className="md:hidden mt-2 pt-2 border-t border-gray-100">
        <div className="text-center text-xs text-gray-500">
          &copy; {currentYear} Rupa&apos;s Serf Hotel Admin Panel
        </div>
      </div>
    </footer>
  );
}