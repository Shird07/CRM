import SalesLayout from "@/Layouts/SalesLayout";

import {
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    User,
    ClipboardList,
} from "lucide-react";

import { Link } from "@inertiajs/react";

export default function Show({ prospek }) {

    const badgeColor = (status) => {

        switch (status) {

            case "lead":
                return "bg-gray-100 text-gray-700";

            case "follow_up":
                return "bg-blue-100 text-blue-700";

            case "negosiasi":
                return "bg-yellow-100 text-yellow-700";

            case "win":
                return "bg-green-100 text-green-700";

            case "lose":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <SalesLayout>

            <div className="min-h-screen bg-gray-50 p-6">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <Link
                            href="/sales/prospek"
                            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                        >

                            <ArrowLeft size={16} />

                            Kembali

                        </Link>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Detail Prospek
                        </h1>

                        <p className="mt-1 text-gray-400">
                            Informasi lengkap customer dan timeline aktivitas
                        </p>

                    </div>

                </div>

                {/* CARD CUSTOMER */}
                <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <div className="mb-3 flex items-center gap-3">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                                    <User
                                        size={24}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {prospek.nama}
                                    </h2>

                                    <p className="text-sm text-gray-400 capitalize">
                                        {prospek.jenis_customer}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* NO HP */}
                                <div className="flex items-start gap-3">

                                    <Phone
                                        size={18}
                                        className="mt-1 text-gray-400"
                                    />

                                    <div>

                                        <p className="text-sm text-gray-400">
                                            Nomor HP
                                        </p>

                                        <p className="font-medium text-gray-700">
                                            {prospek.no_hp}
                                        </p>

                                    </div>

                                </div>

                                {/* EMAIL */}
                                <div className="flex items-start gap-3">

                                    <Mail
                                        size={18}
                                        className="mt-1 text-gray-400"
                                    />

                                    <div>

                                        <p className="text-sm text-gray-400">
                                            Email
                                        </p>

                                        <p className="font-medium text-gray-700">
                                            {prospek.email || "-"}
                                        </p>

                                    </div>

                                </div>

                                {/* WILAYAH */}
                                <div className="flex items-start gap-3">

                                    <MapPin
                                        size={18}
                                        className="mt-1 text-gray-400"
                                    />

                                    <div>

                                        <p className="text-sm text-gray-400">
                                            Wilayah
                                        </p>

                                        <p className="font-medium text-gray-700">
                                            {prospek.region?.nama_region || "-"}
                                        </p>

                                    </div>

                                </div>

                                {/* PRODUK */}
                                <div className="flex items-start gap-3">

                                    <ClipboardList
                                        size={18}
                                        className="mt-1 text-gray-400"
                                    />

                                    <div>

                                        <p className="text-sm text-gray-400">
                                            Produk
                                        </p>

                                        <p className="font-medium text-gray-700">
                                            {prospek.product
                                                ? `${prospek.product.brand} ${prospek.product.type}`
                                                : "-"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${badgeColor(
                                    prospek.status
                                )}`}
                            >

                                {prospek.status}

                            </span>

                        </div>

                    </div>

                    {/* ALAMAT */}
                    <div className="mt-8 border-t border-gray-100 pt-6">

                        <p className="mb-2 text-sm text-gray-400">
                            Alamat
                        </p>

                        <p className="text-gray-700">
                            {prospek.alamat || "-"}
                        </p>

                    </div>

                    {/* CATATAN */}
                    <div className="mt-6">

                        <p className="mb-2 text-sm text-gray-400">
                            Catatan Sales
                        </p>

                        <div className="rounded-2xl bg-gray-50 p-4 text-gray-700">

                            {prospek.catatan || "Belum ada catatan"}

                        </div>

                    </div>

                </div>

                {/* TIMELINE */}
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Timeline Activity
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Riwayat aktivitas sales terhadap customer
                            </p>

                        </div>

                    </div>

                    <div className="space-y-4">

                        {prospek.activities?.length > 0 ? (

                            prospek.activities.map((activity) => (

                                <div
                                    key={activity.id}
                                    className="rounded-2xl border border-gray-100 p-5"
                                >

                                    <div className="flex items-start justify-between">

                                        <div>

                                            <h3 className="font-semibold text-gray-800">
                                                {activity.note}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {activity.created_at}
                                            </p>

                                        </div>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">

                                            {activity.status}

                                        </span>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center">

                                <p className="text-gray-400">
                                    Belum ada activity
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </SalesLayout>
    );
}