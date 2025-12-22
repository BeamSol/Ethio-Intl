// Ethiopian (Ge'ez) numeral system
const geezNumerals: Record<number, string> = {
  0: '፩',
  1: '፩',
  2: '፪',
  3: '፫',
  4: '፬',
  5: '፭',
  6: '፮',
  7: '፯',
  8: '፰',
  9: '፱',
  10: '፲',
  20: '፳',
  30: '፴',
  40: '፵',
  50: '፶',
  60: '፷',
  70: '፸',
  80: '፹',
  90: '፺',
  100: '፻',
  10000: '፼',
};

/**
 * Converts a number to Ethiopian (Ge'ez) numerals
 * @param num - The number to convert (0-999999)
 * @returns The number in Ethiopian numerals
 */
export function toEthiopianNumerals(num: number): string {
  if (num === 0) return geezNumerals[0];
  if (num < 0 || num > 999999) {
    throw new Error('Number must be between 0 and 999999');
  }

  let result = '';
  let remaining = num;

  // Handle 10000s (፼)
  if (remaining >= 10000) {
    const tenThousands = Math.floor(remaining / 10000);
    if (tenThousands > 1) {
      result += toEthiopianNumerals(tenThousands);
    }
    result += geezNumerals[10000];
    remaining %= 10000;
  }

  // Handle 100s (፻)
  if (remaining >= 100) {
    const hundreds = Math.floor(remaining / 100);
    if (hundreds > 1) {
      result += toEthiopianNumerals(hundreds);
    }
    result += geezNumerals[100];
    remaining %= 100;
  }

  // Handle 10s and 1s
  if (remaining > 0) {
    if (remaining <= 10) {
      result += geezNumerals[remaining];
    } else if (remaining < 100) {
      const tens = Math.floor(remaining / 10) * 10;
      const ones = remaining % 10;

      result += geezNumerals[tens];
      if (ones > 0) {
        result += geezNumerals[ones];
      }
    }
  }

  return result;
}

/**
 * Converts Ethiopian (Ge'ez) numerals to a regular number
 * @param geezNumeral - The Ethiopian numeral string
 * @returns The number as a regular integer
 */
export function fromEthiopianNumerals(geezNumeral: string): number {
  // Simplified implementation for basic numerals
  const numeralMap: Record<string, number> = {
    '፩': 1,
    '፪': 2,
    '፫': 3,
    '፬': 4,
    '፭': 5,
    '፮': 6,
    '፯': 7,
    '፰': 8,
    '፱': 9,
    '፲': 10,
    '፳': 20,
    '፴': 30,
    '፵': 40,
    '፶': 50,
    '፷': 60,
    '፸': 70,
    '፹': 80,
    '፺': 90,
    '፻': 100,
    '፼': 10000,
  };

  // Simple lookup for basic numerals
  if (numeralMap[geezNumeral]) {
    return numeralMap[geezNumeral];
  }

  // For composite numerals, sum the individual characters
  let result = 0;
  for (const char of geezNumeral) {
    if (numeralMap[char]) {
      result += numeralMap[char];
    }
  }

  return result;
}