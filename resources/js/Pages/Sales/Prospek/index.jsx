import React from 'react';
import DealButton from '../Components/DealButton';
import Skeleton from '@/Components/Skeleton';

export default function Index({ prospeks }) {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Data Prospek</h1>

            {prospeks.map(p => (
                <div key={p.id} className="bg-white p-4 mb-2 rounded shadow">
                    <p>{p.nama}</p>
                    <p>{p.no_hp}</p>
                    <p>{p.produk}</p>
                </div>
            ))}
        </div>
    );
}