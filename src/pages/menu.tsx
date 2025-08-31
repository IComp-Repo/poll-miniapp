import Enquete from '@/assets/enquete-h.svg';
import Grafico from "@/assets/grafico-histograma.svg";
import Quiz from '@/assets/interrogatorio.svg';
import Header from "@/components/Header";
import styles from '@/styles/useGlobal.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Menu() {
    const cards = [
        {
            icon: <Enquete className={styles.icon} />,
            title: "Criar Enquete",
            text: "Envie enquetes diretamente para o Telegram.",
            link: "/createPolls",
        },
        {
            icon: <Quiz className={styles.icon} />,
            title: "Criar Quiz",
            text: "Monte quizzes com respostas corretas.",
            link: "/createQuizz",
        },
        {
            icon: <Grafico className={styles.icon} />,
            title: "Dashboard",
            text: "Visualize estatísticas de enquetes e quizzes.",
            link: "/dashboard",
        },
    ];

    return (
        <>
            <Header title="Knowledge Check Bot" showMenu={true} />
            <div className="container py-5">
                <div className="row justify-content-center g-4">
                    {cards.map((card, index) => (
                        <div key={index} className="col-12 col-md-4 d-flex">
                            <Link
                                href={card.link}
                                className="flex-fill text-decoration-none"
                                aria-label={`Ir para ${card.title}`}
                            >
                                <article
                                    className={`card text-center h-100 ${styles.cardHover}`}
                                    role="button"
                                >
                                    <div className="card-body">
                                        <div className="mb-3">{card.icon}</div>
                                        <h5 className={`card-title ${styles.cardTitle}`}>{card.title}</h5>
                                        <p className={`card-text ${styles.cardText}`}>{card.text}</p>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}
