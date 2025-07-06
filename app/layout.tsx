import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './Components/ThemeProvider'
import Header from "./Components/Header";
import Footer from './Components/Footer'
import { Poiret_One, Berkshire_Swash, Montserrat, Bebas_Neue } from 'next/font/google'
import localFont from 'next/font/local'
import ConditionalLayout from './Components/ConditionalLayout'
import {ToastProvider} from '@/contexts/toast-context'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
})

const poiret0ne = Poiret_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poiret-one',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
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
const tanHeading = localFont({
  src: [
    {
      path: './fonts/TANHEADLINE-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TANHEADLINE-Regular.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tan-heading',
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
    <html lang="en" suppressHydrationWarning className={`${poiret0ne.variable} ${montserrat.variable} ${tanMeringue.variable} ${tanHeading.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <ConditionalLayout>
            <ToastProvider>
            {children}
            </ToastProvider>
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
