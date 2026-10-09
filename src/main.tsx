import {createRoot} from 'react-dom/client';
import '@turnkey/react-wallet-kit/styles.css';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { AppSettingsProvider } from './context/AppSettingsContext.tsx';
import { TurnkeyAppWrapper } from './components/TurnkeyAppWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <AppSettingsProvider>
    <ToastProvider>
      <TurnkeyAppWrapper>
        <App />
      </TurnkeyAppWrapper>
    </ToastProvider>
  </AppSettingsProvider>
);
