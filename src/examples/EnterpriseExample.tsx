/**
 * EnterpriseExample.tsx - Complete example for large-scale Ethio-Intl usage
 *
 * This example demonstrates:
 * - Dynamic translation loading
 * - Namespace-based organization
 * - Route-based lazy loading
 * - Development tools integration
 * - Hot reload support
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { EthioProvider, useEthioIntl } from 'ethio-intl';

// Lazy load page components
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

// Initial minimal translations (common + navigation)
const initialTranslations = {
  en: {
    translation: {
      common: {
        loading: "Loading...",
        error: "Error loading page",
        nav: {
          dashboard: "Dashboard",
          users: "Users",
          products: "Products"
        }
      }
    }
  },
  am: {
    translation: {
      common: {
        loading: "በመስቀል ላይ...",
        error: "ገጽ በመስቀል ላይ ስህተት ተለለየበት",
        nav: {
          dashboard: "ዳሽቦርድ",
          users: "ተጠቃሚዎች",
          products: "ምርቶች"
        }
      }
    }
  }
};

// Main App Component
function App() {
  return (
    <EthioProvider
      resources={initialTranslations}
      defaultLang="am"
      fallbackLang="en"
    >
      <AppContent />
    </EthioProvider>
  );
}

// App Content with routing simulation
function AppContent() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const { t, loadNamespace, unloadNamespace, preloadLanguages, isDevelopment, enableHotReload } = useEthioIntl();

  // Preload common languages on mount
  useEffect(() => {
    preloadLanguages(['en', 'am']).catch(console.error);
  }, [preloadLanguages]);

  // Enable hot reload in development
  useEffect(() => {
    if (isDevelopment) {
      enableHotReload((lang, translations) => {
        console.log(`🔄 Hot reloaded ${lang} translations`, translations);
      });
    }
  }, [isDevelopment, enableHotReload]);

  // Load page-specific translations when navigating
  const loadPageTranslations = async (page: string) => {
    try {
      // Dynamic import of page translations
      const [enTranslations, amTranslations] = await Promise.all([
        import(`../locales/en/${page}.json`),
        import(`../locales/am/${page}.json`)
      ]);

      // Load namespaces dynamically
      loadNamespace('en', page, enTranslations.default || enTranslations);
      loadNamespace('am', page, amTranslations.default || amTranslations);

      console.log(`✅ Loaded ${page} translations`);
    } catch (error) {
      console.warn(`Failed to load ${page} translations:`, error);
    }
  };

  // Handle page navigation with translation loading
  const navigateToPage = async (page: string) => {
    // Unload previous page namespace to free memory
    if (currentPage !== page) {
      unloadNamespace('en', currentPage);
      unloadNamespace('am', currentPage);
    }

    // Load new page translations
    await loadPageTranslations(page);
    setCurrentPage(page);
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'products':
        return <ProductsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="enterprise-app">
      {/* Navigation */}
      <nav className="nav">
        <button onClick={() => navigateToPage('dashboard')}>
          {t('common:nav:dashboard')}
        </button>
        <button onClick={() => navigateToPage('users')}>
          {t('common:nav:users')}
        </button>
        <button onClick={() => navigateToPage('products')}>
          {t('common:nav:products')}
        </button>
      </nav>

      {/* Page Content with Suspense */}
      <main className="main-content">
        <Suspense fallback={<div>{t('common:loading')}</div>}>
          {renderPage()}
        </Suspense>
      </main>

      {/* Development Tools */}
      {isDevelopment && <DevTools />}
    </div>
  );
}

// Development Tools Component
function DevTools() {
  const {
    getMissingKeys,
    exportTranslations,
    currentLang,
    supportedLangs
  } = useEthioIntl();

  const [missingKeys, setMissingKeys] = React.useState<string[]>([]);

  const checkMissingKeys = () => {
    setMissingKeys(getMissingKeys());
  };

  const exportCurrentLang = () => {
    const translations = exportTranslations(currentLang);
    console.log('📄 Exported translations:', translations);

    // Download as JSON file
    const blob = new Blob([JSON.stringify(translations, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentLang}-translations.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dev-tools" style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#333',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px'
    }}>
      <h4>🛠️ Dev Tools</h4>
      <button onClick={checkMissingKeys} style={{ margin: '5px', padding: '5px' }}>
        Check Missing Keys
      </button>
      <button onClick={exportCurrentLang} style={{ margin: '5px', padding: '5px' }}>
        Export {currentLang.toUpperCase()}
      </button>

      {missingKeys.length > 0 && (
        <div>
          <strong>Missing Keys ({currentLang}):</strong>
          <ul style={{ maxHeight: '100px', overflow: 'auto' }}>
            {missingKeys.map(key => <li key={key}>{key}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

// Example Page Components
function DashboardPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div className="page">
      <h1>{tNamespace('dashboard', 'title')}</h1>
      <p>{tNamespace('dashboard', 'welcome', { name: 'Developer' })}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{tNamespace('dashboard', 'stats.totalUsers')}</h3>
          <span>1,234</span>
        </div>
        <div className="stat-card">
          <h3>{tNamespace('dashboard', 'stats.revenue')}</h3>
          <span>$45,678</span>
        </div>
      </div>
    </div>
  );
}

function UsersPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div className="page">
      <h1>{tNamespace('users', 'title')}</h1>
      <button>{tNamespace('users', 'addUser')}</button>
      {/* User management interface */}
    </div>
  );
}

function ProductsPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div className="page">
      <h1>{tNamespace('products', 'title')}</h1>
      <button>{tNamespace('products', 'addProduct')}</button>
      {/* Product management interface */}
    </div>
  );
}

export default App;
