import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../assets/logo.png';
import styles from "../styles/useGlobal.module.css";

export default function Header({ title, showMenu = true }) {
  const router = useRouter()
  return (
    <header className={styles.waveHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logoTitle}>
          <Image src={logo} alt="Logo" style={{cursor: 'pointer'}} width={70} height={70} onClick={() => router.push('/menu')}/>
          <h1 className={styles.title} onClick={() => router.push('/menu')}>{title}</h1>
        </div>

        {showMenu && (
          <nav className={styles.navMenu}>
            <Link href="/CreatePolls" className={styles.navItem}>Criar Enquete</Link>
            <Link href="/createQuizz" className={styles.navItem}>Criar Quiz</Link>
            <Link href="/logout" className={styles.navItem}>Sair</Link>
          </nav>
        )}
      </div>
      <div className={styles.waveShape}></div>
    </header>
  );
}
