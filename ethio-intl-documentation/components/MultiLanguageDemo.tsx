import React, { useState } from "react";

const MultiLanguageDemo: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Translation data matching the demo.html structure
  const translations = {
    en: {
      translation: {
        welcome: 'Welcome to Ethio-Intl!',
        description: 'Experience the power of modern Amharic localization',
        userCount: 'We have {count} users',
        namespaced: {
          header: 'Advanced Features',
          subtitle: 'Multi-language support made simple'
        }
      }
    },
    am: {
      translation: {
        welcome: 'እንኳን ደህና መጡ ወደ ኢትዮ-ኢንትል!',
        description: 'የአሁኑ የአማርኛ አካባቢ መጠቅለያ ኃይል ለምስራቅ',
        userCount: '{count} ተጠቃሚዎች አሉን',
        namespaced: {
          header: 'የላቀ ባህሪያት',
          subtitle: 'የተለያዩ ቋንቋዎች ድጋፍ ቀላል ተደርጓል'
        }
      }
    },
    ti: {
      translation: {
        welcome: 'ቅድም ኣብ ሓቅ መጻእኩም ናብ ኢትዮ-ኢንትል!',
        description: 'ሓይሊ የተለመደ ትግርኛ አካባቢ መጠቅለያ ኃይል',
        userCount: '{count} ተጠቃሚታት ኣለውን',
        namespaced: {
          header: 'እተያየደ ባህርያት',
          subtitle: 'የተለያዩ ቋንቋዎች ድጋፍ ቀላል ተደርጓል'
        }
      }
    },
    om: {
      translation: {
        welcome: 'Baga Nagaan Dhufte Ethio-Intl!',
        description: 'Amaaraa ammee haaraa humna bifa',
        userCount: '{count} fayyadamaa qabna',
        namespaced: {
          header: 'Amaloota Olaanaa',
          subtitle: 'Deeggarsa afaan hedduu salphaa godhameera'
        }
      }
    }
  };

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  // Get current translations with interpolation
  const getCurrentTranslations = () => {
    const current = translations[currentLanguage as keyof typeof translations].translation;
    return {
      welcome: current.welcome,
      description: current.description,
      userCount: current.userCount.replace('{count}', '1,234'),
      advancedHeader: current.namespaced.header,
      advancedSubtitle: current.namespaced.subtitle
    };
  };

  const currentTexts = getCurrentTranslations();

  const languages = [
    { code: 'en', label: '🇺🇸 English', name: 'English' },
    { code: 'am', label: '🇪🇹 አማርኛ', name: 'አማርኛ' },
    { code: 'ti', label: '🇪🇷 ትግርኛ', name: 'ትግርኛ' },
    { code: 'om', label: '🇪🇹 ኦሮሚኛ', name: 'ኦሮሚኛ' }
  ];

  return (
    <section className="my-10 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          🌐 Multi-language Support Demo
        </h3>
        <span className="text-xs font-medium text-gray-500">
          Interactive language switching
        </span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Language Buttons */}
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                currentLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {lang.label} {lang.name}
            </button>
          ))}
        </div>

        {/* Translation Display */}
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Message:
            </label>
            <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-lg font-medium text-gray-900 amharic">
              {currentTexts.welcome}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description:
            </label>
            <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 amharic">
              {currentTexts.description}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Count (with interpolation):
            </label>
            <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 amharic">
              {currentTexts.userCount}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advanced Features:
              </label>
              <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 amharic">
                {currentTexts.advancedHeader}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle:
              </label>
              <div className="min-h-[2.5rem] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 amharic">
                {currentTexts.advancedSubtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400">💡</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Variable Interpolation:</strong> Notice how <code className="font-mono text-blue-800">{`{count}`}</code> gets replaced with "1,234" automatically. Namespaced translations allow organizing translations by feature/page.
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="rounded-lg border border-gray-200 bg-gray-900 p-4">
          <h4 className="text-sm font-semibold text-gray-100 mb-3">
            React Context API Integration
          </h4>
          <pre className="text-xs text-gray-100 overflow-x-auto">
{`// 1. Set up translations
const translations = {
  en: {
    translation: {
      welcome: 'Welcome to Ethio-Intl!',
      userCount: 'We have {count} users',
      namespaced: { header: 'Advanced Features' }
    }
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ ወደ ኢትዮ-ኢንትል!',
      userCount: '{count} ተጠቃሚዎች አሉን',
      namespaced: { header: 'የላቀ ባህሪያት' }
    }
  }
};

// 2. Wrap your app
function App() {
  return (
    <EthioProvider
      resources={translations}
      defaultLanguage="am"
      fallbackLanguage="en"
    >
      <YourComponents />
    </EthioProvider>
  );
}

// 3. Use in components
function MyComponent() {
  const { t, tNamespace, changeLanguage, currentLanguage } = useEthioIntl();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('userCount', { count: '1,234' })}</p>
      <p>{tNamespace('namespaced', 'header')}</p>

      <button onClick={() => changeLanguage('am')}>
        Switch to Amharic
      </button>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default MultiLanguageDemo;
