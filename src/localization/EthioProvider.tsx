import React, { createContext, useContext, useState, useEffect } from 'react';
import { EthioProviderProps, EthioIntlHookResult } from './types';

// Enhanced context for multi-language i18n
interface EthioIntlContextType {
  resources: Record<string, Record<string, any>>;
  currentLang: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
  tNamespace: (namespace: string, key: string, options?: any) => string;
  supportedLangs: string[];
  detectLanguage: () => string;
  isLanguageSupported: (lang: string) => boolean;
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
  resources,
  defaultLang = 'am',
  fallbackLang = 'en',
  children,
}) => {
  // Initialize language with detection logic
  const [currentLang, setCurrentLang] = useState(() => {
    // Priority: stored > detected > default
    return getStoredLanguage() || getBrowserLanguage() || defaultLang;
  });

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

