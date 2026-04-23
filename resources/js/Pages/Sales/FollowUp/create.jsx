import { useForm } from '@inertiajs/react';

export default function Create({ prospek_id }) {
    const { data, setData, post } = useForm({
        prospek_id,
        tanggal: '',
        catatan: '',
        status: '',
        next_follow_up: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/sales/follow-up');
    };

    return (
        <form onSubmit={submit} className="p-6 space-y-3">

            <input
                type="date"
                onChange={e => setData('tanggal', e.target.value)}
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
                <option value="">Pilih Status</option>
                <option value="menunggu">Menunggu</option>
                <option value="tertarik">Tertarik</option>
                <option value="tidak_tertarik">Tidak Tertarik</option>
            </select>

            <input
                type="date"
                onChange={e => setData('next_follow_up', e.target.value)}
                className="border p-2 w-full"
            />

            <button className="bg-purple-600 text-white px-4 py-2 rounded">
                Simpan
            </button>

        </form>
    );
}