import { getGroups } from "@/services/get-groups";
import { useQuery } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconPlus from "../assets/icon.png";
import Header from "../components/Header";
import EnqueteOption from "../components/enqueteOption";
import Navbar from "../components/navBack";
import { createPolls } from "../services/post-enquete";
import styles from "../styles/useGlobal.module.css";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(false);


  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
    staleTime: 1000 * 60,
  });


  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
    setSelectedGroup("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (options.length < 2) {
      toast.warn("Adicione pelo menos duas opções.");
      return;
    }

    if (options.some((opt) => opt.trim() === "")) {
      toast.warn("Todas as opções devem estar preenchidas.");
      return;
    }

    if (!question.trim()) {
      toast.warn("A pergunta não pode estar vazia.");
      return;
    }

    if (new Set(options.map(opt => opt.trim())).size !== options.length) {
      toast.warn("As opções não podem se repetir.");
      return;
    }
    if (!selectedGroup) {
      toast.warn("Selecione um grupo.");
      return;
    }

    setLoading(true);

    try {
      const response = await createPolls(question, options, selectedGroup);
      console.log(question, options, selectedGroup);
      console.log(response);
      toast.success(response.data.message || "Quizz enviado com sucesso!");
      resetForm();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao criar enquete!";
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <>
      <Header title={'Knowledge Check Bot'} showMenu={true} />
      <Navbar />
      <h1 className={styles.SubTitle}> Criar Enquete</h1>
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
                id="group"
                className={styles.inputSelect}
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {(data ?? []).map((group: any) => (
                  <option key={group.id} value={String(group.chat_id)}>
                    {group.title ?? `Grupo ${group.chat_id}`}
                  </option>
                ))}
              </select>

          </div>

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
              <EnqueteOption
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
            <button className={styles.submitPoll} type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form >
      </div >
    </>
  );
}
