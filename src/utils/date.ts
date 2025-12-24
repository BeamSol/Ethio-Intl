/**
 * Ethiopian Calendar Utilities
 * Converts Gregorian dates to Ethiopian calendar format with mathematical precision
 */

// Ethiopian month names (both English and Amharic script)
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
 * Determine if a Gregorian year is a leap year
 */
const isGregorianLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Get the Ethiopian New Year (Meskerem 1) date for a given Gregorian year
 * Meskerem 1 is usually September 11, but September 12 in Gregorian leap years
 * when the date is after February 29
 */
const getEthiopianNewYear = (gregorianYear: number): Date => {
  // Create date at noon UTC to avoid timezone issues
  const day = isGregorianLeapYear(gregorianYear) ? 12 : 11;
  return new Date(Date.UTC(gregorianYear, 8, day, 12, 0, 0, 0)); // September 11 or 12 at noon UTC
};

/**
 * Calculate the Ethiopian year for a given Gregorian date
 * Year Gap Rule:
 * - From Jan 1 to Sept 10/11: Ethiopian Year = Gregorian Year - 8
 * - From Sept 11/12 to Dec 31: Ethiopian Year = Gregorian Year - 7
 */
const getEthiopianYear = (gregorianDate: Date): number => {
  const gregorianYear = gregorianDate.getFullYear();
  const newYearDate = getEthiopianNewYear(gregorianYear);

  // Normalize both dates to noon UTC for accurate comparison
  const normalizedDate = new Date(Date.UTC(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate(), 12, 0, 0, 0));

  // If the date is before Meskerem 1, subtract 8, otherwise subtract 7
  if (normalizedDate < newYearDate) {
    return gregorianYear - 8;
  } else {
    return gregorianYear - 7;
  }
};

/**
 * Convert Gregorian date to Ethiopian date with mathematical precision
 */
export const toEthDate = (inputDate: Date, lang: 'en' | 'am' = 'en'): string => {
  // Normalize input date to noon UTC to avoid timezone issues
  const date = new Date(Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
    12, 0, 0, 0
  ));

  const gregorianYear = date.getUTCFullYear();
  let ethiopianYear = getEthiopianYear(inputDate); // Use original date for year calculation
  let newYearDate = getEthiopianNewYear(gregorianYear);

  // If original date is before Meskerem 1, use the previous year's Meskerem 1
  const normalizedInputDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 12, 0, 0, 0));
  if (normalizedInputDate < newYearDate) {
    ethiopianYear = getEthiopianYear(inputDate); // This already handles the year adjustment
    newYearDate = getEthiopianNewYear(gregorianYear - 1);
  }

  // Calculate days since Ethiopian New Year (Meskerem 1)
  const daysDiff = Math.floor((date.getTime() - newYearDate.getTime()) / (1000 * 60 * 60 * 24));

  // Ethiopian calendar: 12 months of 30 days + 13th month (Pagume)
  // Calculate month and day
  let ethiopianMonth: number;
  let ethiopianDay: number;

  if (daysDiff < 360) {
    // Within first 12 months (360 days)
    ethiopianMonth = Math.floor(daysDiff / 30) + 1;
    ethiopianDay = (daysDiff % 30) + 1;
  } else {
    // In Pagume (13th month)
    const pagumeDays = daysDiff - 360;
    const isLeapYear = isEthiopianLeapYear(ethiopianYear);

    if (pagumeDays < (isLeapYear ? 6 : 5)) {
      ethiopianMonth = 13;
      ethiopianDay = pagumeDays + 1;
    } else {
      // Date is in next Ethiopian year
      ethiopianMonth = 1;
      ethiopianDay = pagumeDays - (isLeapYear ? 6 : 5) + 1;
      // Year adjustment will be handled by the year calculation
    }
  }

  // Validate ranges
  if (ethiopianMonth < 1 || ethiopianMonth > 13) {
    throw new Error(`Invalid Ethiopian month: ${ethiopianMonth}`);
  }

  const maxDays = ethiopianMonth === 13 ? (isEthiopianLeapYear(ethiopianYear) ? 6 : 5) : 30;
  if (ethiopianDay < 1 || ethiopianDay > maxDays) {
    throw new Error(`Invalid Ethiopian day: ${ethiopianDay} (max ${maxDays} for month ${ethiopianMonth})`);
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


