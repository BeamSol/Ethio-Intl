
import { amharicMap, reverseMap } from './amharicData';

export function transliterate(input: string): string {
  let result = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i].toLowerCase();

    // Check for multi-character consonants first (sh, ch, ny, etc.)
    if (i < input.length - 1) {
      const duo = input.substring(i, i + 2).toLowerCase();
      if (amharicMap[duo]) {
        // Look ahead for vowel
        if (i < input.length - 2) {
          const vowel = input[i+2].toLowerCase();
          if (['a', 'e', 'i', 'o', 'u'].includes(vowel)) {
             result += amharicMap[duo][vowel] || amharicMap[duo].base;
             i += 3;
             continue;
          }
        }
        result += amharicMap[duo].base;
        i += 2;
        continue;
      }
    }

    // Check for consonant + vowel combination
    if (result.length > 0 && ['a', 'e', 'i', 'o', 'u', 'ä'].includes(char)) {
      const lastChar = result[result.length - 1];
      const consonantKey = reverseMap[lastChar];

      if (consonantKey && amharicMap[consonantKey]) {
        // Special logic for 'ä' vs 'e' as described in docs
        const vowelKey = char === 'e' ? 'ä' : char;
        if (amharicMap[consonantKey][vowelKey]) {
          // Handle 'ee' logic for fifth form regular 'e'
          if (char === 'e' && i < input.length - 1 && input[i+1].toLowerCase() === 'e') {
            result = result.slice(0, -1) + amharicMap[consonantKey]['e'];
            i += 2;
            continue;
          }
          result = result.slice(0, -1) + amharicMap[consonantKey][vowelKey];
          i++;
          continue;
        }
      }
    }

    // Handle 'ä' as standalone or part of something
    if (char === 'ä') {
      // Just keep it or skip? Usually it modifies. If standalone, might not mean much.
      i++;
      continue;
    }

    // Default mapping
    const mapped = amharicMap[char]?.base || char;
    result += mapped;
    i++;
  }

  return result;
}
