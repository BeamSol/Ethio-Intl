import { toEthiopianNumerals, fromEthiopianNumerals } from '../../src/utils/numerals';

describe('Ethiopian Numerals', () => {
  test('should convert numbers to Ethiopian numerals', () => {
    expect(toEthiopianNumerals(1)).toBe('፩');
    expect(toEthiopianNumerals(10)).toBe('፲');
    expect(toEthiopianNumerals(100)).toBe('፻');
    expect(toEthiopianNumerals(2025)).toBe('፳፻፳፭');
  });

  test('should convert two-digit numbers to Ethiopian numerals', () => {
    expect(toEthiopianNumerals(11)).toBe('፲፩');
    expect(toEthiopianNumerals(15)).toBe('፲፭');
    expect(toEthiopianNumerals(22)).toBe('፳፪');
    expect(toEthiopianNumerals(47)).toBe('፵፯');
    expect(toEthiopianNumerals(99)).toBe('፺፱');
  });

  test('should handle zero', () => {
    expect(toEthiopianNumerals(0)).toBe('፩');
  });

  test('should convert Ethiopian numerals back to numbers', () => {
    expect(fromEthiopianNumerals('፩')).toBe(1);
    expect(fromEthiopianNumerals('፲')).toBe(10);
    expect(fromEthiopianNumerals('፻')).toBe(100);
  });
});
