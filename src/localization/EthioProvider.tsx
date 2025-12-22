import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EthioProviderProps, EthioIntlHookResult } from './types';

// Enterprise-scale i18n context
interface EthioIntlContextType {
  // Core translation functions
  resources: Record<string, Record<string, any>>;
  currentLang: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
  tNamespace: (namespace: string, key: string, options?: any) => string;

  // Language management
  supportedLangs: string[];
  detectLanguage: () => string;
  isLanguageSupported: (lang: string, resources?: Record<string, any>) => boolean;

  // Enterprise features for large projects
  loadTranslations: (lang: string, translations: Record<string, any>) => void;
  loadNamespace: (lang: string, namespace: string, translations: Record<string, any>) => void;
  unloadNamespace: (lang: string, namespace: string) => void;
  preloadLanguages: (langs: string[]) => Promise<void>;
  getMissingKeys: (lang?: string) => string[];
  exportTranslations: (lang: string) => Record<string, any>;

  // Development helpers
  isDevelopment: boolean;
  enableHotReload: (callback: (lang: string, translations: Record<string, any>) => void) => void;
}

export const EthioIntlContext = createContext<EthioIntlContextType | null>(null);

// Language detection utilities
const getBrowserLanguage = (): string => {
  if (typeof navigator !== 'undefined') {
    // Check navigator.language first, then fallbacks
    const lang = navigator.language || (navigator as any).userLanguage;
    return lang?.split('-')[0] || 'en'; // Get primary language code
  }
  return 'en';
};

const getStoredLanguage = (): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('ethio-intl-lang');
  }
  return null;
};

const storeLanguage = (lang: string): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('ethio-intl-lang', lang);
  }
};

/**
 * EthioProvider - Advanced multi-language i18n wrapper for Ethiopian applications
 * Pure React implementation with zero external dependencies
 */
