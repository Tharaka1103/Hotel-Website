'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  Calendar,
  Settings,
  MessageSquare,
  FileText,
  Box,
  Shield,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  User,
  ExternalLink,
  Loader2,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ThemeSwitch } from '@/app/Components/ThemeSwitch';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

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

const menuItems = [
  {
    title: 'Dashboard',
    href: '/adminDashboard',
    icon: BarChart3,
    badge: null,
    type: 'link',
    description: 'Overview & Analytics'
  },
  {
    title: 'Admins',
    href: '/admins',
    icon: Users,
    badge: 'admins',
    type: 'link',
    description: 'Manage Admin Users'
  },
  {
    title: 'Packages',
    href: '/packages',
    icon: Box,
    badge: 'packages',
    type: 'link',
    description: 'Surf Packages & Pricing'
  },
  {
    title: 'Bookings',
    href: '/bookings',
    icon: Calendar,
    badge: 'bookings',
    type: 'link',
    description: 'Customer Reservations'
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: 'notifications',
    type: 'link',
    description: 'System Alerts & Messages'
  },
  {
    title: 'Reviews',
    href: '/reviews',
    icon: MessageSquare,
    badge: 'reviews',
    type: 'link',
    description: 'Customer Feedback'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    badge: null,
    type: 'link',
    description: 'Analytics & Reports'
  }
];

export default function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [counts, setCounts] = useState<Counts>({ 
    admins: 0, 
    packages: 0, 
    bookings: 0, 
    reviews: 0, 
    notifications: 3 
  });
  const [loggingOut, setLoggingOut] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCurrentAdmin();
    fetchCounts();
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      // Fetch admins count
      const adminsResponse = await fetch('/api/admin/list');
      const adminsData = await adminsResponse.json();
      
      // Fetch packages count
      const packagesResponse = await fetch('/api/packages');
      const packagesData = await packagesResponse.json();
      
      // Fetch bookings count
      const bookingsResponse = await fetch('/api/bookings');
      const bookingsData = await bookingsResponse.json();
      
      setCounts({
        admins: adminsData.success ? adminsData.admins?.length || 0 : 0,
        packages: packagesData.packages?.length || 0,
        bookings: bookingsData.bookings?.length || 0,
        reviews: 15, // Static for now
        notifications: 3 // Static for now
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

  // Mobile Header Component
  if (isMobile && collapsed) {
    return (
      <>
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">Admin Portal</span>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Quick Theme Toggle */}
            <ThemeSwitch/>
            
            {/* Notifications Badge */}
            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
              <Bell className="w-4 h-4" />
              {counts.notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {counts.notifications}
                </span>
              )}
            </Button>
            
            {/* Admin Avatar */}
            {currentAdmin && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm">
                  {currentAdmin.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </header>

        {/* Floating Action Button */}
        <Button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          size="sm"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </>
    );
  }

  // Desktop/Tablet Sidebar or Mobile Drawer
  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      <aside 
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-card border-r transition-all duration-300 ease-in-out shadow-xl',
          isMobile 
            ? collapsed 
              ? '-translate-x-full w-80' 
              : 'translate-x-0 w-80'
            : collapsed 
              ? 'w-16 lg:w-20' 
              : 'w-64 lg:w-80'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-center justify-between p-3 lg:p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
            {(!collapsed || isMobile) && (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Portal
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground font-medium">System Online</span>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 hover:bg-muted/50"
            >
              {isMobile ? (
                <X className="w-5 h-5" />
              ) : collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* User Profile Section */}
          {currentAdmin && (
            <div className="p-3 lg:p-4 border-b">
              {collapsed && !isMobile ? (
                <div className="flex justify-center">
                  <Avatar className="h-8 w-8 lg:h-10 lg:w-10 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600  font-semibold text-sm">
                      {currentAdmin.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="space-y-3">
                  <div 
                    className="flex items-center space-x-3 p-3 rounded-xl bg-background cursor-pointer hover:bg-primary transition-all duration-200 border"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    <Avatar className="h-12 w-12 lg:h-14 lg:w-14 ring-2 ring-primary/20 shadow-md">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg">
                        {currentAdmin.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm lg:text-base font-semibold truncate text-foreground">
                        {currentAdmin.name}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground truncate">
                        {currentAdmin.email}
                      </p>
                      <Badge 
                        variant={currentAdmin.role === 'super_admin' ? 'default' : 'secondary'}
                        className="text-xs mt-1 font-medium"
                      >
                        {currentAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </Badge>
                    </div>
                    {showProfile ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  
                  {showProfile && (
                    <div className="space-y-2 pl-3">
                      <Button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs lg:text-sm text-red-600 border border-red-600 hover:text-white hover:bg-red-600"
                      >
                        {loggingOut ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4 mr-2" />
                        )}
                        {loggingOut ? 'Logging out...' : 'Logout'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
            {(!collapsed || isMobile) && (
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Navigation</h4>
            )}
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const badgeCount = getBadgeCount(item.badge);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center bg-background border border-green-200 space-x-3 px-3 lg:px-4 py-3 lg:py-4 rounded-xl transition-all duration-200 group relative hover:bg-muted/50',
                    isActive 
                      ? 'bg-green-200 text-primary border border-primary/20 shadow-sm' 
                      : 'hover:bg-muted/50'
                  )}
                >
                  <div className={cn(
                    'p-2 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted/50 text-muted-foreground group-hover:bg-muted'
                  )}>
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  
                  {(!collapsed || isMobile) && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm lg:text-base">{item.title}</span>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                        {badgeCount !== null && badgeCount > 0 && (
                          <Badge 
                            variant={isActive ? 'default' : 'secondary'} 
                            className="text-xs font-medium"
                          >
                            {badgeCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {collapsed && !isMobile && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-popover border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      <div className="space-y-1">
                        <span className="text-sm font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        {badgeCount !== null && badgeCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {badgeCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Quick Actions */}
          {(!collapsed || isMobile) && (
            <div className="p-3 lg:p-4 border-b">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <ThemeSwitch/>
                
                <Link href="/" target="_blank">
                  <Button variant="outline" size="sm" className="w-full h-10 text-xs lg:text-sm hover:bg-muted/50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Site
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Footer Section */}
          <div className="border-t p-3 lg:p-4">
            {(!collapsed || isMobile) && (
              <div className="text-center space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Admin Panel v2.1.0</p>
                <p className="text-xs text-muted-foreground">© 2024 Hotel Management System</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">All systems operational</span>
                </div>
              </div>
            )}
            
            {collapsed && !isMobile && (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground/20 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
