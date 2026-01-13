import React, { useState } from 'react';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import ContactsPage from './pages/ContactsPage';
import SafetyPage from './pages/SafetyPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Layout/Header';
import BottomNavigation from './components/Layout/BottomNavigation';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';


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
  const { user } = useKindeAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'location':
        return <LocationPage  />;
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
        {"----->",user}
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
