"use client";

class TranslationService {
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      // Check if already loaded
      if (window.google?.translate) {
        this.isInitialized = true;
        resolve();
        return;
      }

      // Set up the callback
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          try {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,de,fr,es,ru',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true
            }, 'google_translate_element');
            
            this.isInitialized = true;
            resolve();
          } catch (error) {
            console.error('Error initializing Google Translate:', error);
            resolve();
          }
        }
      };

      // Load the script
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
        resolve();
      };
      
      document.head.appendChild(script);
    });

    return this.initPromise;
  }

  async translateTo(languageCode: string): Promise<void> {
    await this.initialize();
    
    if (!this.isInitialized) {
      throw new Error('Translation service not initialized');
    }

    try {
      if (languageCode === 'en') {
        // Reset to original language
        this.clearTranslationCookie();
        window.location.reload();
      } else {
        // Set translation cookie and reload
        this.setTranslationCookie(languageCode);
        window.location.reload();
      }
    } catch (error) {
      console.error('Translation failed:', error);
      throw error;
    }
  }

  resetTranslation(): void {
    this.clearTranslationCookie();
    window.location.reload();
  }

  getCurrentLanguageFromCookie(): string {
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(cookie => 
      cookie.trim().startsWith('googtrans=')
    );
    
    if (googtransCookie) {
      const cookieValue = googtransCookie.split('=')[1];
      if (cookieValue && cookieValue.includes('/')) {
        const parts = cookieValue.split('/');
        const langCode = parts[2];
        if (langCode && langCode !== 'null' && langCode !== 'auto') {
          return langCode;
        }
      }
    }
    
    return 'en';
  }

  private setTranslationCookie(languageCode: string): void {
    const cookieValue = `/en/${languageCode}`;
    document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;
  }

  private clearTranslationCookie(): void {
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const translationService = new TranslationService();