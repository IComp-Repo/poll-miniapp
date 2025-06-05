import Image from 'next/image';
import logo from '../assets/logo.png'; // Ajuste o caminho se necessário
import styles from "../styles/useGlobal.module.css"; // Ajuste o caminho se necessário

export default function Header({title}) {

  return (
    <header className={styles.waveHeader}>
      <Image src={logo} alt="Logo" width={130} height={130} />
      <h1 className={styles.title}>{title}</h1>
      <div className="wave-shape"></div>
    </header>
  );
}
