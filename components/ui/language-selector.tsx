"use client";

import React, { useState } from 'react';
import { Globe, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/contexts/translation-context';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, isLoading, translateTo } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = async (language: Language) => {
    if (language.code === currentLanguage || isLoading) return;
    
    setIsOpen(false);
    
    try {
      await translateTo(language.code);
    } catch (error) {
      console.error('Failed to change language:', error);
      // You might want to show a toast notification here
    }
  };

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: 'none' }} />
      
      <div className="notranslate">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md border-white/40 hover:bg-white 
              hover:border-white/50 active:scale-95 transition-all duration-200 shadow-lg rounded-full px-4 py-2
              dark:bg-gray-800/90 dark:border-gray-700/40 dark:hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Globe className="h-4 w-4 text-primary" />
              )}
              <span className="text-lg transform hover:scale-110 transition-transform">
                {currentLang.flag}
              </span>
              <span className="hidden sm:inline-block text-sm font-medium">
                {currentLang.nativeName}
              </span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
        
          <DropdownMenuContent 
            align="end" 
            className="w-[280px] sm:w-[320px] max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-lg 
            border-white/40 shadow-2xl rounded-xl dark:bg-gray-800/95 dark:border-gray-700/40 notranslate"
          >
            <div className="p-3">
              <div className="text-sm font-semibold text-gray-700 mb-2.5 px-2 dark:text-gray-200">
                Select Language
              </div>
              <div className="space-y-1">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    disabled={isLoading}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 cursor-pointer
                    transition-all duration-200 group ${
                      currentLanguage === language.code 
                        ? 'bg-primary/20 border border-primary/30 shadow-sm' 
                        : 'hover:translate-x-1'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {language.flag}
                    </span>
                    <div className="flex flex-col flex-1">
                      <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                        {language.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {language.nativeName}
                      </span>
                    </div>
                    {currentLanguage === language.code && (
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
