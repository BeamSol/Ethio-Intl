// Ethiopian Numerals (existing Arabic numerals)
export {
  toEthiopianNumerals,
  fromEthiopianNumerals,
} from './numerals';

// Ethiopian Date conversion (Gregorian ↔ Ethiopian)
export {
  toEthDate,
  getEthiopianDate,
  isEthiopianLeapYear,
  getEthiopianMonthDays,
  AMHARIC_MONTHS,
} from './date';

export type { EthiopianDate } from './date';

// Geez Script Numerals (፩፪፫...)
export {
  toEthNumber,
  fromEthNumber,
  formatEthNumber,
  isValidGeezNumber,
  getGeezDigit,
  getGeezTens,
  GEEZ_NUMERALS,
} from './numbers';

// Legacy calendar exports (for backward compatibility)
export {
  toEthiopianDate,
  fromEthiopianDate,
  getEthiopianMonths,
  getEthiopianDays,
  getCurrentEthiopianDate,
  formatEthiopianDate,
} from './calendar';

export type { GregorianDate } from './calendar';

