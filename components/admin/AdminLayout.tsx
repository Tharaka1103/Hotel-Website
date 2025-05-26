'use client';

import { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      
      <main className="flex-1 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {children}
        </div>
      </main>

      <AdminFooter />
      <Toaster position="top-right" />
    </div>
  );
}
