import CerebroIcon from "@/assets/cerebro-interrogacao.svg";
import EnqueteIcon from "@/assets/enquete-dashboard.svg";
import UsersIcon from "@/assets/usuarios.svg";
import GraficoReposta from "@/components/GraficoResposta";
import Header from "@/components/Header";
import NavBack from "@/components/navBack";
import StatCard from "@/components/StatCard";
import UltimasAtividades from "@/components/UltimasAtividades";
import styles from "@/styles/useGlobal.module.css";
import { useEffect, useMemo, useState } from "react";
import {
    getDashboardSummary,
    getLastActivities,
    getResponsesPerDay,
    type DashboardSummary,
    type ActivityItem,
    type ResponsesPerDayItem,
} from "@/services/dashboard";

const TZ = "America/Manaus";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [perDay, setPerDay] = useState<ResponsesPerDayItem[]>([]);

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
                console.log("[dashboard] summary ->", results[0].value);
                setSummary(results[0].value);
            } else {
                console.warn("[dashboard] summary erro:", results[0].reason);
            }

            if (results[1].status === "fulfilled") {
                console.log("[dashboard] activities ->", results[1].value);
                setActivities(results[1].value ?? []);
            } else {
                console.warn("[dashboard] activities erro:", results[1].reason);
                setActivities([]);
            }

            if (results[2].status === "fulfilled") {
                console.log("[dashboard] perDay ->", results[2].value);
                setPerDay(results[2].value ?? []);
            } else {
                console.warn("[dashboard] perDay erro:", results[2].reason);
                setPerDay([]);
            }

            setLoading(false);
        })();

        return () => {
            alive = false;
        };
    }, []);

    const cards = useMemo(() => {
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

            {loading && (
                <div className="container mt-3">
                    <div className="alert alert-secondary" role="alert">
                        Carregando dados do dashboard…
                    </div>
                </div>
            )}

            <div className="container mt-4 d-flex justify-content-between gap-4 ">
                {cards.map((item, index) => (
                    <StatCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        icon={
                            item.title === "Total Enquetes" ? (
                                <EnqueteIcon width={32} height={32} />
                            ) : item.title === "Total Quizzes" ? (
                                <CerebroIcon width={32} height={32} />
                            ) : (
                                <UsersIcon width={32} height={32} />
                            )
                        }
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
    );
}
