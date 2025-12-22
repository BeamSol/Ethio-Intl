# API Reference

Complete API documentation for the Ethio-Intl library.

## 📦 SmartInput Component

### Props

```typescript
interface SmartInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /**
   * Callback fired when the input value changes
   * @param latinValue - The current Latin (English) input
   * @param transliteratedValue - The corresponding Amharic transliteration
   */
  onChange?: (latinValue: string, transliteratedValue: string) => void;

  /**
   * The current value of the input (Latin script)
   */
  value?: string;

  /**
   * Whether transliteration is enabled
   * @default true
   */
  transliterate?: boolean;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Callback fired when transliterated text changes
   */
  onTransliteratedChange?: (transliteratedValue: string) => void;
}
```

### Example Usage

```tsx
import { SmartInput } from 'ethio-intl';

<SmartInput
  placeholder="Type in English..."
  onChange={(latin, amharic) => {
    console.log('Latin:', latin);
    console.log('Amharic:', amharic);
  }}
  className="my-input"
/>
```

## 🎣 useTransliterate Hook

### Parameters

```typescript
function useTransliterate(
  initialValue?: string,
  onTransliteratedChange?: (value: string) => void
): UseTransliterateResult
```

### Return Type

```typescript
interface UseTransliterateResult {
  displayValue: string;      // Amharic text shown in input
  latinValue: string;        // Original English input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
```

### Example Usage

```tsx
import { useTransliterate } from 'ethio-intl';

function MyComponent() {
  const {
    displayValue,
    latinValue,
    onChange,
    onKeyDown
  } = useTransliterate('', (amharic) => {
    console.log('Transliterated:', amharic);
  });

  return (
    <input
      value={displayValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type here..."
    />
  );
}
```

## 📊 Character Mappings

### amharicMap

Complete mapping of English keys to Amharic characters.

```typescript
import { amharicMap } from 'ethio-intl';

console.log(amharicMap.h);
// {
//   ä: "ሀ", base: "ህ", a: "ሃ", u: "ሁ",
//   i: "ሂ", e: "ሄ", o: "ሆ"
// }

console.log(amharicMap['q'].wa); // "ቋ"
```

### Available Keys

#### Consonants
- `h`, `l`, `hh`, `m`, `sz`, `r`, `s`, `sh`, `q`
- `b`, `v`, `t`, `c`, `ch`, `x`, `n`, `ny`, `k`
- `kx`, `w`, `z`, `zh`, `dz`, `y`, `d`, `j`, `g`
- `ṭ`, `ṭh`, `ḍ`, `ḍh`, `dh`, `th`, `cha`, `ja`, `ph`, `phe`
- `ts`, `tz`, `f`, `p`

#### Vowels
- `a`, `u`, `i`, `e`, `o`, `ä`, `ü`, `ï`, `ö`

### Character Forms

Each consonant supports these vowel forms:

```typescript
interface ConsonantMapping {
  ä: string;     // First form (ä vowel) - primary representation
  base: string;  // Sixth form (no vowel) - traditional base
  a: string;     // Fourth form (a vowel)
  u: string;     // Second form (u vowel)
  i: string;     // Third form (i vowel)
  e: string;     // Fifth form (e vowel)
  o: string;     // Seventh form (o vowel)
  wa?: string;   // Special wa combination
  w?: string;    // Special w combination
}
```

## 🔄 Reverse Mapping

### reverseMap

Efficient lookup from Amharic characters back to English keys.

```typescript
import { reverseMap } from 'ethio-intl';

console.log(reverseMap['ሁ']); // "h"
console.log(reverseMap['ባ']); // "b"
console.log(reverseMap['ካ']); // "k"
```

### Usage

```typescript
// Find which English key produced an Amharic character
const englishKey = reverseMap['ሰ'];
console.log(englishKey); // "s"

// Check if character is part of a consonant series
if (reverseMap[someChar]) {
  // This is an Amharic consonant character
}
```

## 🧮 Ethiopian Numerals

### toEthiopianNumerals

Converts Arabic numerals to Ethiopian numerals.

```typescript
import { toEthiopianNumerals } from 'ethio-intl';

console.log(toEthiopianNumerals(2025)); // "፳፻፳፭"
console.log(toEthiopianNumerals(42));   // "፬፪"
```

### Parameters

```typescript
function toEthiopianNumerals(num: number): string
```

### fromEthiopianNumerals

Converts Ethiopian numerals to Arabic numerals.

```typescript
import { fromEthiopianNumerals } from 'ethio-intl';

console.log(fromEthiopianNumerals('፳፻፳፭')); // 2025
console.log(fromEthiopianNumerals('፬፪'));   // 42
```

### Parameters

```typescript
function fromEthiopianNumerals(ethiopian: string): number
```

## 📅 Ethiopian Calendar

### toEthiopianDate

Converts Gregorian date to Ethiopian date.

