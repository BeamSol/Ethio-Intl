import { amharicMap, reverseMap } from '../../src/utils/amharicMap';

describe('Amharic Mapping', () => {
  test('should have basic consonants with vowel variations', () => {
    expect(amharicMap.h.base).toBe('ህ');
    expect(amharicMap.h.u).toBe('ሁ');
    expect(amharicMap.h.a).toBe('ሃ');
    expect(amharicMap.h.i).toBe('ሂ');
    expect(amharicMap.h.e).toBe('ሄ');
    expect(amharicMap.h.o).toBe('ሆ');
  });

  test('should have standalone vowels', () => {
    expect(amharicMap.a.base).toBe('አ');
    expect(amharicMap.e.base).toBe('እ');
    expect(amharicMap.i.base).toBe('ኢ');
    expect(amharicMap.o.base).toBe('ኦ');
    expect(amharicMap.u.base).toBe('ኡ');
  });

  test('should have reverse mapping for lookups', () => {
    expect(reverseMap['ህ']).toBe('h');
    expect(reverseMap['ሁ']).toBe('h');
    expect(reverseMap['ሃ']).toBe('h');
    expect(reverseMap['አ']).toBe('a');
    expect(reverseMap['እ']).toBe('e');
  });

  test('should handle basic consonant-vowel combinations', () => {
    // Test that 'h' + 'u' = 'ሁ'
    expect(amharicMap.h.u).toBe('ሁ');
    // Test that reverse lookup works
    expect(reverseMap['ሁ']).toBe('h');
    expect(reverseMap['ህ']).toBe('h');
  });
});

