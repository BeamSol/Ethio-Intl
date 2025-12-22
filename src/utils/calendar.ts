// Ethiopian Calendar utilities

export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

// Ethiopian month names
export const ETHIOPIAN_MONTHS = [
  'መስከረም', // Meskerem
  'ጥቅምት', // Tikimt
  'ህዳር', // Hidar
  'ታህሳስ', // Tahsas
  'ጥር', // Tir
  'የካቲት', // Yekatit
  'መጋቢት', // Megabit
  'ሚያዝያ', // Miyazya
  'ግንቦት', // Ginbot
  'ሰኔ', // Sene
  'ሐምሌ', // Hamle
  'ነሐሴ', // Nehasse
  'ጳጉሜን', // Pagumen
];

// Ethiopian day names
export const ETHIOPIAN_DAYS = [
  'እሑድ', // Ehud (Sunday)
  'ሰኞ', // Seneo (Monday)
  'ማክሰኞ', // Maksegno (Tuesday)
  'ረቡዕ', // Rebu (Wednesday)
  'ሓሙስ', // Hamus (Thursday)
  'አርብ', // Arb (Friday)
  'ቅዳሜ', // Kidame (Saturday)
];

/**
 * Gets the Ethiopian month names
 */
export function getEthiopianMonths(): string[] {
  return [...ETHIOPIAN_MONTHS];
}

/**
 * Gets the Ethiopian day names
 */
export function getEthiopianDays(): string[] {
  return [...ETHIOPIAN_DAYS];
}

/**
 * Converts a Gregorian date to Ethiopian date
 * @param gregorianDate - The Gregorian date to convert
 * @returns The equivalent Ethiopian date
 */
export function toEthiopianDate(gregorianDate: GregorianDate): EthiopianDate {
  const { year, month, day } = gregorianDate;

  // Ethiopian calendar starts 7-8 years before Gregorian
  // The exact offset depends on the date due to leap year differences

  // Create a Date object for the Gregorian date
  const gregorian = new Date(year, month - 1, day);

  // Ethiopian New Year (Meskerem 1) is September 11 or 12 in Gregorian calendar
  // For simplicity, we'll use September 11 as the reference point

  const referenceGregorian = new Date(year, 8, 11); // September 11
  const referenceEthiopian: EthiopianDate = { year: year + 8, month: 1, day: 1 };

  // Calculate the difference in days
  const diffTime = gregorian.getTime() - referenceGregorian.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return referenceEthiopian;
  }

  let ethiopianYear = referenceEthiopian.year;
  let ethiopianMonth = referenceEthiopian.month;
  let ethiopianDay = referenceEthiopian.day + diffDays;

  // Adjust for Ethiopian calendar (13 months, 12 of 30 days, 1 of 5/6 days)
  while (ethiopianDay > 30) {
    if (ethiopianMonth === 13) {
      // Pagumen has 5 or 6 days depending on leap year
      const isLeapYear = isEthiopianLeapYear(ethiopianYear);
      const pagumenDays = isLeapYear ? 6 : 5;

      if (ethiopianDay <= pagumenDays) {
        break;
      }

      ethiopianYear++;
      ethiopianMonth = 1;
      ethiopianDay -= pagumenDays;
    } else {
      ethiopianMonth++;
      ethiopianDay -= 30;
    }
  }

  // Handle negative days (going backwards)
  while (ethiopianDay <= 0) {
    if (ethiopianMonth === 1) {
      ethiopianYear--;
      ethiopianMonth = 13;
      const isLeapYear = isEthiopianLeapYear(ethiopianYear);
      ethiopianDay += isLeapYear ? 6 : 5;
    } else {
      ethiopianMonth--;
      ethiopianDay += 30;
    }
  }

  return {
    year: ethiopianYear,
    month: ethiopianMonth,
    day: ethiopianDay,
  };
}

/**
 * Converts an Ethiopian date to Gregorian date
 * @param ethiopianDate - The Ethiopian date to convert
 * @returns The equivalent Gregorian date
 */
export function fromEthiopianDate(ethiopianDate: EthiopianDate): GregorianDate {
  const { year, month, day } = ethiopianDate;

  // Ethiopian New Year (Meskerem 1) corresponds to September 11 or 12 in Gregorian
  const referenceEthiopian: EthiopianDate = { year, month: 1, day: 1 };
  const referenceGregorian = new Date(year - 8, 8, 11); // September 11 of (year - 8)

  let daysToAdd = 0;

  // Calculate days from Ethiopian New Year
  for (let m = 1; m < month; m++) {
    daysToAdd += 30; // First 12 months have 30 days each
  }

  if (month === 13) {
    // Pagumen
    const isLeapYear = isEthiopianLeapYear(year);
    daysToAdd += isLeapYear ? 6 : 5;
  } else {
    daysToAdd += day - 1;
  }

  // Add the days to the reference Gregorian date
  const gregorianTime = referenceGregorian.getTime() + (daysToAdd * 24 * 60 * 60 * 1000);
  const gregorian = new Date(gregorianTime);

  return {
    year: gregorian.getFullYear(),
    month: gregorian.getMonth() + 1,
    day: gregorian.getDate(),
  };
}

/**
 * Checks if an Ethiopian year is a leap year
 * Ethiopian leap years occur every 4 years, similar to Gregorian
 */
function isEthiopianLeapYear(year: number): boolean {
  return year % 4 === 0;
}

/**
 * Gets the current date in Ethiopian calendar
 */
export function getCurrentEthiopianDate(): EthiopianDate {
  const now = new Date();
  return toEthiopianDate({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });
}

/**
 * Formats an Ethiopian date as a string
 */
export function formatEthiopianDate(date: EthiopianDate): string {
  return `${ETHIOPIAN_MONTHS[date.month - 1]} ${date.day}, ${date.year}`;
}

