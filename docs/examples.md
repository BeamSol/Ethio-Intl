# Examples

Comprehensive examples showing how to use Ethio-Intl in various scenarios.

## 🎯 Basic Examples

### Simple Input Field

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function BasicExample() {
  const [amharicText, setAmharicText] = React.useState('');

  return (
    <div>
      <h3>Amharic Input</h3>
      <SmartInput
        placeholder="Type in English..."
        onChange={(latin, amharic) => {
          setAmharicText(amharic);
        }}
      />
      <p>Amharic: <strong>{amharicText}</strong></p>
    </div>
  );
}
```

### Controlled Component

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function ControlledExample() {
  const [input, setInput] = React.useState({
    english: '',
    amharic: ''
  });

  return (
    <div>
      <SmartInput
        value={input.english}
        onChange={(english, amharic) => {
          setInput({ english, amharic });
        }}
        placeholder="Controlled input"
      />

      <div style={{ marginTop: '20px' }}>
        <div>English: {input.english}</div>
        <div>Amharic: <span style={{ fontSize: '24px' }}>{input.amharic}</span></div>
      </div>
    </div>
  );
}
```

## 📝 Form Integration

### Contact Form

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function ContactForm() {
  const [formData, setFormData] = React.useState({
    firstName: { en: '', am: '' },
    lastName: { en: '', am: '' },
    message: { en: '', am: '' }
  });

  const updateField = (field: string) => (english: string, amharic: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: { en: english, am: amharic }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // Submit both English and Amharic versions
    const submission = {
      firstName: formData.firstName.am,
      lastName: formData.lastName.am,
      message: formData.message.am,
      // Keep English for reference
      firstNameEn: formData.firstName.en,
      lastNameEn: formData.lastName.en,
      messageEn: formData.message.en
    };

    // Submit to server...
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <SmartInput
          placeholder="Enter first name"
          onChange={updateField('firstName')}
          required
        />
        <small>Amharic: {formData.firstName.am}</small>
      </div>

      <div>
        <label>Last Name:</label>
        <SmartInput
          placeholder="Enter last name"
          onChange={updateField('lastName')}
          required
        />
        <small>Amharic: {formData.lastName.am}</small>
      </div>

      <div>
        <label>Message:</label>
        <SmartInput
          placeholder="Enter your message"
          onChange={updateField('message')}
          required
        />
        <small>Amharic: {formData.message.am}</small>
      </div>

      <button type="submit">Submit in Amharic</button>
    </form>
  );
}
```

### Multi-language Form

```tsx
import React from 'react';
import { SmartInput, EthioProvider, useEthioIntl } from 'ethio-intl';

function MultiLanguageForm() {
  const [data, setData] = React.useState({
    name: { en: '', am: '' },
    description: { en: '', am: '' }
  });

  return (
    <EthioProvider language="am">
      <form>
        <div>
          <label>Name:</label>
          <SmartInput
            placeholder="Enter name"
            onChange={(en, am) => {
              setData(prev => ({
                ...prev,
                name: { en, am }
              }));
            }}
          />
        </div>

        <div>
          <label>Description:</label>
          <SmartInput
            placeholder="Enter description"
            onChange={(en, am) => {
              setData(prev => ({
                ...prev,
                description: { en, am }
              }));
            }}
          />
        </div>

        <div>
          <h4>Preview:</h4>
          <p>Name: {data.name.am}</p>
          <p>Description: {data.description.am}</p>
        </div>
      </form>
    </EthioProvider>
  );
}
```

## 🔄 Advanced Hook Usage

### Custom Transliteration Hook

```tsx
import { useTransliterate } from 'ethio-intl';
import React from 'react';

