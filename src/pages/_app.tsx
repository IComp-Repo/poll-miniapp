// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // global styles aqui
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../shared/context/AuthContext'; // ajuste o caminho se necessário

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
