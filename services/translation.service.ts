"use client";

class TranslationService {
  private static instance: TranslationService;
  private isInitialized = false;
  private currentLanguage = 'en';

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isInitialized) {
        resolve();
        return;
      }

      // Check if already loaded
      if (window.google && window.google.translate) {
        this.isInitialized = true;
        resolve();
        return;
      }

      // Load Google Translate script
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          try {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,de,fr,es,ru',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true,
              gaTrack: false,
              gaId: null
            }, 'google_translate_element');
            
            this.isInitialized = true;
            resolve();
          } catch (error) {
            console.error('Google Translate initialization error:', error);
            this.isInitialized = true; // Still mark as initialized to prevent retries
            resolve();
          }
        }
      };

      document.head.appendChild(script);
    });
  }

  async translateTo(languageCode: string): Promise<boolean> {
    try {
      await this.initialize();
      
      // Clear any existing translation first
      this.clearTranslation();
      
      if (languageCode === 'en') {
        // For English, just reload without translation
        this.currentLanguage = 'en';
        window.location.reload();
        return true;
      }
      
      // Set the translation cookie with proper format
      const cookieValue = `/en/${languageCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000`;
      
      // Also try setting with domain for better compatibility
      try {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}; max-age=31536000`;
      } catch (e) {
        // Ignore domain errors for localhost
      }
      
      this.currentLanguage = languageCode;
      
      // Force reload to apply translation
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Translation failed:', error);
      return false;
    }
  }

  clearTranslation(): void {
    // Clear all possible cookie variations
    try {
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname}`;
    } catch (e) {
      // Ignore domain errors for localhost
    }
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  resetTranslation(): void {
    this.clearTranslation();
    this.currentLanguage = 'en';
    window.location.reload();
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  isRTL(languageCode: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(languageCode);
  }
}

export const translationService = TranslationService.getInstance();