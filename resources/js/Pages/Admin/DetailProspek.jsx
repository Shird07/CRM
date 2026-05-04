import { usePage, useForm } from "@inertiajs/react";

export default function DetailProspek() {
    const { prospek, activities } = usePage().props;

    const { data, setData, post, processing } = useForm({
        prospek_id: prospek.id,
        product_id: "",
        status: "",
        harga: "",
        note: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post("/activities");
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* 🔹 INFO CUSTOMER */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">
                    {prospek.nama}
                </h2>
                <p className="text-sm text-gray-500">{prospek.no_hp}</p>
                <p className="text-xs text-gray-400">
                    {prospek.nama_region}
                </p>

                <span className={`mt-2 inline-block px-3 py-1 text-xs rounded-full 
                    ${prospek.status === 'win' ? 'bg-green-100 text-green-700' :
                      prospek.status === 'lose' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'}`}>
                    {prospek.status}
                </span>
            </div>

            {/* 🔹 FORM TAMBAH AKTIVITAS */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-3">
                    Tambah Aktivitas
                </h3>

                <form onSubmit={submit} className="space-y-3">

                    <select
                        className="w-full border p-2 rounded"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="">Pilih Status</option>
                        <option value="lead">Lead</option>
                        <option value="follow_up">Follow Up</option>
                        <option value="negosiasi">Negosiasi</option>
                        <option value="deal">Deal</option>
                        <option value="win">Win</option>
                        <option value="lose">Lose</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Harga (opsional)"
                        className="w-full border p-2 rounded"
                        value={data.harga}
                        onChange={(e) => setData("harga", e.target.value)}
                    />

                    <textarea
                        placeholder="Catatan aktivitas..."
                        className="w-full border p-2 rounded"
                        value={data.note}
                        onChange={(e) => setData("note", e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>
                </form>
            </div>

            {/* 🔹 TIMELINE AKTIVITAS */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-4">
                    Timeline Aktivitas
                </h3>

                <div className="space-y-4">
                    {activities.map((a) => (
                        <div key={a.id} className="border-l-2 pl-4 relative">

                            <div className="absolute -left-[6px] top-1 w-3 h-3 bg-blue-500 rounded-full" />

                            <p className="text-xs text-gray-400">
                                {a.tanggal}
                            </p>

                            <p className="text-sm font-semibold text-gray-800">
                                {a.status}
                            </p>

                            {a.harga && (
                                <p className="text-sm text-green-600 font-medium">
                                    Rp {Number(a.harga).toLocaleString("id-ID")}
                                </p>
                            )}

                            <p className="text-sm text-gray-600">
                                {a.note}
                            </p>
                        </div>
                    ))}

                    {!activities.length && (
                        <p className="text-sm text-gray-400">
                            Belum ada aktivitas
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}