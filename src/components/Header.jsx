import Image from 'next/image';
import logo from '../assets/logo.png';
import styles from "../styles/useGlobal.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.waveHeader}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="Logo" width={80} height={80} />

        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.waveShape}></div>
    </header>
  );
}
