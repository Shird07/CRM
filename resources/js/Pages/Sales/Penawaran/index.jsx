export default function Index({ prospek }) {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">
                Penawaran - {prospek.nama}
            </h1>

            {prospek.penawarans.map(p => (
                <div key={p.id} className="bg-white p-4 mt-2 rounded shadow">
                    <p>Harga: {p.harga}</p>
                    <p>Status: {p.status}</p>
                    <p>{p.catatan}</p>
                </div>
            ))}
        </div>
    );
}