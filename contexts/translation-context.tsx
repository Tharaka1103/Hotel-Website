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
    const initializeTranslation = async () => {
      try {
        await translationService.initialize();
        
        // Detect current language from various sources
        const detectLanguage = () => {
          // First check localStorage
          const savedLanguage = localStorage.getItem('preferred-language');
          if (savedLanguage && savedLanguage !== 'en') {
            setCurrentLanguage(savedLanguage);
            return savedLanguage;
          }
          
          // Then check Google Translate cookie
          const cookieLanguage = translationService.getCurrentLanguageFromCookie();
          if (cookieLanguage !== 'en') {
            setCurrentLanguage(cookieLanguage);
            localStorage.setItem('preferred-language', cookieLanguage);
            return cookieLanguage;
          }
          
          // Default to English
          setCurrentLanguage('en');
          return 'en';
        };

        // Small delay to ensure DOM is ready
        setTimeout(detectLanguage, 100);
      } catch (error) {
        console.error('Failed to initialize translation:', error);
      }
    };

    initializeTranslation();

    // Listen for storage changes (other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language' && e.newValue) {
        setCurrentLanguage(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const translateTo = async (languageCode: string): Promise<void> => {
    if (languageCode === currentLanguage || isLoading) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Save preference immediately
      localStorage.setItem('preferred-language', languageCode);
      setCurrentLanguage(languageCode);
      
      // Apply translation (this will reload the page)
      await translationService.translateTo(languageCode);
    } catch (error) {
      console.error('Translation error:', error);
      // Revert on error
      const previousLang = currentLanguage;
      setCurrentLanguage(previousLang);
      localStorage.setItem('preferred-language', previousLang);
      setIsLoading(false);
      throw error;
    }
  };

  const resetTranslation = (): void => {
    if (isLoading) return;
    
    setIsLoading(true);
    localStorage.removeItem('preferred-language');
    setCurrentLanguage('en');
    translationService.resetTranslation();
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