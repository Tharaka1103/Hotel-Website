declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          new (options: {
            pageLanguage?: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
            multilanguagePage?: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export {};