export const EthioProvider: React.FC<EthioProviderProps> = ({
  resources: initialResources,
  defaultLang = 'am',
  fallbackLang = 'en',
  children,
}) => {
  // State for dynamic resource management
  const [resources, setResources] = useState<Record<string, Record<string, any>>>(initialResources);
  const [currentLang, setCurrentLang] = useState(() => {
    // Priority: stored > detected > default
    return getStoredLanguage() || getBrowserLanguage() || defaultLang;
  });
  const [hotReloadCallback, setHotReloadCallback] = useState<((lang: string, translations: Record<string, any>) => void) | null>(null);

  // Store language changes
  const changeLanguage = (lang: string) => {
    if (isLanguageSupported(lang, resources)) {
      setCurrentLang(lang);
      storeLanguage(lang);
    }
  };

  // Advanced translation function with namespace support
  const t = (key: string, options?: any): string => {
    // Support namespaced keys like "common:hello" or "auth:login"
    const [namespace, actualKey] = key.includes(':') ? key.split(':', 2) : ['', key];

    let translation;

    if (namespace) {
      // Namespaced lookup
      translation = resources[currentLang]?.[namespace]?.[actualKey] ||
                   resources[currentLang]?.translation?.[key] ||
                   resources[fallbackLang]?.[namespace]?.[actualKey] ||
                   resources[fallbackLang]?.translation?.[key];
    } else {
      // Flat structure lookup
      translation = resources[currentLang]?.translation?.[key] ||
                   resources[currentLang]?.[key] ||
                   resources[fallbackLang]?.translation?.[key] ||
                   resources[fallbackLang]?.[key];
    }

    // Fallback to key if no translation found
    translation = translation || key;

    // Handle interpolation
    if (options && typeof translation === 'string') {
      let result = translation;
      Object.entries(options).forEach(([k, v]) => {
        // Support both {{variable}} and {variable} syntax
        result = result.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
        result = result.replace(new RegExp(`{${k}}`, 'g'), String(v));
      });
      return result;
    }

    return translation;
  };

  // Dedicated namespace function
  const tNamespace = (namespace: string, key: string, options?: any): string => {
    return t(`${namespace}:${key}`, options);
  };

  // Language utilities
  const supportedLangs = Object.keys(resources);

  const detectLanguage = (): string => {
    return getBrowserLanguage();
  };

  const isLanguageSupported = (lang: string, resources?: Record<string, any>): boolean => {
    const langsToCheck = resources ? Object.keys(resources) : supportedLangs;
    return langsToCheck.includes(lang);
  };

  // Environment detection
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Enterprise features for large projects

  // Dynamic translation loading
  const loadTranslations = useCallback((lang: string, translations: Record<string, any>) => {
    setResources(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        ...translations
      }
    }));
  }, []);

  // Namespace-based loading
  const loadNamespace = useCallback((lang: string, namespace: string, translations: Record<string, any>) => {
    setResources(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [namespace]: {
          ...prev[lang]?.[namespace],
          ...translations
        }
      }
    }));
  }, []);

  // Unload namespace (for memory management)
  const unloadNamespace = useCallback((lang: string, namespace: string) => {
    setResources(prev => {
      const langResources = { ...prev[lang] };
      delete langResources[namespace];
      return {
        ...prev,
        [lang]: langResources
      };
    });
  }, []);

  // Preload multiple languages
  const preloadLanguages = useCallback(async (langs: string[]): Promise<void> => {
    const loadPromises = langs.map(async (lang) => {
      try {
        // Dynamic import pattern for large projects
        const module = await import(`../locales/${lang}.json`);
        loadTranslations(lang, module.default || module);
      } catch (error) {
        console.warn(`Failed to load translations for ${lang}:`, error);
      }
    });

    await Promise.all(loadPromises);
  }, [loadTranslations]);

  // Get missing translation keys
  const getMissingKeys = useCallback((lang: string = currentLang): string[] => {
    const fallbackKeys = Object.keys(resources[fallbackLang]?.translation || {});
    const currentKeys = Object.keys(resources[lang]?.translation || {});

    return fallbackKeys.filter(key => !currentKeys.includes(key));
  }, [resources, fallbackLang, currentLang]);

  // Export translations for development/tools
  const exportTranslations = useCallback((lang: string): Record<string, any> => {
    return resources[lang] || {};
  }, [resources]);

  // Hot reload support for development
  const enableHotReload = useCallback((callback: (lang: string, translations: Record<string, any>) => void) => {
    if (isDevelopment) {
      setHotReloadCallback(() => callback);

      // Listen for hot reload events (if using webpack/vite)
      if (typeof window !== 'undefined' && (window as any).addEventListener) {
        (window as any).addEventListener('ethio-intl:hot-reload', (event: CustomEvent) => {
          const { lang, translations } = event.detail;
          loadTranslations(lang, translations);
          callback(lang, translations);
        });
      }
    }
  }, [isDevelopment, loadTranslations]);

  // Auto-detect language on mount if not stored
  useEffect(() => {
    if (!getStoredLanguage()) {
      const detected = getBrowserLanguage();
      if (isLanguageSupported(detected, resources)) {
        setCurrentLang(detected);
      }
    }
  }, []);

  const contextValue: EthioIntlContextType = {
    resources,
    currentLang,
    changeLanguage,
    t,
    tNamespace,
    supportedLangs,
    detectLanguage,
    isLanguageSupported,
    loadTranslations,
    loadNamespace,
    unloadNamespace,
    preloadLanguages,
    getMissingKeys,
    exportTranslations,
    isDevelopment,
    enableHotReload,
  };

  return (
    <EthioIntlContext.Provider value={contextValue}>
      {children}
    </EthioIntlContext.Provider>
  );
};

// Helper function for internal use
function isLanguageSupported(lang: string, resources: Record<string, any>): boolean {
  return Object.keys(resources).includes(lang);
}

