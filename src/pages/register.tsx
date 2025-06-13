import { useAuth } from "@/shared/context/AuthContext";
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
import styles from "../styles/useGlobal.module.css";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  matricula: z.string().min(1, "Matrícula é obrigatória"),
  isProfessor: z.enum(["Sim", "Não"], {
    errorMap: () => ({ message: "Selecione se é professor ou não" }),
  }),
});

type FormDataRegister = z.infer<typeof loginSchema>;
var BASE_URL = process.env.VITE_API_BASE_URL || 'https://bot-telegram-test-server1.onrender.com';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormDataRegister) => {
    try {
      setLoading(true);
      const response = await api.post(`${BASE_URL}/api/register`, data);

      const token = response.data.access_token;
      if (token) {
        auth.login(token);
        toast.success("Cadastro realizado com sucesso!");
        router.push("/home");
      } else {
        toast.error("Token não encontrado na resposta.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Erro ao Caastrar-se: " + error.message);
      } else {
        toast.error("Erro desconhecido durante o cadastro.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={'Knowledge Check Bot'} />

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
                {...register("matricula")}
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
                {...register("isProfessor")}
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
              {errors.isProfessor && (
                <p className="text-danger mt-1">{errors.isProfessor.message}</p>
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
