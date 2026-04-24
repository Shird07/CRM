import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Menu,
    Sun,
    Moon
} from 'lucide-react';

export default function AppLayout({ children }) {

    const { url, props } = usePage();
    const [open, setOpen] = useState(true);
    const [dark, setDark] = useState(true);

    const isActive = (path) =>
        url.startsWith(path)
            ? 'bg-white/20 text-white'
            : 'text-gray-300 hover:bg-white/10';

    const toggleTheme = () => {
        setDark(!dark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`${dark ? 'dark' : ''} flex min-h-screen bg-gray-100

            {/* SIDEBAR */}
            <aside className={`${open ? 'w-64' : 'w-20'} transition-all duration-300 bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-4`}>

                {/* TOGGLE */}
                <button onClick={() => setOpen(!open)} className="mb-6">
                    <Menu />
                </button>

                {/* MENU */}
                <nav className="space-y-3">

                    <div className="group relative">
                        <Link
                            href="/sales"
                            className={`flex items-center gap-3 p-2 rounded ${isActive('/sales')}`}
                        >
                            <LayoutDashboard size={20} />
                            {open && <span>Dashboard</span>}
                        </Link>

                        {!open && (
                            <span className="tooltip">Dashboard</span>
                        )}
                    </div>

                    <div className="group relative">
                        <Link
                            href="/sales/prospeks"
                            className={`flex items-center gap-3 p-2 rounded ${isActive('/sales/prospeks')}`}
                        >
                            <Users size={20} />
                            {open && <span>Prospek</span>}
                        </Link>

                        {!open && (
                            <span className="tooltip">Prospek</span>
                        )}
                    </div>

                </nav>

            </aside>

            {/* MAIN */}
            <div className="flex-1">

                {/* NAVBAR */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">

                    <h1 className="font-semibold">
                        CRM Dashboard
                    </h1>

                    <div className="flex items-center gap-4">

                        {/* THEME TOGGLE */}
                        <button onClick={toggleTheme}>
                            {dark ? <Sun /> : <Moon />}
                        </button>

                        {/* USER */}
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="hidden md:block">
                                {props.auth?.user?.name || 'User'}
                            </span>
                        </div>

                        {/* LOGOUT */}
                        <Link href="/logout" method="post" className="text-red-500">
                            Logout
                        </Link>

                    </div>

                </div>

                {/* CONTENT */}
                <main className="p-6 text-gray-900">
                    {children}
                </main>

            </div>

            {/* TOOLTIP STYLE */}
            <style jsx>{`
                .tooltip {
                    position: absolute;
                    left: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: black;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 12px;
                    opacity: 0;
                    pointer-events: none;
                }

                .group:hover .tooltip {
                    opacity: 1;
                }
            `}</style>

        </div>
    );
}