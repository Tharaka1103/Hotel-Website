import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from '@/app/Components/ThemeProvider'
import { Josefin_Slab, Berkshire_Swash } from 'next/font/google'
import { ToastProvider } from '@/contexts/toast-context'

const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-josefin-slab',
})

const berkshireSwash = Berkshire_Swash({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-berkshire-swash',
})

export const metadata: Metadata = {
  title: "Admin - Rupa's Serf",
  description: "Admin panel for hotel management system",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
