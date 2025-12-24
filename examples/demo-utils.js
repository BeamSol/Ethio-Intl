// Simple demo of Ethio-Intl utility functions
import { toEthDate, toEthNumber } from './dist/index.mjs';

console.log('🌍 Ethiopian Calendar & Geez Numerals Demo');
console.log('==========================================');

// Test Ethiopian date conversion
const today = new Date();
console.log('\n📅 Ethiopian Date Conversion:');
console.log('Gregorian:', today.toDateString());
console.log('Ethiopian (English):', toEthDate(today, 'en'));
console.log('Ethiopian (Amharic):', toEthDate(today, 'am'));

// Test Geez numeral conversion
console.log('\n🔢 Geez Numeral Conversion:');
const testNumbers = [1, 5, 10, 15, 25, 50, 100, 500, 1000, 2025];
testNumbers.forEach(num => {
  console.log(`${num} → ${toEthNumber(num)}`);
});

console.log('\n✅ Demo completed successfully!');


