import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EthioIntlConfig, EthioIntlContextValue, Language } from './types';

// Default translations
const defaultResources = {
  en: {
    translation: {
      welcome: 'Welcome',
      hello: 'Hello',
      goodbye: 'Goodbye',
      loading: 'Loading...',
    },
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ',
      hello: 'ሰላም',
      goodbye: 'ያቀር',
      loading: 'በመስቀል ላይ...',
    },
  },
  om: {
    translation: {
      welcome: 'Baga nagaan dhuftan',
      hello: 'Akkam',
      goodbye: 'Nagaatti',
      loading: 'Fe\'amuu keessatti...',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      hello: 'Bonjour',
      goodbye: 'Au revoir',
      loading: 'Chargement...',
    },
  },
  ti: {
    translation: {
      welcome: 'ቅድም ኣብ ሓቅ መጻእኩም',
      hello: 'ሰላም',
      goodbye: 'ኩን ኣስተሓሓለይ',
      loading: 'በመስቀል ላይ...',
    },
  },
  so: {
    translation: {
      welcome: 'Soo dhowow',
      hello: 'Salaam',
      goodbye: 'Nabad gelyo',
      loading: 'Soo dejinaya...',
    },
  },
};

const EthioIntlContext = createContext<EthioIntlContextValue | null>(null);

interface EthioProviderProps {
  children: React.ReactNode;
  config?: EthioIntlConfig;
}

export const EthioProvider: React.FC<EthioProviderProps> = ({
  children,
  config = {},
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    defaultLanguage = 'en',
    fallbackLanguage = 'en',
    supportedLanguages = ['en', 'am', 'om', 'fr', 'ti', 'so'],
    resources = defaultResources,
  } = config;

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: defaultLanguage,
        fallbackLng: fallbackLanguage,
        supportedLngs: supportedLanguages,
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      })
      .then(() => {
        setIsInitialized(true);
      });
  }, [defaultLanguage, fallbackLanguage, supportedLanguages, resources]);

  if (!isInitialized) {
    return <div>Loading Ethio-Intl...</div>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <EthioProviderInner config={config}>
        {children}
      </EthioProviderInner>
    </I18nextProvider>
  );
};

const EthioProviderInner: React.FC<{ children: React.ReactNode; config: EthioIntlConfig }> = ({
  children,
  config,
}) => {
  const { i18n: i18nInstance } = useTranslation();
  const [language, setLanguage] = useState<Language>(config.defaultLanguage || 'en');

  const changeLanguage = (lang: Language) => {
    i18nInstance.changeLanguage(lang);
    setLanguage(lang);
  };

  const contextValue: EthioIntlContextValue = {
    language,
    changeLanguage,
    t: i18nInstance.t,
    isLoading: i18nInstance.isInitializing,
  };

  return (
    <EthioIntlContext.Provider value={contextValue}>
      {children}
    </EthioIntlContext.Provider>
  );
};

export const useEthioIntl = (): EthioIntlContextValue => {
  const context = useContext(EthioIntlContext);
  if (!context) {
    throw new Error('useEthioIntl must be used within an EthioProvider');
  }
  return context;
};

