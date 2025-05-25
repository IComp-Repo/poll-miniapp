import { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: 20 }}>
      <h1>Miniapp de Polls</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pergunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Opção ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
        <button type="button" onClick={addOption}>+ Opção</button>
        <button type="submit">Enviar Poll</button>
      </form>
    </div>
  );
}
