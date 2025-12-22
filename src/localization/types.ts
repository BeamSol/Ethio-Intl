export type Language = string;

export interface EthioProviderProps {
  resources: Record<Language, Record<string, any>>;
  defaultLang?: string;
  fallbackLang?: string;
  children: React.ReactNode;
}

export interface EthioIntlHookResult {
  t: (key: string, options?: any) => string;
  currentLang: string;
  changeLanguage: (langCode: string) => void;
  supportedLangs: string[];
}

export interface EthioIntlAdvancedHookResult extends EthioIntlHookResult {
  tNamespace: (namespace: string, key: string, options?: any) => string;
  detectLanguage: () => string;
  isLanguageSupported: (lang: string, resources?: Record<string, any>) => boolean;
}

