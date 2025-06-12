import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './Components/ThemeProvider'
import Header from "./Components/Header";
import Footer from './Components/Footer'
import { Poiret_One, Berkshire_Swash, Josefin_Slab } from 'next/font/google'
import localFont from 'next/font/local'
import ConditionalLayout from './Components/ConditionalLayout'

const poiret0ne = Poiret_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poiret-one',
})

const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-josefin-slab',
})

const tanMeringue = localFont({
  src: [
    {
      path: './fonts/TAN MERINGUE.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TAN MERINGUE.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tan-meringue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Rupa's Serf - Hotel & Resort",
  description: "Experience luxury and comfort at our oceanfront hotel with world-class amenities",
  keywords: "hotel, resort, luxury, oceanfront, vacation, accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poiret0ne.variable} ${josefinSlab.variable} ${tanMeringue.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
