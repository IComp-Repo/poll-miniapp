import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState("");
  const [isProfessor, setIsProfessor] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    if (isProfessor !== "Sim") {
      setError("Desculpe, apenas professores podem se cadastrar.");
      return;
    }

    console.log("Usuário cadastrado:", { email, password, register });
    router.push("/login");
  };

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <h1 className="mb-3 text-center">Seja bem-vindo ao Polls Bot!</h1>
      <p className="mb-4 text-center text-muted">
        Já tem cadastro? Não? Então, realize seu cadastro abaixo e comece a criar suas enquetes!
      </p>

      <form
        onSubmit={handleRegister}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control form-control-lg"
            placeholder="Matrícula UFAM"
            value={register}
            onChange={(e) => setRegister(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Você é professor?</label>
          <select
            className="form-select"
            value={isProfessor}
            onChange={(e) => {
              setIsProfessor(e.target.value);
              setError("");
            }}
            required
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <button className="btn btn-success w-100" type="submit">
          Cadastrar
        </button>
      </form>

      <p className="mt-3 text-muted">
        Já tem conta?{" "}
        <button
          className="btn btn-link text-primary p-0"
          onClick={() => router.push("/login")}
        >
          Fazer login
        </button>
      </p>
    </div>
  );
}
