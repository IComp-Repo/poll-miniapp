import { Logout } from "@/components/Logout";
import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconPlus from "../assets/icon.png";
import Header from "../components/Header";
import Navbar from "../components/navBack";
import QuizOption from "../components/quizOption";
import grupos from "../params/grupos.json";
import styles from "../styles/useGlobal.module.css";

export default function createQuizz() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [correctOption, setCorrectOption] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);


    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (!file || !file.name.toLowerCase().endsWith(".json")) {
            toast.warn("Apenas arquivos .json são permitidos.");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const parsed = JSON.parse(content);

                if (!parsed.chatId || !parsed.questions || !Array.isArray(parsed.questions)) {
                    toast.error("Arquivo JSON inválido: falta 'chatId' ou 'questions'.");
                    return;
                }

                setSelectedGroup(parsed.chatId);
                setQuizData(parsed.questions);

                const first = parsed.questions[0];
                if (first) {
                    setQuestion(first.question);
                    setOptions(first.options);
                    setCorrectOption(first.correctOption);
                }

                toast.success("Perguntas carregadas! Revise e clique em Enviar.");
            } catch {
                toast.error("Erro ao ler o arquivo JSON.");
            }
        };

        reader.readAsText(file);
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
        setQuizData([]);
        setCorrectOption(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (quizData.length > 0) {
                await api.post(
                    API_ROUTES.POLLS.QUIZZ,
                    {
                        chatId: selectedGroup,
                        questions: quizData,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
                        },
                    }
                );
                toast.success("Todas as perguntas foram enviadas com sucesso!");
                resetForm();
            } else {
                if (options.length < 2) {
                    toast.warn("Adicione pelo menos duas opções.");
                    setLoading(false);
                    return;
                }
                if (correctOption === null) {
                    toast.warn("Selecione a opção correta.");
                    setLoading(false);
                    return;
                }
                if (options.some((opt) => opt.trim() === "")) {
                    toast.warn("Todas as opções devem estar preenchidas.");
                    setLoading(false);
                    return;
                }

                const questionObj = {
                    question,
                    options,
                    correctOption,
                };

                await api.post(
                    API_ROUTES.POLLS.QUIZZ,
                    {
                        chatId: selectedGroup,
                        questions: [questionObj],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
                        },
                    }
                );

                toast.success("Pergunta enviada com sucesso!");
                resetForm();
            }
        } catch {
            toast.error("Erro ao enviar as perguntas.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Header title={"Criar Quizz"} />
            <Navbar />
            <Logout />
            <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
                <div
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    className="border p-4 mb-4 rounded text-center"
                    style={{ backgroundColor: "#E05F00", cursor: "pointer", color: "white"}}
                >
                    <strong>Arraste e solte um arquivo JSON aqui</strong>
                    <br />
                </div>
                {fileName && (
                    <p className="text-muted mb-4"><strong>{fileName}</strong></p>
                )}

                <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 500 }}>
                    <div className="mb-3 mt-1">
                        <label htmlFor="groupSelect" className={styles.label}>
                            Qual é o seu grupo?
                        </label>
                        <select
                            id="groupSelect"
                            className={styles.inputSelect}
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            required={quizData.length === 0}
                        >
                            <option value="">Selecione</option>
                            {grupos.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 mt-3">
                        <label htmlFor="questionInput" className={styles.label}>
                            Qual é a sua pergunta?
                        </label>
                        <input
                            id="questionInput"
                            className={styles.input}
                            type="text"
                            placeholder="Digite sua pergunta"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required={quizData.length === 0}
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
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-around mt-3 gap-3">
                        <button className={styles.opcao} type="button" onClick={addOption}>
                            <Image src={iconPlus} alt="plus" />
                            Opção
                        </button>
                        <button
                            className={styles.submitPoll}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>

                <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            </div>
        </>
    );
}
