# Developer Usage Guide - Ethio-Intll

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Core Features](#core-features)
- [API Reference](#api-reference)
- [Advanced Usage Patterns](#advanced-usage-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)

## Overview

Ethio-Intl is a comprehensive TypeScript library for Ethiopian web applications, providing:

- **Amharic Transliteration**: Real-time English-to-Amharic conversion
- **Ethiopian Calendar**: Gregorian ↔ Ethiopian date conversion
- **Geez Numerals**: Arabic to Geez numeral conversion
- **Multi-language i18n**: Support for Amharic, English, Tigrinya, Oromo
- **React Integration**: Hooks and components for seamless React apps

### Architecture

```
ethio-intl/
├── localization/     # i18n system (EthioProvider, useEthioIntl)
├── transliteration/  # Amharic conversion (SmartInput, mapping)
├── utils/           # Ethiopian utilities (calendar, numerals)
└── hooks/           # React hooks (useTransliterate)
```

## Installation

### NPM
```bash
npm install ethio-intl
```

### Yarn
```bash
yarn add ethio-intl
```

### PNPM
```bash
pnpm add ethio-intl
```

### Peer Dependencies

Ethio-Intl requires React 16.8+ for React features:

```bash
npm install react@^16.8.0 react-dom@^16.8.0
```

### TypeScript Support

Full TypeScript support is included - no additional types package needed.

## Project Setup

### Basic React Setup

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EthioProvider } from 'ethio-intl';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EthioProvider>
      <App />
    </EthioProvider>
  </React.StrictMode>
);
```

### Advanced Provider Configuration

{% raw %}
```tsx
import { EthioProvider } from 'ethio-intl';

function App() {
  return (
    <EthioProvider
      defaultLanguage="am"
      supportedLanguages={['en', 'am', 'ti', 'om']}
      resources={{
        en: { common: { greeting: 'Hello' } },
        am: { common: { greeting: 'ሰላም' } }
      }}
      enableHotReload={process.env.NODE_ENV === 'development'}
    >
      <YourApp />
    </EthioProvider>
  );
}
```
{% endraw %}

### Non-React Setup (Vanilla JS)

```javascript
import { toEthDate, toEthNumber, amharicMap } from 'ethio-intl';

// Use utility functions directly
const ethiopianDate = toEthDate(new Date());
const geezNumber = toEthNumber(2025);
```

## Core Features

### 1. Amharic Transliteration

#### SmartInput Component

```tsx
import { SmartInput } from 'ethio-intl';

function AmharicForm() {
  const [text, setText] = useState({ latin: '', amharic: '' });

  return (
    <SmartInput
      value={text.latin}
      onChange={(latin, amharic) => {
        setText({ latin, amharic });
        console.log('Converted:', amharic);
      }}
      placeholder="Type in English..."
      className="amharic-input"
    />
  );
}
```

#### useTransliterate Hook

```tsx
import { useTransliterate } from 'ethio-intl';

function CustomTransliterator() {
  const { transliterate, isTransliterating } = useTransliterate();

  const handleInput = (latinText) => {
    const amharicText = transliterate(latinText);
    // Do something with amharicText
  };

  return (
    <input
      onChange={(e) => handleInput(e.target.value)}
      placeholder="Type here..."
    />
  );
}
```

#### Manual Transliteration

```javascript
import { amharicMap, reverseMap } from 'ethio-intl';

// Direct character mapping
const transliterateChar = (char) => amharicMap[char.toLowerCase()]?.base || char;

// Batch transliteration
const transliterateText = (text) => {
  return text.split('').map(transliterateChar).join('');
};
```

### 2. Ethiopian Calendar

#### Date Conversion

```javascript
import { toEthDate, getEthiopianDate, isEthiopianLeapYear } from 'ethio-intl';

// Gregorian to Ethiopian
const gregorianDate = new Date('2024-01-01');
const ethiopianDate = toEthDate(gregorianDate); // "Tikimt 23, 2016"

// Ethiopian date details
const ethDate = getEthiopianDate(2016, 4, 23); // Tikimt 23
console.log(ethDate.day, ethDate.month, ethDate.year);

// Leap year check
const isLeap = isEthiopianLeapYear(2016); // true
```

#### Calendar Utilities

```javascript
import {
  getEthiopianMonthDays,
  AMHARIC_MONTHS,
  getEthiopianMonths
} from 'ethio-intl';

// Get days in a month
const daysInTir = getEthiopianMonthDays(2016, 1); // 30

// Get month names
const months = AMHARIC_MONTHS; // ['Meskerem', 'Tikimt', ...]

// Localized months
const localizedMonths = getEthiopianMonths('am'); // Amharic names
```

### 3. Geez Numerals

#### Number Conversion

```javascript
import {
  toEthiopianNumerals,
  fromEthiopianNumerals,
  toEthNumber,
  fromEthNumber,
  formatEthNumber
} from 'ethio-intl';

// Arabic to Geez numerals
const geez = toEthiopianNumerals(2025); // "፳፻፳፭"
const arabic = fromEthiopianNumerals('፳፻፳፭'); // 2025

// Alternative format
const formatted = formatEthNumber(2025); // "፳፻፳፭"
const geezNum = toEthNumber(2025); // ፳፻፳፭
const backToArabic = fromEthNumber('፳፻፳፭'); // 2025
```

### 4. Internationalization (i18n)

#### useEthioIntl Hook

```tsx
import { useEthioIntl } from 'ethio-intl';

function MultilingualComponent() {
  const {
    t,
    currentLang,
    changeLanguage,
    supportedLangs
  } = useEthioIntl();

  return (
    <div>
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {supportedLangs.map(lang => (
          <option key={lang} value={lang}>{lang.toUpperCase()}</option>
        ))}
      </select>

      <h1>{t('welcome.message')}</h1>
      <p>{t('app.description')}</p>
    </div>
  );
}
```

#### Namespaced Translations

```tsx
function AdvancedTranslations() {
  const { tNamespace } = useEthioIntl();

  // Access namespaced translations
  const userGreeting = tNamespace('user', 'greeting');
  const adminMessage = tNamespace('admin', 'welcome');

  return (
    <div>
      <p>{userGreeting}</p>
      <p>{adminMessage}</p>
    </div>
  );
}
```

#### Dynamic Language Loading

```tsx
function DynamicLoader() {
  const { loadTranslations, loadNamespace } = useEthioIntl();

  const loadFrench = async () => {
    const frenchTranslations = await fetch('/locales/fr.json');
    loadTranslations('fr', frenchTranslations);
  };

  const loadUserModule = async () => {
    const userTranslations = await fetch('/locales/user/fr.json');
    loadNamespace('fr', 'user', userTranslations);
  };

  return (
    <button onClick={loadFrench}>Load French</button>
  );
}
```

## API Reference

### Components

#### SmartInput
```tsx
interface SmartInputProps {
  value?: string;
  onChange?: (latin: string, amharic: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}
```

#### EthioProvider
```tsx
interface EthioProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
  supportedLanguages?: string[];
  resources?: Record<string, any>;
  enableHotReload?: boolean;
}
```

### Hooks

#### useEthioIntl
```tsx
interface EthioIntlHookResult {
  // Translation functions
  t: (key: string, options?: any) => string;
  tNamespace: (namespace: string, key: string, options?: any) => string;

  // Language management
  currentLang: string;
  changeLanguage: (lang: string) => void;
  supportedLangs: string[];
  detectLanguage: () => string;
  isLanguageSupported: (lang: string) => boolean;

  // Enterprise features
  loadTranslations: (lang: string, translations: Record<string, any>) => void;
  loadNamespace: (lang: string, namespace: string, translations: Record<string, any>) => void;
  unloadNamespace: (lang: string, namespace: string) => void;
  preloadLanguages: (langs: string[]) => Promise<void>;
  getMissingKeys: (lang?: string) => string[];
  exportTranslations: (lang: string) => Record<string, any>;

  // Development
  isDevelopment: boolean;
  enableHotReload: (callback: (lang: string, translations: Record<string, any>) => void) => void;
}
```

#### useTransliterate
```tsx
interface TransliterateHookResult {
  transliterate: (text: string) => string;
  isTransliterating: boolean;
}
```

### Utility Functions

#### Calendar Functions
```typescript
toEthDate(date: Date): string
getEthiopianDate(year: number, month: number, day: number): EthiopianDate
isEthiopianLeapYear(year: number): boolean
getEthiopianMonthDays(year: number, month: number): number
AMHARIC_MONTHS: string[]
getEthiopianMonths(lang?: string): string[]
```

#### Numeral Functions
```typescript
toEthiopianNumerals(num: number): string
fromEthiopianNumerals(ethNum: string): number
toEthNumber(num: number): string
fromEthNumber(ethNum: string): number
formatEthNumber(num: number): string
```

## Advanced Usage Patterns

### Form Integration

```tsx
import { SmartInput } from 'ethio-intl';

function EthiopianForm() {
  const [form, setForm] = useState({
    firstName: { latin: '', amharic: '' },
    lastName: { latin: '', amharic: '' },
    address: { latin: '', amharic: '' }
  });

  const updateField = (field) => (latin, amharic) => {
    setForm(prev => ({
      ...prev,
      [field]: { latin, amharic }
    }));
  };

  const handleSubmit = () => {
    // Submit both Latin and Amharic versions
    console.log('Form data:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SmartInput
        value={form.firstName.latin}
        onChange={updateField('firstName')}
        placeholder="First Name"
      />
      <SmartInput
        value={form.lastName.latin}
        onChange={updateField('lastName')}
        placeholder="Last Name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Multilingual Dashboard

```tsx
function Dashboard() {
  const { t, currentLang, changeLanguage, supportedLangs } = useEthioIntl();

  return (
    <div className="dashboard">
      <header>
        <h1>{t('dashboard.title')}</h1>
        <select
          value={currentLang}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {supportedLangs.map(lang => (
            <option key={lang} value={lang}>
              {t(`languages.${lang}`)}
            </option>
          ))}
        </select>
      </header>

      <main>
        <div className="stat-card">
          <h3>{t('stats.users')}</h3>
          <p className="number">{toEthNumber(1234)}</p>
        </div>

        <div className="calendar-widget">
          <h3>{t('calendar.today')}</h3>
          <p>{toEthDate(new Date())}</p>
        </div>
      </main>
    </div>
  );
}
```

### Custom Transliteration Component

```tsx
function CustomAmharicEditor() {
  const [content, setContent] = useState({
    source: '',
    preview: '',
    wordCount: 0
  });

  const handleTransliteration = (latinText) => {
    // Custom transliteration logic
    const amharicText = transliterate(latinText);

    setContent({
      source: latinText,
      preview: amharicText,
      wordCount: latinText.split(' ').length
    });
  };

  return (
    <div className="editor">
      <div className="input-section">
        <textarea
          value={content.source}
          onChange={(e) => handleTransliteration(e.target.value)}
          placeholder="Type in English..."
          rows={10}
        />
      </div>

      <div className="preview-section">
        <h3>Amharic Preview</h3>
        <div className="preview-content">
          {content.preview || 'Start typing to see Amharic text...'}
        </div>
        <div className="stats">
          Words: {content.wordCount}
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

### Performance Optimization

```tsx
// Memoize expensive operations
const MemoizedTransliterator = React.memo(function Transliterator({ text }) {
  const amharicText = useMemo(() => transliterate(text), [text]);

  return <div>{amharicText}</div>;
});

// Debounce frequent updates
function DebouncedInput() {
  const [value, setValue] = useState('');
  const debouncedTransliterate = useMemo(
    () => debounce((text) => {
      const result = transliterate(text);
      // Update UI
    }, 300),
    []
  );

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
        debouncedTransliterate(e.target.value);
      }}
    />
  );
}
```

### Error Handling

```tsx
function SafeTransliterator() {
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleTransliterate = async (text) => {
    try {
      const transliterated = await transliterateAsync(text);
      setResult(transliterated);
      setError(null);
    } catch (err) {
      setError('Transliteration failed');
      console.error('Transliteration error:', err);
    }
  };

  return (
    <div>
      <input onChange={(e) => handleTransliterate(e.target.value)} />
      {error && <div className="error">{error}</div>}
      <div className="result">{result}</div>
    </div>
  );
}
```

### Accessibility

```tsx
function AccessibleAmharicInput() {
  return (
    <div>
      <label htmlFor="amharic-input">
        Enter text in English (will be converted to Amharic)
      </label>

      <SmartInput
        id="amharic-input"
        aria-describedby="amharic-help"
        placeholder="Type in English..."
      />

      <div id="amharic-help">
        This input automatically converts English text to Amharic script
      </div>

      {/* Screen reader only preview */}
      <div aria-live="polite" className="sr-only">
        Amharic conversion: {amharicText}
      </div>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Amharic Characters Not Displaying

**Problem**: Amharic text appears as boxes or question marks

**Solutions**:
```javascript
// Check font loading
import 'ethio-intl/dist/styles/fonts.css';

// Or add to your CSS
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@100..900&display=swap');

.ethiopic-text {
  font-family: 'Noto Sans Ethiopic', 'Nyala', serif;
}
```

#### 2. Transliteration Not Working

**Problem**: Input doesn't convert to Amharic

**Solutions**:
```javascript
// Verify import
import { SmartInput } from 'ethio-intl'; // Correct
// NOT: import SmartInput from 'ethio-intl/SmartInput'; // Wrong

// Check React version
console.log('React version:', React.version); // Should be 16.8+
```

#### 3. TypeScript Errors

**Problem**: Type errors with Ethio-Intl types

**Solutions**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx"
  }
}
```

### Debug Mode

```tsx
function DebugEthioIntl() {
  const intl = useEthioIntl();

  return (
    <div className="debug-panel">
      <h3>Debug Info</h3>
      <pre>
        {JSON.stringify({
          currentLang: intl.currentLang,
          supportedLangs: intl.supportedLangs,
          isDevelopment: intl.isDevelopment
        }, null, 2)}
      </pre>
    </div>
  );
}
```

## Migration Guide

### From v0.x to v1.0.0

#### Breaking Changes

1. **Provider API Changes**:
```tsx
// Old
<EthioProvider languages={['en', 'am']}>

// New
<EthioProvider supportedLanguages={['en', 'am']}>
```

2. **Hook Return Values**:
```tsx
// Old
const { translate } = useEthioIntl();

// New
const { t } = useEthioIntl();
```

3. **Utility Function Renames**:
```javascript
// Old
import { toEthiopian } from 'ethio-intl';

// New
import { toEthDate } from 'ethio-intl';
```

#### Migration Steps

1. Update imports
2. Replace deprecated function names
3. Update provider props
4. Test transliteration behavior
5. Verify calendar conversions

---

## Support

- **Documentation**: [Full API Reference](./docs/api-reference.md)
- **Examples**: [Code Examples](./docs/examples.md)
- **Issues**: [GitHub Issues](https://github.com/BeamSol/Ethio-Intl/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BeamSol/Ethio-Intl/discussions)

---

*Happy coding with Ethio-Intl! 🇪🇹*

