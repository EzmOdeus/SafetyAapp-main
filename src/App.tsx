import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import ContactsPage from './pages/ContactsPage';
import SafetyPage from './pages/SafetyPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Layout/Header';
import BottomNavigation from './components/Layout/BottomNavigation';

const APP_CONFIG = {
  name: 'SafetyApp',
  pages: {
    home: 'SafetyApp',
    location: 'Location Tracking',
    contacts: 'Emergency Contacts',
    safety: 'Safety Features',
    profile: 'Profile'
  }
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, user, login, register } = useKindeAuth();
  const [activeTab, setActiveTab] = useState('home');

  // عرض loading أثناء التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجل الدخول، عرض صفحة التسجيل
  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} onRegister={register} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'location':
        return <LocationPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'safety':
        return <SafetyPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  const getPageTitle = () => {
    return APP_CONFIG.pages[activeTab as keyof typeof APP_CONFIG.pages] || APP_CONFIG.name;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={getPageTitle()} />
      <main className="flex-1 pt-16 pb-20">
        {renderPage()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
