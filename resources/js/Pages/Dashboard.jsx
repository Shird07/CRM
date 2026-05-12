import { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";

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

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

/* =========================
   FORMAT RUPIAH
========================= */
const fmt = (n = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);

/* =========================
   MENU SALES
========================= */
const menuItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        key: "prospek",
        label: "Prospek Saya",
        icon: TrendingUp,
    },
    {
        key: "activities",
        label: "Activities",
        icon: ClipboardList,
    },
    {
        key: "followup",
        label: "Reminder",
        icon: Bell,
    },
];

/* =========================
   SIDEBAR
========================= */
function Sidebar({
    active,
    setActive,
    collapsed,
    setCollapsed,
}) {

    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <aside
            className="flex flex-col border-r border-gray-200 bg-white transition-all duration-300"
            style={{
                width: collapsed ? 72 : 230,
                minHeight: "100vh",
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

                {menuItems.map(({ key, label, icon: Icon }) => {

                    const isActive = active === key;

                    return (
                        <button
                            key={key}
                            onClick={() => setActive(key)}
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all
                                
                                ${
                                    isActive
                                        ? "bg-blue-50 font-semibold text-blue-700"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }
                            `}
                        >

                            <Icon
                                size={17}
                                className={
                                    isActive
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                }
                            />

                            {!collapsed && (
                                <span>{label}</span>
                            )}

                        </button>
                    );
                })}

            </nav>

            {/* FOOTER */}
            <div className="space-y-1 border-t border-gray-100 px-3 py-3">

                <button
                    onClick={() => {
                        if (collapsed) {
                            setCollapsed(false);
                            setSettingsOpen(true);
                        } else {
                            setSettingsOpen(!settingsOpen);
                        }
                    }}
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
                            className={`transition-transform ${
                                settingsOpen ? "rotate-180" : ""
                            }`}
                        />
                    )}

                </button>

                {settingsOpen && !collapsed && (
                    <div className="space-y-1 pl-7">

                        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-800">

                            <User size={14} />

                            <span>Profile</span>

                        </button>

                        <button onClick={() => router.post('/logout')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-700">

                            <LogOut size={14} />

                            <span>Logout</span>

                        </button>

                    </div>
                )}

                <button
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
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
    );
}

/* =========================
   TOPBAR
========================= */
function Topbar() {

    const { auth } = usePage().props;

    return (
        <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">

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

                <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100">

                    <Bell size={16} />

                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-white bg-blue-500" />

                </button>

                <div className="flex items-center gap-2 border-l border-gray-200 pl-3">

                    <div className="hidden text-right sm:block">

                        <p className="text-xs font-semibold text-gray-700">
                            {auth?.user?.name}
                        </p>

                        <p className="text-[10px] text-gray-400">
                            Sales
                        </p>

                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
                        {auth?.user?.name?.charAt(0)}
                    </div>

                </div>

            </div>

        </div>
    );
}

/* =========================
   DASHBOARD PAGE
========================= */
function DashboardPage(props) {

    const {
        totalProspek = 0,
        totalWin = 0,
        totalLose = 0,
        totalRevenue = 0,
        conversion = 0,
        reminders = [],
        chartData = [],
    } = props;

    return (
        <div className="min-h-full space-y-5 bg-gray-50 p-6">

            {/* KPI */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Total Prospek
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-gray-800">
                        {totalProspek}
                    </h1>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Closing Win
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-green-600">
                        {totalWin}
                    </h1>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Total Revenue
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-blue-600">
                        {fmt(totalRevenue)}
                    </h1>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Conversion Rate
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-purple-600">
                        {conversion}%
                    </h1>

                </div>

            </div>

            {/* CHART */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>

                        <h2 className="text-lg font-bold text-gray-800">
                            Sales Analytics
                        </h2>

                        <p className="text-sm text-gray-400">
                            Grafik closing bulanan
                        </p>

                    </div>

                </div>

                <ResponsiveContainer width="100%" height={300}>

                    <AreaChart data={chartData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f1f5f9"
                        />

                        <XAxis
                            dataKey="bulan"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Legend />

                        <Area
                            type="monotone"
                            dataKey="closing"
                            stroke="#3b82f6"
                            fill="#93c5fd"
                            strokeWidth={3}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

            {/* REMINDER */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-lg font-bold text-gray-800">
                        Reminder Follow Up
                    </h2>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                        {reminders.length} Reminder
                    </span>

                </div>

                {reminders.length > 0 ? (

                    <div className="space-y-4">

                        {reminders.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50"
                            >

                                <div>

                                    <h3 className="font-semibold text-gray-800">
                                        {item.prospek?.nama}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {item.note}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="text-sm font-medium text-red-500">
                                        {new Date(
                                            item.next_follow_up
                                        ).toLocaleDateString()}
                                    </p>

                                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                                        {item.status}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">

                        <p className="text-gray-500">
                            Tidak ada reminder follow up
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

/* =========================
   MAIN
========================= */
export default function Dashboard() {

    const [active, setActive] =
        useState("dashboard");

    const [collapsed, setCollapsed] =
        useState(false);

    const { props } = usePage();

    const renderPage = () => {

        switch (active) {

            case "dashboard":
                return <DashboardPage {...props} />;

            case "prospek":
                router.visit("/sales/prospek");
                return null;

            case "activities":
                router.visit("/sales/activities");
                return null;

            case "followup":
                router.visit("/sales/followup");
                return null;

            default:
                return <DashboardPage {...props} />;
        }
    };

    return (
        <>
            <Head title="Sales Dashboard" />

            <div className="flex min-h-screen bg-gray-50 font-sans">

                <Sidebar
                    active={active}
                    setActive={setActive}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <div className="flex flex-1 flex-col overflow-hidden">

                    <Topbar />

                    <main className="flex-1 overflow-auto">

                        {renderPage()}

                    </main>

                </div>

            </div>
        </>
    );
}