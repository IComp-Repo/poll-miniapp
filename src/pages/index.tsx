import { APP_ROUTES } from '@/config/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(APP_ROUTES.LOGIN);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="fs-5">Redirecionando para a página de login</p>
    </div>
  );
}
