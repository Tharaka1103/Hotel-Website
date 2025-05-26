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
  Home,
  Check,
  CheckCheck,
  Trash2
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

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  bookingId?: {
    _id: string;
    customerName: string;
    roomNumber: number;
  };
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
    notifications: 0 
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchCurrentAdmin();
    fetchCounts();
    fetchNotifications();
    
    // Set up polling for real-time notification updates
    const interval = setInterval(() => {
      fetchNotificationCount();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
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

      setCounts(prev => ({
        ...prev,
        admins: adminsData.success ? adminsData.admins?.length || 0 : 0,
        packages: packagesData.packages?.length || 0,
        bookings: bookingsData.bookings?.length || 0,
        reviews: 15
      }));
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch('/api/notifications/count');
      const data = await response.json();
      setCounts(prev => ({
        ...prev,
        notifications: data.count
      }));
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?limit=10');
      const data = await response.json();
      setNotifications(data.notifications || []);
      
      // Update notification count
      const unreadCount = data.notifications?.filter((n: Notification) => !n.isRead).length || 0;
      setCounts(prev => ({
        ...prev,
        notifications: unreadCount
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?action=markRead&id=${notificationId}`, {
        method: 'PUT',
      });
      
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      
      setCounts(prev => ({
        ...prev,
        notifications: Math.max(0, prev.notifications - 1)
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await fetch('/api/notifications?action=markAllRead', {
        method: 'PUT',
      });
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      
      setCounts(prev => ({
        ...prev,
        notifications: 0
      }));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?id=${notificationId}`, {
        method: 'DELETE',
      });
      
      const deletedNotification = notifications.find(n => n._id === notificationId);
      setNotifications(prev =>
        prev.filter(notif => notif._id !== notificationId)
      );
      
      if (deletedNotification && !deletedNotification.isRead) {
        setCounts(prev => ({
          ...prev,
          notifications: Math.max(0, prev.notifications - 1)
        }));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking_created': return '🏨';
      case 'booking_updated': return '✏️';
      case 'booking_cancelled': return '❌';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            {/* Center Section - Navigation */}
            <nav className="flex items-center space-x-2 bg-muted/30 rounded-full p-2 border">
              {navigationItems.map((item) => {
                const badgeCount = getBadgeCount(item.badge);
                const active = isActive(item.href);
                
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={cn(
                      "relative flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all duration-300 group",
                      active 
                        ? "bg-primary text-white shadow-lg scale-105" 
                        : "hover:bg-background/80 hover:shadow-md"
                    )}>
                      <item.icon className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        active ? "scale-110" : "group-hover:scale-105"
                      )} />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.title}
                      </span>
                      {badgeCount !== null && badgeCount > 0 && (
                        <Badge 
                          variant={active ? "secondary" : "default"} 
                          className="text-xs h-5 min-w-5 flex items-center justify-center animate-pulse"
                        >
                          {badgeCount}
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Right Section - Actions & Profile */}
            <div className="flex items-center space-x-4">
              {/* Theme Switch */}
              <div className="flex items-center space-x-2">
                <ThemeSwitch />
              </div>

              {/* Enhanced Notifications */}
              <DropdownMenu open={notificationDropdownOpen} onOpenChange={setNotificationDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative h-10 w-10 rounded-full border hover:shadow-md transition-all duration-200"
                    onClick={() => {
                      if (!notificationDropdownOpen) {
                        fetchNotifications();
                      }
                    }}
                  >
                    <Bell className="w-4 h-4" />
                    {counts.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                        {counts.notifications > 99 ? '99+' : counts.notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-hidden">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <div className="flex items-center space-x-2">
                      {counts.notifications > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {counts.notifications} new
                        </Badge>
                      )}
                      {counts.notifications > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllNotificationsAsRead}
                          className="h-6 px-2 text-xs"
                        >
                          <CheckCheck className="w-3 h-3 mr-1" />
                          Mark all read
                        </Button>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification._id}
                          className={cn(
                            "p-3 border-b border hover:bg-muted/50 transition-colors",
                            !notification.isRead && "bg-card"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm">{getTypeIcon(notification.type)}</span>
                                <h4 className={cn(
                                  "text-sm font-medium truncate",
                                  !notification.isRead ? "text-foreground" : "text-muted-foreground"
                                )}>
                                  {notification.title}
                                </h4>
                                <span className={cn(
                                  "text-xs px-1.5 py-0.5 rounded-full",
                                  getPriorityColor(notification.priority)
                                )}>
                                  {notification.priority}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                                {notification.message}
                              </p>
                              {notification.bookingId && (
                                <p className="text-xs text-blue-600 mb-1">
                                  {notification.bookingId.customerName} - Room {notification.bookingId.roomNumber}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markNotificationAsRead(notification._id)}
                                  className="h-6 w-6 p-0 hover:bg-blue-500"
                                  title="Mark as read"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification._id)}
                                className="h-6 w-6 p-0 hover:bg-red-100 text-red-600"
                                title="Delete notification"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer justify-center"
                        onClick={() => {
                          setNotificationDropdownOpen(false);
                          router.push('/admin/notifications');
                        }}
                      >
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admin Profile Section */}
              {currentAdmin && (
                <div className="flex items-center space-x-3 bg-muted/30 rounded-full p-2 border">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm">
                      {currentAdmin.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">
                      {currentAdmin.name}
                    </p>
                    <Badge 
                      variant={currentAdmin.role === 'super_admin' ? 'default' : 'secondary'}
                      className="text-xs h-4 px-2 mt-1 w-fit"
                    >
                      {currentAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </div>

                  {/* Profile Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0 hover:bg-background/80">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{currentAdmin.name}</p>
                          <p className="text-xs text-muted-foreground">{currentAdmin.email}</p>
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
                </div>
              )}
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="flex lg:hidden items-center justify-end w-full">
            <ThemeSwitch/>
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Mobile Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative h-9 w-9 p-0"
                    onClick={() => fetchNotifications()}
                  >
                    <Bell className="w-4 h-4" />
                    {counts.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {counts.notifications > 9 ? '9+' : counts.notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <div className="flex items-center space-x-2">
                      {counts.notifications > 0 && (
                        <Badge variant="secondary" className="text-xs bg-red-600">
                          {counts.notifications} new
                        </Badge>
                      )}
                      {counts.notifications > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllNotificationsAsRead}
                          className="h-6 px-2 text-xs"
                        >
                          <CheckCheck className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification._id}
                          className={cn(
                            "p-3 border-b border bg-card hover:bg-muted/50",
                            !notification.isRead && "bg-background"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm">{getTypeIcon(notification.type)}</span>
                                <h4 className="text-sm font-medium truncate">
                                  {notification.title}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                            <div className="flex space-x-1 ml-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markNotificationAsRead(notification._id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification._id)}
                                className="h-6 w-6 p-0 text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer justify-center"
                        onClick={() => router.push('/notifications')}
                      >
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Admin Profile */}
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
                        <p className="text-sm font-medium truncate max-w-24">
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
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
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
      </div>
    </header>
  );
}
