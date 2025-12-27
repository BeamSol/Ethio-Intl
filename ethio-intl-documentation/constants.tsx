
import React from 'react';
import LiveDemo from './components/LiveDemo';
import MultiLanguageDemo from './components/MultiLanguageDemo';

export const DOC_CONTENT: Record<string, React.ReactNode> = {
  'welcome': (
    <div className="max-w-none">
      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Ethio-Intl
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          A lightweight internationalization toolkit for Ethiopian languages,
          focused on accurate Amharic transliteration and developer-friendly APIs.
        </p>
      </header>

      {/* Demo */}
      <LiveDemo />

      {/* Features */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Core features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Real-time transliteration',
              desc: 'Convert Latin input to Amharic instantly while typing.',
            },
            {
              title: 'Smart consonant–vowel logic',
              desc: 'Automatic handling of Ethiopian syllabic combinations.',
            },
            {
              title: 'Complete character coverage',
              desc: 'Supports full Amharic consonant sets and vowel forms.',
            },
            {
              title: 'Reusable React components',
              desc: 'Drop-in components designed for modern React apps.',
            },
            {
              title: 'Type-safe API',
              desc: 'Built with TypeScript for better developer experience.',
            },
            {
              title: 'Scalable architecture',
              desc: 'Clean internal structure that’s easy to extend.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Project structure
        </h2>

        <pre className="rounded-lg border border-gray-200 bg-gray-900 p-5 text-sm text-gray-100 overflow-x-auto">
          {`src/
├── transliteration/
│   ├── SmartInput.tsx
│   ├── index.ts
├── hooks/
│   └── useTransliterate.ts
├── utils/
│   └── amharicMap.ts
└── localization/`}
        </pre>
      </section>
    </div>
  ),
  'getting-started': (
    <div className="max-w-none">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Getting started
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          This guide walks you through installing Ethio-Intl and using its core
          transliteration features in your application.
        </p>
      </header>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Installation
        </h2>

        <div className="rounded-lg border border-gray-200 bg-gray-900 px-4 py-3">
          <code className="text-sm text-gray-100">
            npm install <span className="text-blue-400">ethio-intl</span>
          </code>
        </div>
      </section>

      {/* Quick start */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Quick start
        </h2>

        <p className="mb-4 text-gray-600">
          The <code className="text-gray-900 font-medium">SmartInput</code>{' '}
          component provides an out-of-the-box transliteration experience with
          minimal setup.
        </p>

        <pre className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm overflow-x-auto">
          {`import { SmartInput } from 'ethio-intl';

function MyComponent() {
  return (
    <div>
      <SmartInput
        placeholder="Type using Latin characters..."
        onChange={(latinText, amharicText) => {
          console.log('Latin:', latinText);
          console.log('Amharic:', amharicText);
        }}
      />
    </div>
  );
}`}
        </pre>
      </section>

      {/* Note */}
      <section className="max-w-2xl">
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
          <strong className="font-medium text-gray-900">Note:</strong>{' '}
          For best rendering quality, make sure the{' '}
          <code className="font-medium">Noto Sans Ethiopic</code> font is loaded in
          your global styles.
        </div>
      </section>
    </div>
  )
  ,
  'transliteration-guide': (
    <div className="max-w-none">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Transliteration system
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          Ethio-Intl uses a structured consonant–vowel mapping model to convert
          Latin input into accurate Amharic script representations.
        </p>
      </header>

      {/* Input methods */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Input methods
        </h2>

        <p className="mb-6 text-gray-600">
          The first vowel form (ä) is entered using the letter{" "}
          <code className="font-medium text-gray-900">e</code>. This provides a
          simple and consistent typing experience.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Standard input
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Use a consonant followed by <code>e</code> to produce the first form.
            </p>
            <div className="space-y-1 text-sm text-gray-700">
              <div><code>he</code> → <span className="amharic text-lg">ሀ</span></div>
              <div><code>le</code> → <span className="amharic text-lg">ለ</span></div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Extended (double vowel)
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Doubling the vowel produces the fifth form.
            </p>
            <div className="space-y-1 text-sm text-gray-700">
              <div><code>hee</code> → <span className="amharic text-lg">ሄ</span></div>
              <div><code>lee</code> → <span className="amharic text-lg">ሌ</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapping table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          First-form (ä) reference
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Input
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Amharic
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Example
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { key: 'he / h1', char: 'ሀ', ex: 'he → ሀ' },
                { key: 'le / l1', char: 'ለ', ex: 'le → ለ' },
                { key: 'me / m1', char: 'መ', ex: 'me → መ' },
                { key: 're / r1', char: 'ረ', ex: 're → ረ' },
                { key: 'se / s1', char: 'ሰ', ex: 'se → ሰ' },
                { key: 'she / sh1', char: 'ሸ', ex: 'she → ሸ' },
              ].map((row) => (
                <tr key={row.key}>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {row.key}
                  </td>
                  <td className="px-6 py-3 text-xl amharic text-gray-900">
                    {row.char}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
  ,
  'examples': (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Examples & Usage Patterns
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Below are practical examples demonstrating how <strong>Ethio-Intl</strong> can be integrated
        into real-world applications, from form handling to live UI previews.
      </p>

      <div className="space-y-14">
        {/* Example 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. Form Integration
          </h2>

          <p className="text-gray-600 mb-4">
            Use <code>SmartInput</code> inside forms to capture both Latin input and its
            corresponding Amharic transliteration. This is useful for registration forms,
            profiles, or official records that require bilingual data.
          </p>

          <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
            {`const [formData, setFormData] = React.useState({
  name: '',
  nameAmharic: ''
});

<SmartInput
  value={formData.name}
  onChange={(latin, amharic) => {
    setFormData({
      name: latin,
      nameAmharic: amharic
    });
  }}
  placeholder="Enter name in English"
/>`}
          </pre>

          <p className="mt-3 text-sm text-gray-500 italic">
            This pattern ensures you always store both representations while keeping the UI simple for users.
          </p>
        </section>

        {/* Example 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. Live Business Card Preview
          </h2>

          <p className="text-gray-600 mb-6">
            Ethio-Intl can power real-time previews for identity cards, profiles, or branding components.
            As users type, Amharic text updates instantly in the UI.
          </p>

          <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl max-w-sm mx-auto text-white amharic">
            <div className="text-3xl font-bold mb-2">ዮናስ ገብረማርያም</div>
            <div className="text-lg opacity-80 mb-4">ሲኒየር ሶፍትዌር መሐንዲስ</div>
            <div className="text-sm opacity-70 leading-relaxed">
              📞 +251 911 123 456<br />
              ✉️ yonas@example.com
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 italic">
            Example of a real-time preview component powered by Ethio-Intl transliteration.
          </p>
        </section>
      </div>
    </div>
  ),
  'multi-language': (
    <div className="max-w-none">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          🌐 Multi-language Support
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          Experience the power of modern internationalization with built-in support for
          Amharic, English, Tigrinya, and Oromo languages.
        </p>
      </header>

      {/* Live Demo */}
      <MultiLanguageDemo />

      {/* Features */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Key Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'React Context API Integration',
              desc: 'Seamlessly integrate internationalization into your React applications with the EthioProvider context.',
            },
            {
              title: 'Variable Interpolation',
              desc: 'Support for dynamic content replacement with placeholders like {count}, {name}, etc.',
            },
            {
              title: 'Namespaced Translations',
              desc: 'Organize translations by feature or page for better maintainability and scalability.',
            },
            {
              title: 'Hot Language Switching',
              desc: 'Change languages dynamically without page reloads, perfect for user preference settings.',
            },
            {
              title: 'Fallback Support',
              desc: 'Automatic fallback to default language when translations are missing.',
            },
            {
              title: 'TypeScript Support',
              desc: 'Full TypeScript integration with proper typing for better developer experience.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Examples */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Usage Examples
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Basic Setup
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { EthioProvider, useEthioIntl } from 'ethio-intl';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome!',
      greeting: 'Hello {name}!'
    }
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ!',
      greeting: 'ሰላም {name}!'
    }
  }
};

// Wrap your app
function App() {
  return (
    <EthioProvider
      resources={resources}
      defaultLanguage="am"
      fallbackLanguage="en"
    >
      <MyComponent />
    </EthioProvider>
  );
}`}
            </pre>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Using Translations in Components
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useEthioIntl();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'World' })}</p>

      <button onClick={() => changeLanguage('am')}>
        Switch to Amharic
      </button>

      <p>Current language: {currentLanguage}</p>
    </div>
  );
}`}
            </pre>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Namespaced Translations
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const resources = {
  en: {
    translation: {
      common: {
        save: 'Save',
        cancel: 'Cancel'
      },
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back!'
      }
    }
  },
  am: {
    translation: {
      common: {
        save: 'አስቀምጥ',
        cancel: 'ሰርዝ'
      },
      dashboard: {
        title: 'ዳሽቦርድ',
        welcome: 'እንኳን ደህና መጡ!'
      }
    }
  }
};

function Dashboard() {
  const { tNamespace } = useEthioIntl();

  return (
    <div>
      <h1>{tNamespace('dashboard', 'title')}</h1>
      <p>{tNamespace('dashboard', 'welcome')}</p>
      <button>{tNamespace('common', 'save')}</button>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  ),
  'contributing': (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Contributing
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Contributions are welcome from the community. Your input—whether through code, documentation, or feedback—
        helps enhance Ethiopian language support and improves reliability for developers using <strong>Ethio-Intl</strong>.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
      <pre className="bg-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
        {`# Clone the repository
git clone https://github.com/BeamSol/Ethio-Intl
cd Ethio-Intl

# Install dependencies
npm install

# Run tests
npm test

# Start development
npm run dev

# Build for production
npm run build`}
      </pre>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Project Structure</h2>
      <pre className="bg-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
        {`src/
├── examples/           # Usage examples
├── hooks/              # React hooks (useEthioIntl, useTransliterate)
├── localization/       # i18n provider and utilities
├── transliteration/    # Amharic transliteration logic
├── utils/              # Ethiopian calendar and numeral utilities
└── locales/            # Translation files (en.json, am.json, etc.)`}
      </pre>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Development Workflow</h2>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Select an Issue</strong> — Review open issues on{' '}
          <a href="https://github.com/your-org/ethio-intl/issues" className="text-blue-600 underline">
            GitHub
          </a> and comment if you plan to work on it.
        </li>
        <li>
          <strong>Create a Branch</strong>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number`}
          </pre>
        </li>
        <li>
          <strong>Implement Changes</strong> — Adhere to the existing code style, add tests, update documentation, and ensure TypeScript types are correct.
        </li>
        <li>
          <strong>Test Your Changes</strong>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`npm test
npm run type-check
npm run build
# Optional manual testing
python -m http.server 5500
# Open http://127.0.0.1:5500/demo.html`}
          </pre>
        </li>
        <li>
          <strong>Commit Your Changes</strong>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`git add .
git commit -m "feat: add new feature description"`}
          </pre>
          <p className="text-sm text-gray-600 mt-2">
            Use conventional commit prefixes: <strong>feat:</strong> new features, <strong>fix:</strong> bug fixes,
            <strong>docs:</strong> documentation, <strong>test:</strong> tests, <strong>refactor:</strong> refactoring.
          </p>
        </li>
        <li>
          <strong>Submit a Pull Request</strong> — Push your branch to GitHub, create a PR with a clear description, reference related issues, and ensure all checks pass.
        </li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Code Guidelines</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>TypeScript:</strong> Use proper types and interfaces; avoid using <code>any</code>.
        </li>
        <li>
          <strong>React:</strong> Use functional components and hooks; follow best practices.
        </li>
        <li>
          <strong>Testing:</strong> Write unit tests, maintain coverage above 80%, and handle success and error cases.
        </li>
        <li>
          <strong>Documentation:</strong> Keep README and API docs updated; include examples for new features.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Adding Languages</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Create <code>src/locales/[lang].json</code> following the existing JSON structure.</li>
        <li>Add the new language to examples and documentation.</li>
        <li>Test thoroughly with all components.</li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Adding Features</h2>
      <p className="text-gray-600 mb-4">
        When adding new i18n, transliteration, or utility features, follow these guidelines:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>i18n Features:</strong> Update <code>src/localization/EthioProvider.tsx</code>, export from <code>useEthioIntl.ts</code>,
          update types, add tests, and update documentation.
        </li>
        <li>
          <strong>Transliteration Features:</strong> Update <code>amharicMap.ts</code> and <code>useTransliterate.ts</code>, add tests.
        </li>
        <li>
          <strong>Utilities:</strong> Add new functions in <code>src/utils/</code>, export from <code>index.ts</code>, and add tests and documentation.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Reporting Bugs</h2>
      <p className="text-gray-600 mb-4">
        Use <a href="https://github.com/your-org/ethio-intl/issues" className="text-blue-600 underline">GitHub Issues</a>.
        Provide clear reproduction steps, relevant environment information, and screenshots if necessary.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Documentation</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Keep README.md and API documentation up to date.</li>
        <li>Add usage examples for new features.</li>
        <li>Maintain an up-to-date changelog.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Code of Conduct</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Be respectful and inclusive.</li>
        <li>Provide constructive feedback.</li>
        <li>Support newcomers in learning and contributing.</li>
        <li>Maintain professional communication at all times.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Getting Help</h2>
      <p className="text-gray-600 mb-4">
        Review existing issues and documentation, ask questions in GitHub Discussions, or join the community chat for assistance.
      </p>

      <p className="text-lg text-gray-600 mt-6">
        Thank you for contributing to <strong>Ethio-Intl</strong>.
      </p>
    </div>
  ),

  'api': (
    <div className="prose max-w-none">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        API Reference
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Complete API documentation for <strong>Ethio-Intl</strong> components, hooks, utilities, and localization.
      </p>

      {/* SmartInput Component */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">SmartInput Component</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Props</h3>
        <pre className="bg-gray-100 p-5 rounded-lg overflow-x-auto text-sm mb-6">
          {`interface SmartInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange?: (latinValue: string, transliteratedValue: string) => void;
  value?: string;
  transliterate?: boolean;
  placeholder?: string;
  className?: string;
  onTransliteratedChange?: (transliteratedValue: string) => void;
}`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Example Usage</h3>
        <pre className="bg-gray-50 p-5 rounded-lg overflow-x-auto text-sm">
          {`import { SmartInput } from 'ethio-intl';

<SmartInput
  placeholder="Type in English..."
  onChange={(latin, amharic) => {
    console.log('Latin:', latin);
    console.log('Amharic:', amharic);
  }}
  className="my-input"
/>`}
        </pre>
      </section>

      {/* useTransliterate Hook */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">useTransliterate Hook</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Parameters</h3>
        <pre className="bg-gray-100 p-5 rounded-lg overflow-x-auto text-sm mb-4">
          {`function useTransliterate(
  initialValue?: string,
  onTransliteratedChange?: (value: string) => void
): UseTransliterateResult`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Return Type</h3>
        <pre className="bg-gray-50 p-5 rounded-lg overflow-x-auto text-sm mb-4">
          {`interface UseTransliterateResult {
  displayValue: string;
  latinValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Example Usage</h3>
        <pre className="bg-gray-100 p-5 rounded-lg overflow-x-auto text-sm">
          {`import { useTransliterate } from 'ethio-intl';

function MyComponent() {
  const { displayValue, onChange, onKeyDown } = useTransliterate('', (amharic) => {
    console.log('Transliterated:', amharic);
  });

  return (
    <input
      value={displayValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type here..."
    />
  );
}`}
        </pre>
      </section>

      {/* Utilities */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilities & Helpers</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">amharicMap</h3>
        <p className="text-gray-600 mb-2">Mapping of English keys to Amharic characters.</p>
        <pre className="bg-gray-50 p-5 rounded-lg overflow-x-auto text-sm mb-4">
          {`import { amharicMap } from 'ethio-intl';

console.log(amharicMap.h);
// { ä: "ሀ", base: "ህ", a: "ሃ", u: "ሁ", i: "ሂ", e: "ሄ", o: "ሆ" }

console.log(amharicMap['q'].wa); // "ቋ"`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">reverseMap</h3>
        <p className="text-gray-600 mb-2">Lookup from Amharic character back to English key.</p>
        <pre className="bg-gray-100 p-5 rounded-lg overflow-x-auto text-sm mb-4">
          {`import { reverseMap } from 'ethio-intl';

console.log(reverseMap['ሁ']); // "h"
console.log(reverseMap['ባ']); // "b"`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ethiopian Numerals & Calendar</h3>
        <pre className="bg-gray-50 p-5 rounded-lg overflow-x-auto text-sm mb-4">
          {`import { toEthiopianNumerals, fromEthiopianNumerals, toEthiopianDate, fromEthiopianDate } from 'ethio-intl';

console.log(toEthiopianNumerals(2025)); // "፳፻፳፭"
console.log(fromEthiopianNumerals('፬፪'));   // 42

const ethiopian = toEthiopianDate(new Date('2025-01-15'));
// { year: 2017, month: 4, day: 7, monthName: 'Tahsas' }

const gregorian = fromEthiopianDate(2017, 4, 7); // Date object`}
        </pre>
      </section>

      {/* Localization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Localization</h2>
        <p className="text-gray-600 mb-4">
          Use <code>EthioProvider</code> and <code>useEthioIntl</code> to manage languages.
        </p>
        <pre className="bg-gray-100 p-5 rounded-lg overflow-x-auto text-sm">
          {`import { EthioProvider, useEthioIntl } from 'ethio-intl';

function App() {
  return (
    <EthioProvider language="am">
      <MyComponent />
    </EthioProvider>
  );
}

function MyComponent() {
  const { t, language } = useEthioIntl();
  return <p>{t('welcome')} — Current language: {language}</p>;
}`}
        </pre>
      </section>
    </div>
  ),
};
