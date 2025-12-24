import { useContext } from 'react';
import { EthioIntlContext } from '../localization/EthioProvider';
import { EthioIntlHookResult } from '../localization/types';

// Enterprise hook result with all features
export interface EthioIntlEnterpriseHookResult extends EthioIntlHookResult {
  tNamespace: (namespace: string, key: string, options?: any) => string;
  detectLanguage: () => string;
  isLanguageSupported: (lang: string, resources?: Record<string, any>) => boolean;

  // Enterprise features
  loadTranslations: (lang: string, translations: Record<string, any>) => void;
  loadNamespace: (lang: string, namespace: string, translations: Record<string, any>) => void;
  unloadNamespace: (lang: string, namespace: string) => void;
  preloadLanguages: (langs: string[]) => Promise<void>;
  getMissingKeys: (lang?: string) => string[];
  exportTranslations: (lang: string) => Record<string, any>;
  isDevelopment: boolean;
  enableHotReload: (callback: (lang: string, translations: Record<string, any>) => void) => void;
}

/**
 * useEthioIntl - Enterprise hook for large-scale Ethiopian internationalization
 * Provides comprehensive access to translation management and development tools
 */
export const useEthioIntl = (): EthioIntlEnterpriseHookResult => {
  const context = useContext(EthioIntlContext);

  if (!context) {
    throw new Error('useEthioIntl must be used within an EthioProvider');
  }

  return {
    t: context.t,
    tNamespace: context.tNamespace,
    currentLang: context.currentLang,
    changeLanguage: context.changeLanguage,
    supportedLangs: context.supportedLangs,
    detectLanguage: context.detectLanguage,
    isLanguageSupported: context.isLanguageSupported,
    loadTranslations: context.loadTranslations,
    loadNamespace: context.loadNamespace,
    unloadNamespace: context.unloadNamespace,
    preloadLanguages: context.preloadLanguages,
    getMissingKeys: context.getMissingKeys,
    exportTranslations: context.exportTranslations,
    isDevelopment: context.isDevelopment,
    enableHotReload: context.enableHotReload,
  };
};
