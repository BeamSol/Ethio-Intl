import { toEthDate } from './dist/index.mjs';

console.log('Testing Sept 10, 2025:');
toEthDate(new Date(2025, 8, 10));

console.log('\nTesting Sept 11, 2025:');
toEthDate(new Date(2025, 8, 11));
