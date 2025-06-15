import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../styles/useGlobal.module.css";

export default function NavBack() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className={styles.backButton}
        aria-label="Voltar"
      >
        <FiArrowLeft size={24} />
      </button>
    </>
  );
}
