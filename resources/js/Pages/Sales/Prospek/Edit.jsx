import SalesLayout from "@/Layouts/SalesLayout";

import { useForm, Link } from "@inertiajs/react";

import {
    ArrowLeft,
    Save,
} from "lucide-react";

export default function Edit({
    prospek,
    products,
    regions,
}) {

    const { data, setData, put, processing, errors } = useForm({

        nama: prospek.nama || "",

        no_hp: prospek.no_hp || "",

        jenis_customer:
            prospek.jenis_customer || "perorangan",

        email: prospek.email || "",

        alamat: prospek.alamat || "",

        catatan: prospek.catatan || "",

        product_id: prospek.product_id || "",

        region_id: prospek.region_id || "",

        status: prospek.status || "lead",

    });

    const submit = (e) => {

        e.preventDefault();

        put(`/sales/prospek/${prospek.id}`);

    };

    return (
        <SalesLayout>

            <div className="min-h-screen bg-gray-50 p-6">

                {/* HEADER */}
                <div className="mb-6">

                    <Link
                        href="/sales/prospek"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                    >

                        <ArrowLeft size={16} />

                        Kembali

                    </Link>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Prospek
                    </h1>

                    <p className="mt-1 text-gray-400">
                        Update data customer dan pipeline sales
                    </p>

                </div>

                {/* FORM */}
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >

                        {/* NAMA */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Nama Customer

                            </label>

                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) =>
                                    setData(
                                        "nama",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            />

                            {errors.nama && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.nama}
                                </p>
                            )}

                        </div>

                        {/* JENIS CUSTOMER */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Jenis Customer

                            </label>

                            <select
                                value={data.jenis_customer}
                                onChange={(e) =>
                                    setData(
                                        "jenis_customer",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            >

                                <option value="personal">
                                    Personal
                                </option>

                                <option value="perusahaan">
                                    Perusahaan
                                </option>

                                <option value="umkm">
                                    UMKM
                                </option>

                                <option value="toko">
                                    Toko
                                </option>

                                <option value="reseller">
                                    Reseller
                                </option>

                            </select>

                        </div>

                        {/* NO HP */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Nomor HP

                            </label>

                            <input
                                type="text"
                                value={data.no_hp}
                                onChange={(e) =>
                                    setData(
                                        "no_hp",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Email

                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData(
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* PRODUK */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Produk

                            </label>

                            <select
                                value={data.product_id}
                                onChange={(e) =>
                                    setData(
                                        "product_id",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            >

                                <option value="">
                                    Pilih Produk
                                </option>

                                {products.map((product) => (

                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >

                                        {product.brand}{" "}
                                        {product.type}

                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* REGION */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Wilayah

                            </label>

                            <select
                                value={data.region_id}
                                onChange={(e) =>
                                    setData(
                                        "region_id",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            >

                                <option value="">
                                    Pilih Wilayah
                                </option>

                                {regions.map((region) => (

                                    <option
                                        key={region.id}
                                        value={region.id}
                                    >

                                        {region.nama_region}

                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* STATUS */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Status Pipeline

                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData(
                                        "status",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
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

                        </div>

                        {/* ALAMAT */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Alamat

                            </label>

                            <textarea
                                rows="3"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData(
                                        "alamat",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* CATATAN */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Catatan Sales

                            </label>

                            <textarea
                                rows="4"
                                value={data.catatan}
                                onChange={(e) =>
                                    setData(
                                        "catatan",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* BUTTON */}
                        <div className="pt-4">

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                            >

                                <Save size={18} />

                                {processing
                                    ? "Menyimpan..."
                                    : "Update Prospek"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </SalesLayout>
    );
}