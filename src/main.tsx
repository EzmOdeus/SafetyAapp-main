import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KindeProvider
      clientId="e25d85e213ee4fb4bba5d60a08cb0e62"
      domain="https://safetyapp.kinde.com"
      redirectUri={window.location.origin}
      logoutUri={window.location.origin}
      isDangerouslyUseLocalStorage={true}
    >
      <App />
    </KindeProvider>
  </StrictMode>
);
