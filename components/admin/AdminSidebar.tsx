'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  Calendar,
  Settings,
  Building2,
  DollarSign,
  MessageSquare,
  FileText,
  Shield,
  Home,
  ChevronLeft,
  ChevronRight,
  Layers,
  Bell,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/adminDashboard',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Admin Management',
    href: '/admins',
    icon: Users,
    badge: null
  },
  {
    title: 'Bookings',
    href: '/bookings',
    icon: Calendar,
    badge: '12'
  },
  {
    title: 'Reviews',
    href: '/reviews',
    icon: MessageSquare,
    badge: '5'
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    badge: null
  }
];

export default function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card transition-all duration-300 ease-in-out shadow-lg',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold ">
              Admin Portal
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 "
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600' 
                  : ''
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-blue-600 dark:text-blue-400')} />
              
              {!collapsed && (
                <>
                  <span className="font-medium truncate">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant={isActive ? 'default' : 'secondary'} 
                      className="ml-auto text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}

              {collapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                  {item.badge && (
                    <span className="ml-2 bg-blue-600 text-xs px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Need Help?
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Check our docs
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}