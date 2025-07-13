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
    
    // Check for Google Translate cookie first (most accurate)
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
    
    if (googtransCookie) {
      const parts = googtransCookie.split('/');
      const langCode = parts[2];
      if (langCode && langCode !== 'null' && langCode !== 'auto') {
        setCurrentLanguage(langCode);
        localStorage.setItem('preferred-language', langCode);
        return;
      }
    }
    
    // Fallback to saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== 'en') {
      setCurrentLanguage(savedLanguage);
      // Set cookie to match saved preference
      document.cookie = `googtrans=/en/${savedLanguage}; path=/; max-age=31536000`;
    }

    // Listen for language changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language' && e.newValue) {
        setCurrentLanguage(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const translateTo = async (languageCode: string): Promise<void> => {
    if (languageCode === currentLanguage) {
      return; // No need to translate to the same language
    }
    
    setIsLoading(true);
    
    try {
      // Save preference first
      localStorage.setItem('preferred-language', languageCode);
      setCurrentLanguage(languageCode);
      
      // Apply translation
      const success = await translationService.translateTo(languageCode);
      if (!success) {
        // Revert if translation fails
        const previousLang = currentLanguage;
        setCurrentLanguage(previousLang);
        localStorage.setItem('preferred-language', previousLang);
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Revert on error
      const previousLang = currentLanguage;
      setCurrentLanguage(previousLang);
      localStorage.setItem('preferred-language', previousLang);
    } finally {
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