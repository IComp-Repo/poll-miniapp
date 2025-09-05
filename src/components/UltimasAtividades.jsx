import styles from "@/styles/useGlobal.module.css";
import { ChartBarIcon } from "lucide-react";
import { useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#003366",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      color: "#333",
      minHeight: "50px",
    },
  },
  table: {
    style: {
      borderRadius: "8px",
    },
  },
};

export default function UltimasAtividades({ data }) {
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleShow = (row) => {
    setSelectedRow(row);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedRow(null);
  };

  const columns = [
    {
      name: "Título",
      selector: (row) => row.title,
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
    },
    {
      name: "Data",
      selector: (row) => row.date,
      sortable: true,
      sortFunction: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      name: "Respostas",
      selector: (row) => (row.answers ? row.answers : "Nenhuma resposta"),
    },
    {
      name: "Ações",
      cell: (row) => (
        <button
          className={styles.buttonAction}
          onClick={() => handleShow(row)}
        >
          Detalhes
          <ChartBarIcon width={20} height={20} style={{ marginLeft: "6px" }} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const total = selectedRow?.answers ?? 0;
  const correctPct = total > 0 && selectedRow ? Math.round((selectedRow.correct / total) * 100) : 0;
  const wrongPct = total > 0 && selectedRow ? Math.round((selectedRow.wrong / total) * 100) : 0;

  return (
    <>
      {/* Card com tabela */}
      <div
        className={`${styles.cardHover} shadow rounded`}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "1300px",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          margin: "16px auto",
          fontSize: "14px",
          color: "#333",
          whiteSpace: "normal",
        }}
      >
        <DataTable
          keyField="id"
          customStyles={customStyles}
          columns={columns}
          data={data ?? []}
          pagination={data && data.length > 5}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5]}
          order
          highlightOnHover
          striped
          noDataComponent="Sem atividades recentes"
        />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#003366', fontSize: '20px' }}>Detalhes da atividade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow ? (
            <div>
              <p>
                <strong style={{ color: '#003366' }}>Título:</strong> {selectedRow.title}
              </p>
              <p>
                <strong style={{ color: '#003366' }}>Tipo:</strong> {selectedRow.type}
              </p>
              <p>
                <strong style={{ color: '#003366' }}>Data:</strong> {selectedRow.date}
              </p>
              <p>
                <strong style={{ color: '#003366' }}>Total de respostas:</strong>{" "}
                {selectedRow.answers ?? "Nenhuma resposta"}
              </p>
              <h6 className="mt-3" style={{ color: '#e05800', fontWeight: 'bold' }}>Distribuição das respostas</h6>
              <div className="mb-3">
                <p className="mb-1" style={{ fontWeight: 'bold' }}>Respostas certas</p>
                <ProgressBar now={correctPct} label={`${correctPct}%`} style={{ fontSize: '9px' }} variant="success" />
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Respostas erradas</p>
                <ProgressBar now={wrongPct} label={`${wrongPct}%`} style={{ fontSize: '9px' }} variant="danger" />
              </div>
            </div>
          ) : (
            <p>Nenhum dado selecionado</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor: '#D95858', color: 'white', border: 'none'}} onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
