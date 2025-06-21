import FileUploader from "@/components/FileUpload";
import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconPlus from "../assets/icon.png";
import AgendamentoModal from "../components/AgendamentoModal";
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
    const [showModal, setShowModal] = useState(false);

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
        setQuizData([]);
        setCorrectOption(null);
    };

    const handleSubmitComAgendamento = async (dataHora: string | null) => {
        setLoading(true);

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
            };

            const questionObj = {
                question,
                options,
                correctOption,
            };

            if (quizData.length === 0) {
                if (options.length < 2 || correctOption === null || options.some((opt) => opt.trim() === "")) {
                    toast.warn("Complete corretamente as opções e a pergunta");
                    return;
                }
            }

            const formate = dataHora?.split('T') || [];
            let payload;
            if (dataHora != null) {
                payload = {
                    chatId: selectedGroup,
                    questions: quizData.length > 0 ? quizData : [questionObj],
                    schedule_date: formate[0] || "",
                    schedule_time: formate[1] || ""
                };
            } else {
                payload = {
                    chatId: selectedGroup,
                    questions: quizData.length > 0 ? quizData : [questionObj],
                };
            }

            console.log("Enviando:", payload);

            const response = await api.post(API_ROUTES.POLLS.QUIZZ, payload, { headers });

            toast.success(response.data.message);
            resetForm();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title={"Knowledge Check Bot"} showMenu={true} />
            <Navbar />
            <h1 className={styles.SubTitle}> Criar Quizz</h1>
            <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
                <FileUploader handleFileUpload={(file: any) => {
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

                }} />
                <form className="w-100" style={{ maxWidth: 500 }}>
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
                            type="button"
                            disabled={loading}
                            onClick={() => setShowModal(true)}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>

                    </div>
                    <AgendamentoModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={(dataHora: string | null) => {
                            handleSubmitComAgendamento(dataHora);
                        }}
                    />
                </form>
                <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            </div>
        </>
    );
}
