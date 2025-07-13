"use client";

import Head from 'next/head';

export default function CriticalResources() {
  return (
    <Head>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/TAN MERINGUE.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/TANHEADLINE-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical images */}
      <link rel="preload" href="/images/hero-fallback.jpg" as="image" />
      <link rel="preload" href="/icons/wavesnew.png" as="image" />
      <link rel="preload" href="/icons/cave.png" as="image" />
      <link rel="preload" href="/icons/zoo.png" as="image" />
      <link rel="preload" href="/icons/discovery.png" as="image" />
      
      {/* Preload critical video (metadata only) */}
      <link rel="preload" href="/heronew.mp4" as="video" type="video/mp4" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//translate.google.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical third-party domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
