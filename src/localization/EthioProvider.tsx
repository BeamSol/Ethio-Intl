import React, { createContext, useContext, useState, useEffect } from 'react';
import { EthioProviderProps, EthioIntlHookResult } from './types';

// Context for the i18n state
interface EthioIntlContextType {
  resources: Record<string, Record<string, any>>;
  currentLang: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
  supportedLangs: string[];
}

export const EthioIntlContext = createContext<EthioIntlContextType | null>(null);

/**
 * EthioProvider - Simplified i18n wrapper for Ethiopian applications
 * No external dependencies - pure React implementation
 */
export const EthioProvider: React.FC<EthioProviderProps> = ({
  resources,
  defaultLang = 'am',
  fallbackLang = 'en',
  children,
}) => {
  const [currentLang, setCurrentLang] = useState(defaultLang);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
  };

  const t = (key: string, options?: any): string => {
    const translation = resources[currentLang]?.translation?.[key] ||
                       resources[fallbackLang]?.translation?.[key] ||
                       key;

    if (options && typeof translation === 'string') {
      // Simple interpolation for basic cases
      let result = translation;
      Object.entries(options).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
      return result;
    }

    return translation;
  };

  const supportedLangs = Object.keys(resources);

  const contextValue: EthioIntlContextType = {
    resources,
    currentLang,
    changeLanguage,
    t,
    supportedLangs,
  };

  return (
    <EthioIntlContext.Provider value={contextValue}>
      {children}
    </EthioIntlContext.Provider>
  );
};

