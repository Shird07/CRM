import { useForm } from '@inertiajs/react';

export default function DealButton({ prospek_id }) {
    const { post } = useForm();

    return (
        <div className="flex gap-2 mt-3">

            <button
                onClick={() => post('/sales/deal', {
                    prospek_id,
                    status: 'win'
                })}
                className="bg-green-600 text-white px-3 py-1 rounded"
            >
                WIN
            </button>

            <button
                onClick={() => post('/sales/deal', {
                    prospek_id,
                    status: 'lose'
                })}
                className="bg-red-600 text-white px-3 py-1 rounded"
            >
                LOSE
            </button>

        </div>
    );
}