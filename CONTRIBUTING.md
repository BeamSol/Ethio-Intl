# Contributing to Ethio-Intl

Thank you for your interest in contributing to Ethio-Intl! This document provides guidelines for contributors.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/ethio-intl.git
cd ethio-intl

# Install dependencies
npm install

# Run tests
npm test

# Start development mode
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── examples/           # Usage examples
├── hooks/             # React hooks (useEthioIntl, useTransliterate)
├── localization/      # i18n provider and utilities
├── transliteration/   # Amharic transliteration logic
├── utils/             # Ethiopian calendar and numeral utilities
└── locales/           # Translation files (en.json, am.json, etc.)
```

## 🛠️ Development Workflow

### 1. Choose an Issue
- Check [GitHub Issues](https://github.com/your-org/ethio-intl/issues) for open tasks
- Comment on the issue to indicate you're working on it

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number
```

### 3. Make Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure TypeScript types are correct

### 4. Test Your Changes
```bash
# Run all tests
npm test

# Type checking
npm run type-check

# Build verification
npm run build

# Manual testing with demo
python -m http.server 5500
# Open http://127.0.0.1:5500/demo.html
```

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

Follow conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions/modifications
- `refactor:` - Code refactoring

### 6. Submit a Pull Request
- Push your branch to GitHub
- Create a Pull Request with a clear description
- Reference any related issues
- Ensure CI checks pass

## 📝 Code Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible

### React
- Use functional components with hooks
- Follow React best practices
- Ensure proper error boundaries

### Testing
- Write unit tests for new features
- Maintain test coverage above 80%
- Test both success and error cases

### Documentation
- Update README for new features
- Add JSDoc comments for public APIs
- Include usage examples

## 🎯 Adding Languages

1. Create `src/locales/[lang].json`
2. Follow the existing JSON structure
3. Add language to examples and documentation
4. Test thoroughly with existing components

## 🔧 Adding Features

### New i18n Features
- Add to `src/localization/EthioProvider.tsx`
- Export from `src/hooks/useEthioIntl.ts`
- Update types in `src/localization/types.ts`
- Add tests and documentation

### New Transliteration Features
- Update `src/utils/amharicMap.ts`
- Modify `src/hooks/useTransliterate.ts`
- Add tests in `src/transliteration/`

### New Utilities
- Add to `src/utils/`
- Export from `src/utils/index.ts`
- Add tests and documentation

## 🐛 Reporting Bugs

- Use [GitHub Issues](https://github.com/your-org/ethio-intl/issues)
- Provide clear reproduction steps
- Include browser/OS information
- Attach screenshots if applicable

## 📚 Documentation

- Keep README.md updated
- Update API documentation in `docs/`
- Add examples for new features
- Maintain changelog

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Maintain professional communication

## 📞 Getting Help

- Check existing issues and documentation first
- Ask questions in GitHub Discussions
- Join our community chat

Thank you for contributing to Ethio-Intl! 🌍🇪🇹




