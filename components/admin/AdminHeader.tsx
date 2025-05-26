'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LogOut, 
  Bell, 
  ExternalLink,
  Loader2,
  User,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Box,
  Shield,
  Home
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeSwitch } from '@/app/Components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Counts {
  admins: number;
  packages: number;
  bookings: number;
  reviews: number;
  notifications: number;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/adminDashboard',
    icon: BarChart3,
    badge: null,
    description: 'Overview & Analytics'
  },
  {
    title: 'Admins',
    href: '/admins',
    icon: Users,
    badge: 'admins',
    description: 'Manage Admin Users'
  },
  {
    title: 'Packages',
    href: '/packages',
    icon: Box,
    badge: 'packages',
    description: 'Surf Packages & Pricing'
  },
  {
    title: 'Bookings',
    href: '/bookings',
    icon: Calendar,
    badge: 'bookings',
    description: 'Customer Reservations'
  },
  {
    title: 'Reviews',
    href: '/reviews',
    icon: MessageSquare,
    badge: 'reviews',
    description: 'Customer Feedback'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    badge: null,
    description: 'Analytics & Reports'
  }
];

export default function AdminHeader() {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [counts, setCounts] = useState<Counts>({ 
    admins: 0, 
    packages: 0, 
    bookings: 0, 
    reviews: 0, 
    notifications: 3 
  });
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchCurrentAdmin();
    fetchCounts();
  }, []);

  const fetchCurrentAdmin = async () => {
    try {
      const response = await fetch('/api/admin/me');
      const data = await response.json();
      if (data.success) {
        setCurrentAdmin(data.admin);
      } else {
        router.push('/adminLogin');
      }
    } catch (error) {
      console.error('Error fetching current admin:', error);
      router.push('/adminLogin');
    }
  };

  const fetchCounts = async () => {
    try {
      const [adminsResponse, packagesResponse, bookingsResponse] = await Promise.all([
        fetch('/api/admin/list'),
        fetch('/api/packages'),
        fetch('/api/bookings')
      ]);

      const [adminsData, packagesData, bookingsData] = await Promise.all([
        adminsResponse.json(),
        packagesResponse.json(),
        bookingsResponse.json()
      ]);

      setCounts({
        admins: adminsData.success ? adminsData.admins?.length || 0 : 0,
        packages: packagesData.packages?.length || 0,
        bookings: bookingsData.bookings?.length || 0,
        reviews: 15,
        notifications: 3
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const response = await fetch('/api/admin/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (typeof window !== 'undefined') {
          localStorage.clear();
          sessionStorage.clear();
        }
        
        router.push('/adminLogin');
        router.refresh();
      } else {
        console.error('Logout failed:', data.error);
        router.push('/adminLogin');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/adminLogin');
    } finally {
      setLoggingOut(false);
    }
  };

  const getBadgeCount = (badgeType: string | null) => {
    if (!badgeType) return null;
    return counts[badgeType as keyof Counts];
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const badgeCount = getBadgeCount(item.badge);
              const active = isActive(item.href);
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "relative h-10 px-4 transition-all duration-200",
                      active 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "hover:bg-muted/80"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span className="hidden xl:inline">{item.title}</span>
                    {badgeCount !== null && badgeCount > 0 && (
                      <Badge 
                        variant={active ? "secondary" : "default"} 
                        className="ml-2 text-xs h-5 min-w-5 flex items-center justify-center"
                      >
                        {badgeCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Quick Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm" className="h-9">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">View Site</span>
                </Button>
              </Link>
              
              <ThemeSwitch />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                  <Bell className="w-4 h-4" />
                  {counts.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {counts.notifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary" className="text-xs">
                    {counts.notifications} new
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New booking received</p>
                      <p className="text-xs text-muted-foreground">Ocean View Suite - Room 205</p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment confirmed</p>
                      <p className="text-xs text-muted-foreground">$299.00 received</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Profile */}
            {currentAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-9 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs">
                        {currentAdmin.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium truncate max-w-24 lg:max-w-32">
                        {currentAdmin.name}
                      </p>
                    </div>
                    <ChevronDown className="h-3 w-3 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{currentAdmin.name}</p>
                      <p className="text-xs text-muted-foreground">{currentAdmin.email}</p>
                      <Badge 
                        variant={currentAdmin.role === 'super_admin' ? 'default' : 'secondary'}
                        className="text-xs w-fit mt-2"
                      >
                        {currentAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <Link href="/" target="_blank">
                    <DropdownMenuItem className="cursor-pointer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Hotel Site
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    {loggingOut ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4 mr-2" />
                    )}
                    {loggingOut ? 'Logging out...' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span>Admin Portal</span>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate through admin features
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const badgeCount = getBadgeCount(item.badge);
                      const active = isActive(item.href);
                      
                      return (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "flex items-center justify-between p-3 rounded-lg transition-colors",
                            active 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                          )}>
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5" />
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-xs opacity-80">{item.description}</p>
                              </div>
                            </div>
                            {badgeCount !== null && badgeCount > 0 && (
                              <Badge variant={active ? "secondary" : "default"} className="text-xs">
                                {badgeCount}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile Quick Actions */}
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeSwitch />
                    </div>
                    
                    <Link href="/" target="_blank">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Hotel Site
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
