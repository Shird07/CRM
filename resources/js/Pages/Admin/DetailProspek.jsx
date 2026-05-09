import { usePage } from "@inertiajs/react";

export default function DetailProspek() {
    const { prospek, activities, activitySummary } = usePage().props;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* 🔹 INFO CUSTOMER */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">
                    {prospek.customer_name || prospek.nama}
                </h2>
                <p className="text-sm text-gray-500">{prospek.no_hp}</p>
                <p className="text-xs text-gray-400">
                    {prospek.nama_region}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Sales: {prospek.sales_name || "-"} ({prospek.kode_sales || "-"})
                </p>

                <span className={`mt-2 inline-block px-3 py-1 text-xs rounded-full 
                    ${prospek.status === 'win' ? 'bg-green-100 text-green-700' :
                      prospek.status === 'lose' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'}`}>
                    {prospek.status}
                </span>
            </div>

            {/* 🔹 RINGKASAN AKTIVITAS SALES */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-3">
                    Ringkasan Aktivitas Sales
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Total Aktivitas</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalActivities || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Total Penawaran</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalPenawaran || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Follow Up</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalFollowUp || 0}</p>
                    </div>
                    <div className="border rounded-lg p-3">
                        <p className="text-xs text-gray-400">Closing Win</p>
                        <p className="text-lg font-bold text-gray-800">{activitySummary?.totalWin || 0}</p>
                    </div>
                </div>
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
                                {a.activity_summary}
                            </p>
                            <p className="text-sm text-gray-500">
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