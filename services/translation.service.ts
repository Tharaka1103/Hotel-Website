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
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,de,fr,es,ru',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          }, 'google_translate_element');
          
          this.isInitialized = true;
          resolve();
        }
      };

      document.head.appendChild(script);
    });
  }

  async translateTo(languageCode: string): Promise<boolean> {
    try {
      await this.initialize();
      
      // Always use reload method for more reliable translation
      // Set translation cookie
      document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000; domain=${window.location.hostname}`;
      
      if (languageCode === 'en') {
        // Reset to original language
        document.cookie = `googtrans=/en/en; path=/; max-age=31536000; domain=${window.location.hostname}`;
        // Also clear the cookie entirely for English
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname}`;
      }
      
      this.currentLanguage = languageCode;
      
      // Force reload for reliable translation
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Translation failed:', error);
      return false;
    }
  }

  resetTranslation(): void {
    // Clear all possible cookie variations
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${window.location.hostname}`;
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `googtrans=/en/en; path=/; max-age=31536000; domain=${window.location.hostname}`;
    
    this.currentLanguage = 'en';
    
    // Always reload for reliable reset
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