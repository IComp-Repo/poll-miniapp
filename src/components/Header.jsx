import { useAuth } from '@/shared/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../assets/logo.png';
import styles from "../styles/useGlobal.module.css";

export default function Header({ title, showMenu = true }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <header className={styles.waveHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logoTitle}>
          <Image
            src={logo}
            alt="Logo"
            style={{ cursor: 'pointer' }}
            width={70}
            height={70}
            onClick={() => router.push('/menu')}
          />
          <h1 className={styles.title} onClick={() => router.push('/menu')}>
            {title}
          </h1>
        </div>

        {showMenu && (
          <div className={styles.rightContent}>
            <nav className={styles.navMenu}>
              <Link href="/createPolls" className={styles.navItem}>Criar Enquete</Link>
              <Link href="/createQuizz" className={styles.navItem}>Criar Quiz</Link>
              <Link href="/dashboard" className={styles.navItem}>Dashboard</Link>
              <Link href="/logout" className={styles.navItem}>Sair</Link>
            </nav>

            {/* Avatar */}
            <div className={styles.avatar}>
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  width={40}
                  height={40}
                  className={styles.avatarImg}
                  onClick={() => router.push('/menu')}
                />
              ) : (
                <>
                  <div className={styles.avatarFallback} onClick={() => router.push('/menu')}>
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.labelAvatar} onClick={() => router.push('/menu')}>
                    {user?.name}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.waveShape}></div>
    </header>
  );
}
