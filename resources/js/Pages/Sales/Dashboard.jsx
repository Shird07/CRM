import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Dashboard({
    reminders = [],
    totalProspek = 0,
    totalWin = 0,
    totalLose = 0,
    conversion = 0,
    chart = {}
}) {

    const data = {
        labels: Object.keys(chart),
        datasets: [
            {
                label: 'Deal per bulan',
                data: Object.values(chart),
                borderRadius: 8,
            }
        ]
    };

    return (
        <div className="animate-fadeIn min-h-screen p-6 bg-gradient-to-br from-[#1e1b4b] via-[#3b0764] to-[#6d28d9] text-white">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6">
                🚀 Sales Dashboard
            </h1>

            {/* 🔔 REMINDER */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">
                    🔔 Follow Up Hari Ini
                </h2>

                {reminders.length === 0 && (
                    <p className="text-gray-300">
                        Tidak ada follow up hari ini
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-3">
                    {reminders.map(r => (
                        <div
                            key={r.id}
                            className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 hover:scale-[1.02] transition"
                        >
                            <p className="font-bold">{r.prospek.nama}</p>
                            <p className="text-sm text-gray-300">{r.catatan}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📊 STAT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div className="card">
                    <p>Total Prospek</p>
                    <h2>{totalProspek}</h2>
                </div>

                <div className="card bg-green-500/20">
                    <p>Deal (WIN)</p>
                    <h2>{totalWin}</h2>
                </div>

                <div className="card bg-red-500/20">
                    <p>Lose</p>
                    <h2>{totalLose}</h2>
                </div>

                <div className="card bg-purple-500/20">
                    <p>Conversion</p>
                    <h2>{conversion}%</h2>
                </div>

            </div>

            {/* 📈 CHART */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <Bar data={data} />
            </div>

        </div>
    );
}