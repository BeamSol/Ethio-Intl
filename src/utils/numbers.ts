/**
 * Geez Numeral Utilities
 * Converts integers to traditional Geez script numerals
 */

// Geez numeral mappings
export const GEEZ_NUMERALS = {
  // Ones (1-9)
  ones: ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'],

  // Tens (10-90)
  tens: ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'],

  // Powers (100, 10000)
  hundreds: '፻',
  tenThousands: '፼'
};

/**
 * Convert number to Geez numerals
 * Handles numbers up to 1,000,000 with proper Geez formatting rules
 */
export const toEthNumber = (num: number): string => {
  if (!Number.isInteger(num) || num < 1 || num > 1000000) {
    throw new Error('Number must be an integer between 1 and 1,000,000');
  }

  let result = '';
  let remaining = num;

  // Handle ten-thousands (፼) - process from largest to smallest
  if (remaining >= 10000) {
    const tenThousands = Math.floor(remaining / 10000);
    remaining %= 10000;

    if (tenThousands === 1) {
      // Special case: 10,000 is just ፼ (no multiplier)
      result += GEEZ_NUMERALS.tenThousands;
    } else if (tenThousands >= 2 && tenThousands <= 9) {
      // Use tens symbols for multipliers (፳፼ for 20,000, etc.)
      result += GEEZ_NUMERALS.tens[tenThousands] + GEEZ_NUMERALS.tenThousands;
    } else if (tenThousands >= 10) {
      // For larger multipliers, use full numerals + ፼
      result += toEthNumber(tenThousands) + GEEZ_NUMERALS.tenThousands;
    }
  }

  // Handle hundreds and thousands (፻ represents 100, so 1000 = 10*100 = ፲፻)
  if (remaining >= 100) {
    const hundreds = Math.floor(remaining / 100);
    remaining %= 100;

    if (hundreds === 1) {
      // Special case: 100 is just ፻ (no multiplier)
      result += GEEZ_NUMERALS.hundreds;
    } else if (hundreds >= 2 && hundreds <= 9) {
      // Use tens symbols for multipliers (፲፻ for 1000, ፳፻ for 2000, etc.)
      result += GEEZ_NUMERALS.tens[hundreds] + GEEZ_NUMERALS.hundreds;
    } else if (hundreds >= 10) {
      // For larger multipliers, use full numerals + ፻
      result += toEthNumber(hundreds) + GEEZ_NUMERALS.hundreds;
    }
  }

  // Handle tens and ones
  if (remaining > 0) {
    const tens = Math.floor(remaining / 10);
    const ones = remaining % 10;

    // Add tens digit
    if (tens > 0) {
      result += GEEZ_NUMERALS.tens[tens];
    }

    // Add ones digit
    if (ones > 0) {
      result += GEEZ_NUMERALS.ones[ones];
    }
  }

  return result;
};

/**
 * Convert Geez numerals back to number (basic support)
 * Note: This is a simplified reverse conversion for basic cases
 */
export const fromEthNumber = (geez: string): number => {
  let result = 0;

  // Handle ten-thousands (፼)
  if (geez.includes(GEEZ_NUMERALS.tenThousands)) {
    const parts = geez.split(GEEZ_NUMERALS.tenThousands);
    if (parts[0]) {
      result += fromEthNumber(parts[0]) * 10000;
    } else {
      result += 10000;
    }
    geez = parts[1] || '';
  }

  // Handle hundreds (፻)
  if (geez.includes(GEEZ_NUMERALS.hundreds)) {
    const parts = geez.split(GEEZ_NUMERALS.hundreds);
    if (parts[0]) {
      // Parse the multiplier before ፻
      let multiplier = 0;
      for (let i = 1; i <= 9; i++) {
        if (parts[0].includes(GEEZ_NUMERALS.tens[i])) {
          multiplier += i * 10;
          parts[0] = parts[0].replace(GEEZ_NUMERALS.tens[i], '');
        }
        if (parts[0].includes(GEEZ_NUMERALS.ones[i])) {
          multiplier += i;
          parts[0] = parts[0].replace(GEEZ_NUMERALS.ones[i], '');
        }
      }
      result += multiplier * 100;
    } else {
      result += 100;
    }
    geez = parts[1] || '';
  }

  // Parse remaining tens and ones
  for (let i = 1; i <= 9; i++) {
    if (geez.includes(GEEZ_NUMERALS.tens[i])) {
      result += i * 10;
    }
    if (geez.includes(GEEZ_NUMERALS.ones[i])) {
      result += i;
    }
  }

  return result;
};

/**
 * Format number with Geez numerals and fallback to Arabic
 */
export const formatEthNumber = (num: number): string => {
  try {
    return toEthNumber(num);
  } catch {
    return num.toString(); // Fallback to Arabic numerals
  }
};

/**
 * Check if a string contains valid Geez numerals
 */
export const isValidGeezNumber = (str: string): boolean => {
  const validChars = Object.values(GEEZ_NUMERALS).flat().join('');
  return [...str].every(char => validChars.includes(char));
};

/**
 * Get Geez numeral for a single digit (1-9)
 */
export const getGeezDigit = (digit: number): string => {
  if (digit < 1 || digit > 9) {
    return '';
  }
  return GEEZ_NUMERALS.ones[digit];
};

/**
 * Get Geez numeral for tens (10-90)
 */
export const getGeezTens = (tens: number): string => {
  if (tens < 1 || tens > 9) {
    return '';
  }
  return GEEZ_NUMERALS.tens[tens];
};
