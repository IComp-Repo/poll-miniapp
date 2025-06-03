import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from '../assets/logo.png'; // Adjust the path as necessary
import styles from "../styles/useGlobal.module.css"; // Adjust the path as necessary


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Usuário logado:", { email, password });
    toast.success("Login realizado com sucesso!");
    router.push("/home");
  }

return (
  <>
    <header className={styles.waveHeader}>
      <Image src={logo} alt="Logo" width={130} height={130} />
      <h1 className={styles.title}>Knowledge Check Bot</h1>
      <div className="wave-shape"></div>
    </header>

    <div className="container py-5 d-flex flex-column align-items-center" color="#F8F9FA">

      <form
        onSubmit={handleLogin}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3" style={{ position: "relative", width: "100%" }}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
        </div>

        <button className={styles.submit} type="submit">
          Fazer login
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
      <p className="mt-3">
        Ainda não tem conta?{" "}
        <Link href="/register"
          className={styles.registerButton}>
          Criar conta
        </Link>
      </p>

    </div>
  </>
);
}
