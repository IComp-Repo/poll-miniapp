import styles from '@/styles/useGlobal.module.css';
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

export default function AgendamentoModal({
    show,
    onClose,
    onConfirm,
}: {
    show: boolean;
    onClose: () => void;
    onConfirm: (dataHora: string | null) => void;
}) {

    const [data, setData] = useState("");
    const [hora, setHora] = useState("");

    const handleAgendar = () => {
        if (!data || !hora) return;

        const dataHora = `${data}T${hora}`;
        onConfirm(dataHora);
        onClose();
    };

    const handleEnviarAgora = () => {
        onConfirm(null);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered style={{ border: 'none' }}>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#01325B' }}>Agendar envio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#01325B', fontWeight: '500' }}>
                            Data
                        </Form.Label>
                        <Form.Control
                            type="date"
                            className={styles.input}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ color: '#01325B', fontWeight: '500' }}>
                            Hora
                        </Form.Label>
                        <Form.Control
                            type="time"
                            className={styles.input}
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={styles.btnCancelar} onClick={onClose}>
                    Cancelar
                </Button>
                <Button className={styles.btnEnviarAgora} onClick={handleEnviarAgora}>
                    Enviar Agora
                </Button>
                <Button
                    className={styles.btnAgendar}
                    onClick={handleAgendar}
                    disabled={!data || !hora}
                >
                    Agendar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
