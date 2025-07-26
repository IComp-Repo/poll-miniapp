import { APP_ROUTES } from '@/config/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { retrieveLaunchParams, LaunchParams } from '@telegram-apps/sdk';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const params: LaunchParams = retrieveLaunchParams()
        const user = params.tgWebAppData?.user

        if (user) {
          sessionStorage.setItem("telegram_user", JSON.stringify(user))
        }
      } catch (error) {
        console.warn("Telegram user not found in launch params.");
      }
      router.replace(APP_ROUTES.LOGIN);
    }

    checkUser();
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
