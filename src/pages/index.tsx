import Login from '@/assets/entrance.svg';
import sideImage from '@/assets/side-image.png';
import Header from '@/components/Header';
import styles from '@/styles/useGlobal.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    icon: <Login className={styles.icon} />,
    title: "Fazer Login",
    text: "Acesse sua conta para gerenciar enquetes e quizzes.",
    link: "/login",
  },
  {
    icon: <Login className={styles.icon} />,
    title: "Criar Conta",
    text: "Registre-se para começar a usar o Knowledge Check Bot.",
    link: "/register",
  },
];

export default function IndexPage() {
  return (
    <>
      <Header title="Knowledge Check Bot" showMenu={false} />
      <div className="container py-5">
        <div className="d-flex flex-row align-items-center justify-content-between gap-5 flex-wrap">
          
          {/* Coluna de cards */}
          <div className="d-flex flex-column align-items-start gap-3">
            {cards.map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className="text-decoration-none w-100"
                aria-label={`Ir para ${card.title}`}
              >
                <article
                  className={`card text-center ${styles.cardHover}`}
                  style={{ maxWidth: "400px" }}
                  role="button"
                >
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="mb-3">{card.icon}</div>
                    <h5 className={`card-title ${styles.cardTitle}`}>{card.title}</h5>
                    <p className={`card-text ${styles.cardText}`}>{card.text}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="flex-grow-1 d-flex m-lg-3 justify-content-center">
            <Image 
              src={sideImage} 
              alt="Ilustração do projeto" 
              width={500} 
              height={500} 
              className="img-fluid"
              priority
            />
          </div>

        </div>
      </div>
    </>
  );
}
