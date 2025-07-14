import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './Components/ThemeProvider'
import Header from "./Components/Header";
import Footer from './Components/Footer'
import { Poiret_One, Berkshire_Swash, Montserrat, Bebas_Neue } from 'next/font/google'
import localFont from 'next/font/local'
import ConditionalLayout from './Components/ConditionalLayout'
import { ToastProvider } from '@/contexts/toast-context'
import { TranslationProvider } from "@/contexts/translation-context";
import { LanguageSelector } from "@/components/ui/language-selector";

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
  title: "Rupa's Surf Camp",
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
      <head>
        <meta name="google" content="notranslate" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Declare global function for Google Translate
              window.googleTranslateElementInit = window.googleTranslateElementInit || function() {};
              
              // Optimize Google Translate loading
              (function() {
                var gtConstEvalStartTime = new Date();
                function gtElInit() {
                  var lib = new google.translate.TranslateService();
                  return lib;
                }
                
                // Block unnecessary requests to improve performance
                if (typeof window !== 'undefined') {
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    const url = args[0];
                    if (typeof url === 'string' && (url.includes('gen204') || url.includes('analytics'))) {
                      return Promise.resolve(new Response('', { status: 204 }));
                    }
                    return originalFetch.apply(this, args);
                  };
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <ConditionalLayout>
            <ToastProvider>
              <TranslationProvider>
                {/* Language Selector - Fixed position */}
                <div className="fixed bottom-4 right-4 z-50">
                  <LanguageSelector />
                </div>

                {/* Main content */}
                <main>{children}</main>
              </TranslationProvider>
            </ToastProvider>
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
