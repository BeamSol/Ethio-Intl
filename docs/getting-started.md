# Getting Started with Ethio-Intl

Welcome to Ethio-Intl! This guide will help you get started with our Amharic transliteration system.

## 📦 Installation

```bash
npm install ethio-intl
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { SmartInput } from 'ethio-intl';

function MyComponent() {
  return (
    <div>
      <h3>Type in English, get Amharic!</h3>
      <SmartInput
        placeholder="Try typing 'selam'..."
        onChange={(latinText, amharicText) => {
          console.log('Latin:', latinText);
          console.log('Amharic:', amharicText);
        }}
      />
    </div>
  );
}
```

### Real-time Demo

Open `demo.html` in your browser to see the transliteration in action!

## 🔧 Basic Setup

### React Application

```tsx
import React from 'react';
import { SmartInput } from 'ethio-intl';

export default function App() {
  const [amharicText, setAmharicText] = React.useState('');

  return (
    <div className="app">
      <h1>እንኳን ደህና መጡ! (Welcome!)</h1>

      <SmartInput
        value=""
        onChange={(latin, amharic) => {
          setAmharicText(amharic);
        }}
        placeholder="Type in English..."
        className="amharic-input"
      />

      <div className="output">
        <strong>Amharic Output:</strong> {amharicText}
      </div>
    </div>
  );
}
```

### HTML with JavaScript

```html
<!DOCTYPE html>
<html lang="am">
<head>
    <meta charset="UTF-8">
    <title>Amharic Input</title>
    <style>
        .amharic-input { font-size: 18px; padding: 10px; }
        .output { margin-top: 20px; font-family: 'Noto Sans Ethiopic', serif; }
    </style>
</head>
<body>
    <h1>Amharic Transliteration</h1>

    <input
        type="text"
        id="amharic-input"
        class="amharic-input"
        placeholder="Type English letters..."
    />

    <div class="output" id="output">
        Amharic text will appear here...
    </div>

    <script type="module">
        // Import the transliteration logic
        import { amharicMap, reverseMap } from './path/to/amharicMap.js';

        // Simple transliteration function
        function transliterate(input) {
            let result = '';
            let i = 0;

            while (i < input.length) {
                const char = input[i].toLowerCase();

                if (result.length > 0 && ['a', 'e', 'i', 'o', 'u'].includes(char)) {
                    const lastChar = result[result.length - 1];
                    const consonantKey = reverseMap[lastChar];

                    if (consonantKey && amharicMap[consonantKey] && amharicMap[consonantKey][char]) {
                        result = result.slice(0, -1) + amharicMap[consonantKey][char];
                        i++;
                        continue;
                    }
                }

                const transliteration = amharicMap[char]?.base || char;
                result += transliteration;
                i++;
            }

            return result;
        }

        // Set up event listener
        document.getElementById('amharic-input').addEventListener('input', function(e) {
            const output = document.getElementById('output');
            output.textContent = transliterate(e.target.value);
        });
    </script>
</body>
</html>
```

## 🎯 What You Can Do

### Try These Examples:

#### Basic Words
- `selam` → `ሰላም` (Hello)
- `hu` → `ሁ` (he - masculine)
- `ne` → `ነ` (she - feminine)
- `dehna` → `ደህና` (thank you)
- `ba` → `ባ` (in/with)

#### First Form (ä) Examples (Multiple Easy Methods!)
- `he` → `ሀ` (**EASIEST!** - single 'e' = ä form)
- `hee` → `ሄ` (double 'e' = regular e form)
- `le` → `ለ` (single 'e' = ä form)
- `lee` → `ሌ` (double 'e' = regular e form)
- `me` → `መ` (single 'e' = ä form)
- `mee` → `ሜ` (double 'e' = regular e form)
- `hä` → `ሀ` (traditional ä key)
- `h1` → `ሀ` (using number 1)

#### How to Type ä
- **Windows**: Alt + 0228 (hold Alt, type 0228)
- **Mac**: Option + u, then a
- **Linux**: Compose + " + a
- **HTML**: `&auml;` or `&#228;`
- **Unicode**: U+00E4

### Supported Characters:

- **Consonants**: h, l, m, r, s, b, t, n, k, w, z, y, d, j, g, f, p, q, x, c, ch, sh, v, and more
- **Vowels**: a, e, i, o, u (automatically combine with consonants)
- **Special forms**: wa, w variations for complex syllables

## 🔧 Advanced Usage

### With Form Validation

```tsx
import { SmartInput } from 'ethio-intl';

function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    nameAmharic: '',
    message: '',
    messageAmharic: ''
  });

  return (
    <form>
      <div>
        <label>Name (English):</label>
        <SmartInput
          value={formData.name}
          onChange={(latin, amharic) => {
            setFormData(prev => ({
              ...prev,
              name: latin,
              nameAmharic: amharic
            }));
          }}
          placeholder="Enter name in English"
        />
        <div>Amharic: {formData.nameAmharic}</div>
      </div>

      <div>
        <label>Message (English):</label>
        <SmartInput
          value={formData.message}
          onChange={(latin, amharic) => {
            setFormData(prev => ({
              ...prev,
              message: latin,
              messageAmharic: amharic
            }));
          }}
          placeholder="Enter message in English"
        />
        <div>Amharic: {formData.messageAmharic}</div>
      </div>
    </form>
  );
}
```

## 🎨 Styling

### CSS Classes

```css
/* Default styling */
.ethio-smart-input {
  font-family: 'Noto Sans Ethiopic', serif;
}

.ethio-smart-input__field {
  border: 2px solid #007bff;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
}

.ethio-smart-input__preview {
  margin-top: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 18px;
}
```

## 🚨 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Mobile**: iOS Safari 11+, Chrome Mobile 60+
- **Unicode Support**: Required for Amharic character display

## 🐛 Troubleshooting

### Characters not displaying?
Make sure your system has Amharic fonts installed:
- **Windows**: Install "Ethiopic Extended" fonts
- **macOS**: Built-in Unicode support
- **Linux**: Install `fonts-ethiopic` package

### Input not working?
- Ensure you're using a modern browser
- Check that JavaScript is enabled
- Verify the component is properly imported

## 📚 Next Steps

- Read the [Transliteration Guide](./transliteration.md) for technical details
- Check out [Examples](./examples.md) for more use cases
- Explore the [API Reference](./api-reference.md) for advanced usage

---

**Need help?** Check our [GitHub Issues](https://github.com/your-org/ethio-intl/issues) or create a new issue!