function CustomInput() {
  const {
    displayValue,
    latinValue,
    onChange,
    onKeyDown
  } = useTransliterate('', (transliterated) => {
    console.log('New transliteration:', transliterated);
  });

  return (
    <div>
      <input
        type="text"
        value={displayValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type in Amharic..."
        style={{
          fontSize: '24px',
          fontFamily: 'Noto Sans Ethiopic, serif',
          padding: '10px',
          width: '300px'
        }}
      />

      <div style={{ marginTop: '10px', color: '#666' }}>
        Latin: {latinValue}
      </div>
    </div>
  );
}
```

### Real-time Preview

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function LivePreview() {
  const [preview, setPreview] = React.useState({
    current: '',
    previous: ''
  });

  return (
    <div>
      <SmartInput
        placeholder="Type to see live preview..."
        onChange={(latin, amharic) => {
          setPreview({
            current: amharic,
            previous: preview.current
          });
        }}
      />

      <div style={{ marginTop: '20px' }}>
        <div>Current: <strong>{preview.current}</strong></div>
        <div style={{ color: '#888' }}>
          Previous: {preview.previous || 'None'}
        </div>
      </div>
    </div>
  );
}
```

## 🎨 Styled Components

### Beautiful Amharic Input

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function StyledInput() {
  return (
    <div className="amharic-form">
      <SmartInput
        placeholder="እንኳን ደህና መጡ..."
        className="beautiful-input"
        onChange={(latin, amharic) => {
          console.log('Transliterated:', amharic);
        }}
      />

      <style jsx>{`
        .amharic-form {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }

        .beautiful-input {
          font-family: 'Noto Sans Ethiopic', serif;
          font-size: 24px;
          padding: 15px;
          border: 3px solid #007bff;
          border-radius: 10px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .beautiful-input:focus {
          outline: none;
          border-color: #0056b3;
          box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
          transform: scale(1.02);
        }

        .beautiful-input::placeholder {
          color: #adb5bd;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
```

### Card Layout

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function CardInput() {
  const [values, setValues] = React.useState({
    greeting: '',
    name: '',
    message: ''
  });

  const updateValue = (field: string) => (latin: string, amharic: string) => {
    setValues(prev => ({ ...prev, [field]: amharic }));
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3>Greeting Card</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Greeting:</label>
          <SmartInput
            placeholder="Happy Birthday"
            onChange={updateValue('greeting')}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <SmartInput
            placeholder="Enter name"
            onChange={updateValue('name')}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <SmartInput
            placeholder="Your message here"
            onChange={updateValue('message')}
          />
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '5px',
          fontSize: '18px',
          fontFamily: 'Noto Sans Ethiopic, serif'
        }}>
          <div>{values.greeting}</div>
          <div>{values.name}</div>
          <div>{values.message}</div>
        </div>
      </div>
    </div>
  );
}
```

## 🔧 Low-Level API Usage

### Direct Character Mapping

```typescript
import { amharicMap, reverseMap } from 'ethio-intl';

// Direct character lookup
console.log('h + u =', amharicMap.h.u); // ሁ
console.log('b + a =', amharicMap.b.a); // ባ

// Reverse lookup
console.log('What consonant makes ሰ?', reverseMap['ሰ']); // 's'

// Check if character exists
const isAmharicConsonant = (char: string): boolean => {
  return reverseMap[char] !== undefined;
};

console.log(isAmharicConsonant('ሀ')); // true
console.log(isAmharicConsonant('x')); // false
```

### Custom Transliteration Function

```typescript
import { amharicMap, reverseMap } from 'ethio-intl';

function customTransliterate(input: string): string {
  let result = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i].toLowerCase();

    // Handle consonant + vowel combinations
    if (result.length > 0 && ['a', 'e', 'i', 'o', 'u'].includes(char)) {
      const lastChar = result[result.length - 1];
      const consonantKey = reverseMap[lastChar];

      if (consonantKey && amharicMap[consonantKey]?.[char]) {
        result = result.slice(0, -1) + amharicMap[consonantKey][char];
        i++;
        continue;
      }
    }

    // Handle ä combinations (special case)
    if (result.length > 0 && char === 'ä') {
      const lastChar = result[result.length - 1];
      const consonantKey = reverseMap[lastChar];

      if (consonantKey && amharicMap[consonantKey]?.ä) {
        result = result.slice(0, -1) + amharicMap[consonantKey].ä;
        i++;
        continue;
      }
    }

    // Default character mapping
    const mapped = amharicMap[char]?.base || char;
    result += mapped;
    i++;
  }

  return result;
}

// Usage
console.log(customTransliterate('selam')); // ሰላም
console.log(customTransliterate('hu'));    // ሁ
```

## 🌐 Integration with Other Libraries

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { SmartInput } from 'ethio-intl';

function ReactHookFormExample() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <SmartInput
              placeholder="Enter your name"
              onChange={(latin, amharic) => {
                field.onChange(amharic); // Store Amharic version
              }}
            />
          )}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...control.register('email')}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label>Message:</label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <SmartInput
              placeholder="Enter your message"
              onChange={(latin, amharic) => {
                field.onChange(amharic);
              }}
            />
          )}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Form, Field } from 'formik';
import { SmartInput } from 'ethio-intl';

function FormikExample() {
  return (
    <Formik
      initialValues={{
        name: '',
        message: ''
      }}
      onSubmit={(values) => {
        console.log('Submitted:', values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label>Name:</label>
            <SmartInput
              placeholder="Enter name"
              onChange={(latin, amharic) => {
                setFieldValue('name', amharic);
              }}
            />
          </div>

          <div>
            <label>Message:</label>
            <SmartInput
              placeholder="Enter message"
              onChange={(latin, amharic) => {
                setFieldValue('message', amharic);
              }}
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

## 📱 Mobile-Friendly Examples

### Touch-Optimized Input

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function MobileInput() {
  return (
    <div style={{ padding: '20px' }}>
      <SmartInput
        placeholder="Touch to type Amharic..."
        style={{
          fontSize: '24px',
          padding: '20px',
          border: '3px solid #007bff',
          borderRadius: '10px',
          width: '100%',
          fontFamily: 'Noto Sans Ethiopic, serif'
        }}
        onChange={(latin, amharic) => {
          // Handle mobile input
          console.log('Mobile input:', { latin, amharic });
        }}
      />

      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '18px',
        textAlign: 'center'
      }}>
        💡 Tip: Type English letters on mobile - they become Amharic automatically!
      </div>
    </div>
  );
}
```

