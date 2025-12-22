# Ethio-Intl Documentation

Welcome to the Ethio-Intl documentation! This project provides comprehensive internationalization utilities for Ethiopian web applications, with a focus on Amharic language support.

## 📚 Documentation Overview

- **[Getting Started](./getting-started.md)** - Quick start guide and installation
- **[Transliteration System](./transliteration.md)** - Complete guide to Amharic transliteration
- **[API Reference](./api-reference.md)** - Detailed API documentation
- **[Examples](./examples.md)** - Code examples and demos
- **[Contributing](./contributing.md)** - How to contribute to the project

## 🌟 Key Features

- **Real-time Amharic Transliteration** - Type in English, get Amharic output instantly
- **Smart Character Combinations** - Automatic consonant-vowel combinations
- **Complete Character Coverage** - All Amharic consonants with 7 vowel forms each
- **React Components** - Ready-to-use SmartInput component
- **TypeScript Support** - Full type safety and IntelliSense
- **Nested Dictionary Architecture** - Efficient and scalable design

## 🚀 Quick Demo

Try our [live demo](../demo.html) to see the transliteration in action!

## 📖 What We Built

This project features a sophisticated Amharic transliteration system built with:

- **Advanced Algorithm**: Reverse lookup with consonant-vowel combination detection
- **Complete Character Mapping**: 25+ consonants × 7 vowel forms = comprehensive coverage
- **React Integration**: Seamless SmartInput component with cursor management
- **Performance Optimized**: Efficient nested dictionary structure

## 🏗️ Architecture

```
src/
├── transliteration/
│   ├── SmartInput.tsx      # Main React component
│   ├── index.ts           # Public exports
│   └── transliteration.test.ts
├── hooks/
│   └── useTransliterate.ts # Core transliteration logic
├── utils/
│   └── amharicMap.ts      # Complete character mappings
└── localization/          # Future i18n features
```

## 🎯 Core Innovation

Our transliteration system uniquely handles Amharic's complex syllable structure:

1. **Detects consonant input** → Maps to base Amharic form
2. **Recognizes vowel sequences** → Combines with consonants automatically
3. **Maintains cursor position** → Prevents jumping during replacements
4. **Supports all 7 vowel forms** → Complete phonetic coverage

## 📈 Performance

- **Real-time processing** - No noticeable lag during typing
- **Efficient lookups** - O(1) reverse mapping
- **Memory optimized** - Compact nested dictionary structure
- **TypeScript compiled** - Production-ready performance

## 🌍 Ethiopian Context

This library addresses the need for proper Amharic input in digital systems, providing:

- **Cultural Preservation** - Enables native language digital communication
- **Accessibility** - Makes technology usable for Amharic speakers
- **Education** - Supports language learning and literacy
- **Government & Business** - Professional Amharic text input solutions

---

**Built with ❤️ for the Ethiopian developer community**

For questions or contributions, please see our [Contributing Guide](./contributing.md).
