import FooterPage from '@/components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { init } from '@telegram-apps/sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      init();
      window.Telegram.WebApp.ready?.();
    } else {
      console.warn("Não está rodando dentro do Telegram WebApp.");
    }
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">

          <main className="flex-grow-1">
            {loading ? (

              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </main>

          <FooterPage />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
