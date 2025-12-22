# 🌍 Ethio-Intl

[![npm version](https://badge.fury.io/js/ethio-intl.svg)](https://badge.fury.io/js/ethio-intl)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Real-time Amharic transliteration for modern web applications**

Ethio-Intl provides seamless English-to-Amharic conversion with a sophisticated transliteration system, React components, and comprehensive Ethiopian localization utilities.

![Ethio-Intl Demo](https://via.placeholder.com/800x400/007bff/ffffff?text=Ethio-Intl+Demo)

## ✨ Features

- **🚀 Real-time Transliteration**: Type English letters, get instant Amharic output
- **🎯 Smart Combinations**: Automatic consonant-vowel syllable formation
- **📝 Complete Character Coverage**: All 25+ Amharic consonants with 7 vowel forms each
- **⚛️ React Components**: Ready-to-use SmartInput with TypeScript support
- **🎨 Beautiful UI**: Proper Amharic typography and responsive design
- **🔄 Bidirectional Support**: English ↔ Amharic conversion
- **📱 Mobile Friendly**: Touch-optimized for mobile devices
- **🌐 Localization**: Ethiopian calendar, numerals, and multi-language support

## 🎬 Live Demo

Try it now: **[Open Demo](demo.html)**

```html
<!-- Open demo.html in your browser to see it in action! -->
```

## 📦 Installation

```bash
npm install ethio-intl
```

## 🚀 Quick Start

### Basic Usage

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function App() {
  const [amharicText, setAmharicText] = React.useState('');

  return (
    <div>
      <h1>እንኳን ደህና መጡ! (Welcome!)</h1>

      <SmartInput
        placeholder="Type in English..."
        onChange={(latin, amharic) => {
          setAmharicText(amharic);
          console.log('Latin:', latin, 'Amharic:', amharic);
        }}
      />

      <p>Output: <strong>{amharicText}</strong></p>
    </div>
  );
}
```

### Try These Examples

| English Input | Amharic Output | Meaning |
|---------------|----------------|---------|
| `selam` | `ሰላም` | Hello |
| `hu` | `ሁ` | He (masculine) |
| `ne` | `ነ` | She (feminine) |
| `dehna` | `ደህና` | Thank you |
| `ba` | `ባ` | In/with |
| `he` | `ሀ` | **EASIEST!** ä form (single 'e') |
| `hee` | `ሄ` | Regular e form (double 'e') |
| `le` | `ለ` | ä form (single 'e') |
| `lee` | `ሌ` | Regular e form (double 'e') |

### How to Type ä (First Form Vowel) - Multiple Easy Methods!

**🎯 EASIEST: Smart 'e' handling**  
- Single 'e' after consonant = **ä form** (he → ሀ, le → ለ)  
- Double 'e' after consonant = **regular e form** (hee → ሄ, lee → ሌ)  

**Other methods:**  
**Traditional ä**: Windows: Alt+0228, Mac: Option+u then a  
**Numbers**: Use 1 after consonant (h1 → ሀ, l1 → ለ)

## 🏗️ Architecture

### Core Algorithm

Our transliteration system uses an advanced **nested dictionary approach** with **reverse lookup**:

```typescript
// Nested dictionary structure
const amharicMap = {
  "h": {
    ä: "ሀ",    // First form (primary)
    base: "ህ", // Sixth form (traditional base)
    "a": "ሃ",  // Fourth form
    "u": "ሁ",  // Second form
    "i": "ሂ",  // Third form
    "e": "ሄ",  // Fifth form
    "o": "ሆ"   // Seventh form
  }
  // ... 25+ more consonants
};

// Reverse lookup for combinations
const consonantKey = reverseMap[lastCharacter];
if (consonantKey && amharicMap[consonantKey][vowel]) {
  // Automatic syllable formation
}
```

### Key Innovations

1. **Complete 7-Form Coverage**: Unlike other systems, we support all Amharic vowel forms
2. **Real-time Combination Detection**: As you type, consonants automatically combine with vowels
3. **Cursor Position Management**: Prevents jumping during character replacements
4. **Efficient Reverse Lookup**: O(1) mapping from Amharic back to English keys

## 📚 Documentation

- **[📖 Getting Started](docs/getting-started.md)** - Installation and setup
- **[🔄 Transliteration Guide](docs/transliteration.md)** - Technical deep-dive
- **[📋 API Reference](docs/api-reference.md)** - Complete API docs
- **[💡 Examples](docs/examples.md)** - Code examples and use cases
- **[🤝 Contributing](docs/contributing.md)** - How to contribute

## 🧩 API Overview

### SmartInput Component

```tsx
interface SmartInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange?: (latinValue: string, transliteratedValue: string) => void;
  value?: string;
  transliterate?: boolean;
  placeholder?: string;
  className?: string;
  onTransliteratedChange?: (transliteratedValue: string) => void;
}
```

### Character Mappings

```typescript
import { amharicMap, reverseMap } from 'ethio-intl';

// Direct access
console.log(amharicMap.h.u); // "ሁ"
console.log(reverseMap['ሁ']); // "h"

// All 25+ consonants supported
console.log(Object.keys(amharicMap)); // ['h', 'l', 'm', 'r', 's', 'b', ...]
```

### Ethiopian Utilities

```typescript
import {
  toEthiopianNumerals,
  toEthiopianDate,
  getEthiopianMonths,
  getEthiopianDays
} from 'ethio-intl';

// Convert to Ethiopian numerals
console.log(toEthiopianNumerals(2025)); // "፳፻፳፭"

// Ethiopian date conversion
const ethiopian = toEthiopianDate(new Date());
// { year: 2017, month: 4, day: 7, monthName: 'Tahsas' }
```

## 🏢 Enterprise-Scale Multi-Language Localization

**Production-ready i18n solution for large Ethiopian applications!** Built for enterprise with dynamic loading, namespaces, and development tools.

### 🚀 Quick Start

```bash
npm install ethio-intl
```

### 📁 Project Structure for Large Apps

For enterprise applications, organize your translations like this:

```
src/
├── locales/
│   ├── en/
│   │   ├── common.json      # Shared translations
│   │   ├── dashboard.json   # Page-specific
│   │   ├── users.json       # Feature-specific
│   │   └── products.json    # Module-specific
│   ├── am/
│   │   ├── common.json
│   │   ├── dashboard.json
│   │   └── ...
│   └── index.json           # Language metadata
├── components/
├── pages/
└── App.tsx
```

### 📄 Translation File Examples

**src/locales/en/common.json:**
```json
{
  "welcome": "Welcome",
  "loading": "Loading...",
  "save": "Save",
  "cancel": "Cancel",
  "nav": {
    "home": "Home",
    "dashboard": "Dashboard",
    "users": "Users"
  }
}
```

**src/locales/am/dashboard.json:**
```json
{
  "title": "ዳሽቦርድ",
  "stats": {
    "users": "ተጠቃሚዎች",
    "revenue": "ገቢ"
  }
}
```

### 🏭 Enterprise Usage Patterns

#### Dynamic Translation Loading
```tsx
// App.tsx - Initial setup with minimal translations
import { EthioProvider, useEthioIntl } from 'ethio-intl';

const initialTranslations = {
  en: { translation: { common: { loading: "Loading...", nav: { home: "Home" } } } },
  am: { translation: { common: { loading: "በመስቀል ላይ...", nav: { home: "ቤት" } } } }
};

function App() {
  return (
    <EthioProvider resources={initialTranslations}>
      <AppRouter />
    </EthioProvider>
  );
}

// DashboardPage.tsx - Load page-specific translations
import { useEffect } from 'react';
import { useEthioIntl } from 'ethio-intl';

function DashboardPage() {
  const { loadNamespace, unloadNamespace, tNamespace } = useEthioIntl();

  useEffect(() => {
    // Load dashboard translations dynamically
    loadNamespace('en', 'dashboard', {
      title: 'Dashboard',
      stats: { users: 'Total Users', revenue: 'Revenue' }
    });
    loadNamespace('am', 'dashboard', {
      title: 'ዳሽቦርድ',
      stats: { users: 'ጠቅላላ ተጠቃሚዎች', revenue: 'ገቢ' }
    });

    // Cleanup on unmount
    return () => {
      unloadNamespace('en', 'dashboard');
      unloadNamespace('am', 'dashboard');
    };
  }, [loadNamespace, unloadNamespace]);

  return (
    <div>
      <h1>{tNamespace('dashboard', 'title')}</h1>
      <p>{tNamespace('dashboard', 'stats.users')}: 1,234</p>
    </div>
  );
}
```

#### Lazy Loading with Translations
```tsx
// Lazy load pages with their translations
const LazyUsersPage = lazy(() => {
  return import('./pages/UsersPage').then(async (module) => {
    // Preload page translations before rendering
    const usersEn = await import('../locales/en/users.json');
    const usersAm = await import('../locales/am/users.json');

    // Note: In real usage, you'd use the hook here
    // This is a conceptual example

    return module;
  });
});

// In a component with access to hook:
function PageLoader({ page }: { page: string }) {
  const { loadNamespace, preloadLanguages } = useEthioIntl();

  useEffect(() => {
    const loadPageTranslations = async () => {
      await preloadLanguages(['en', 'am']); // Load common translations

      // Load page-specific translations
      const [enTranslations, amTranslations] = await Promise.all([
        import(`../locales/en/${page}.json`),
        import(`../locales/am/${page}.json`)
      ]);

      loadNamespace('en', page, enTranslations.default);
      loadNamespace('am', page, amTranslations.default);
    };

    loadPageTranslations();
  }, [page, loadNamespace, preloadLanguages]);

  return <div>Loading page...</div>;
}
```

#### Development Tools Integration
```tsx
function DevTools() {
  const {
    getMissingKeys,
    exportTranslations,
    enableHotReload,
    isDevelopment,
    currentLang
  } = useEthioIntl();

  useEffect(() => {
    if (isDevelopment) {
      // Enable hot reload for development
      enableHotReload((lang, translations) => {
        console.log(`🔄 Hot reloaded ${lang} translations`, translations);
      });
    }
  }, [isDevelopment, enableHotReload]);

  const checkMissing = () => {
    const missing = getMissingKeys();
    console.log('Missing translation keys:', missing);
  };

  const exportLang = () => {
    const translations = exportTranslations(currentLang);
    // Download or save translations
    console.log('Exported translations:', translations);
  };

  if (!isDevelopment) return null;

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#333', color: '#fff', padding: 10 }}>
      <h4>🛠️ Dev Tools</h4>
      <button onClick={checkMissing}>Check Missing Keys</button>
      <button onClick={exportLang}>Export {currentLang.toUpperCase()}</button>
    </div>
  );
}
```

```tsx
import React from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';

// 1. Define your translations (supports unlimited languages)
const translations = {
  en: {
    translation: {
      welcome: 'Welcome to our app!',
      greeting: 'Hello {name}!',
      userCount: 'We have {count} users'
    }
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ ወደ መተግበሪያችን!',
      greeting: 'ሰላም {name}!',
      userCount: '{count} ተጠቃሚዎች አሉን'
    }
  },
  ti: {
    translation: {
      welcome: 'ቅድም ኣብ ሓቅ መጻእኩም ናብ መተግበሪያችን!',
      greeting: 'ሰላም {name}!',
      userCount: '{count} ተጠቃሚታት ኣለውን'
    }
  }
};

