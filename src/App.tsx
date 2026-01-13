import React, { useState, useEffect } from 'react';
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
  const { isAuthenticated, isLoading, user, getToken } = useKindeAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [authChecked, setAuthChecked] = useState(false);

  // Debugging effect
  useEffect(() => {
    console.log('Auth State:', {
      isAuthenticated,
      isLoading,
      user,
      location: window.location.href
    });
  }, [isAuthenticated, isLoading, user]);

  // Effect لفحص التوكن
  useEffect(() => {
    const checkToken = async () => {
      if (!isLoading) {
        try {
          const token = await getToken();
          console.log('Token exists:', !!token);
          
          // إذا كان هناك توكن ولكن isAuthenticated غير صحيح
          if (token && !isAuthenticated) {
            console.log('Token found but user not authenticated - reloading');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          console.error('Token check error:', error);
        } finally {
          setAuthChecked(true);
        }
      }
    };

    checkToken();
  }, [isLoading, isAuthenticated, getToken]);

  // عرض loading
  if (isLoading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجل الدخول
  if (!isAuthenticated || !user) {
    const { login, register } = useKindeAuth();
    return <LoginPage onLogin={login} onRegister={register} />;
  }

  // إذا كان المستخدم مسجل الدخول - عرض التطبيق الرئيسي
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
