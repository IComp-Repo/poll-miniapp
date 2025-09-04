import { APP_ROUTES } from "@/config/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../shared/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    auth.logout();

    const timer = setTimeout(() => {
      router.replace(APP_ROUTES.PRINCIPAL);
    }, 500);

    return () => clearTimeout(timer);
  }, [auth, router]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark"
      aria-busy="true"
    >
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="fs-5">Saindo...</p>
    </div>
  );
}