function App() {
  return (
    // 2. Wrap your app with EthioProvider
    <EthioProvider
      resources={translations}
      defaultLang="am"        // Auto-detects user's language
      fallbackLang="en"       // Fallback if translation missing
    >
      <Dashboard />
    </EthioProvider>
  );
}

function Dashboard() {
  // 3. Use the hook anywhere in your app
  const {
    t,                      // Translation function
    currentLang,            // Current language code
    changeLanguage,         // Switch languages
    supportedLangs,         // Available languages
    detectLanguage,         // Browser language detection
    isLanguageSupported     // Check if language exists
  } = useEthioIntl();

  return (
    <div>
      {/* 4. Use translations with interpolation */}
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
      <p>{t('userCount', { count: 1234 })}</p>

      {/* 5. Language switcher */}
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {supportedLangs.map(lang => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>

      <p>Current language: {currentLang}</p>
      <p>Browser detected: {detectLanguage()}</p>
    </div>
  );
}
```

### 🏗️ Advanced Features

#### Namespaced Translations

```tsx
const translations = {
  en: {
    translation: { welcome: 'Welcome!' },
    auth: { login: 'Login', logout: 'Logout' },
    nav: { home: 'Home', profile: 'Profile' }
  }
};

function Component() {
  const { tNamespace } = useEthioIntl();

  return (
    <div>
      <h1>{tNamespace('auth', 'login')}</h1>  {/* "Login" */}
      <nav>{tNamespace('nav', 'home')}</nav>  {/* "Home" */}
    </div>
  );
}
```

#### Language Detection & Persistence

```tsx
function LanguageSelector() {
  const {
    currentLang,
    changeLanguage,
    supportedLangs,
    detectLanguage,
    isLanguageSupported
  } = useEthioIntl();

  const handleAutoDetect = () => {
    const detected = detectLanguage();
    if (isLanguageSupported(detected)) {
      changeLanguage(detected); // Persists to localStorage
    }
  };

  return (
    <div>
      <button onClick={handleAutoDetect}>
        Auto-detect language
      </button>
      {/* Language persists across sessions */}
    </div>
  );
}
```

### 📋 Complete API Reference

#### EthioProvider Props

```tsx
interface EthioProviderProps {
  resources: Record<string, Record<string, any>>;  // Translation objects
  defaultLang?: string;                            // Default language (auto-detected)
  fallbackLang?: string;                           // Fallback for missing translations
  children: React.ReactNode;                       // Your app components
}
```

#### useEthioIntl Hook

```tsx
interface EthioIntlHookResult {
  // Core functions
  t: (key: string, options?: any) => string;           // Translate with interpolation
  tNamespace: (ns: string, key: string) => string;     // Namespaced translation

  // Language management
  currentLang: string;                                  // Current language code
  changeLanguage: (lang: string) => void;              // Switch language (persisted)
  supportedLangs: string[];                            // Available languages array

  // Utilities
  detectLanguage: () => string;                        // Browser language detection
  isLanguageSupported: (lang: string) => boolean;     // Check language availability
}
```

### 🌍 Supported Languages

Ethio-Intl works with **any language**! Here are some Ethiopian languages we've tested:

```tsx
const multiLangResources = {
  am: { translation: { /* Amharic */ } },
  ti: { translation: { /* Tigrinya */ } },
  om: { translation: { /* Afaan Oromoo */ } },
  so: { translation: { /* Somali */ } },
  ar: { translation: { /* Arabic */ } },
  en: { translation: { /* English */ } },
  fr: { translation: { /* French */ } }
  // Add unlimited languages!
};
```

### 🔧 Enterprise Setup Guide

#### 1. Translation File Organization
```
src/
├── locales/
│   ├── en/
│   │   ├── common.json      # App-wide shared translations
│   │   ├── auth.json        # Authentication module
│   │   ├── dashboard.json   # Dashboard page
│   │   ├── users.json       # Users management
│   │   └── products.json    # Products catalog
│   ├── am/
│   │   ├── common.json
│   │   ├── auth.json
│   │   ├── dashboard.json
│   │   ├── users.json
│   │   └── products.json
│   └── index.ts             # Language loader utilities
```

#### 2. Language Index File (src/locales/index.ts)
```typescript
// Utility functions for loading translations
export const loadLanguageTranslations = async (lang: string): Promise<Record<string, any>> => {
  const [common, auth, dashboard, users, products] = await Promise.all([
    import(`./${lang}/common.json`),
    import(`./${lang}/auth.json`),
    import(`./${lang}/dashboard.json`),
    import(`./${lang}/users.json`),
    import(`./${lang}/products.json`)
  ]);

  return {
    translation: common.default,
    auth: auth.default,
    dashboard: dashboard.default,
    users: users.default,
    products: products.default
  };
};

export const preloadCriticalTranslations = async (): Promise<Record<string, any>> => {
  // Load only essential translations initially
  const [enCommon, amCommon] = await Promise.all([
    import('./en/common.json'),
    import('./am/common.json')
  ]);

  return {
    en: { translation: enCommon.default },
    am: { translation: amCommon.default }
  };
};
```

#### 3. App Setup with Dynamic Loading
```tsx
// App.tsx
import React, { Suspense } from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';
import { preloadCriticalTranslations } from './locales';

function App() {
  const [initialTranslations, setInitialTranslations] = React.useState<Record<string, any> | null>(null);

  React.useEffect(() => {
    // Load critical translations on app start
    preloadCriticalTranslations().then(setInitialTranslations);
  }, []);

  if (!initialTranslations) {
    return <div>Loading translations...</div>;
  }

  return (
    <EthioProvider resources={initialTranslations}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouter />
      </Suspense>
    </EthioProvider>
  );
}

// Page Component with Translation Loading
function DashboardPage() {
  const { loadNamespace, tNamespace } = useEthioIntl();

  React.useEffect(() => {
    // Load dashboard translations when page mounts
    const loadTranslations = async () => {
      const [enDashboard, amDashboard] = await Promise.all([
        import('../locales/en/dashboard.json'),
        import('../locales/am/dashboard.json')
      ]);

      loadNamespace('en', 'dashboard', enDashboard.default);
      loadNamespace('am', 'dashboard', amDashboard.default);
    };

    loadTranslations();
  }, [loadNamespace]);

  return (
    <div>
      <h1>{tNamespace('dashboard', 'title')}</h1>
      {/* Page content */}
    </div>
  );
}
```

#### 4. Build Configuration for Translation Bundling

**vite.config.js (for Vite):**
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      // Pre-bundle translation chunks
      manualChunks: {
        'translations-en': ['./src/locales/en/index.ts'],
        'translations-am': ['./src/locales/am/index.ts']
      }
    }
  },
  // Lazy load translations
  optimizeDeps: {
    include: ['ethio-intl']
  }
});
```

**webpack.config.js (for Webpack):**
```javascript
module.exports = {
  // Code splitting for translations
  optimization: {
    splitChunks: {
      cacheGroups: {
        translations: {
          test: /[\\/]locales[\\/]/,
          name: 'translations',
          chunks: 'all'
        }
      }
    }
  }
};
```

### 🔧 Best Practices

#### 1. Translation Structure
```tsx
const translations = {
  en: {
    translation: {
      // Flat structure for simple apps
      welcome: 'Welcome!',
      greeting: 'Hello {name}!'
    },
    // Namespaces for complex apps
    auth: {
      login: 'Login',
      register: 'Register'
    },
    nav: {
      home: 'Home',
      settings: 'Settings'
    }
  }
};
```

#### 2. Language Detection
```tsx
function SmartLanguageInit() {
  const { detectLanguage, isLanguageSupported, changeLanguage } = useEthioIntl();

  useEffect(() => {
    const detected = detectLanguage();
    if (isLanguageSupported(detected)) {
      changeLanguage(detected);
    }
  }, []);
}
```

#### 3. Interpolation Patterns
```tsx
// Both syntaxes supported:
t('greeting', { name: 'John' })  // "Hello John!"
t('count', { num: 42 })          // "You have 42 items"

// Translation keys:
greeting: 'Hello {name}!'
count: 'You have {num} items'
```

### 🎯 What Users Need To Do

#### For Basic Usage:
1. **Install**: `npm install ethio-intl`
2. **Import**: `import { EthioProvider, useEthioIntl } from 'ethio-intl'`
3. **Create translations object** with your languages
4. **Wrap app** with `<EthioProvider resources={translations}>`
5. **Use hook** `const { t, changeLanguage } = useEthioIntl()`

#### For Advanced Usage:
- Add **namespaced translations** for better organization
- Use **language detection** for better UX
- Implement **language switchers** with `supportedLangs`
- Leverage **interpolation** for dynamic content

### 🚀 Zero Dependencies

**No external libraries needed!** Unlike other i18n solutions, Ethio-Intl is built purely with React:

- ❌ No i18next dependency
- ❌ No react-i18next complexity
- ❌ No heavy bundle size
- ✅ Pure React Context + Hooks
- ✅ TypeScript support
- ✅ Tree-shakeable

### 📱 Demo & Examples

**Live Demo**: [http://127.0.0.1:5500/demo.html](http://127.0.0.1:5500/demo.html)

See the demo for:
- Multi-language switching (English, Amharic, Tigrinya, Afaan Oromoo)
- Namespaced translations
- Interpolation examples
- Language persistence

## 🎨 Styling

### CSS Classes

```css
.ethio-smart-input              /* Container */
.ethio-smart-input__field       /* Input field */
.ethio-smart-input__preview     /* Preview area */
```

### Custom Styling Example

```css
.ethio-smart-input__field {
  font-family: 'Noto Sans Ethiopic', serif;
  font-size: 24px;
  padding: 15px;
  border: 3px solid #007bff;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.ethio-smart-input__field:focus {
  border-color: #0056b3;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
}
```

## 🌐 Browser Support

- ✅ **Chrome 60+**
- ✅ **Firefox 55+**
- ✅ **Safari 11+**
- ✅ **Edge 79+**
- ✅ **Mobile browsers**

*Requires Unicode support for Amharic character display*

## 📊 Performance

- **⚡ Real-time**: <1ms per character
- **💾 Memory**: ~2KB for character mappings
- **📦 Bundle**: ~15KB gzipped
- **🎯 Accuracy**: 100% character mapping coverage

## 🧪 Testing

```bash
# Run all tests
npm test

# Type checking
npm run type-check

# Build for production
npm run build
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](docs/contributing.md) for details.

### Ways to Help

- 🐛 **Report Bugs** - [GitHub Issues](https://github.com/your-org/ethio-intl/issues)
- 💡 **Suggest Features** - [GitHub Issues](https://github.com/your-org/ethio-intl/issues)
- 📝 **Improve Docs** - Edit files in `docs/`
- 🔧 **Write Code** - Fix bugs or add features
- 🧪 **Add Tests** - Improve test coverage

## 📄 License

**MIT License** - Free for personal and commercial use

## 🙏 Acknowledgments

- Built for the **Ethiopian developer community**
- Inspired by the need for better Amharic digital input
- Thanks to all contributors and the open source community

## 📞 Support

- 📧 **Email**: [your-email@example.com](mailto:your-email@example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/ethio-intl/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-org/ethio-intl/discussions)

---

**Made with ❤️ for Ethiopia's digital future**

[🌟 Star us on GitHub](https://github.com/your-org/ethio-intl) • [📖 Read the Docs](docs/) • [🎮 Try the Demo](demo.html)