import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { init } from '@telegram-apps/sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../shared/context/AuthContext';

const queryClient = new QueryClient();

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        platform?: string;
        ready?: () => void;
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      init();
      window.Telegram.WebApp.ready?.();
    } else {
      console.warn("Não está rodando dentro do Telegram WebApp.");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
