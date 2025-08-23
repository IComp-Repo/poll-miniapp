import { APP_ROUTES } from '@/config/routes';
import { LaunchParams, retrieveLaunchParams } from '@telegram-apps/sdk';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function checkUser() {
      try {
        const params: LaunchParams = retrieveLaunchParams();
        const user = params.tgWebAppData?.user;

        if (user) {
          sessionStorage.setItem("telegram_user", JSON.stringify(user));
          router.replace(APP_ROUTES.MENU); // Se já tiver user → vai pro menu
          return;
        }

        // Se não tiver user mas já tem salvo no sessionStorage
        const cachedUser = sessionStorage.getItem("telegram_user");
        if (cachedUser) {
          router.replace(APP_ROUTES.MENU);
          return;
        }

        // Senão vai pro login
        router.replace(APP_ROUTES.LOGIN);
      } catch (error) {
        console.warn("Telegram user not found in launch params.");
        router.replace(APP_ROUTES.LOGIN);
      }
    }

    checkUser();
  }, [router]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="fs-5">Redirecionando...</p>
    </div>
  );
}
