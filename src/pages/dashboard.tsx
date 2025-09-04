import CalculoIcon from "@/assets/calculator-simple.png";
import CerebroIcon from "@/assets/cerebro-interrogacao.svg";
import AnswerIcon from "@/assets/comments-question.png";
import EnqueteIcon from "@/assets/enquete-dashboard.svg";
import UsersIcon from "@/assets/usuarios.svg";
import GraficoReposta from "@/components/GraficoResposta";
import Header from "@/components/Header";
import NavBack from "@/components/navBack";
import StatCard from "@/components/StatCard";
import UltimasAtividades from "@/components/UltimasAtividades";
import {
    getDashboardSummary,
    getLastActivities,
    getResponsesPerDay,
    type ActivityItem,
    type DashboardSummary,
    type ResponsesPerDayItem,
} from "@/services/dashboard";
import styles from "@/styles/useGlobal.module.css";
import Image from "next/image";
import { JSX, useEffect, useMemo, useState } from "react";

const TZ = "America/Manaus";

type CardTitle =
    | "Total Quizzes"
    | "Total Questões"
    | "Participantes"
    | "Total Respostas"
    | "Acurácia média";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [perDay, setPerDay] = useState<ResponsesPerDayItem[]>([]);

    const iconMap: Record<CardTitle, JSX.Element> = {
        "Total Quizzes": <CerebroIcon width={32} height={32} />,
        "Total Questões": <EnqueteIcon width={32} height={32} />,
        "Participantes": <UsersIcon width={32} height={32} />,
        "Total Respostas": (
            <Image src={AnswerIcon} width={32} height={32} alt="Total Respostas" />
        ),
        "Acurácia média": (
            <Image src={CalculoIcon} width={32} height={32} alt="Acurácia Média" />
        ),
    };

    useEffect(() => {
        let alive = true;
        setLoading(true);

        (async () => {
            const results = await Promise.allSettled([
                getDashboardSummary(),
                getLastActivities(),
                getResponsesPerDay(7),
            ]);

            if (!alive) return;

            if (results[0].status === "fulfilled") {
                setSummary(results[0].value);
            }

            if (results[1].status === "fulfilled") {
                setActivities(results[1].value ?? []);
            } else {
                setActivities([]);
            }

            if (results[2].status === "fulfilled") {
                setPerDay(results[2].value ?? []);
            } else {
                setPerDay([]);
            }

            setLoading(false);
        })();

        return () => {
            alive = false;
        };
    }, []);

    const cards: { title: CardTitle; value: string | number }[] = useMemo(() => {
        if (!summary) return [];
        return [
            { title: "Total Quizzes", value: summary.total_quizzes },
            { title: "Total Questões", value: summary.total_questions },
            { title: "Participantes", value: summary.participants },
            { title: "Total Respostas", value: summary.total_answers },
            { title: "Acurácia média", value: `${summary.accuracy.toFixed(2)}%` },
        ];
    }, [summary]);

    const graficoData = useMemo(
        () =>
            (perDay ?? []).map((d) => ({
                dia: new Date(`${d.day}T00:00:00Z`).toLocaleDateString("pt-BR", {
                    timeZone: TZ,
                }),
                respostas: d.responses,
            })),
        [perDay]
    );

    const dadosAtividades = useMemo(
        () =>
            (activities ?? []).map((a) => ({
                id: a.question_id,
                title: a.question,
                type: "Quiz",
                date: new Date(a.created_at).toLocaleString("pt-BR", { timeZone: TZ }),
                answers: a.answers,
            })),
        [activities]
    );

    return (
        <>
            <Header title="Knowledge Check Bot" showMenu={true} />
            <NavBack />
            <h1 className={styles.SubTitle}>Dashboard de Atividades</h1>

            {loading ? (
                <div className="container mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="container mt-4 d-flex justify-content-between gap-4 ">
                        {cards.map((item, index) => (
                            <StatCard
                                key={index}
                                title={item.title}
                                value={item.value}
                                icon={iconMap[item.title]}
                            />
                        ))}
                    </div>

                    <div className="container mt-4 d-flex justify-content-center">
                        <GraficoReposta
                            title="Respostas por dia"
                            data={graficoData}
                            xAxisKey="dia"
                            yAxisKey="respostas"
                        />
                    </div>

                    <div className="container d-flex ">
                        <h3 style={{ color: "#003366", marginTop: "10px" }}>
                            Últimas Atividades
                        </h3>
                    </div>

                    <div className="container d-flex justify-content-center">
                        <UltimasAtividades data={dadosAtividades} />
                    </div>
                </>
            )}
        </>
    );
}