## 🎯 Real-World Applications

### Ethiopian Business Card Creator

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

function BusinessCardCreator() {
  const [card, setCard] = React.useState({
    name: { en: '', am: '' },
    title: { en: '', am: '' },
    company: { en: '', am: '' },
    phone: '',
    email: ''
  });

  const updateField = (field: string) => (en: string, am: string) => {
    setCard(prev => ({
      ...prev,
      [field]: { en, am }
    }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>Ethiopian Business Card Creator</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Form */}
        <div>
          <h3>Enter Information (in English)</h3>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
            <SmartInput
              placeholder="Enter full name"
              onChange={updateField('name')}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Job Title:</label>
            <SmartInput
              placeholder="Enter job title"
              onChange={updateField('title')}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Company:</label>
            <SmartInput
              placeholder="Enter company name"
              onChange={updateField('company')}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
            <input
              type="tel"
              placeholder="+251..."
              value={card.phone}
              onChange={(e) => setCard(prev => ({ ...prev, phone: e.target.value }))}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              placeholder="email@company.com"
              value={card.email}
              onChange={(e) => setCard(prev => ({ ...prev, email: e.target.value }))}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3>Business Card Preview</h3>

          <div style={{
            width: '350px',
            height: '200px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            padding: '20px',
            color: 'white',
            fontFamily: 'Noto Sans Ethiopic, serif',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
              {card.name.am || 'ስም'}
            </div>

            <div style={{ fontSize: '18px', marginBottom: '5px' }}>
              {card.title.am || 'ሥራ መያዣ'}
            </div>

            <div style={{ fontSize: '16px', marginBottom: '15px' }}>
              {card.company.am || 'ኩባንያ'}
            </div>

            <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
              <div>📞 {card.phone || '+251...'}</div>
              <div>✉️ {card.email || 'email@company.com'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🌐 Localization Wrapper Examples

### Basic Language Switching

```tsx
import React from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';

const translations = {
  en: { translation: { hello: 'Hello', goodbye: 'Goodbye' } },
  am: { translation: { hello: 'ሰላም', goodbye: 'ያቀር' } },
  fr: { translation: { hello: 'Bonjour', goodbye: 'Au revoir' } }
};

function LanguageSwitcher() {
  const { t, currentLang, changeLanguage, supportedLangs } = useEthioIntl();

  return (
    <div>
      <h1>{t('hello')}</h1>

      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {supportedLangs.map(lang => (
          <option key={lang} value={lang}>{lang.toUpperCase()}</option>
        ))}
      </select>

      <button onClick={() => changeLanguage('am')}>
        {t('goodbye')} in Amharic
      </button>
    </div>
  );
}

// Wrap your app
function App() {
  return (
    <EthioProvider resources={translations} defaultLang="en">
      <LanguageSwitcher />
    </EthioProvider>
  );
}
```

### Multi-language Form

```tsx
import React from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';

const formTranslations = {
  en: {
    translation: {
      name: 'Name',
      email: 'Email',
      submit: 'Submit'
    }
  },
  am: {
    translation: {
      name: 'ስም',
      email: 'ኢሜይል',
      submit: 'ላክ'
    }
  }
};

function ContactForm() {
  const { t } = useEthioIntl();

  return (
    <form>
      <div>
        <label>{t('name')}:</label>
        <input type="text" placeholder={t('name')} />
      </div>

      <div>
        <label>{t('email')}:</label>
        <input type="email" placeholder={t('email')} />
      </div>

      <button type="submit">{t('submit')}</button>
    </form>
  );
}

// Usage
function App() {
  return (
    <EthioProvider resources={formTranslations}>
      <ContactForm />
    </EthioProvider>
  );
}
```

### Dynamic Content Loading

```tsx
import React, { useEffect, useState } from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';

function NewsFeed() {
  const { t, currentLang } = useEthioIntl();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Load articles based on current language
    fetch(`/api/articles?lang=${currentLang}`)
      .then(res => res.json())
      .then(setArticles);
  }, [currentLang]);

  return (
    <div>
      <h1>{t('news')}</h1>
      {articles.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  );
}
```

---

For more advanced examples and integration patterns, check out our [GitHub repository](https://github.com/your-org/ethio-intl) or create an issue for specific use cases!
