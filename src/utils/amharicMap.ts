// Amharic consonant-vowel combination mapping
// Organized by Amharic character families and traditional order
// Nested dictionary structure for robust transliteration
export const amharicMap: Record<string, any> = {
  // ሀ family - First order consonants (ሀ ለ ሐ መ ሠ ረ ሰ ሸ ቀ)
  "h": { ä: "ሀ", base: "ህ", "a": "ሃ", "u": "ሁ", "i": "ሂ", "e": "ሄ", "o": "ሆ" }, // ሀ
  "l": { ä: "ለ", base: "ል", "a": "ላ", "u": "ሉ", "i": "ሊ", "e": "ሌ", "o": "ሎ", "wa": "ሏ" }, // ለ
  "hh": { ä: "ሐ", base: "ሕ", "a": "ሓ", "u": "ሑ", "i": "ሒ", "e": "ሔ", "o": "ሖ", "wa": "ሗ" }, // ሐ
  "m": { ä: "መ", base: "ም", "a": "ማ", "u": "ሙ", "i": "ሚ", "e": "ሜ", "o": "ሞ", "wa": "ሟ" }, // መ
  "sz": { ä: "ሠ", base: "ሥ", "a": "ሣ", "u": "ሡ", "i": "ሢ", "e": "ሤ", "o": "ሦ", "wa": "ሧ" }, // ሠ
  "r": { ä: "ረ", base: "ር", "a": "ራ", "u": "ሩ", "i": "ሪ", "e": "ሬ", "o": "ሮ", "wa": "ሯ" }, // ረ
  "s": { ä: "ሰ", base: "ስ", "a": "ሳ", "u": "ሱ", "i": "ሲ", "e": "ሴ", "o": "ሶ", "wa": "ሷ" }, // ሰ
  "sh": { ä: "ሸ", base: "ሽ", "a": "ሻ", "u": "ሹ", "i": "ሺ", "e": "ሼ", "o": "ሾ", "wa": "ሿ" }, // ሸ
  "q": { ä: "ቀ", base: "ቅ", "a": "ቃ", "u": "ቁ", "i": "ቂ", "e": "ቄ", "o": "ቆ", "wa": "ቋ", "w": "ቍ" }, // ቀ

  // በ family - Second order consonants (በ ቨ ተ ቸ ኀ ነ ኘ አ ከ)
  "b": { ä: "በ", base: "ብ", "a": "ባ", "u": "ቡ", "i": "ቢ", "e": "ቤ", "o": "ቦ", "wa": "ቧ" }, // በ
  "v": { ä: "ቨ", base: "ቭ", "a": "ቫ", "u": "ቩ", "i": "ቪ", "e": "ቬ", "o": "ቮ", "wa": "ቯ" }, // ቨ
  "t": { ä: "ተ", base: "ት", "a": "ታ", "u": "ቱ", "i": "ቲ", "e": "ቴ", "o": "ቶ", "wa": "ቷ" }, // ተ
  "c": { ä: "ቸ", base: "ች", "a": "ቻ", "u": "ቹ", "i": "ቺ", "e": "ቼ", "o": "ቾ", "wa": "ቿ" }, // ቸ
  "ch": { ä: "ቸ", base: "ች", "a": "ቻ", "u": "ቹ", "i": "ቺ", "e": "ቼ", "o": "ቾ" }, // ቸ (alternative)
  "x": { ä: "ኀ", base: "ኽ", "a": "ኻ", "u": "ኹ", "i": "ኺ", "e": "ኼ", "o": "ኾ", "wa": "ኋ", "w": "ኍ" }, // ኀ
  "n": { ä: "ነ", base: "ን", "a": "ና", "u": "ኑ", "i": "ኒ", "e": "ኔ", "o": "ኖ", "wa": "ኗ" }, // ነ
  "ny": { ä: "ኘ", base: "ኝ", "a": "ኛ", "u": "ኙ", "i": "ኚ", "e": "ኜ", "o": "ኞ", "wa": "ኟ" }, // ኘ
  "k": { ä: "ከ", base: "ክ", "a": "ካ", "u": "ኩ", "i": "ኪ", "e": "ኬ", "o": "ኮ", "wa": "ኳ", "w": "ኵ" }, // ከ

  // ኸ family - Third order consonants (ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ)
  "kx": { ä: "ኸ", base: "ኽ", "a": "ኻ", "u": "ኹ", "i": "ኺ", "e": "ኼ", "o": "ኾ", "wa": "ዃ", "w": "ዅ" }, // ኸ
  "w": { ä: "ወ", base: "ው", "a": "ዋ", "u": "ዉ", "i": "ዊ", "e": "ዌ", "o": "ዎ" }, // ወ
  "z": { ä: "ዘ", base: "ዝ", "a": "ዛ", "u": "ዙ", "i": "ዚ", "e": "ዜ", "o": "ዞ", "wa": "ዟ" }, // ዘ
  "zh": { ä: "ዠ", base: "ዥ", "a": "ዣ", "u": "ዡ", "i": "ዢ", "e": "ዤ", "o": "ዦ" }, // ዠ
  "dz": { ä: "ዠ", base: "ዥ", "a": "ዣ", "u": "ዡ", "i": "ዢ", "e": "ዤ", "o": "ዦ" }, // ዠ (alternative)
  "y": { ä: "የ", base: "ይ", "a": "ያ", "u": "ዩ", "i": "ዪ", "e": "ዬ", "o": "ዮ" }, // የ
  "d": { ä: "ደ", base: "ድ", "a": "ዳ", "u": "ዱ", "i": "ዲ", "e": "ዴ", "o": "ዶ", "wa": "ዷ" }, // ደ
  "j": { ä: "ጀ", base: "ጅ", "a": "ጃ", "u": "ጁ", "i": "ጂ", "e": "ጄ", "o": "ጆ", "wa": "ጇ" }, // ጀ
  "g": { ä: "ገ", base: "ግ", "a": "ጋ", "u": "ጉ", "i": "ጊ", "e": "ጌ", "o": "ጎ", "wa": "ጓ", "w": "ጕ" }, // ገ

  // ጠ family - Fourth order consonants (ጠ ጨ ጰ ጸ ፀ ፈ ፐ)
  "ṭ": { ä: "ጠ", base: "ጥ", "a": "ጣ", "u": "ጡ", "i": "ጢ", "e": "ጤ", "o": "ጦ" }, // ጠ
  "ṭh": { ä: "ጠ", base: "ጥ", "a": "ጣ", "u": "ጡ", "i": "ጢ", "e": "ጤ", "o": "ጦ" }, // ጠ (alternative)
  "ḍ": { ä: "ደ", base: "ድ", "a": "ዳ", "u": "ዱ", "i": "ዲ", "e": "ዴ", "o": "ዶ" }, // ድ (dental)
  "ḍh": { ä: "ደ", base: "ድ", "a": "ዳ", "u": "ዱ", "i": "ዲ", "e": "ዴ", "o": "ዶ" }, // ድ (dental alternative)
  "dh": { ä: "ደ", base: "ድ", "a": "ዳ", "u": "ዱ", "i": "ዲ", "e": "ዴ", "o": "ዶ" }, // ድ (dental alternative)
  "th": { ä: "ጠ", base: "ጥ", "a": "ጣ", "u": "ጡ", "i": "ጢ", "e": "ጤ", "o": "ጦ", "wa": "ጧ" }, // ጥ (alternative)
  "cha": { ä: "ጨ", base: "ጭ", "a": "ጫ", "u": "ጩ", "i": "ጪ", "e": "ጬ", "o": "ጮ" }, // ጨ
  "ja": { ä: "ጀ", base: "ጅ", "a": "ጃ", "u": "ጁ", "i": "ጂ", "e": "ጄ", "o": "ጆ" }, // ጀ (palatal)
  "ph": { ä: "ጰ", base: "ጵ", "a": "ጳ", "u": "ጱ", "i": "ጲ", "e": "ጴ", "o": "ጶ" }, // ጰ
  "phe": { ä: "ጰ", base: "ጵ", "a": "ጳ", "u": "ጱ", "i": "ጲ", "e": "ጴ", "o": "ጶ" }, // ጰ (alternative)
  "ts": { ä: "ጸ", base: "ጽ", "a": "ጻ", "u": "ጹ", "i": "ጺ", "e": "ጼ", "o": "ጾ", "wa": "ጿ" }, // ጸ
  "tz": { ä: "ፀ", base: "ፅ", "a": "ፃ", "u": "ፁ", "i": "ፂ", "e": "ፄ", "o": "ፆ", "wa": "ፇ" }, // ፀ
  "f": { ä: "ፈ", base: "ፍ", "a": "ፋ", "u": "ፉ", "i": "ፊ", "e": "ፌ", "o": "ፎ", "wa": "ፏ" }, // ፈ
  "p": { ä: "ፐ", base: "ፕ", "a": "ፓ", "u": "ፑ", "i": "ፒ", "e": "ፔ", "o": "ፖ", "wa": "ፗ" }, // ፐ

  // Special characters and glottal consonants
  "ʔ": { base: "እ" }, // Glottal stop
  "'": { base: "እ" }, // Alternative glottal stop

  // Standalone vowels (አ ኡ ኢ ኤ እ ኦ and variants)
  "a": { ä: "አ", base: "አ" },   // አ
  "u": { ä: "ኡ", base: "ኡ" },   // ኡ
  "i": { ä: "ኢ", base: "ኢ" },   // ኢ
  "e": { ä: "እ", base: "እ" },   // እ (also glottal)
  "o": { ä: "ኦ", base: "ኦ" },   // ኦ
  "ä": { ä: "ዓ", base: "ዓ" },   // ዓ
  "ü": { ä: "ዑ", base: "ዑ" },   // ዑ
  "ï": { ä: "ዒ", base: "ዒ" },   // ዒ
  "ö": { ä: "ዖ", base: "ዖ" },   // ዖ
};

// Reverse mapping for quick lookup of base consonants from Amharic characters
export const reverseMap: Record<string, string> = {};

// Build reverse map for efficient lookups
Object.keys(amharicMap).forEach(consonant => {
  const consonantData = amharicMap[consonant];
  reverseMap[consonantData.base] = consonant;

  // Add vowel combinations to reverse map
  Object.keys(consonantData).forEach(vowel => {
    if (vowel !== 'base') {
      reverseMap[consonantData[vowel]] = consonant;
    }
  });
});
