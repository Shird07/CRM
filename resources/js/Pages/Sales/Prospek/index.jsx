import React from 'react';
import DealButton from '../Components/DealButton';
import Skeleton from '@/Components/Skeleton';

import { useForm } from '@inertiajs/react';

export default function Index({ prospeks }) {

    const { post } = useForm();

    const badgeColor = (stage) => {
        switch(stage) {
            case 'lead': return 'bg-gray-400';
            case 'follow_up': return 'bg-blue-500';
            case 'negosiasi': return 'bg-yellow-500';
            case 'deal': return 'bg-purple-500';
            case 'win': return 'bg-green-500';
            case 'lose': return 'bg-red-500';
        }
    };

    return (
        <div className="p-6 text-white">
            <h1 className="text-xl font-bold mb-4">Data Prospek</h1>

            {prospeks.map(p => (
                <div key={p.id} className="bg-white p-4 mb-2 rounded shadow">
                    <p>{p.nama}</p>
                    <p>{p.no_hp}</p>
                    <p>{p.produk}</p>
                </div>
            ))}

            <h1 className="text-2xl mb-4 font-bold">
                Data Prospek
            </h1>

            <table className="w-full border border-white/20 rounded overflow-hidden">

                <thead className="bg-white/10">
                    <tr>
                        <th className="p-2">Nama</th>
                        <th className="p-2">No HP</th>
                        <th className="p-2">Produk</th>
                        <th className="p-2">Stage</th>
                    </tr>
                </thead>

                <tbody>
                    {prospeks.map(p => (
                        <tr key={p.id} className="border-t border-white/10">

                            <td className="p-2">{p.nama}</td>
                            <td className="p-2">{p.no_hp}</td>
                            <td className="p-2">{p.product?.name}</td>

                            <td className="p-2 flex items-center gap-2">

                                <span className={`px-2 py-1 rounded text-xs ${badgeColor(p.stage)}`}>
                                    {p.stage}
                                </span>

                                <select
                                    value={p.stage}
                                    onChange={(e) =>
                                        post(`/sales/prospek/${p.id}/stage`, {
                                            stage: e.target.value
                                        })
                                    }
                                    className="bg-black text-white p-1 rounded"
                                >
                                    <option value="lead">Lead</option>
                                    <option value="follow_up">Follow Up</option>
                                    <option value="negosiasi">Negosiasi</option>
                                    <option value="deal">Deal</option>
                                    <option value="win">Win</option>
                                    <option value="lose">Lose</option>
                                </select>

                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}