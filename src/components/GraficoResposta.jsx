import styles from '@/styles/useGlobal.module.css';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const data = [
    { dia: 'Seg', respostas: 20 },
    { dia: 'Ter', respostas: 20 },
    { dia: 'Qua', respostas: 60 },
    { dia: 'Qui', respostas: 40 },
    { dia: 'Sex', respostas: 0 },
];

export default function GraficoRespostas() {
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
            <h3 style={{ color: '#003366', margin: 0 }}>Respostas por dia</h3>
            <div style={{ width: '100%', height: 200, marginTop: 8 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                    >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Legend iconType="line" verticalAlign="top" height={36} />
                        <Line
                            type="monotone"
                            dataKey="respostas"
                            stroke="#e86f00"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Respostas"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}
