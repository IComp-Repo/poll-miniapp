import About from '@/assets/about.svg';
import Login from '@/assets/entrance.svg';
import Register from '@/assets/icon-register.svg';
import Ilustracao from '@/assets/side-image.jpg';
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
    icon: <Register className={styles.icon} />,
    title: "Criar Conta",
    text: "Registre-se para começar a usar o Knowledge Check Bot.",
    link: "/register",
  },
  {
    icon: <About className={styles.icon} style={{color: "red"}} />,
    title: "Sobre o Projeto",
    text: "Saiba mais sobre o Knowledge Check Bot e suas funcionalidades.",
    link: "/about",
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
          {/* Imagem ilustrativa */}
          <div className="flex-grow-1 d-flex justify-content-center">
            <Image src={Ilustracao} alt="Ilustração" className='ilustracaoImg' width={500} height={500} style={{marginLeft: '10rem'}} />
          </div>
        </div>
      </div>
    </>
  );
}
