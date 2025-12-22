import { useContext } from 'react';
import { EthioIntlContext } from '../localization/EthioProvider';
import { EthioIntlHookResult } from '../localization/types';

// Enhanced hook result with more features
export interface EthioIntlEnhancedHookResult extends EthioIntlHookResult {
  tNamespace: (namespace: string, key: string, options?: any) => string;
  detectLanguage: () => string;
  isLanguageSupported: (lang: string, resources?: Record<string, any>) => boolean;
}

/**
 * useEthioIntl - Enhanced hook for Ethiopian internationalization
 * Provides comprehensive access to translation functions and language management
 */
export const useEthioIntl = (): EthioIntlEnhancedHookResult => {
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
  };
};
