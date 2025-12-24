/**
 * Ethiopian Calendar Utilities
 * Converts Gregorian dates to Ethiopian calendar format
 */

// Amharic month names (both English and Amharic script)
export const AMHARIC_MONTHS = {
  en: [
    "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
    "Megabit", "Miazia", "Genbot", "Sene", "Hamle", "Nehase", "Pagume"
  ],
  am: [
    "መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት",
    "መጋቢት", "ሚያዝያ", "ጀንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
  ]
};

/**
 * Convert Gregorian date to Ethiopian date
 * Uses Julian Day Number algorithm for accurate conversion
 */
export const toEthDate = (date: Date, lang: 'en' | 'am' = 'en'): string => {
  // Ethiopian calendar is approximately 7-8 years behind Gregorian
  // Use JDN (Julian Day Number) for accurate conversion

  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1; // JS months are 0-based
  const gregorianDay = date.getDate();

  // Convert Gregorian to JDN
  const a = Math.floor((14 - gregorianMonth) / 12);
  const y = gregorianYear + 4800 - a;
  const m = gregorianMonth + 12 * a - 3;

  let jdn = gregorianDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Ethiopian calendar epoch (JDN of Meskerem 1, 1 in Ethiopian calendar)
  const ethiopianEpoch = 1723856; // JDN for Meskerem 1, 1 EC

  // Calculate Ethiopian date
  let ethiopianJdn = jdn - ethiopianEpoch;

  // Ethiopian years are 365.25 days (leap years every 4 years)
  let ethiopianYear = Math.floor(ethiopianJdn / 365.25) + 1;
  let dayOfYear = Math.floor(ethiopianJdn % 365.25);

  // Adjust for leap years
  if (dayOfYear < 0) {
    ethiopianYear--;
    dayOfYear += 365 + (ethiopianYear % 4 === 3 ? 1 : 0);
  }

  // Ethiopian months are 30 days each, with Pagume having 5 or 6 days
  let ethiopianMonth = Math.floor(dayOfYear / 30) + 1;
  let ethiopianDay = dayOfYear % 30 + 1;

  // Handle Pagume (13th month)
  if (ethiopianMonth === 13) {
    const isLeapYear = ethiopianYear % 4 === 3;
    if (ethiopianDay > (isLeapYear ? 6 : 5)) {
      ethiopianMonth = 1;
      ethiopianYear++;
      ethiopianDay -= isLeapYear ? 6 : 5;
    }
  }

  // Ensure valid ranges
  if (ethiopianMonth < 1 || ethiopianMonth > 13) {
    throw new Error('Invalid Ethiopian month calculated');
  }
  if (ethiopianDay < 1 || ethiopianDay > 30) {
    throw new Error('Invalid Ethiopian day calculated');
  }

  const monthName = AMHARIC_MONTHS[lang][ethiopianMonth - 1];

  return `${monthName} ${ethiopianDay}, ${ethiopianYear}`;
};

/**
 * Get Ethiopian date components
 */
export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  fullDate: string;
}

export const getEthiopianDate = (date: Date, lang: 'en' | 'am' = 'en'): EthiopianDate => {
  const fullDate = toEthDate(date, lang);
  const [monthDay, year] = fullDate.split(', ');
  const [monthName, day] = monthDay.split(' ');

  const monthIndex = AMHARIC_MONTHS[lang].indexOf(monthName);
  if (monthIndex === -1) {
    throw new Error('Invalid month name');
  }

  return {
    year: parseInt(year),
    month: monthIndex + 1,
    day: parseInt(day),
    monthName,
    fullDate
  };
};

/**
 * Check if a given Ethiopian year is a leap year
 */
export const isEthiopianLeapYear = (ethiopianYear: number): boolean => {
  return ethiopianYear % 4 === 3;
};

/**
 * Get the number of days in an Ethiopian month
 */
export const getEthiopianMonthDays = (ethiopianYear: number, month: number): number => {
  if (month >= 1 && month <= 12) {
    return 30;
  } else if (month === 13) {
    return isEthiopianLeapYear(ethiopianYear) ? 6 : 5;
  }
  throw new Error('Invalid Ethiopian month');
};


