
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../shared/context/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
