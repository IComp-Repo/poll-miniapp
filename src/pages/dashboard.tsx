import CerebroIcon from "@/assets/cerebro-interrogacao.svg";
import EnqueteIcon from "@/assets/enquete-dashboard.svg";
import UsersIcon from "@/assets/usuarios.svg";
import GraficoReposta from "@/components/GraficoResposta";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import UltimasAtividades from "@/components/UltimasAtividades";

const json = [{
    title: "Total Enquetes",
    value: 25,
}, {
    title: "Total Quizzes",
    value: 25,
}, {
    title: "Participantes",
    value: 25,
}];

const data = [
    { dia: 'Seg', respostas: 20 },
    { dia: 'Ter', respostas: 20 },
    { dia: 'Qua', respostas: 60 },
    { dia: 'Qui', respostas: 40 },
    { dia: 'Sex', respostas: 0 },
];

const dadosAtividades = [
    {
        id: 1,
        title: 'Enquete sobre cosmologia',
        type: 'Enquete',
        date: '25/06/2025',
        answers: '',
    },
]

export default function Dashboard() {
    return (
        <>
            <Header title="Knowledge Check Bot" showMenu={true} />

            <div className="container mt-4 d-flex justify-content-between gap-4 ">
                {json.map((item, index) => (
                    <StatCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        icon={
                            item.title === "Total Enquetes" ? <EnqueteIcon width={32} height={32} /> :
                                item.title === "Total Quizzes" ? <CerebroIcon width={32} height={32} /> :
                                    <UsersIcon width={32} height={32} />
                        }
                    />
                ))}
            </div>

            <div className="container mt-4 d-flex justify-content-center">
                <GraficoReposta
                    title="Respostas por dia"
                    data={data}
                    xAxisKey="dia"
                    yAxisKey="respostas"
                />
            </div>
            <div className="container d-flex ">
            <h3 style={{ color: '#003366', marginTop: '10px' }}>Últimas Atividades</h3>
            </div>
            <div className="container d-flex justify-content-center">
                <UltimasAtividades data={dadosAtividades}/>
            </div>
        </>
    );
}
