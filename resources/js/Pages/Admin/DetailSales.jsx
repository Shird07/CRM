import { usePage, router } from "@inertiajs/react";

export default function DetailSales() {
    const { sales, activitySummary } = usePage().props;
    const initials = (sales?.name || "S").slice(0, 1).toUpperCase();
    const hasPhoto = Boolean(sales?.foto_url);

    const biodata = [
        { label: "Nama Lengkap", value: sales?.name || "-" },
        { label: "Alamat", value: sales?.alamat || "-" },
        { label: "Jenis Kelamin", value: sales?.jenis_kelamin || "-" },
        { label: "Email", value: sales?.email || "-" },
        { label: "Kode Sales", value: sales?.kode_sales || "-" },
        { label: "Regional", value: sales?.nama_region || "-" },
        { label: "Kode Regional", value: sales?.kode_region || "-" },
        { label: "Status", value: sales?.status || "aktif" },
    ];

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Rincian Akun Sales</h1>
                    <p className="text-xs text-gray-400">Profil sales dan regional tempat sales bernaung</p>
                </div>
                <button
                    onClick={() => router.visit("/admin")}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Kembali
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                        {hasPhoto ? (
                            <img
                                src={sales.foto_url}
                                alt={`Foto ${sales.name}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-300 text-xs">
                                Foto
                                <br />
                                kosong
                            </div>
                        )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mt-3">{sales.name}</h2>
                    <p className="text-xs text-gray-400">ID Sales: {sales.id || "-"}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Diri Sales</h3>
                <div className="divide-y divide-gray-100">
                    {biodata.map((item) => (
                        <div key={item.label} className="py-3 flex flex-col">
                            <span className="text-xs text-gray-400">{item.label}</span>
                            <span className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Ringkasan Aktivitas Sales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Total Prospek</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalProspeks || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Total Aktivitas</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalAktivitas || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Total Penawaran</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalPenawaran || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Closing Win</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalWin || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
