# Translation Files

This directory contains translation files for different languages supported by Ethio-Intl.

## Structure

```
locales/
├── en.json      # English translations
├── am.json      # Amharic translations
└── [lang].json  # Add more languages as needed
```

## Format

Each translation file should follow this structure:

```json
{
  "translation": {
    "key": "Translated text",
    "nested": {
      "key": "Nested translation"
    }
  },
  "namespace": {
    "key": "Namespaced translation"
  }
}
```

## Usage

### Basic Translations
```tsx
const { t } = useEthioIntl();
return <h1>{t('welcome')}</h1>;
```

### Namespaced Translations
```tsx
const { tNamespace } = useEthioIntl();
return <p>{tNamespace('auth', 'login')}</p>;
```

## Adding Languages

1. Create a new JSON file: `src/locales/[lang].json`
2. Add the language code to your EthioProvider resources
3. The language will be automatically available

## Best Practices

- Use lowercase language codes (en, am, ti, om)
- Keep keys descriptive and consistent
- Use namespaces for feature-specific translations
- Support both singular and plural forms when needed
- Include placeholders for dynamic content: `"Hello {name}!"`
