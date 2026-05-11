import SalesLayout from "@/Layouts/SalesLayout";
import { useForm } from "@inertiajs/react";

export default function Create({ products, regions }) {

    const { data, setData, post, processing, errors } = useForm({

        nama: "",
        no_hp: "",
        jenis_customer: "",
        email: "",
        alamat: "",
        catatan: "",
        product_id: "",
        region_id: "",

    });

    const submit = (e) => {
        e.preventDefault();

        post("/sales/prospek");
    };

    return (
        <SalesLayout>

            <div className="p-6">

                {/* HEADER */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Tambah Prospek
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Tambahkan customer baru ke pipeline sales
                    </p>

                </div>

                {/* FORM */}
                <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >

                        {/* NAMA */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Nama Customer
                            </label>

                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                                placeholder="PT Maju Bersama / Budi Santoso"
                            />

                            {errors.nama && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.nama}
                                </p>
                            )}

                        </div>

                        {/* JENIS CUSTOMER */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Jenis Customer
                            </label>

                            <select
                                value={data.jenis_customer}
                                onChange={(e) =>
                                    setData("jenis_customer", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                            >

                                <option value="">
                                    Pilih Jenis Customer
                                </option>

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

                        {/* NOMOR HP */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Nomor HP
                            </label>

                            <input
                                type="text"
                                value={data.no_hp}
                                onChange={(e) =>
                                    setData("no_hp", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                                placeholder="08123456789"
                            />

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                                placeholder="customer@email.com"
                            />

                        </div>

                        {/* PRODUK */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Produk
                            </label>

                            <select
                                value={data.product_id}
                                onChange={(e) =>
                                    setData("product_id", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                            >

                                <option value="">
                                    Pilih Produk
                                </option>

                                {products.map((product) => (

                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.brand} {product.type}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* WILAYAH */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Wilayah
                            </label>

                            <select
                                value={data.region_id}
                                onChange={(e) =>
                                    setData("region_id", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
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

                        {/* ALAMAT */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Alamat
                            </label>

                            <textarea
                                rows="3"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                                placeholder="Alamat customer"
                            />

                        </div>

                        {/* CATATAN */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Catatan Sales
                            </label>

                            <textarea
                                rows="4"
                                value={data.catatan}
                                onChange={(e) =>
                                    setData("catatan", e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-blue-500"
                                placeholder="Catatan follow up atau kebutuhan customer"
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                        >

                            {processing
                                ? "Menyimpan..."
                                : "Simpan Prospek"}

                        </button>

                    </form>

                </div>

            </div>

        </SalesLayout>
    );
}