import NavBack from "@/components/navBack";
import { APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import { LoginFormData, loginSchema } from "../schemas/loginSchema";
import { postLogin } from "../services/post-login";
import { useAuth } from "../shared/context/AuthContext";
import { EyeIcon, EyeOffIcon } from "../styles/icones";
import styles from "../styles/useGlobal.module.css";


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
      setLoading(true)
      const response = await postLogin(data);

      const {tokens, message} = response.data;

      if (tokens?.access_token) {
        auth.login(tokens.acess_token, tokens.refresh_token);
        toast.success(message);
        router.push(APP_ROUTES.MENU);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Ocorreu um erro ao fazer login.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={"Knowledge Check Bot"} showMenu={false} />
      <NavBack/>
      <h1 className={styles.SubTitle}>Login</h1>
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

        <ToastContainer position="top-right" autoClose={3000} />
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
