import FileUploader from "@/components/FileUpload";
import { postQuiz } from "@/services/post-quizz";
import { useQuery } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconPlus from "../assets/icon.png";
import AgendamentoModal from "../components/AgendamentoModal";
import Header from "../components/Header";
import Navbar from "../components/navBack";
import QuizOption from "../components/quizOption";
import { Quiz } from "../schemas/interfaceQuizz";
import { getGroups } from "../services/get-groups";
import styles from "../styles/useGlobal.module.css";

export default function CreateQuizz() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [correctOption, setCorrectOption] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState<Quiz[]>([]);
    const [showModal, setShowModal] = useState(false);

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
        setQuizData([]);
        setCorrectOption(null);
    };

    const handleSubmitComAgendamento = async (dataHora: string | null) => {
        setLoading(true);

        try {
            if (!selectedGroup) {
                toast.warn("Selecione um grupo.");
                return;
            }
            if (question.trim() === "") {
                toast.warn("Digite a pergunta.");
                return;
            }
            if (options.length < 2 || options.some((opt) => opt.trim() === "")) {
                toast.warn("Preencha ao menos duas opções válidas.");
                return;
            }
            if (correctOption === null || correctOption < 0 || correctOption >= options.length) {
                toast.warn("Selecione a opção correta.");
                return;
            }

            const questionObj = { question, options, correctOption };

            const [schedule_date, schedule_time] = dataHora ? dataHora.split("T") : ["", ""];

            const payload = {
                chatId: selectedGroup,
                questions: quizData.length > 0 ? quizData : [questionObj],
                schedule_date,
                schedule_time,
            };

            await postQuiz(payload.questions, payload.chatId);

            toast.success("Quizz criado com sucesso!");
            resetForm();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao criar o quizz.");
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
                            {data?.map((group: any) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            )) || null}
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
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    );
}
