import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizOption from "../components/quizOption";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envie a enquete para o chat de teste do bot
    await axios.post("/api/send-poll", { question, options });
    alert("Poll enviada!");
  };

  return (
    <div className="p-4">
      <h1 className="my-3 mb-5">Miniapp de Polls</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control border-2 w-75"
          type="text"
          placeholder="Pergunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="btn btn-secondary my-3" type="button" onClick={addOption}>
          <strong>+</strong> Opção
        </button>
        <button className="btn btn-info mx-2" type="submit">
          Enviar Poll
        </button>
        <div className="d-flex flex-column p-4 gap-3">
          {options.map((opt, idx) => (
            <QuizOption handleChange={handleOptionChange} text={opt} id={idx + 1}></QuizOption>
          ))}
        </div>
      </form>
    </div>
  );
}
