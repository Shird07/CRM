import { useForm } from '@inertiajs/react';

export default function Create({ prospek_id }) {
    const { data, setData, post } = useForm({
        prospek_id,
        harga: '',
        catatan: '',
        status: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/sales/penawaran');
    };

    return (
        <form onSubmit={submit} className="p-6 space-y-3">

            <input
                type="number"
                placeholder="Harga"
                onChange={e => setData('harga', e.target.value)}
                className="border p-2 w-full"
            />

            <textarea
                placeholder="Catatan"
                onChange={e => setData('catatan', e.target.value)}
                className="border p-2 w-full"
            />

            <select
                onChange={e => setData('status', e.target.value)}
                className="border p-2 w-full"
            >
                <option value="">Status</option>
                <option value="ditawar">Ditawar</option>
                <option value="pending">Pending</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
            </select>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
                Simpan Penawaran
            </button>

        </form>
    );
}