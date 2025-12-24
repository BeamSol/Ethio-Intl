/**
 * Utility Demo - Ethiopian Date and Geez Numeral Examples
 *
 * Demonstrates the Ethiopian calendar and Geez numeral utilities
 */

import { toEthDate, toEthNumber } from '../utils';

/**
 * Demonstrate Ethiopian date conversion
 */
export function demonstrateEthiopianDate() {
  console.log('🌍 Ethiopian Calendar Demonstrations');
  console.log('=====================================');

  // Today's date
  const today = new Date();
  const ethiopianDateEn = toEthDate(today, 'en');
  const ethiopianDateAm = toEthDate(today, 'am');

  console.log(`Gregorian Date: ${today.toDateString()}`);
  console.log(`Ethiopian (English): ${ethiopianDateEn}`);
  console.log(`Ethiopian (Amharic): ${ethiopianDateAm}`);
  console.log('');

  // Specific dates
  const testDates = [
    new Date(2024, 0, 1),  // January 1, 2024
    new Date(2024, 8, 11), // September 11, 2024
    new Date(2024, 11, 25), // December 25, 2024
  ];

  testDates.forEach(date => {
    console.log(`${date.toDateString()} → ${toEthDate(date, 'en')}`);
  });

  console.log('');
}

/**
 * Demonstrate Geez numeral conversion
 */
export function demonstrateGeezNumerals() {
  console.log('🔢 Geez Numeral Demonstrations');
  console.log('===============================');

  // Basic numbers
  const basicNumbers = [1, 5, 10, 15, 25, 50, 100, 500, 1000, 2025];

  basicNumbers.forEach(num => {
    const geez = toEthNumber(num);
    console.log(`${num} → ${geez}`);
  });

  console.log('');

  // Larger numbers
  console.log('Large Numbers:');
  const largeNumbers = [10000, 25000, 100000, 500000, 1000000];

  largeNumbers.forEach(num => {
    try {
      const geez = toEthNumber(num);
      console.log(`${num.toLocaleString()} → ${geez}`);
    } catch (error) {
      console.log(`${num.toLocaleString()} → Error: ${(error as Error).message}`);
    }
  });

  console.log('');
}

/**
 * Demonstrate both utilities together
 */
export function demonstrateCombined() {
  console.log('🎯 Combined Demonstrations');
  console.log('===========================');

  // Get current year in both formats
  const currentYear = new Date().getFullYear();
  const geezYear = toEthNumber(currentYear);

  console.log(`Current Year: ${currentYear}`);
  console.log(`In Geez numerals: ${geezYear}`);
  console.log('');

  // Ethiopian New Year (Meskerem 1)
  const ethiopianNewYear = toEthDate(new Date(), 'am');
  console.log(`Ethiopian Calendar Date: ${ethiopianNewYear}`);
  console.log('');
}

/**
 * Run all demonstrations
 */
export function runUtilityDemo() {
  console.log('🇪🇹 Ethio-Intl Utility Demonstrations');
  console.log('=====================================');
  console.log('');

  demonstrateEthiopianDate();
  demonstrateGeezNumerals();
  demonstrateCombined();

  console.log('✅ All demonstrations completed!');
}

// Auto-run if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  runUtilityDemo();
}


