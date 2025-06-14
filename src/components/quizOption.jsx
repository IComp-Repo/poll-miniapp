import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Xmark from '../assets/circulo-xmark.png';
import styles from "../styles/useGlobal.module.css";


function QuizOption({ handleChange, handleRemove, text, id, correctOption, setCorrectOption }) {
  return (
    <div className="d-flex align-items-center w-50" style={{ marginBottom: '10px' }}>
      <OverlayTrigger
        placement="auto"
        overlay={<Tooltip id={`tooltip-radio-${id}`}>Marcar como resposta correta</Tooltip>}
      >
        <label className={`${styles.customRadio}`}>
          <input
            type="radio"
            name="correctAnswer"
            checked={correctOption === id}
            onChange={() => setCorrectOption(id)}
          />
          <span className={styles.radioMark}></span>
        </label>
      </OverlayTrigger>

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

export default QuizOption;
