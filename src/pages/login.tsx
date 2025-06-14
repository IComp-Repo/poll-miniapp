import { API_ROUTES, APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import Header from "../components/Header";
import api from "../config/axios";
import { useAuth } from "../shared/context/AuthContext";
import styles from "../styles/useGlobal.module.css";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const response = await api.post(API_ROUTES.AUTH.LOGIN, data);

      const token = response.data.access_token;
      if (token) {
        auth.login(token);
        toast.success("Login realizado com sucesso!");
        router.push(APP_ROUTES.MENU);
      } else {
        toast.error("Token não encontrado na resposta.");
      }
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error);
      toast.error("Erro ao Cadastrar-se: " + errorMessage);
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={"Knowledge Check Bot"} />

      <div className="container py-5 d-flex flex-column align-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <input
              {...register("email")}
              className={styles.input}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3" style={{ position: "relative", width: "100%" }}>
            <input
              {...register("password")}
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
            />
            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}

            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                paddingRight: "12px",
              }}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOffIcon />
              ) : (
                <EyeIcon />
              )}
            </button>
          </div>

          <button className={styles.submit} type="submit" disabled={Loading}>
            {Loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Carregando...
              </>
            ) : (
              "Fazer login"
            )}
          </button>
        </form>

        <ToastContainer position="top-right" theme="colored" autoClose={3000} />
        <p className="mt-3">
          Ainda não tem conta?{" "}
          <Link href="/register" className={styles.registerButton}>
            Criar conta
          </Link>
        </p>
      </div>
    </>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M17.94 17.94A10.12 10.12 0 0 1 12 19.5c-4.58 0-8.53-3.06-10-7.5a10.29 10.29 0 0 1 2.1-3.36" />
      <path d="M1 1l22 22" />
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
      <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
    </svg>
  );
}
