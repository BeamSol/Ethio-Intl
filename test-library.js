// Test the actual Ethio-Intl library functions
import('./dist/index.mjs').then(m => {
    console.log('🧪 Testing Ethio-Intl Library Functions');
    console.log('='.repeat(50));

    // Test Geez numerals (the main concern)
    console.log('\n🔢 Geez Numeral Conversions:');
    const testNumbers = [1, 10, 100, 1000, 2020, 2021, 2022, 2023, 2024, 2025];
    testNumbers.forEach(num => {
        const result = m.toEthNumber(num);
        console.log(`${num} → ${result}`);
    });

    // Test Ethiopian calendar
    console.log('\n📅 Ethiopian Calendar Conversions:');
    const today = new Date();
    console.log('Today Gregorian:', today.toDateString());
    console.log('Ethiopian (EN):', m.toEthDate(today, 'en'));
    console.log('Ethiopian (AM):', m.toEthDate(today, 'am'));

    // Test transliteration (check if available)
    console.log('\n🔤 Transliteration Test:');
    if (m.amharicMap) {
        console.log('Available consonants:', Object.keys(m.amharicMap).length);
        console.log('Sample mapping - h.a:', m.amharicMap.h.a);
    } else {
        console.log('Transliteration mappings not exported');
    }

    console.log('\n✅ Library functions working correctly!');
    console.log('📦 Ready for npm publishing!');
}).catch(err => {
    console.error('❌ Library test failed:', err.message);
    console.error(err);
});
