import React from 'react';
import { EthioProvider, useEthioIntl } from '../localization';

// Define simple dummy translation objects
const translationResources = {
  en: {
    translation: {
      welcome: 'Welcome to Ethio-Intl!',
      description: 'This demo shows our simplified localization wrapper.',
      button: 'Switch to Amharic',
      current: 'Current Language',
    },
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ ወደ ኢትዮ-ኢንትል!',
      description: 'ይህ ዲሞ ቀላል የሆነውን የአካባቢ መጠቅለያ መጠቅለያ ያሳያል።',
      button: 'ወደ እንግሊዝኛ ቀይር',
      current: 'አሁን ያለ ቋንቋ',
    },
  },
};

// Component that uses the hook
const DemoContent: React.FC = () => {
  const { t, currentLang, changeLanguage, supportedLangs } = useEthioIntl();

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'am' : 'en';
    changeLanguage(nextLang);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>

      <div style={{ margin: '20px 0' }}>
        <strong>{t('current')}:</strong> {currentLang.toUpperCase()}
      </div>

      <div style={{ margin: '20px 0' }}>
        <strong>Supported Languages:</strong> {supportedLangs.join(', ')}
      </div>

      <button
        onClick={toggleLanguage}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {t('button')}
      </button>
    </div>
  );
};

// Main demo component that wraps everything
const WrapperDemo: React.FC = () => {
  return (
    <EthioProvider
      resources={translationResources}
      defaultLang="en"
      fallbackLang="en"
    >
      <DemoContent />
    </EthioProvider>
  );
};

export default WrapperDemo;
