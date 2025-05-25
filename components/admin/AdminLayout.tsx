'use client';

import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen">
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
  );
}