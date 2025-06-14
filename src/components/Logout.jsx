import { useRouter } from 'next/router';
import styles from '../styles/useGlobal.module.css';

export function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
}
