# Source Code Overview

This directory contains the complete source code for Ethio-Intl.

## 📁 Directory Structure

```
src/
├── examples/           # Usage examples and demos
│   └── WrapperDemo.tsx # Basic usage example
├── hooks/             # React hooks
│   ├── useEthioIntl.ts    # Main i18n hook
│   └── useTransliterate.ts # Transliteration hook
├── localization/      # i18n implementation
│   ├── EthioProvider.tsx  # React context provider
│   ├── index.ts          # Exports
│   └── types.ts          # TypeScript definitions
├── transliteration/   # Amharic conversion logic
│   ├── index.ts          # Exports
│   ├── SmartInput.tsx    # React component
│   └── transliteration.test.ts # Tests
├── utils/             # Ethiopian utilities
│   ├── index.ts          # Exports
│   ├── amharicMap.ts     # Character mappings
│   ├── calendar.ts       # Ethiopian calendar
│   ├── numerals.ts       # Number conversion
│   └── numerals.test.ts  # Tests
├── locales/           # Translation files
│   ├── en.json          # English
│   ├── am.json          # Amharic
│   └── README.md        # Translation guide
└── index.ts           # Main package exports
```

## 🚀 Quick Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run type-check

# Build for production
npm run build

# Start demo server
python -m http.server 5500
# Visit: http://127.0.0.1:5500/demo.html
```

## 📦 Key Components

### EthioProvider
- **Location**: `localization/EthioProvider.tsx`
- **Purpose**: React context provider for i18n
- **Features**: Multi-language support, dynamic loading, enterprise tools

### useEthioIntl Hook
- **Location**: `hooks/useEthioIntl.ts`
- **Purpose**: Main interface for translations
- **Features**: Translation functions, language management, utilities

### Amharic Transliteration
- **Location**: `transliteration/`
- **Purpose**: Convert English to Amharic characters
- **Features**: Real-time conversion, smart ä-forms, cursor management

### Utilities
- **Location**: `utils/`
- **Purpose**: Ethiopian-specific utilities
- **Features**: Calendar conversion, numeral formatting

## 🔧 Development Guidelines

- **TypeScript**: All code must be typed
- **Testing**: Add tests for new features
- **Documentation**: Update docs for API changes
- **Performance**: Consider bundle size impact
- **Compatibility**: Support React 16.8+

## 📚 Learn More

- [Main README](../README.md) - Installation and usage
- [Contributing Guide](../CONTRIBUTING.md) - Development workflow
- [API Reference](../docs/api-reference.md) - Detailed API docs
- [Examples](../docs/examples.md) - Code examples




