'use client';

import { usePathname } from 'next/navigation';
import Header from "./Header";
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define admin routes that should not show regular header/footer
  const adminRoutes = ['/adminDashboard', '/adminLogin', '/admins', '/packages', '/bookings'];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // If it's an admin route, don't show regular header/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For regular user routes, show header and footer
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}