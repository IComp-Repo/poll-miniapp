import Header from "@/components/Header";
import { Logout } from "@/components/Logout";
import styles from '@/styles/useGlobal.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { FaPoll, FaQuestionCircle } from "react-icons/fa";

export default function Menu() {
    const cards = [
        {
            icon: <FaPoll size={40} color="#007bff" />,
            title: "Criar Enquete",
            text: "Envie enquetes diretamente para o Telegram.",
            link: "/createPolls",
        },
        {
            icon: <FaQuestionCircle size={40} color="#28a745" />,
            title: "Criar Quiz",
            text: "Monte quizzes com respostas corretas.",
            link: "/createQuizz",
        },
    ];

    return (
        <>
            <Header title="Knowledge Check Bot" />
            <Logout/>
            <div className="container py-5">
                <div className="row justify-content-center gap-4">
                    {cards.map((card, index) => (
                        <div key={index} className={'col-md-4'}>
                            <Link href={card.link} className="text-decoration-none">
                                <div className={`card text-center h-100 shadow-sm ${styles.cardHover}`} style={{ cursor: "pointer" }}>
                                    <div className="card-body">
                                        <div className="mb-3">{card.icon}</div>
                                        <h5 className={`card-title ${styles.cardTitle}`}>{card.title}</h5>
                                        <p className={`card-text ${styles.cardText}`}>{card.text}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
