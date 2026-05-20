import { useState, useEffect } from "react";

import { Link, usePage } from "@inertiajs/react";
import ProfileButton from "@/Components/ProfileButton";

import {
    LayoutDashboard,
    TrendingUp,
    Bell,
    ClipboardList,
    ChevronLeft,
    ChevronRight,
    Settings,
    User,
    LogOut,
    ChevronDown,
    Search,
} from "lucide-react";

export default function SalesLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    const [settingsOpen, setSettingsOpen] = useState(false);

    const { auth } = usePage().props;

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark' || 
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | MENU ITEMS
    |--------------------------------------------------------------------------
    */

    const menuItems = [
        {
            label: "Dashboard",
            href: "/sales",
            icon: LayoutDashboard,
        },
        {
            label: "Prospek Saya",
            href: "/sales/prospek",
            icon: TrendingUp,
        },
        {
            label: "Activities",
            href: "/sales/activities",
            icon: ClipboardList,
        },
        {
            label: "Reminder",
            href: "/sales/followup",
            icon: Bell,
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">

            {/* SIDEBAR */}
            <aside
                className="flex flex-col border-r border-gray-200 bg-white transition-all duration-300"
                style={{
                    width: collapsed ? 72 : 230,
                }}
            >

                {/* LOGO */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow">

                        <span className="text-sm font-bold text-white">
                            G
                        </span>

                    </div>

                    {!collapsed && (

                        <div>

                            <p className="text-sm font-bold text-gray-800">
                                Gestion CRM
                            </p>

                            <p className="text-[10px] text-gray-400">
                                Sales Panel
                            </p>

                        </div>

                    )}

                </div>

                {/* MENU */}
                <nav className="flex-1 space-y-1 px-3 py-4">

                    {!collapsed && (

                        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Menu
                        </p>

                    )}

                    {menuItems.map((menu, i) => {

                        const Icon = menu.icon;

                        return (

                            <Link
                                key={i}
                                href={menu.href}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-blue-50 hover:text-blue-700"
                            >

                                <Icon size={17} />

                                {!collapsed && (
                                    <span>{menu.label}</span>
                                )}

                            </Link>

                        );
                    })}

                </nav>

                {/* FOOTER */}
                <div className="space-y-1 border-t border-gray-100 px-3 py-3">

                    <button
                        onClick={() =>
                            setSettingsOpen(!settingsOpen)
                        }
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
                    >

                        <div className="flex items-center gap-3">

                            <Settings
                                size={16}
                                className="text-gray-400"
                            />

                            {!collapsed && (
                                <span>Pengaturan</span>
                            )}

                        </div>

                        {!collapsed && (

                            <ChevronDown
                                size={14}
                                className={`transition-transform ${settingsOpen
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />

                        )}

                    </button>

                    {settingsOpen && !collapsed && (

                        <div className="space-y-1 pl-7">

                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50">

                                <User size={14} />

                                <span>Profile</span>

                            </button>

                            <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50">

                                <LogOut size={14} />

                                <span>Logout</span>

                            </Link>

                        </div>

                    )}

                    <button
                        onClick={() =>
                            setCollapsed(!collapsed)
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-50"
                    >

                        {collapsed ? (
                            <ChevronRight size={16} />
                        ) : (
                            <ChevronLeft size={16} />
                        )}

                        {!collapsed && (
                            <span>Collapse</span>
                        )}

                    </button>

                </div>

            </aside>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col overflow-hidden">

                {/* TOPBAR */}
                <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">

                    <div>

                        <h1 className="text-lg font-bold text-gray-800">
                            Sales Dashboard
                        </h1>

                        <p className="text-xs text-gray-400">
                            CRM Monitoring & Analytics
                        </p>

                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100">

                            <Search size={16} />

                        </button>

                        <div className="pl-3 border-l border-gray-200">

                            <ProfileButton />

                        </div>

                    </div>

                </header>

                {/* PAGE */}
                <main className="flex-1 overflow-auto">

                    {children}

                </main>

            </div>

        </div>
    );
}