```typescript
import { toEthiopianDate } from 'ethio-intl';

const ethiopian = toEthiopianDate(new Date('2025-01-15'));
// { year: 2017, month: 4, day: 7, monthName: 'Tahsas' }
```

### Parameters

```typescript
function toEthiopianDate(gregorianDate: Date): EthiopianDate
```

### EthiopianDate Interface

```typescript
interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
}
```

### fromEthiopianDate

Converts Ethiopian date to Gregorian date.

```typescript
import { fromEthiopianDate } from 'ethio-intl';

const gregorian = fromEthiopianDate(2017, 4, 7);
// Date object for April 7, 2025
```

### Parameters

```typescript
function fromEthiopianDate(year: number, month: number, day: number): Date
```

### getEthiopianMonths

Returns array of Ethiopian month names.

```typescript
import { getEthiopianMonths } from 'ethio-intl';

const months = getEthiopianMonths();
// ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', ...]
```

### getEthiopianDays

Returns array of Ethiopian day names.

```typescript
import { getEthiopianDays } from 'ethio-intl';

const days = getEthiopianDays();
// ['Ehud', 'Seneo', 'Maksegno', 'Rebu', 'Hamus', 'Arb', 'Kidame']
```

## 🌐 Localization

### EthioProvider

React context provider for Ethiopian localization.

```tsx
import { EthioProvider, useEthioIntl } from 'ethio-intl';

function App() {
  return (
    <EthioProvider language="am">
      <MyComponent />
    </EthioProvider>
  );
}

function MyComponent() {
  const { t, language } = useEthioIntl();

  return (
    <div>
      <p>{t('welcome')}</p> {/* እንኳን ደህና መጡ */}
      <p>Current language: {language}</p>
    </div>
  );
}
```

### Supported Languages

- `am` - አማርኛ (Amharic)
- `om` - Afaan Oromo
- `en` - English
- `fr` - Français

### useEthioIntl Hook

Hook for accessing localization context.

```typescript
interface EthioIntlContext {
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
}
```

## 🎨 Styling

### CSS Classes

The SmartInput component uses these CSS classes:

```css
.ethio-smart-input              /* Container */
.ethio-smart-input__field       /* Input field */
.ethio-smart-input__preview     /* Preview area */
```

### Custom Styling Example

```css
.ethio-smart-input {
  font-family: 'Noto Sans Ethiopic', serif;
  max-width: 400px;
}

.ethio-smart-input__field {
  width: 100%;
  padding: 12px;
  border: 2px solid #007bff;
  border-radius: 6px;
  font-size: 18px;
  transition: border-color 0.2s;
}

.ethio-smart-input__field:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.ethio-smart-input__preview {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 20px;
  color: #495057;
}
```

## 🚨 Error Handling

### Common Issues

```typescript
// Handle missing characters gracefully
const safeTransliterate = (input: string): string => {
  try {
    return transliterate(input);
  } catch (error) {
    console.warn('Transliteration error:', error);
    return input; // Fallback to original input
  }
};
```

### Validation

```typescript
// Check if input contains only supported characters
const isValidInput = (input: string): boolean => {
  const validChars = /^[a-zA-Z\s]*$/;
  return validChars.test(input);
};
```

## 🔧 TypeScript Support

### Type Definitions

All components and functions are fully typed:

```typescript
import type {
  SmartInputProps,
  UseTransliterateResult,
  EthiopianDate,
  EthioIntlConfig,
  Language
} from 'ethio-intl';
```

### IntelliSense

Full IntelliSense support in modern editors:

```typescript
// Auto-completion for consonant mappings
amharicMap.h. // Shows: ä, base, a, u, i, e, o

// Type-safe reverse lookups
reverseMap['ሀ'] // TypeScript knows this returns string
```

## 📊 Performance

### Benchmarks

- **Transliteration**: <1ms per character
- **Memory Usage**: ~2KB for character mappings
- **Bundle Size**: ~15KB gzipped
- **First Paint**: Instant (no loading delays)

### Optimization Tips

```typescript
// Cache transliteration results for repeated inputs
const transliterationCache = new Map<string, string>();

function cachedTransliterate(input: string): string {
  if (transliterationCache.has(input)) {
    return transliterationCache.get(input)!;
  }

  const result = transliterate(input);
  transliterationCache.set(input, result);
  return result;
}
```

## 🧪 Testing

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartInput } from 'ethio-intl';

test('transliterates input correctly', () => {
  render(<SmartInput onChange={(latin, amharic) => {
    expect(latin).toBe('hu');
    expect(amharic).toBe('ሁ');
  }} />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'hu' } });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTransliterate } from 'ethio-intl';

test('hook transliterates correctly', () => {
  const { result } = renderHook(() => useTransliterate());

  act(() => {
    // Simulate input change
    result.current.onChange({
      target: { value: 'selam' }
    } as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.displayValue).toBe('ሰላም');
});
```

---

For more examples and advanced usage, check out our [Examples](./examples.md) documentation.
