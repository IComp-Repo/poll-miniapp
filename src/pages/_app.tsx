import { init } from '@telegram-apps/sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../shared/context/AuthContext';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        platform?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
  if (window.Telegram?.WebApp?.platform) {
    init();
  } else {
    console.warn('Não está rodando dentro do Telegram WebApp.');
  }
}, []);


  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}