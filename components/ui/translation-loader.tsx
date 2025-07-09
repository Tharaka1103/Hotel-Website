"use client";

import React from 'react';
import { Loader2, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export const TranslationLoader: React.FC = () => {
  const { isTranslating } = useLanguage();

  if (!isTranslating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex items-center gap-4 shadow-xl">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <span className="text-lg font-medium">Translating page...</span>
        </div>
      </div>
    </div>
  );
};