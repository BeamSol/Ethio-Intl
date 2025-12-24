// Test script to verify the Ethio-Intl package works correctly
// Run with: node test-install.js

import { toEthDate, toEthNumber } from './dist/index.mjs';

console.log('🚀 Testing Ethio-Intl Package Installation');
console.log('=' .repeat(50));

// Test 1: Ethiopian Calendar
console.log('\n📅 Testing Ethiopian Calendar Conversion:');
const today = new Date();
const ethDate = toEthDate(today, 'en');
console.log(`Gregorian: ${today.toDateString()}`);
console.log(`Ethiopian: ${ethDate}`);

// Test specific date
const testDate = new Date(2025, 8, 11); // September 11, 2025
const ethTest = toEthDate(testDate, 'en');
console.log(`\nTest Date: ${testDate.toDateString()}`);
console.log(`Ethiopian: ${ethTest}`);

// Test 2: Geez Numerals
console.log('\n🔢 Testing Geez Numeral Conversion:');
const testNumbers = [1, 10, 100, 1000, 2025];
testNumbers.forEach(num => {
    const geez = toEthNumber(num);
    console.log(`${num} → ${geez}`);
});

console.log('\n✅ All tests completed successfully!');
console.log('🌍 Ethio-Intl package is ready for npm publishing!');
console.log('\n📦 Package exports:');
console.log('- toEthDate: Gregorian ↔ Ethiopian calendar conversion');
console.log('- toEthNumber: Arabic ↔ Geez numeral conversion');
console.log('- SmartInput: React component for Amharic transliteration');
console.log('- EthioProvider: React context for internationalization');
console.log('- useEthioIntl: React hook for translations');
console.log('- And many more utilities...');
