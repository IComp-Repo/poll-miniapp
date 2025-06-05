import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconPlus from "../assets/icon.png";
import Header from "../components/Header";
import QuizOption from "../components/quizOption";
import grupos from "../params/grupos.json"; // Assuming you have a JSON file with group data
import styles from "../styles/useGlobal.module.css";

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
    <>
      <Header title={'Create Polls'} />
      <div className="container py-5 d-flex justify-content-center align-items-center flex-column">

        <form
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "500px" }}
        >
          <div className="mb-3 mt-1">
            <label htmlFor="isProfessor" className={styles.label}>
              Qual é o seu grupo?
            </label>
            <select
              id="isProfessor"
              className={styles.inputSelect}
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {grupos.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input da pergunta */}
          <div className="mb-4 mt-3">
            <label htmlFor="isProfessor" className={styles.label}>
              Qual é a sua pergunta?
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite sua pergunta"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
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

          <div className="d-flex justify-content-around mt-3 gap-3">
            <button className={styles.opcao} type="button" onClick={addOption}>
              <Image src={iconPlus} alt="plus"></Image>
              Opção
            </button>
            <button className={styles.submitPoll} type="submit" >
              Enviar
            </button>
          </div>
        </form >

        <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      </div >
    </>
  );
}
