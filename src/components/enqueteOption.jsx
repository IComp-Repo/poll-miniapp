import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Xmark from '../assets/circulo-xmark.png';
import styles from "../styles/useGlobal.module.css";

function EnqueteOption({ handleChange, handleRemove, text, id }) {
  return (
    <div className="d-flex align-items-center w-50" style={{ marginBottom: '10px' }}>
      <label htmlFor={`quiz-option-${id}`} className="visually-hidden">
        Matrícula UFAM
      </label>
      <input
        id={`quiz-option-${id}`}
        className={styles.input}
        type="text"
        placeholder="Texto da opção"
        value={text}
        onChange={(e) => handleChange(id, e.target.value)}
      />
      <Image
        src={Xmark}
        width={28}
        height={28}
        style={{ cursor: 'pointer', marginLeft: '15px', color: '#D95858' }}
        alt="Remover opção"
        onClick={() => handleRemove(id)}
        type="button"
        aria-label="Remover opção"
      />
    </div>
  );
}

export default EnqueteOption;
