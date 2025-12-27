/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, act } from '@testing-library/react';
import { EthioProvider, EthioIntlContext } from '../src/localization/EthioProvider';

const resources = {
  am: {
    translation: {
      hello: 'ሰላም',
      welcome: 'እንኳን ደህና መጣህ {name}'
      // 'submit' is missing here
    }
  },
  en: {
    translation: {
      hello: 'Hello',
      welcome: 'Welcome, {name}',
      submit: 'Submit' // Moved into translation to match Provider logic
    }
  }
};

describe('EthioProvider', () => {
  beforeEach(() => {
    // Clear storage and mock navigator to ensure it uses defaultLang ('am')
    localStorage.clear();
    Object.defineProperty(window.navigator, 'language', {
      value: 'am',
      configurable: true
    });
  });

  test('provides default language and resources', () => {
    let contextValue: any;
    render(
      <EthioProvider resources={resources} defaultLang="am">
        <EthioIntlContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EthioIntlContext.Consumer>
      </EthioProvider>
    );

    expect(contextValue.currentLang).toBe('am');
    expect(contextValue.resources).toEqual(resources);
  });

  test('t function returns correct translations', () => {
    let contextValue: any;
    const { rerender } = render(
      <EthioProvider resources={resources} defaultLang="am">
        <EthioIntlContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EthioIntlContext.Consumer>
      </EthioProvider>
    );

    // Should be Amharic now because we mocked navigator.language
    expect(contextValue.t('hello')).toBe('ሰላም'); 

    act(() => {
      contextValue.changeLanguage('en');
    });

    rerender(
      <EthioProvider resources={resources} defaultLang="am">
        <EthioIntlContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EthioIntlContext.Consumer>
      </EthioProvider>
    );

    expect(contextValue.t('hello')).toBe('Hello');
  });

  test('getMissingKeys returns missing keys from translation block', () => {
    let contextValue: any;
    render(
      <EthioProvider resources={resources} defaultLang="am" fallbackLang="en">
        <EthioIntlContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EthioIntlContext.Consumer>
      </EthioProvider>
    );

    const missing = contextValue.getMissingKeys('am'); 
    // Matches the Provider's current logic of checking the 'translation' key
    expect(missing).toContain('submit'); 
  });
});