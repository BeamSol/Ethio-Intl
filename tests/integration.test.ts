import { toEthDate } from '../src/utils/date';

describe('Integration Tests', () => {
  test('should correctly convert Gregorian dates to Ethiopian dates', () => {
    expect(toEthDate(new Date(2025, 8, 11))).toBe('Meskerem 1, 2018');
    expect(toEthDate(new Date(2025, 8, 12))).toBe('Meskerem 2, 2018');
    expect(toEthDate(new Date(2025, 8, 10))).toBe('Pagume 4, 2017');
  });
});
