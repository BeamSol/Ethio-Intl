// Main exports for Ethio-Intl SDK

// Localization Wrapper
export { EthioProvider, useEthioIntl } from './localization';

// Transliteration Engine
export { SmartInput, amharicMap, reverseMap } from './transliteration';
export { useTransliterate } from './hooks/useTransliterate';

// Utility Kit
export {
  toEthiopianNumerals,
  fromEthiopianNumerals,
  toEthiopianDate,
  fromEthiopianDate,
  getEthiopianMonths,
  getEthiopianDays
} from './utils';

// Types
export type { EthioIntlConfig, Language } from './localization/types';

