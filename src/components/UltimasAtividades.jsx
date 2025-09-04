import styles from '@/styles/useGlobal.module.css';
import { ChartBarIcon } from 'lucide-react';
import DataTable from 'react-data-table-component';

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#fff',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#003366',
        },
    },
    rows: {
        style: {
            fontSize: '14px',
            color: '#333',
            minHeight: '50px',
        },
    },
    table: {
        style: {
            borderRadius: '8px',
        },
    },
};

const columns = [
    {
        name: 'Título',
        selector: row => row.title,
    },
    {
        name: 'Tipo',
        selector: row => row.type,
    },
    {
        name: 'Data',
        selector: row => row.date,
    },
    {
        name: 'Respostas',
        selector: row => row.answers ? row.answers : 'Nenhuma resposta',
    },
    {
        name: 'Ações',
        cell: row => (
            <button
                className={styles.buttonAction}
                onClick={() => alert(`Ação para ${row.title}`)}
            >
                Detalhes
                <ChartBarIcon width={20} height={20} style={{ marginLeft: '6px' }} />
            </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export default function UltimasAtividades({ data }) {
    return (
        <div
            className={`${styles.cardHover} shadow rounded`}
            style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '1300px',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                margin: '16px auto',
                fontSize: '14px',
                color: '#333',
                whiteSpace: 'normal',
            }}
        >
            <DataTable
                keyField="id"
                customStyles={customStyles}
                columns={columns}
                data={data ?? []}
                highlightOnHover
                striped
                noDataComponent="Sem atividades recentes"
            />
        </div>
    );
}
