# Tests

This directory contains all test files for the Ethio-Intl library.

## Structure

- `utils/` - Tests for utility functions (date, numbers, numerals)
- `transliteration/` - Tests for Amharic transliteration functionality
- `localization/` - Tests for internationalization features
- `integration.test.ts` - Integration tests that test end-to-end functionality
- `manual/` - Manual testing and debugging scripts

## Running Tests

```bash
npm test
```

## Test Coverage

The tests cover:
- Ethiopian calendar date conversion
- Geez numeral conversion
- Amharic transliteration
- Internationalization functionality
- Integration tests

## Adding New Tests

- Place unit tests in the appropriate subdirectory
- Use `.test.ts` or `.spec.ts` naming convention
- Follow existing patterns for consistency
