import CerebroIcon from "@/assets/cerebro-interrogacao.svg";
import EnqueteIcon from "@/assets/enquete-dashboard.svg";
import UsersIcon from "@/assets/usuarios.svg";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";

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

export default function Dashboard() {
    return (
        <>
            <Header title="Knowledge Check Bot" showMenu={true} />
            <div className="container mt-4 d-flex justify-content-around gap-4">
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
        </>
    );
}