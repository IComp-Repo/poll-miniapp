import Header from "@/components/Header";
import NavBack from "@/components/navBack";
import { dadosIntegrantes, dadosOrientador, dadosTecnologias } from "@/params/dadosProjeto";
import styles from '@/styles/useGlobal.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
    return (
        <>
            <Header title="Knowledge Check Bot" showMenu={true} />
            <NavBack />

            <div className="container">
                <div className="card rounded-4 mb-2 border-0">
                    <div className="card-body p-4">
                        <h1 className={`${styles.SubTitle} text-center mb-4`}>
                            Sobre o Projeto
                        </h1>
                        <p className={`${styles.cardText} text-justify`}>
                            O Knowledge Check Bot é um aplicativo desenvolvido para facilitar a criação e o envio de enquetes e quizzes diretamente para o Telegram...
                        </p>
                        <p className={`${styles.cardText} text-justify`}>
                            Este projeto foi idealizado para atender às necessidades de educadores, empresas e qualquer pessoa que deseje engajar seu público através de perguntas interativas...
                        </p>
                        <p className={`${styles.cardText} text-justify`}>
                            O Knowledge Check Bot é construído utilizando tecnologias modernas como Next.js para o frontend e Python com Django para o backend...
                        </p>
                        <p className={`${styles.cardText} text-justify`}>
                            Estamos comprometidos em fornecer uma ferramenta confiável e eficiente para nossos usuários...
                        </p>
                    </div>
                </div>

                <div className="card rounded-4 mb-5 border-0">
                    <div className="card-body p-4">
                        <h2 className={`${styles.SubTitle} text-center mb-4`}>
                            Integrantes do Projeto
                        </h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 hover-effect 1875rem">
                            {dadosIntegrantes.map((integrante, i) => (
                                <div key={i} className="col">
                                    <a
                                        href={integrante.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link}
                                    >
                                        <div className="p-3 bg-light rounded-3 text-center shadow-sm h-100">
                                            {integrante.name}
                                            <br />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card rounded-4 mb-5 border-0">
                    <div className="card-body p-4 text-center">
                        <h2 className={`${styles.SubTitle} mb-3`}>Orientador</h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 hover-effect 1875rem justify-content-center">
                            {dadosOrientador.map((orientador, i) => (
                                <div key={i} className="col">
                                    <a
                                        href={orientador.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link}
                                    >

                                        <div className="p-3 bg-light rounded-3 text-center shadow-sm h-100">
                                            {orientador.name}
                                            <br />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card rounded-4 border-0">
                    <div className="card-body p-4">
                        <h2 className={`${styles.SubTitle} text-center mb-4`}>
                            Tecnologias Utilizadas
                        </h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 hover-effect 1875rem justify-content-center">
                            {dadosTecnologias.map((tech, i) => (
                                <div key={i} className="col">
                                    <a
                                        href={tech.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link}
                                    >
                                        <div className="p-3 bg-light rounded-3 text-center shadow-sm h-100">
                                            {tech.name}
                                            <br />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
