import type { Metadata } from "next";
import "../../globals.css";
import { ThemeProvider } from '@/app/Components/ThemeProvider'
import { Josefin_Slab, Berkshire_Swash } from 'next/font/google'

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
  title: "Admin Login - Rupa's Serf",
  description: "Admin login for hotel management system",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${josefinSlab.variable} ${berkshireSwash.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          {/* No header, no footer, just the login page */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}