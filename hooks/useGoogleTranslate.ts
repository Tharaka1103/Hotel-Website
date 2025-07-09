"use client";

import { useEffect, useState } from 'react';

export const useGoogleTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.translate) {
      setIsLoaded(true);
      return;
    }

    // Load Google Translate
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,it,pt,ru,ja,ko,zh,ar,hi,th,vi,tr,nl,sv,pl,da,no',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        
        setIsLoaded(true);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const translatePage = (targetLanguage: string) => {
    if (!isLoaded) return false;

    try {
      // Method 1: Direct cookie approach
      if (targetLanguage === 'en') {
        // Reset to original
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.reload();
      } else {
        // Set translation cookie
        document.cookie = `googtrans=/en/${targetLanguage}; path=/`;
        window.location.reload();
      }
      
      setCurrentLanguage(targetLanguage);
      return true;
    } catch (error) {
      console.error('Translation failed:', error);
      return false;
    }
  };

  return {
    isLoaded,
    currentLanguage,
    translatePage
  };
};