import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div>
                <h1 className="text-2xl font-bold">
                    Dashboard Sales
                </h1>
            </div>
        </>
    );
}

// WAJIB: layout di bawah
Dashboard.layout = page => <AppLayout>{page}</AppLayout>;