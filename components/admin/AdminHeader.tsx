'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LogOut, 
  Bell, 
  Settings,
  ExternalLink,
  Loader2,
  User,
  ChevronDown,
  Globe,
  Activity,
  MessageSquare
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ThemeSwitch } from '@/app/Components/ThemeSwitch';
import { cn } from '@/lib/utils';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
}

export default function AdminHeader({ sidebarCollapsed }: AdminHeaderProps) {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentAdmin();
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

  return (
    <header 
      className={cn(
        'fixed top-0 right-0 z-30 bg-card backdrop-blur-md transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex items-center justify-end px-4 lg:px-6 py-3">
        
        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* System Status */}
          <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full">
            <Activity className="h-3 w-3 text-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              System Online
            </span>
          </div>

          {/* Quick Action - View Hotel Site */}
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden md:inline">View Site</span>
            </Button>
          </Link>

          {/* Theme Switch */}
          <ThemeSwitch />

          {/* Messages */}
          <Button variant="ghost" size="sm" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  {notifications} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New booking received</p>
                    <p className="text-xs text-gray-500">Ocean View Suite - Room 205</p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment confirmed</p>
                    <p className="text-xs text-gray-500">$299.00 received</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Review submitted</p>
                    <p className="text-xs text-gray-500">5-star rating received</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
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
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2 ">
                  <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm">
                      {currentAdmin.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium truncate max-w-32">
                      {currentAdmin.name}
                    </p>
                    <p className="text-xs truncate max-w-32">
                      {currentAdmin.email}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{currentAdmin.name}</p>
                    <p className="text-xs ">{currentAdmin.email}</p>
                    <Badge 
                      variant={currentAdmin.role === 'super_admin' ? 'default' : 'secondary'}
                      className="text-xs w-fit mt-2 text-white"
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
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Globe className="h-4 w-4 mr-2" />
                  <Link href="/" target="_blank">View Hotel Site</Link>
                </DropdownMenuItem>
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
        </div>
      </div>
    </header>
  );
}
