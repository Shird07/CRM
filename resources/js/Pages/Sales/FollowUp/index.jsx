export default function Index({ prospek }) {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">
                Follow Up - {prospek.nama}
            </h1>

            {prospek.follow_ups.map(f => (
                <div key={f.id} className="bg-white p-4 mt-2 rounded shadow">
                    <p>{f.tanggal}</p>
                    <p>{f.catatan}</p>
                    <p>{f.status}</p>
                </div>
            ))}
        </div>
    );
}