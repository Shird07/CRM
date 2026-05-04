import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {

    const { props } = usePage();

    return (
        <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <aside className="w-64 bg-purple-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">CRM</h2>

                <nav className="space-y-3">
                    <Link href="/admin" className="block">Dashboard</Link>
                    <Link href="/sales/prospeks" className="block">Prospek</Link>
                </nav>
            </aside>

            {/* MAIN */}
            <div className="flex-1 bg-gray-100">

                {/* NAVBAR */}
                <div className="flex justify-between p-4 bg-white shadow">
                    <h1>Dashboard</h1>

                    <div className="flex gap-3">
                        <span>{props.auth.user.name}</span>

                        <Link href="/logout" method="post" className="text-red-500">
                            Logout
                        </Link>
                    </div>
                </div>

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}