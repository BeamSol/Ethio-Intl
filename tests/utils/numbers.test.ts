import { toEthNumber, fromEthNumber, formatEthNumber, isValidGeezNumber, getGeezDigit, getGeezTens, GEEZ_NUMERALS } from '../../src/utils/numbers';

describe('Geez Numeral Utilities', () => {
  describe('GEEZ_NUMERALS constants', () => {
    test('should have correct ones mapping', () => {
      expect(GEEZ_NUMERALS.ones).toEqual(['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱']);
    });

    test('should have correct tens mapping', () => {
      expect(GEEZ_NUMERALS.tens).toEqual(['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺']);
    });

    test('should have correct power symbols', () => {
      expect(GEEZ_NUMERALS.hundreds).toBe('፻');
      expect(GEEZ_NUMERALS.tenThousands).toBe('፼');
    });
  });

  describe('toEthNumber', () => {
    test('should convert basic numbers correctly', () => {
      expect(toEthNumber(1)).toBe('፩');
      expect(toEthNumber(5)).toBe('፭');
      expect(toEthNumber(10)).toBe('፲');
      expect(toEthNumber(15)).toBe('፲፭');
      expect(toEthNumber(25)).toBe('፳፭');
    });

    test('should handle hundreds correctly', () => {
      expect(toEthNumber(100)).toBe('፻');        // No multiplier for 100
      expect(toEthNumber(200)).toBe('፳፻');       // 20 * 100
      expect(toEthNumber(500)).toBe('፶፻');       // 50 * 100
    });

    test('should handle thousands correctly', () => {
      expect(toEthNumber(1000)).toBe('፲፻');      // 10 * 100
      expect(toEthNumber(2000)).toBe('፳፻');      // 20 * 100
      expect(toEthNumber(10000)).toBe('፼');      // 10,000
      expect(toEthNumber(20000)).toBe('፳፼');     // 20 * 10,000
    });

    test('should handle complex numbers', () => {
      expect(toEthNumber(123)).toBe('፻፳፫'); // 100 + 20 + 3 = 123
      expect(toEthNumber(456)).toBe('፵፻፶፮'); // 40*100 + 50 + 6 = 456
    });

    test('should handle the specified example (2025)', () => {
      expect(toEthNumber(2025)).toBe('፳፻፳፭'); // 20*100 + 20 + 5 = 2025
    });

    test('should throw error for invalid inputs', () => {
      expect(() => toEthNumber(0)).toThrow();
      expect(() => toEthNumber(-1)).toThrow();
      expect(() => toEthNumber(1.5)).toThrow();
      expect(() => toEthNumber(1000001)).toThrow();
    });
  });

  describe('fromEthNumber', () => {
    test('should convert basic Geez numerals back', () => {
      expect(fromEthNumber('፩')).toBe(1);
      expect(fromEthNumber('፭')).toBe(5);
      expect(fromEthNumber('፲')).toBe(10);
      expect(fromEthNumber('፲፭')).toBe(15);
    });

    test('should handle hundreds', () => {
      expect(fromEthNumber('፻')).toBe(100);
      expect(fromEthNumber('፲፻')).toBe(1000); // 10 * 100
    });

    test('should handle ten thousands', () => {
      expect(fromEthNumber('፼')).toBe(10000);
      expect(fromEthNumber('፪፼')).toBe(20000);
    });
  });

  describe('formatEthNumber', () => {
    test('should format valid numbers', () => {
      expect(formatEthNumber(123)).toBe('፻፳፫'); // 100 + 20 + 3
    });

    test('should fallback to Arabic numerals for invalid inputs', () => {
      expect(formatEthNumber(0)).toBe('0');
      expect(formatEthNumber(-5)).toBe('-5');
    });
  });

  describe('isValidGeezNumber', () => {
    test('should validate Geez numeral strings', () => {
      expect(isValidGeezNumber('፩፪፻')).toBe(true);
      expect(isValidGeezNumber('፲፼')).toBe(true);
      expect(isValidGeezNumber('123')).toBe(false);
      expect(isValidGeezNumber('፩x፪')).toBe(false);
    });
  });

  describe('getGeezDigit', () => {
    test('should return correct Geez digits', () => {
      expect(getGeezDigit(1)).toBe('፩');
      expect(getGeezDigit(5)).toBe('፭');
      expect(getGeezDigit(9)).toBe('፱');
    });

    test('should return empty string for invalid digits', () => {
      expect(getGeezDigit(0)).toBe('');
      expect(getGeezDigit(10)).toBe('');
    });
  });

  describe('getGeezTens', () => {
    test('should return correct Geez tens', () => {
      expect(getGeezTens(1)).toBe('፲'); // 10
      expect(getGeezTens(5)).toBe('፶'); // 50
      expect(getGeezTens(9)).toBe('፺'); // 90
    });

    test('should return empty string for invalid tens', () => {
      expect(getGeezTens(0)).toBe('');
      expect(getGeezTens(10)).toBe('');
    });
  });
});
