import { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function FileUploader({ handleFileUpload }: any) {
  const [fileName, setFileName] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      handleFileUpload(file);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      handleFileUpload(file);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileName("")
  };

  return (
    <div className="text-center mb-4">
      <OverlayTrigger
        placement="auto"
        overlay={<Tooltip id="tooltip-file-upload">Opção de Perguntas em Arquivo JSON</Tooltip>}
      >
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border p-4 rounded"
          style={{
            backgroundColor: "#E05F00",
            color: "white",
            cursor: "pointer",
          }}
        >
          <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
            <strong>Clique ou arraste um arquivo JSON aqui</strong>
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".json"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </div>
      </OverlayTrigger>

      {fileName && (
        <p className="text-muted mt-2">
          <strong>{fileName}</strong>
        </p>
      )}
    </div>
  );
}
