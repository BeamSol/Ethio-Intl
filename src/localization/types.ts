export type Language = 'en' | 'am' | 'om' | 'fr' | 'ti' | 'so';

export interface EthioIntlConfig {
  defaultLanguage?: Language;
  fallbackLanguage?: Language;
  supportedLanguages?: Language[];
  resources?: Record<Language, Record<string, any>>;
}

export interface EthioIntlContextValue {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
  isLoading: boolean;
}

