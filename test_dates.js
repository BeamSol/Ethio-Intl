import { toEthDate, isEthiopianLeapYear } from './dist/index.mjs';

console.log('2017 leap year:', isEthiopianLeapYear(2017));
console.log('Sept 9, 2025 ->', toEthDate(new Date(2025, 8, 9)));
console.log('Sept 10, 2025 ->', toEthDate(new Date(2025, 8, 10)));
console.log('Sept 11, 2025 ->', toEthDate(new Date(2025, 8, 11)));
console.log('Sept 12, 2025 ->', toEthDate(new Date(2025, 8, 12)));
