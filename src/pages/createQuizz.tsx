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


    const handleOptionChange = (index: any, value: any) => {
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

        if (!file || !file.name.endsWith(".md")) {
            toast.warn("Apenas arquivos .md são permitidos.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target?.result as string;
            const parsed = parseMarkdown(content);

            if (!parsed) {
                toast.error("Erro ao interpretar o arquivo Markdown.");
                return;
            }

            const { question, options, correctOption } = parsed;

            setQuestion(question);
            setOptions(options);
            setCorrectOption(correctOption);
            toast.success("Pergunta carregada com sucesso! Revise e clique em Enviar.");
        };
        reader.readAsText(file);
    };


    const parseMarkdown = (markdown: string): {
        question: string;
        options: string[];
        correctOption: number;
    } | null => {
        const lines = markdown.trim().split("\n");

        const questionLine = lines.find(line => line.startsWith("#"));
        if (!questionLine) return null;

        const question = questionLine.replace(/^#\s*/, "").trim();
        const options: string[] = [];
        let correctOption = -1;

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("- [x]")) {
                options.push(trimmed.replace("- [x]", "").trim());
                correctOption = options.length - 1;
            } else if (trimmed.startsWith("-")) {
                options.push(trimmed.replace("-", "").trim());
            }
        });

        if (question === "" || options.length < 2 || correctOption === -1) {
            return null;
        }

        return { question, options, correctOption };
    };




    const addOption = () => setOptions([...options, ""]);

    const removeOption = (index: any) => {
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (options.length < 2) {
            toast.warn("Adicione pelo menos duas opções.");
            return;
        }

        if (correctOption === null) {
            toast.warn("Selecione a opção correta.");
            return;
        }


        if (options.some(opt => opt.trim() === "")) {
            toast.warn("Todas as opções devem estar preenchidas.");
            return;
        }

        setLoading(true);

        try {
            await api.post(API_ROUTES.POLLS.QUIZZ, {
                question,
                options,
                correctOption,
                chatId: selectedGroup,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Poll enviada com sucesso!");
            resetForm();
        } catch (error) {
            toast.error("Erro ao enviar a Poll. Tente novamente!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title={'Criar Quizz'} />
            <Navbar />
            <Logout />
            <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
                <div
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    className="border border-primary p-4 mb-4 rounded text-center"
                    style={{ backgroundColor: "#f9f9f9", cursor: "pointer" }}
                >
                    <strong>Arraste e solte um arquivo .MD aqui</strong>
                    <br />
                </div>

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
                                correctOption={correctOption}
                                setCorrectOption={setCorrectOption}
                            />
                        ))}
                    </div>


                    <div className="d-flex justify-content-around mt-3 gap-3">
                        <button className={styles.opcao} type="button" onClick={addOption}>
                            <Image src={iconPlus} alt="plus"></Image>
                            Opção
                        </button>
                        <button className={styles.submitPoll} type="submit" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar"}
                        </button>

                    </div>
                </form >

                <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            </div >
        </>
    );
}
