"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translationService } from '@/services/translation.service';

interface TranslationContextType {
  currentLanguage: string;
  isLoading: boolean;
  translateTo: (languageCode: string) => Promise<void>;
  resetTranslation: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize translation service
    translationService.initialize();
    
    const detectCurrentLanguage = () => {
      // First check localStorage for user preference
      const savedLanguage = localStorage.getItem('preferred-language');
      console.log('Saved language preference:', savedLanguage);
      
      if (savedLanguage && savedLanguage !== 'en') {
        setCurrentLanguage(savedLanguage);
        
        // Ensure the cookie matches the preference
        const cookies = document.cookie.split(';');
        const googtransCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
        
        if (!googtransCookie || !googtransCookie.includes(savedLanguage)) {
          // Set the cookie to match the preference
          const cookieValue = `/en/${savedLanguage}`;
          document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000`;
          console.log('Set cookie to match preference:', cookieValue);
        }
        return;
      }
      
      // Check for Google Translate cookie if no preference saved
      const cookies = document.cookie.split(';');
      const googtransCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
      
      console.log('All cookies:', document.cookie);
      console.log('Google translate cookie:', googtransCookie);
      
      if (googtransCookie) {
        const cookieValue = googtransCookie.split('=')[1];
        console.log('Cookie value:', cookieValue);
        
        if (cookieValue && cookieValue !== '' && cookieValue.includes('/')) {
          const parts = cookieValue.split('/');
          const langCode = parts[2]; // Format is usually /en/langcode
          console.log('Detected language from cookie:', langCode);
          
          if (langCode && langCode !== 'null' && langCode !== 'auto' && langCode !== '') {
            setCurrentLanguage(langCode);
            localStorage.setItem('preferred-language', langCode);
            return;
          }
        }
      }
      
      // Default to English
      console.log('Defaulting to English');
      setCurrentLanguage('en');
    };

    // Delay detection slightly to ensure DOM is ready
    setTimeout(detectCurrentLanguage, 100);

    // Listen for language changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language' && e.newValue) {
        setCurrentLanguage(e.newValue);
      }
    };

    // Listen for URL changes (for single page apps)
    const handlePopState = () => {
      setTimeout(detectCurrentLanguage, 100);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const translateTo = async (languageCode: string): Promise<void> => {
    if (languageCode === currentLanguage) {
      return; // No need to translate to the same language
    }
    
    setIsLoading(true);
    
    try {
      // Save preference first - this is critical for the page reload detection
      localStorage.setItem('preferred-language', languageCode);
      console.log('Setting preferred language to:', languageCode);
      
      // Update current language immediately to prevent race conditions
      setCurrentLanguage(languageCode);
      
      // Apply translation (this will reload the page)
      await translationService.translateTo(languageCode);
      
      // Note: The page will reload, so the code below won't execute
      // The new page load will detect the localStorage preference and set the correct language
    } catch (error) {
      console.error('Translation error:', error);
      // Only revert if there was an error and page didn't reload
      const previousLang = currentLanguage;
      setCurrentLanguage(previousLang);
      localStorage.setItem('preferred-language', previousLang);
      setIsLoading(false);
    }
  };

  const resetTranslation = (): void => {
    setIsLoading(true);
    localStorage.removeItem('preferred-language');
    translationService.resetTranslation();
    setCurrentLanguage('en');
    setIsLoading(false);
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      isLoading,
      translateTo,
      resetTranslation
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};