import { useRouter } from 'next/router';
import { useAuth } from "../shared/context/AuthContext";
import styles from '../styles/useGlobal.module.css';

export function Logout() {
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout()
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
}
