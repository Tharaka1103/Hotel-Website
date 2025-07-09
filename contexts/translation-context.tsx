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
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== 'en') {
      setCurrentLanguage(savedLanguage);
    }

    // Check for Google Translate cookie
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
    if (googtransCookie) {
      const langCode = googtransCookie.split('/')[2];
      if (langCode && langCode !== 'en') {
        setCurrentLanguage(langCode);
      }
    }
  }, []);

  const translateTo = async (languageCode: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Save preference
      localStorage.setItem('preferred-language', languageCode);
      
      // Apply translation
      const success = await translationService.translateTo(languageCode);
      if (success) {
        setCurrentLanguage(languageCode);
      }
    } catch (error) {
      console.error('Translation error:', error);
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