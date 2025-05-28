import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOption from "../components/quizOption";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/send-poll", {
        question,
        options,
        chatId: selectedGroup,
      });
      toast.success("Poll enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar a Poll. Tente novamente!");
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
      <h1 className="mb-4 text-center">Miniapp de Polls</h1>

      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <select
            className="form-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            required
          >
            <option value="">Selecione o grupo</option>
            <option value="-1002399252478">Back-end | Projeto</option> {/* Esse pode enviar aqui */}
            <option value="-888899850">Redes-ES</option> {/* Isso funciona não envie para cá */}
          </select>
        </div>

        {/* Input da pergunta */}
        <div className="mb-3">
          <input
            className="form-control form-control-lg border-0 shadow-sm"
            type="text"
            placeholder="Digite a pergunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column gap-2">
          {options.map((opt, idx) => (
            <QuizOption
              key={idx}
              handleChange={handleOptionChange}
              handleRemove={removeOption}
              text={opt}
              id={idx}
            />
          ))}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-secondary flex-fill me-2"
            type="button"
            onClick={addOption}
          >
            + Opção
          </button>
          <button className="btn btn-primary flex-fill ms-2" type="submit">
            Enviar Poll
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
