import React from "react";

import SalesLayout from "@/Layouts/SalesLayout";

import {
    Link,
    router,
    useForm,
} from "@inertiajs/react";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

export default function Index({ prospeks }) {

    const { delete: destroy } = useForm();

    /*
    |--------------------------------------------------------------------------
    | STATUS BADGE
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    const updateStatus = (id, status) => {

        router.post(
            `/sales/prospek/${id}/stage`,
            {
                stage: status,
            },
            {
                preserveScroll: true,
            }
        );

    };

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const deleteProspek = (id) => {

        if (confirm("Hapus prospek ini?")) {

            destroy(`/sales/prospek/${id}`);

        }

    };

    return (
        <SalesLayout>

            <div className="min-h-screen bg-gray-50 p-6">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Data Prospek
                        </h1>

                        <p className="mt-1 text-sm text-gray-400">
                            Monitoring customer dan pipeline sales
                        </p>

                    </div>

                    <Link
                        href="/sales/prospek/create"
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
                    >

                        <Plus size={16} />

                        Tambah Prospek

                    </Link>

                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="border-b border-gray-100 bg-gray-50">

                                <tr className="text-left text-sm text-gray-500">

                                    <th className="px-6 py-4 font-semibold">
                                        Customer
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Produk
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Wilayah
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Update Pipeline
                                    </th>

                                    <th className="px-6 py-4 text-center font-semibold">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {prospeks.length > 0 ? (

                                    prospeks.map((p) => (

                                        <tr
                                            key={p.id}
                                            className="border-b border-gray-100 transition hover:bg-gray-50"
                                        >

                                            {/* CUSTOMER */}
                                            <td className="px-6 py-4">

                                                <div>

                                                    <h3 className="font-semibold text-gray-800">
                                                        {p.nama}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {p.no_hp}
                                                    </p>

                                                </div>

                                            </td>

                                            {/* PRODUCT */}
                                            <td className="px-6 py-4">

                                                <div className="text-sm text-gray-700">

                                                    {p.product
                                                        ? `${p.product.brand} ${p.product.type}`
                                                        : "-"}

                                                </div>

                                            </td>

                                            {/* REGION */}
                                            <td className="px-6 py-4">

                                                <div className="text-sm text-gray-700">

                                                    {p.region?.nama_region || "-"}

                                                </div>

                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeColor(
                                                        p.status
                                                    )}`}
                                                >

                                                    {p.status}

                                                </span>

                                            </td>

                                            {/* PIPELINE */}
                                            <td className="px-6 py-4">

                                                <select
                                                    value={p.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            p.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                                                >

                                                    <option value="lead">
                                                        Lead
                                                    </option>

                                                    <option value="follow_up">
                                                        Follow Up
                                                    </option>

                                                    <option value="negosiasi">
                                                        Negosiasi
                                                    </option>

                                                    <option value="win">
                                                        Win
                                                    </option>

                                                    <option value="lose">
                                                        Lose
                                                    </option>

                                                </select>

                                            </td>

                                            {/* ACTION */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center justify-center gap-2">

                                                    {/* DETAIL */}
                                                    <Link
                                                        href={`/sales/prospek/${p.id}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                    >

                                                        <Eye size={16} />

                                                    </Link>

                                                    {/* EDIT */}
                                                    <Link
                                                        href={`/sales/prospek/${p.id}/edit`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 transition hover:bg-yellow-100"
                                                    >

                                                        <Pencil size={16} />

                                                    </Link>

                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() =>
                                                            deleteProspek(
                                                                p.id
                                                            )
                                                        }
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                                    >

                                                        <Trash2 size={16} />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-16 text-center"
                                        >

                                            <p className="text-gray-400">
                                                Belum ada data prospek
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </SalesLayout>
    );
}