import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: any, elementId: string): any;
          InlineLayout: {
            SIMPLE: string;
          };
        };
        TranslateService: {
          new (): any;
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export {};