# 🌍 Ethio-Intl

[![npm version](https://badge.fury.io/js/ethio-intl.svg)](https://badge.fury.io/js/ethio-intl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dm/ethio-intl.svg)](https://www.npmjs.com/package/ethio-intl)
[![GitHub stars](https://img.shields.io/github/stars/BeamSol/Ethio-Intl.svg)](https://github.com/BeamSol/Ethio-Intl/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/BeamSol/Ethio-Intl.svg)](https://github.com/BeamSol/Ethio-Intl/issues)

A modern JavaScript SDK for Ethiopian web applications with Amharic transliteration, Ethiopian calendar conversion, Geez numerals, and multi-language support.

## 🎮 Live Demo

Try the interactive demo: [**Open Demo**](https://beamsol.github.io/Ethio-Intl/demo.html)

Experience real-time Amharic transliteration, Ethiopian calendar conversion, Geez numerals, and multi-language support!

## ✨ Features

- 🔤 **Amharic Transliteration**: Real-time English to Amharic conversion
- 📅 **Ethiopian Calendar**: Precise Gregorian ↔ Ethiopian date conversion
- 🔢 **Geez Numerals**: Convert Arabic numbers to traditional Geez script
- 🌐 **Multi-language Support**: Amharic, English, Tigrinya, and Oromo
- ⚡ **Zero Dependencies**: Pure TypeScript with no external libraries
- 🎯 **TypeScript First**: Full type safety and IntelliSense support
- 🪝 **React Hooks**: Custom hooks for easy React integration

## 🚀 Quick Start

### Installation

```bash
npm install ethio-intl
```

```bash
yarn add ethio-intl
```

```bash
pnpm add ethio-intl
```

### Basic Usage

```javascript
import { toEthDate, toEthNumber } from 'ethio-intl';

// Ethiopian Calendar
const today = new Date();
const ethDate = toEthDate(today, 'en');
// Result: "Tahsas 13, 2018"

const ethDateAmharic = toEthDate(today, 'am');
// Result: "ታህሳስ 13, 2018"

// Geez Numerals
const geezNumber = toEthNumber(2025);
// Result: "፳፻፳፭"

const geez100 = toEthNumber(100);
// Result: "፻" (note: no '1' multiplier)
```

## 📚 API Reference

### Calendar Functions

#### `toEthDate(date, lang?)`
Convert Gregorian date to Ethiopian date.

```javascript
import { toEthDate } from 'ethio-intl';

const ethDate = toEthDate(new Date(2025, 8, 11), 'en');
// Result: "Meskerem 1, 2018"

const ethDateAmharic = toEthDate(new Date(2025, 8, 11), 'am');
// Result: "መስከረም 1, 2018"
```

#### `isEthiopianLeapYear(year)`
Check if Ethiopian year is a leap year.

```javascript
import { isEthiopianLeapYear } from 'ethio-intl';

isEthiopianLeapYear(2018); // true
isEthiopianLeapYear(2017); // false
```

### Numeral Functions

#### `toEthNumber(num)`
Convert Arabic number to Geez numerals.

```javascript
import { toEthNumber } from 'ethio-intl';

toEthNumber(1);      // "፩"
toEthNumber(10);     // "፲"
toEthNumber(100);    // "፻"
toEthNumber(1000);   // "፲፻"
toEthNumber(2025);   // "፳፻፳፭"
```

#### `fromEthNumber(geezString)`
Convert Geez numerals to Arabic number.

```javascript
import { fromEthNumber } from 'ethio-intl';

fromEthNumber('፳፻፳፭'); // 2025
fromEthNumber('፻');    // 100
```

### React Integration

#### `EthioProvider`
React Context provider for internationalization.

```javascript
import { EthioProvider } from 'ethio-intl';

const translations = {
  en: { translation: { welcome: 'Welcome!' } },
  am: { translation: { welcome: 'እንኳን ደህና መጡ!' } }
};

function App() {
  return (
    <EthioProvider
      resources={translations}
      defaultLang="am"
      fallbackLang="en"
    >
      <YourComponents />
    </EthioProvider>
  );
}
```

#### `useEthioIntl`
Custom hook for accessing internationalization context.

```javascript
import { useEthioIntl } from 'ethio-intl';

function MyComponent() {
  const { t, changeLanguage, currentLang } = useEthioIntl();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('am')}>
        Switch to Amharic
      </button>
    </div>
  );
}
```

#### `useTransliterate`
Hook for real-time Amharic transliteration.

```javascript
import { useTransliterate } from 'ethio-intl';

function TransliterComponent() {
  const [text, setText] = useState('');
  const translated = useTransliterate(text);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type in English..."
      />
      <p>Amharic: {translated}</p>
    </div>
  );
}
```

## 🎯 Use Cases

### Financial Applications
```javascript
// Ethiopian banking date formatting
const transactionDate = toEthDate(new Date(), 'am');
console.log(`ቀን: ${transactionDate}`);
```

### E-commerce Platforms
```javascript
// Product pricing in Geez numerals
const price = toEthNumber(2500);
console.log(`ዋጋ: ${price} ብር`);
```

### Cultural Applications
```javascript
// Traditional date display
const today = new Date();
const ethDate = toEthDate(today, 'am');
const geezYear = toEthNumber(today.getFullYear());

console.log(`የነገ ቀን: ${ethDate.replace(/\d{4}$/, geezYear)}`);
```

### Government Systems
```javascript
// Official document dating
const officialDate = toEthDate(new Date(), 'am');
console.log(`ቀን: ${officialDate}`);
```

## 🔧 Advanced Configuration

### Custom Language Support
```javascript
const customTranslations = {
  en: {
    translation: { hello: 'Hello' },
    custom: { greeting: 'Welcome' }
  },
  am: {
    translation: { hello: 'ሰላም' },
    custom: { greeting: 'እንኳን ደህና መጡ' }
  }
};

<EthioProvider resources={customTranslations}>
  <App />
</EthioProvider>
```

### Dynamic Translation Loading
```javascript
const { loadNamespace, loadTranslations } = useEthioIntl();

// Load page-specific translations
useEffect(() => {
  loadNamespace('en', 'dashboard', dashboardEn);
  loadNamespace('am', 'dashboard', dashboardAm);
}, []);
```

## 🌍 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| Amharic | `am` | ✅ Full Support |
| English | `en` | ✅ Full Support |
| Tigrinya | `ti` | ✅ Full Support |
| Oromo | `om` | ✅ Full Support |

## 🏗️ Technical Details

### Calendar System
- **Ethiopian Calendar**: 13-month system (12 months × 30 days + Pagume)
- **Leap Years**: Ethiopian year % 4 === 3
- **New Year**: Meskerem 1 (usually September 11/12)
- **Time Offset**: ~7-8 years behind Gregorian

### Numeral System
- **Geez Numerals**: Unicode-based traditional script
- **Special Rules**: No '1' multiplier for 100 (፻) and 10,000 (፼)
- **Range**: Supports numbers up to 1,000,000+

### Performance
- **Bundle Size**: ~15KB minified + gzipped
- **Zero Runtime Dependencies**: Pure TypeScript implementation
- **Tree Shaking**: Import only what you need

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Build

```bash
# Development build with watch
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethiopian developers community
- Unicode Consortium for Ethiopic script support
- Open source contributors

## 📞 Support

- 📧 **Email**: support@ethio-intl.dev
- 🐛 **Issues**: [GitHub Issues](https://github.com/BeamSol/Ethio-Intl/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ethio-intl/ethio-intl/discussions)

---

<p align="center">
  Made with ❤️ for the Ethiopian developer community
</p>

<div align="center">

  [🌐 Website](https://ethio-intl-documentation.vercel.app/) •
  [📚 Documentation](https://github.com/BeamSol/Ethio-Intl/tree/main/docs) •
  [🎮 Demo](https://ethio-intl.github.io/demo) •
  [🐙 GitHub](https://github.com/BeamSol/Ethio-Intl)

</div>