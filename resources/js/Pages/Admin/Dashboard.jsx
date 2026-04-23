export default function Dashboard({
    totalProspek,
    totalWin,
    totalLose,
    ranking = []
}) {
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

            <h1 className="text-3xl font-bold mb-6">
                👑 Admin Dashboard
            </h1>

            {/* GLOBAL STATS */}
            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="card">
                    <p>Total Prospek</p>
                    <h2>{totalProspek}</h2>
                </div>

                <div className="card bg-green-500/20">
                    <p>Total Win</p>
                    <h2>{totalWin}</h2>
                </div>

                <div className="card bg-red-500/20">
                    <p>Total Lose</p>
                    <h2>{totalLose}</h2>
                </div>

            </div>

            {/* RANKING SALES */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">

                <h2 className="text-xl font-semibold mb-4">
                    🏆 Ranking Sales
                </h2>

                {ranking.map((s, i) => (
                    <div
                        key={s.id}
                        className="flex justify-between items-center p-3 mb-2 bg-white/5 rounded-lg"
                    >
                        <div>
                            <p className="font-bold">
                                #{i + 1} {s.name}
                            </p>
                            <p className="text-sm text-gray-300">
                                Prospek: {s.prospeks_count}
                            </p>
                        </div>

                        <div className="text-green-400 font-bold">
                            {s.win_count} WIN
                        </div>
                    </div>
                ))}

            </div>

            {/* STYLE */}
            <style jsx>{`
                .card {
                    background: rgba(255,255,255,0.08);
                    padding: 16px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.2);
                }

                .card h2 {
                    font-size: 22px;
                    font-weight: bold;
                    margin-top: 5px;
                }
            `}</style>

        </div>
    );
}