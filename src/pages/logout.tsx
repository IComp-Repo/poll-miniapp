import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../shared/context/AuthContext';

export default function LogoutPage() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
    router.replace('/login');
  }, [auth, router]);

   return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="fs-5">Saindo...</p>
    </div>
  );
}
