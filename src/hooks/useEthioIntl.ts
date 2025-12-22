import { useContext } from 'react';
import { EthioIntlContext } from '../localization/EthioProvider';
import { EthioIntlHookResult } from '../localization/types';

/**
 * useEthioIntl - Custom hook for Ethiopian internationalization
 * Provides simplified access to translation functions and language switching
 */
export const useEthioIntl = (): EthioIntlHookResult => {
  const context = useContext(EthioIntlContext);

  if (!context) {
    throw new Error('useEthioIntl must be used within an EthioProvider');
  }

  return {
    t: context.t,
    currentLang: context.currentLang,
    changeLanguage: context.changeLanguage,
    supportedLangs: context.supportedLangs,
  };
};
