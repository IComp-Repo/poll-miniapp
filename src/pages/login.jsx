import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Usuário logado:", { email, password });
    router.push("/home");
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <h1 className="mb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Fazer login
        </button>
      </form>

      <p className="mt-3">
        Ainda não tem conta?{" "}
        <button
          className="btn btn-link text-primary p-0"
          onClick={() => router.push("/register")}
        >
          Criar conta
        </button>
      </p>
    </div>
  );
}
