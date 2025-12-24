/**
 * Basic Usage Example - Simple Ethio-Intl Implementation
 *
 * This example shows the basic usage pattern for most applications.
 */

import React from 'react';
import { EthioProvider, useEthioIntl } from '../index';

// Basic translations for a simple app
const translations = {
  en: {
    translation: {
      welcome: 'Welcome to our app!',
      greeting: 'Hello {name}!',
      login: 'Login',
      logout: 'Logout'
    }
  },
  am: {
    translation: {
      welcome: 'እንኳን ደህና መጡ ወደ መተግበሪያችን!',
      greeting: 'ሰላም {name}!',
      login: 'ግባ',
      logout: 'ውጣ'
    }
  }
};

function App() {
  return (
    <EthioProvider resources={translations}>
      <MainApp />
    </EthioProvider>
  );
}

function MainApp() {
  const { t, currentLang, changeLanguage, supportedLangs } = useEthioIntl();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'Developer' })}</p>

      {/* Language Switcher */}
      <div style={{ margin: '20px 0' }}>
        <label>Choose Language: </label>
        <select
          value={currentLang}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px' }}
        >
          {supportedLangs.map(lang => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {t('login')}
        </button>
        <button style={{
          padding: '10px 20px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {t('logout')}
        </button>
      </div>
    </div>
  );
}

export default App;
