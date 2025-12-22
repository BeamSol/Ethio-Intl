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

export interface EthioIntlEnterpriseHookResult extends EthioIntlHookResult {
  tNamespace: (namespace: string, key: string, options?: any) => string;
  detectLanguage: () => string;
  isLanguageSupported: (lang: string, resources?: Record<string, any>) => boolean;

  // Enterprise features for large projects
  loadTranslations: (lang: string, translations: Record<string, any>) => void;
  loadNamespace: (lang: string, namespace: string, translations: Record<string, any>) => void;
  unloadNamespace: (lang: string, namespace: string) => void;
  preloadLanguages: (langs: string[]) => Promise<void>;
  getMissingKeys: (lang?: string) => string[];
  exportTranslations: (lang: string) => Record<string, any>;
  isDevelopment: boolean;
  enableHotReload: (callback: (lang: string, translations: Record<string, any>) => void) => void;
}

