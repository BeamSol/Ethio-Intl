# Contributing to Ethio-Intl

Thank you for your interest in contributing to Ethio-Intl! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

- **🐛 Bug Reports**: Found a bug? [Create an issue](https://github.com/your-org/ethio-intl/issues)
- **💡 Feature Requests**: Have an idea? [Suggest it](https://github.com/your-org/ethio-intl/issues)
- **📝 Documentation**: Help improve docs or add examples
- **🔧 Code**: Fix bugs, add features, improve performance
- **🧪 Testing**: Add tests or improve test coverage
- **🌐 Translation**: Help add more languages or improve existing translations

## 🚀 Getting Started

### Development Setup

1. **Fork and Clone** the repository:
   ```bash
   git clone https://github.com/your-username/ethio-intl.git
   cd ethio-intl
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development**:
   ```bash
   npm run dev
   ```

4. **Run Tests**:
   ```bash
   npm test
   ```

5. **Open Demo**:
   ```bash
   # Open demo.html in your browser
   # or use a local server
   python -m http.server 5500
   # Then visit http://localhost:5500/demo.html
   ```

### Project Structure

```
ethio-intl/
├── src/
│   ├── transliteration/
│   │   ├── SmartInput.tsx      # Main React component
│   │   ├── index.ts           # Public exports
│   │   └── transliteration.test.ts
│   ├── hooks/
│   │   └── useTransliterate.ts # Core transliteration logic
│   ├── utils/
│   │   └── amharicMap.ts      # Character mappings
│   └── index.ts               # Main exports
├── docs/                      # Documentation
├── demo.html                  # Live demo
└── package.json
```

## 🐛 Reporting Bugs

### Bug Report Template

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**:
   ```text
   1. Go to '...'
   2. Type '...'  
   3. See error
   ```
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Environment**:
   - Browser: Chrome 91.0
   - OS: Windows 10
   - Node version: 16.0
   - Library version: 1.0.0

### Example Bug Report

```markdown
**Bug: Character not displaying correctly**

**Description:**
The character ሀ is not displaying when typing 'hä'

**Steps to Reproduce:**
1. Open demo.html
2. Type 'hä'
3. Notice that 'ä' doesn't combine with 'h'

**Expected:**
Should show ሀ (h + ä = ሀ)

**Actual:**
Shows ህä (no combination)

**Environment:**
- Browser: Chrome 91
- OS: Windows 10
```

## 💡 Feature Requests

### Feature Request Template

For new features, please provide:

1. **Problem**: What's the problem this solves?
2. **Solution**: Describe your proposed solution
3. **Alternatives**: Any alternative approaches considered
4. **Use Cases**: How would this be used?
5. **Implementation Notes**: Any technical considerations

### Good Feature Requests

```markdown
**Feature: Add Tigrinya Support**

**Problem:**
Many Ethiopian users also speak Tigrinya, but the library only supports Amharic.

**Solution:**
Add Tigrinya character mappings and transliteration rules.

**Use Cases:**
- Tigrinya language learning apps
- Government forms in Tigray region
- Multi-language Ethiopian applications

**Implementation:**
- Add tigrinyaMap.ts with Tigrinya character mappings
- Extend SmartInput to support language selection
- Add Tigrinya-specific transliteration rules
```

## 🔧 Code Contributions

### Development Workflow

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Changes**:
   - Follow TypeScript best practices
   - Add tests for new functionality
   - Update documentation
   - Ensure all tests pass

3. **Test Your Changes**:
   ```bash
   npm test
   npm run type-check
   ```

4. **Commit with Clear Messages**:
   ```bash
   git commit -m "feat: add amazing feature

   - Add new transliteration rule
   - Update character mappings
   - Add comprehensive tests"
   ```

5. **Push and Create PR**:
   ```bash
   git push origin feature/amazing-feature
   # Create Pull Request on GitHub
   ```

### Code Style Guidelines

#### TypeScript
- Use TypeScript for all new code
- Include type annotations for function parameters
- Use interfaces for complex objects
- Avoid `any` type when possible

#### React
- Use functional components with hooks
- Follow React best practices
- Include PropTypes or TypeScript interfaces
- Use meaningful component and prop names

#### Testing
- Write tests for all new features
- Include edge cases and error conditions
- Aim for >90% test coverage
- Use descriptive test names

### Example Implementation

```typescript
// ✅ Good: Well-typed, documented, tested
interface TransliterationOptions {
  /** Whether to preserve spaces */
  preserveSpaces?: boolean;
  /** Custom character mappings */
  customMap?: Record<string, string>;
}

/**
 * Advanced transliteration with options
 */
export function transliterateWithOptions(
  input: string,
  options: TransliterationOptions = {}
): string {
  const { preserveSpaces = true, customMap = {} } = options;

  // Implementation here...
  return result;
}

// ✅ Good: Comprehensive tests
describe('transliterateWithOptions', () => {
  test('preserves spaces by default', () => {
    expect(transliterateWithOptions('hello world')).toContain(' ');
  });

  test('removes spaces when disabled', () => {
    expect(transliterateWithOptions('hello world', { preserveSpaces: false }))
      .not.toContain(' ');
  });
});
```

## 📝 Documentation

### Adding Documentation

1. **Update Existing Docs**: Fix typos, clarify explanations
2. **Add Examples**: Include code examples for new features
3. **API Documentation**: Document new functions and props
4. **Troubleshooting**: Add common issues and solutions

### Documentation Structure

```
docs/
├── README.md          # Overview and quick start
├── getting-started.md # Installation and setup
├── transliteration.md # Technical deep-dive
├── api-reference.md   # Complete API docs
├── examples.md        # Code examples
└── contributing.md    # This file
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test transliteration.test.ts

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

### Writing Tests

```typescript
import { transliterate } from '../src/transliteration';

describe('transliterate', () => {
  test('handles basic consonants', () => {
    expect(transliterate('h')).toBe('ህ');
    expect(transliterate('l')).toBe('ል');
    expect(transliterate('m')).toBe('ም');
  });

  test('handles consonant-vowel combinations', () => {
    expect(transliterate('hu')).toBe('ሁ');
    expect(transliterate('ba')).toBe('ባ');
    expect(transliterate('te')).toBe('ተ');
  });

  test('handles edge cases', () => {
    expect(transliterate('')).toBe('');
    expect(transliterate('123')).toBe('123');
    expect(transliterate('a')).toBe('አ');
  });
});
```

### Test Coverage

Aim for high test coverage:

- **Unit Tests**: Individual functions and components
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user workflows
- **Edge Cases**: Error conditions, unusual inputs

## 🌐 Internationalization

### Adding Languages

To add a new language:

1. **Create Character Map**:
   ```typescript
   // src/utils/arabicMap.ts
   export const arabicMap: Record<string, any> = {
     "h": { ä: "ه", base: "ه", "a": "ها", ... },
     // ... more mappings
   };
   ```

2. **Add Transliteration Logic**:
   ```typescript
   // src/hooks/useTransliterateArabic.ts
   export function useTransliterateArabic(initialValue: string) {
     // Arabic-specific transliteration logic
   }
   ```

3. **Update Exports**:
   ```typescript
   // src/index.ts
   export { arabicMap } from './utils/arabicMap';
   export { useTransliterateArabic } from './hooks/useTransliterateArabic';
   ```

4. **Add Documentation** and tests

## 📋 Pull Request Guidelines

### PR Checklist

- [ ] **Tests pass**: `npm test` ✅
- [ ] **Type check**: `npm run type-check` ✅
- [ ] **Documentation updated**: New features documented
- [ ] **Examples added**: Code examples for new features
- [ ] **Breaking changes noted**: If any API changes
- [ ] **Commit messages clear**: Follow conventional commits

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] Tests pass
- [ ] Ready for review
```

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Invited to join the core team (for significant contributions)

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Discord/Slack**: Join our community chat (link coming soon)

## 📜 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors:

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Report unacceptable behavior to maintainers

---

**Thank you for contributing to Ethio-Intl! Your efforts help make Ethiopian technology more accessible to everyone. 🌍✨**
