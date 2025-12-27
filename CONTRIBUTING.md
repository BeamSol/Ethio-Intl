# Contributing to Ethio-Intl

Welcome to Ethio-Intl! We're excited that you're interested in contributing to our mission of making Ethiopian language support accessible to developers worldwide. This document provides comprehensive guidelines for contributing to the project.

## 🌍 Our Mission

Ethio-Intl empowers developers to create inclusive applications for Ethiopian users by providing robust internationalization tools for Amharic, Tigrinya, Oromo, and other Ethiopian languages.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Version 2.30.0 or higher

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/BeamSol/Ethio-Intl.git
cd Ethio-Intl

# Install dependencies
npm install

# Run tests to ensure everything works
npm test

# Start development server
npm run dev
```

## 📁 Project Structure

```
ethio-intl/
├── src/                          # Source code
│   ├── hooks/                    # React hooks
│   │   ├── useEthioIntl.ts      # Main i18n hook
│   │   └── useTransliterate.ts  # Transliteration hook
│   ├── localization/            # i18n core
│   │   ├── EthioProvider.tsx    # React context provider
│   │   ├── index.ts            # Localization exports
│   │   └── types.ts            # TypeScript definitions
│   ├── transliteration/         # Amharic input system
│   │   ├── SmartInput.tsx      # Smart input component
│   │   └── index.ts            # Transliteration exports
│   ├── utils/                   # Ethiopian utilities
│   │   ├── calendar.ts         # Ethiopian calendar functions
│   │   ├── date.ts            # Date formatting utilities
│   │   ├── numbers.ts          # Geez numeral conversion
│   │   └── index.ts            # Utils exports
│   └── locales/                 # Translation files
│       ├── en.json             # English translations
│       └── am.json             # Amharic translations
├── examples/                    # Usage examples
├── tests/                       # Test suites
├── docs/                        # Documentation
├── ethio-intl-documentation/    # Documentation website
└── dist/                        # Built package
```

## 🛠️ Development Workflow

### 1. Choose an Issue

- Browse [GitHub Issues](https://github.com/BeamSol/Ethio-Intl/issues) for open tasks
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it
- Wait for maintainer confirmation before starting work

### 2. Create a Branch

Use descriptive branch names following this pattern:

```bash
# For features
git checkout -b feature/add-tigrinya-support

# For bug fixes
git checkout -b fix/calendar-leap-year-bug

# For documentation
git checkout -b docs/update-api-reference

# For refactoring
git checkout -b refactor/simplify-transliteration-logic
```

### 3. Make Changes

#### Code Standards

- **TypeScript**: All code must be written in TypeScript
- **ESLint**: Follow the project's linting rules
- **Prettier**: Code will be automatically formatted
- **Imports**: Use absolute imports for internal modules

#### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

```bash
# Examples
git commit -m "feat: add Oromo language support"
git commit -m "fix: correct Ethiopian calendar leap year calculation"
git commit -m "docs: update API reference for new features"
git commit -m "test: add unit tests for date formatting"
git commit -m "refactor: simplify transliteration algorithm"
```

### 4. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- tests/utils/date.test.ts

# Type checking
npm run type-check

# Build verification
npm run build

# Integration testing
npm run test:integration
```

#### Test Coverage Requirements

- **Minimum Coverage**: 80% overall
- **Branches**: 75% minimum
- **Functions**: 85% minimum
- **Lines**: 80% minimum

### 5. Documentation

Update documentation for any new features:

- **README.md**: Update with new features and examples
- **API Documentation**: Add JSDoc comments and update docs/
- **Examples**: Add usage examples in examples/
- **Changelog**: Update CHANGELOG.md

### 6. Submit a Pull Request

#### PR Requirements

- **Title**: Clear, descriptive title following conventional commit format
- **Description**: Detailed explanation of changes
- **Tests**: All tests pass and coverage maintained
- **Documentation**: Updated as needed
- **Screenshots**: For UI changes
- **Breaking Changes**: Clearly marked if any

