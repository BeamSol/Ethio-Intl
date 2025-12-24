import { toEthDate, getEthiopianDate, isEthiopianLeapYear, getEthiopianMonthDays, AMHARIC_MONTHS } from '../../src/utils/date';

describe('Ethiopian Calendar Utilities', () => {
  describe('AMHARIC_MONTHS', () => {
    test('should contain 13 months in both languages', () => {
      expect(AMHARIC_MONTHS.en).toHaveLength(13);
      expect(AMHARIC_MONTHS.am).toHaveLength(13);
    });

    test('should have correct English month names', () => {
      expect(AMHARIC_MONTHS.en[0]).toBe('Meskerem');
      expect(AMHARIC_MONTHS.en[1]).toBe('Tikimt');
      expect(AMHARIC_MONTHS.en[12]).toBe('Pagume');
    });

    test('should have Amharic script month names', () => {
      expect(AMHARIC_MONTHS.am[0]).toBe('መስከረም');
      expect(AMHARIC_MONTHS.am[1]).toBe('ጥቅምት');
      expect(AMHARIC_MONTHS.am[12]).toBe('ጳጉሜ');
    });
  });

  describe('toEthDate', () => {
    test('should convert Gregorian date to Ethiopian format', () => {
      const date = new Date(2024, 8, 11); // September 11, 2024
      const result = toEthDate(date, 'en');
      expect(result).toMatch(/^[A-Za-z]+ \d{1,2}, \d{4}$/);
    });

    test('should support Amharic output', () => {
      const date = new Date(2024, 0, 1);
      const result = toEthDate(date, 'am');
      expect(result).toMatch(/^መስከረም|ጥቅምት|ህዳር|ታህሳስ|ጥር|የካቲት|መጋቢት|ሚያዝያ|ጀንቦት|ሰኔ|ሐምሌ|ነሐሴ|ጳጉሜ/);
    });

    test('should handle leap years correctly', () => {
      // Test various dates to ensure leap year handling
      const dates = [
        new Date(2024, 8, 11),
        new Date(2025, 8, 11),
        new Date(2026, 8, 11),
      ];

      dates.forEach(date => {
        expect(() => toEthDate(date)).not.toThrow();
      });
    });
  });

  describe('getEthiopianDate', () => {
    test('should return structured Ethiopian date', () => {
      const date = new Date(2024, 8, 11);
      const result = getEthiopianDate(date);

      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('monthName');
      expect(result).toHaveProperty('fullDate');

      expect(result.month).toBeGreaterThanOrEqual(1);
      expect(result.month).toBeLessThanOrEqual(13);
      expect(result.day).toBeGreaterThanOrEqual(1);
      expect(result.day).toBeLessThanOrEqual(30);
    });
  });

  describe('isEthiopianLeapYear', () => {
    test('should correctly identify leap years', () => {
      expect(isEthiopianLeapYear(2015)).toBe(true);  // 2015 % 4 === 3
      expect(isEthiopianLeapYear(2016)).toBe(false); // 2016 % 4 === 0
      expect(isEthiopianLeapYear(2017)).toBe(false); // 2017 % 4 === 1
      expect(isEthiopianLeapYear(2018)).toBe(false); // 2018 % 4 === 2
      expect(isEthiopianLeapYear(2019)).toBe(true);  // 2019 % 4 === 3
    });
  });

  describe('getEthiopianMonthDays', () => {
    test('should return 30 days for regular months', () => {
      for (let month = 1; month <= 12; month++) {
        expect(getEthiopianMonthDays(2017, month)).toBe(30);
      }
    });

    test('should return correct days for Pagume based on leap year', () => {
      expect(getEthiopianMonthDays(2015, 13)).toBe(6); // Leap year
      expect(getEthiopianMonthDays(2016, 13)).toBe(5); // Non-leap year
    });

    test('should throw error for invalid months', () => {
      expect(() => getEthiopianMonthDays(2017, 0)).toThrow();
      expect(() => getEthiopianMonthDays(2017, 14)).toThrow();
    });
  });
});


