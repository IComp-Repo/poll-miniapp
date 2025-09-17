import { postGenerateQuiz } from "@/services/post-generate-quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconDownload from "../assets/download.svg";
import Header from "../components/Header";
import Navbar from "../components/navBack";
import styles from "../styles/useGlobal.module.css";

export default function GenerateQuizz() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [quizText, setQuizText] = useState("");
    const [quizOriginal, setQuizOriginal] = useState<any>(null);

    const handleGenerateQuiz = async () => {
        if (!prompt.trim()) {
            toast.warning("Por favor, digite uma pergunta antes de gerar o quizz!");
            return;
        }

        setLoading(true);
        try {
            const response = await postGenerateQuiz({ prompt });

            setQuizOriginal(response);

            const texto = [
                ...response.questions.map((q: any, i: number) => {
                    return `
${i + 1}. ${q.question}
${q.options.map((opt: string, idx: number) => `   ${idx + 1}) ${opt}`).join("\n")}
Resposta correta: ${q.options[q.correctOption]}
------------------------------------------------------------`;
                }),
            ].join("\n");

            setQuizText(texto);
            toast.success(response.message || "Quizz gerado com sucesso!");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Erro ao gerar quiz!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title={"Knowledge Check Bot"} showMenu={true} />
            <Navbar />
            <h1 className={styles.SubTitle}>Gerar Quizzes</h1>
            <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
                <form
                    className="w-100"
                    style={{ maxWidth: 500 }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleGenerateQuiz();
                    }}
                >
                    <div className="mb-4 mt-3">
                        <label htmlFor="questionInput" className={styles.label}>
                            Qual é a sua pergunta?
                        </label>
                        <input
                            id="questionInput"
                            className={styles.inputGenerateQuizz}
                            type="text"
                            placeholder="Digite sobre o que você quer perguntar"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className={styles.submitPoll}
                            disabled={loading}
                        >
                            {loading ? "Gerando..." : "Gerar Quizz"}
                        </button>
                    </div>

                    {quizText && (
                        <div className="mt-4">
                            <h2 className={styles.SubTitle}>Seu Quizz</h2>
                            <textarea
                                className={styles.textarea}
                                rows={15}
                                value={quizText}
                                readOnly
                            />
                        </div>
                    )}

                </form>
                {quizText && (
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className={styles.submitPoll}
                            onClick={() => downloadJson({ questions: quizOriginal.questions }, 'perguntas_quiz.json')}
                        ><IconDownload className={styles.iconDownload} />
                            Baixar Quizz em JSON
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

function downloadJson(data: any, filename: string) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Download iniciado!");

}