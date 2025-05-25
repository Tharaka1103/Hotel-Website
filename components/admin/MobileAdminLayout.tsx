'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileAdminLayoutProps {
  children: React.ReactNode;
}

export default function MobileAdminLayout({ children }: MobileAdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <AdminSidebar collapsed={false} onToggle={() => {}} />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Hotel Admin</span>
          </div>
          
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <AdminSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <AdminHeader sidebarCollapsed={sidebarCollapsed} />
        
        <main 
          className={cn(
            'transition-all duration-300 pt-16',
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          )}
        >
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <main className="pt-16">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}