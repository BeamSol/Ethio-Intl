// Main exports for Ethio-Intl SDK

// Localization Wrapper
export { EthioProvider, useEthioIntl } from './localization';

// Transliteration Engine
export { SmartInput, amharicMap, reverseMap } from './transliteration';
export { useTransliterate } from './hooks/useTransliterate';

// Utility Kit
export {
  // Legacy Arabic numerals (for backward compatibility)
  toEthiopianNumerals,
  fromEthiopianNumerals,

  // Gregorian ↔ Ethiopian calendar conversion
  toEthDate,
  getEthiopianDate,
  isEthiopianLeapYear,
  getEthiopianMonthDays,
  AMHARIC_MONTHS,

  // Geez script numerals (፩፪፫...)
  toEthNumber,
  fromEthNumber,
  formatEthNumber,
  isValidGeezNumber,
  getGeezDigit,
  getGeezTens,
  GEEZ_NUMERALS,

  // Legacy calendar functions
  toEthiopianDate,
  fromEthiopianDate,
  getEthiopianMonths,
  getEthiopianDays
} from './utils';

// Types
export type { EthioProviderProps, EthioIntlHookResult, Language } from './localization/types';

