import { API_ROUTES, APP_ROUTES } from "@/config/routes";
import { baseRegisterSchema, RegisterSchemaInput } from "@/schemas/registerSchema";
import { useAuth } from "@/shared/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import api from "../config/axios";
import styles from "../styles/useGlobal.module.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaInput>({
    resolver: zodResolver(baseRegisterSchema),
    mode: "onTouched",
  });


  const onSubmit = async (data: RegisterSchemaInput) => {
    const rawTelegramUser = sessionStorage.getItem("telegram_user");
    const parsedTelegramUser = rawTelegramUser ? JSON.parse(rawTelegramUser) : null;

    const formattedData = {
      ...data,
      is_professor: String(data.is_professor) === "true" ? true : false,
    };

    if (parsedTelegramUser?.id) {
      formattedData.telegram_id = parsedTelegramUser.id;
    }

    try {
      setLoading(true);
      const response = await api.post(API_ROUTES.AUTH.REGISTER, formattedData);

      const token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      if (token) {
        auth.login(token, refresh_token);
        toast.success("Cadastro realizado com sucesso!");
        router.push(APP_ROUTES.LOGIN);
      } else {
        toast.error("Token não encontrado na resposta.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={'Knowledge Check Bot'} showMenu={false} />

      <div className="container py-5 d-flex flex-column align-items-center" color="#F8F9FA">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              {...register("email")}
            />

            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3" style={{ position: "relative", width: "100%" }}>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className={styles.input}
              {...register("password")}
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
                top: "10%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                paddingRight: "12px",
              }}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? (
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
              ) : (
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
              )}
            </button>
            <div className="mb-3 mt-3">
              <input
                type="text"
                placeholder="Sua Matricula UFAM"
                className={styles.input}
                {...register("register")}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  e.target.value = onlyNums;
                }}
              />

            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="isProfessor" className={styles.label}>
                Você é professor?
              </label>
              <select
                id="isProfessor"
                className={styles.inputSelect}
                {...register("is_professor")}
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.is_professor && (
                <p className="text-danger mt-1">{errors.is_professor.message}</p>
              )}
            </div>
          </div>

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Carregando...
              </>
            ) : (
              "Cadastrar-se"
            )}
          </button>
          {errors.root && (
            <p className="text-danger mt-1">{errors.root.message}</p>
          )}
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
        <p className="mt-3">
          Já tem conta?{" "}
          <Link href="/login"
            className={styles.registerButton}>
            Fazer login
          </Link>
        </p>

      </div>
    </>
  );
}