#### PR Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published
```

## 🎯 Feature Development Guidelines

### Adding New Languages

1. **Create Locale File**: Add `src/locales/[lang].json`
2. **Follow Structure**: Match existing locale format
3. **Update Types**: Add language code to type definitions
4. **Add Tests**: Create test files for the new language
5. **Update Documentation**: Add language to examples and docs

### Adding Transliteration Features

1. **Update Character Map**: Modify `src/utils/amharicMap.ts`
2. **Test Combinations**: Ensure all vowel combinations work
3. **Performance**: Optimize for real-time typing
4. **Edge Cases**: Handle special characters and punctuation

### Adding Calendar Features

1. **Astronomical Accuracy**: Use proper astronomical calculations
2. **Leap Year Handling**: Support both Gregorian and Ethiopian leap years
3. **Timezone Safety**: Ensure UTC-based calculations
4. **Performance**: Optimize date conversion algorithms

### Adding UI Components

1. **Accessibility**: WCAG 2.1 AA compliance
2. **Responsive Design**: Mobile-first approach
3. **TypeScript**: Full type safety
4. **Styling**: Follow design system patterns

## 🔧 Code Quality Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(userData: User): User {
  // Implementation
}

// ❌ Bad: Using any
function createUser(userData: any): any {
  // Implementation
}
```

### React Best Practices

```tsx
// ✅ Good: Functional components with hooks
function LanguageSelector({ languages, onSelect }: Props) {
  const [selected, setSelected] = useState<string>('');

  return (
    <select
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        onSelect(e.target.value);
      }}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

// ❌ Bad: Class components
class LanguageSelector extends React.Component<Props, State> {
  // Implementation
}
```

### Error Handling

```typescript
// ✅ Good: Proper error handling
export function toEthDate(date: Date, lang: string = 'en'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided to toEthDate');
  }

  if (!['en', 'am'].includes(lang)) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  try {
    // Implementation
  } catch (error) {
    throw new Error(`Failed to convert date: ${error.message}`);
  }
}
```

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Example: Testing calendar conversion
describe('toEthDate', () => {
  it('should convert Gregorian date to Ethiopian correctly', () => {
    const gregorian = new Date('2024-01-15');
    const result = toEthDate(gregorian, 'en');
    expect(result).toBe('Tir 7, 2016');
  });

  it('should handle leap years correctly', () => {
    const leapYear = new Date('2024-09-11');
    const result = toEthDate(leapYear);
    expect(result).toBe('Meskerem 1, 2017');
  });
});
```

### Integration Tests

```typescript
// Example: Testing full i18n workflow
describe('EthioProvider Integration', () => {
  it('should change language and update translations', async () => {
    const { result } = renderHook(() => useEthioIntl(), {
      wrapper: ({ children }) => (
        <EthioProvider
          resources={{ en: translations, am: amharicTranslations }}
          defaultLanguage="en"
        >
          {children}
        </EthioProvider>
      ),
    });

    expect(result.current.t('welcome')).toBe('Welcome');

    act(() => {
      result.current.changeLanguage('am');
    });

    expect(result.current.t('welcome')).toBe('እንኳን ደህና መጡ');
  });
});
```

## 📝 Documentation Standards

### README Updates

- Update installation instructions
- Add usage examples for new features
- Update API documentation
- Maintain feature compatibility matrix

### Code Documentation

```typescript
/**
 * Converts a Gregorian date to Ethiopian calendar date
 *
 * @param date - The Gregorian date to convert
 * @param lang - Language for month names ('en' | 'am')
 * @returns Ethiopian date string in format "Month Day, Year"
 *
 * @example
 * ```typescript
 * const ethDate = toEthDate(new Date('2024-01-15'), 'am');
 * // Returns: "ጥር 7, 2016"
 * ```
 *
 * @throws {Error} When invalid date is provided
 * @throws {Error} When unsupported language is specified
 */
export function toEthDate(date: Date, lang?: string): string {
  // Implementation
}
```

## 🚨 Issue Reporting

### Bug Reports

**Required Information:**
- **Environment**: Node.js version, browser, OS
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Code Sample**: Minimal reproduction case
- **Error Messages**: Full error output

### Feature Requests

**Required Information:**
- **Problem**: What's the current limitation?
- **Solution**: How should it work?
- **Use Cases**: Who benefits and how?
- **Alternatives**: Considered solutions

## 🎉 Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Added to CONTRIBUTORS file
- Recognized in release notes
- Invited to join the core team (for significant contributions)

## 📞 Support

- **Documentation**: Check docs/ directory first
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community chat

## 📋 Checklist for Contributors

### Before Starting
- [ ] Read this CONTRIBUTING.md file
- [ ] Check existing issues and PRs
- [ ] Join our Discord community

### During Development
- [ ] Follow code style guidelines
- [ ] Write comprehensive tests
- [ ] Update documentation
- [ ] Test on multiple browsers/devices

### Before Submitting
- [ ] All tests pass
- [ ] Code is properly typed
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] PR description is detailed

---

Thank you for contributing to Ethio-Intl! Your work helps make Ethiopian languages accessible to developers worldwide. 🌍🇪🇹

*Built with ❤️ for the Ethiopian developer community*




