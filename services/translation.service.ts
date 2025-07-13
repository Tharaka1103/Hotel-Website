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
            includedLanguages: 'en,es,fr,de,it,pt,ru,ja,ko,zh,ar,hi,th,vi,tr,nl,sv,pl,da,no',
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
      
      if (languageCode === 'en') {
        // Reset to original language
        this.resetTranslation();
        return true;
      }

      // Set translation cookie
      document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000`;
      this.currentLanguage = languageCode;
      
      // Try to trigger translation without reload if widget exists
      if (window.google && window.google.translate) {
        try {
          // Find and trigger translation
          const iframe = document.querySelector('iframe.goog-te-menu-frame');
          if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            const langLink = iframeDoc?.querySelector(`a[lang="${languageCode}"]`);
            if (langLink) {
              langLink.click();
              return true;
            }
          }
          
          // Alternative method: use Google Translate API directly
          const translateElement = document.querySelector('.goog-te-combo');
          if (translateElement) {
            translateElement.value = languageCode;
            translateElement.dispatchEvent(new Event('change'));
            return true;
          }
        } catch (e) {
          console.warn('Direct translation failed, falling back to reload:', e);
        }
      }
      
      // Fallback: reload page (only if direct method fails)
      setTimeout(() => window.location.reload(), 100);
      return true;
    } catch (error) {
      console.error('Translation failed:', error);
      return false;
    }
  }

  resetTranslation(): void {
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.currentLanguage = 'en';
    
    // Try to reset without reload first
    if (window.google && window.google.translate) {
      try {
        const translateElement = document.querySelector('.goog-te-combo');
        if (translateElement) {
          translateElement.value = 'en';
          translateElement.dispatchEvent(new Event('change'));
          return;
        }
      } catch (e) {
        console.warn('Direct reset failed, falling back to reload:', e);
      }
    }
    
    // Fallback: reload page
    setTimeout(() => window.location.reload(), 100);
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