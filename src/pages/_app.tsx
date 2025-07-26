import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../shared/context/AuthContext';
import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}