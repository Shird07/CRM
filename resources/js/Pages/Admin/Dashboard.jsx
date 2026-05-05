import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import {
    LayoutDashboard, Users, MapPin, BarChart2, ShoppingBag,
    TrendingUp, Settings, ChevronLeft, ChevronRight, Bell,
    Search, LogOut, User, Sliders, ChevronDown, ArrowUpRight,
    ArrowDownRight, Target, AlertTriangle, Star, Package,
    RefreshCw, ExternalLink, Menu, X,
} from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, AreaChart, Area,
} from "recharts";

/* ── MOCK DATA ── */
const salesRanking = [
    { id: 1, name: "Demo Sales", regional: "Jakarta", revenue: 48295000 },
    { id: 2, name: "Budi Santoso", revenue: 35100000 },
    { id: 3, name: "Siti Aminah", revenue: 28750000 },
];

const miniBarData = [2, 5, 3, 7, 4, 8, 6, 9, 5, 11, 8, 12];
const miniBarData2 = [3, 4, 6, 5, 8, 7, 9, 6, 10, 8, 11, 10];

const budgetData = [
    { label: "Google Ads", used: 78700, total: 120000, color: "#3b82f6" },
    { label: "TikTok Ads", used: 250000, total: 350000, color: "#6366f1" },
    { label: "Meta Ads", used: 175000, total: 200000, color: "#8b5cf6" },
];

const customerReviews = [
    { name: "Kevin S.", rating: 5, text: "Produk sangat bagus, pengiriman cepat dan pengemasan rapi. Sangat puas!" },
    { name: "Rina T.", rating: 4, text: "Kualitas oke, tapi pengiriman sedikit terlambat. Overall happy!" },
];

const fmt = (n = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0,
    }).format(n);

/* ── MINI BAR INLINE ── */
function MiniBar({ data, color }) {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-[2px] h-8">
            {data.map((v, i) => (
                <div
                    key={i}
                    style={{
                        height: `${(v / max) * 100}%`,
                        width: 4,
                        background: color,
                        borderRadius: 2,
                        opacity: i === data.length - 1 ? 1 : 0.45,
                    }}
                />
            ))}
        </div>
    );
}

/* ── DONUT CHART ── */
function DonutChart({ pct }) {
    const r = 42, c = 2 * Math.PI * r;
    const dash = (pct / 100) * c;
    return (
        <svg width={110} height={110} viewBox="0 0 110 110">
            <circle cx={55} cy={55} r={r} fill="none" stroke="#e5e7eb" strokeWidth={12} />
            <circle
                cx={55} cy={55} r={r} fill="none"
                stroke="#3b82f6" strokeWidth={12}
                strokeDasharray={`${dash} ${c}`}
                strokeLinecap="round"
                transform="rotate(-90 55 55)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
            <text x={55} y={55} textAnchor="middle" dy="0.4em"
                fontSize={14} fontWeight={700} fill="#1e3a5f">
                {pct}%
            </text>
        </svg>
    );
}

/* ── STARS ── */
function Stars({ n }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={12} fill={i <= n ? "#f59e0b" : "none"}
                    stroke={i <= n ? "#f59e0b" : "#d1d5db"} />
            ))}
        </div>
    );
}

/* ── SIDEBAR ── */
const menuItems = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "sales", label: "Akun Sales", icon: Users },
    { key: "wilayah", label: "Wilayah", icon: MapPin },
    { key: "statistik", label: "Statistik", icon: BarChart2 },
    { key: "produk", label: "Produk", icon: ShoppingBag },
    { key: "prospek", label: "Proses Penjualan", icon: TrendingUp },
    { key: "customers", label: "Database Pelanggan", icon: Users },
];

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <aside
            className="flex flex-col border-r border-gray-200 bg-white transition-all duration-300"
            style={{ width: collapsed ? 72 : 220, minHeight: "100vh" }}
        >
            {/* Brand */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow">
                    <span className="text-white font-bold text-xs">G</span>
                </div>
                {!collapsed && (
                    <div>
                        <p className="font-bold text-gray-800 text-sm leading-tight">Gestion</p>
                        <p className="text-[10px] text-gray-400">Admin</p>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-0.5">
                {!collapsed && (
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Menu</p>
                )}
                {menuItems.map(({ key, label, icon: Icon }) => {
                    const isActive = active === key;
                    return (
                        <button key={key} onClick={() => setActive(key)}
                            className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                            ${isActive
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                        >
                            <Icon size={16} className={`flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                            {!collapsed && <span>{label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-100 py-3 px-3 space-y-0.5">
                <button
                    onClick={() => {
                        if (collapsed) { setCollapsed(false); setSettingsOpen(true); setActive("pengaturan-profil"); }
                        else { setSettingsOpen(!settingsOpen); if (!settingsOpen) setActive("pengaturan-profil"); }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition
                    ${active.startsWith("pengaturan") ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <Settings size={16} className={`flex-shrink-0 ${active.startsWith("pengaturan") ? "text-blue-600" : "text-gray-400"}`} />
                        {!collapsed && <span>Pengaturan</span>}
                    </div>
                    {!collapsed && <ChevronDown size={14} className={`transition-transform ${settingsOpen ? "rotate-180" : ""}`} />}
                </button>

                {settingsOpen && !collapsed && (
                    <div className="pl-7 space-y-0.5">
                        <button onClick={() => setActive("pengaturan-profil")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${active === "pengaturan-profil" ? "text-blue-700 bg-blue-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
                            <User size={14} /><span>Profil</span>
                        </button>
                        <button onClick={() => setActive("pengaturan-sistem")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${active === "pengaturan-sistem" ? "text-blue-700 bg-blue-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
                            <Sliders size={14} /><span>Sistem</span>
                        </button>
                        <button onClick={() => {}}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:text-red-700 hover:bg-red-50 transition">
                            <LogOut size={14} /><span>Logout</span>
                        </button>
                    </div>
                )}

                <button onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition">
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}

/* ── TOPBAR ── */
function Topbar({ pageTitle, pageSubtitle }) {
    return (
        <div className="h-14 bg-white border-b border-gray-200 flex justify-between items-center px-6">
            <div>
                <h1 className="font-bold text-gray-800 text-lg leading-tight">{pageTitle}</h1>
                {pageSubtitle && <p className="text-xs text-gray-400">{pageSubtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition">
                    <Search size={16} />
                </button>
                <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition">
                    <Bell size={16} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold text-gray-700">Yanuar Arifin</p>
                        <p className="text-[10px] text-gray-400">Admin</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">YA</div>
                </div>
            </div>
        </div>
    );
}

/* ── DASHBOARD PAGE ── */
function DashboardPage() {
    const { props } = usePage();
    const totalProspek = props.totalProspek ?? 0;
    const totalWin = props.totalWin ?? 0;
    const totalLose = props.totalLose ?? 0;
    const totalRevenue = props.totalRevenue ?? 0;
    const salesTrendData = props.salesTrendData ?? [];
    const ranking = props.ranking ?? [];
    const lowStockItems = props.lowStockItems ?? [];
    const topProducts = props.topProducts ?? [];

    const [timeFilter, setTimeFilter] = useState("bulan_ini");
    const winRate = totalProspek ? Math.round((totalWin / totalProspek) * 100) : 0;
    // Fallback data if DB is empty for demo purposes
    const displayRanking = ranking.length ? ranking : salesRanking;
    const displayTrend = salesTrendData.length ? salesTrendData : salesTrendData; 
    const displayLowStock = lowStockItems.length ? lowStockItems : lowStockItems;
    const displayTopProducts = topProducts ?? [];
    console.log("INI DATA DARI BACKEND:", props);
    const page = usePage();
    console.log(page.props.allSales);


    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Revenue */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">{fmt(totalRevenue)}</h2>
                            <div className="flex items-center gap-1 mt-1">
                                <ArrowUpRight size={12} className="text-green-500" />
                                <span className="text-xs text-green-500 font-medium">+8.2%</span>
                                <span className="text-xs text-gray-400">dari bulan lalu</span>
                            </div>
                        </div>
                        <MiniBar data={miniBarData} color="#3b82f6" />
                    </div>
                </div>

                {/* Total Orders / Prospek */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Total Prospek</p>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">{totalProspek.toLocaleString("id-ID")}</h2>
                            <div className="flex items-center gap-1 mt-1">
                                <ArrowUpRight size={12} className="text-green-500" />
                                <span className="text-xs text-green-500 font-medium">+4.7%</span>
                                <span className="text-xs text-gray-400">dari bulan lalu</span>
                            </div>
                        </div>
                        <MiniBar data={miniBarData2} color="#6366f1" />
                    </div>
                </div>

                {/* Monthly Goals */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Target size={11} className="text-blue-500" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Monthly Goals</p>
                            </div>
                            <div className="space-y-1 mt-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Target</span>
                                    <span className="font-medium text-gray-600">{fmt(250000000)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Achieved</span>
                                    <span className="font-semibold text-blue-600">{fmt(totalRevenue)}</span>
                                </div>
                            </div>
                        </div>
                        <DonutChart pct={winRate} />
                    </div>
                </div>
            </div>

            {/* Sales Analytics + Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Sales Analytics */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Sales Analytics</h3>
                        <div className="flex items-center gap-2">
                            <select
                                value={timeFilter}
                                onChange={e => setTimeFilter(e.target.value)}
                                className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            >
                                <option value="hari_ini">Hari Ini</option>
                                <option value="bulan_ini">Bulan Ini</option>
                                <option value="tahun_ini">Tahun Ini</option>
                            </select>
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                                <ExternalLink size={13} />
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={displayTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradMasuk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradWin" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                            <Tooltip
                                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                                itemStyle={{ color: "#374151" }}
                            />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                            <Area type="monotone" dataKey="masuk" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gradMasuk)" name="Prospek Masuk" dot={false} activeDot={{ r: 5 }} />
                            <Area type="monotone" dataKey="closing" stroke="#10b981" strokeWidth={2.5} fill="url(#gradWin)" name="Closing/Win" dot={false} activeDot={{ r: 5 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products Heatmap (Simplified list for now) */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Top Produk</h3>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                            <ExternalLink size={13} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {displayTopProducts.map((p, i) => (
                            <div key={p.id || i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">
                                                {p.brand} {p.type}
                                            </p>

                                            <p className="text-xs font-bold text-gray-800">
                                                {p.total || 0}
                                            </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-800">{p.sales_count || 0}</p>
                                    <p className="text-[10px] text-gray-400">Terjual</p>
                                </div>
                            </div>
                        ))}
                        {!displayTopProducts.length && <p className="text-xs text-gray-400 text-center py-10">Belum ada data produk</p>}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Budget + Reviews + Low Stock + Ranking */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Budget Usage */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Budget Usage</h3>
                        <button className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                            <ExternalLink size={11} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {budgetData.map(b => {
                            const pct = Math.round((b.used / b.total) * 100);
                            return (
                                <div key={b.label}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600 font-medium">{b.label}</span>
                                        <span className="text-gray-400">{pct}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%`, background: b.color }}
                                        />
                                    </div>
                                    <div className="text-[10px] text-gray-400 mt-0.5">
                                        {fmt(b.used)} / {fmt(b.total)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Customer Reviews */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Customer Review</h3>
                        <span className="text-xs text-gray-400">1,800+</span>
                    </div>
                    <div className="space-y-4">
                        {customerReviews.map((r, i) => (
                            <div key={i} className="pb-3 last:pb-0 border-b last:border-0 border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">{r.name[0]}</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">{r.name}</p>
                                        <Stars n={r.rating} />
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed">{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Low Stock Alert</h3>
                        <AlertTriangle size={14} className="text-orange-400" />
                    </div>
                    <div className="space-y-4">
                        {displayLowStock.map((item, i) => (
                            <div key={item.id || i} className="flex items-center gap-3 pb-3 last:pb-0 border-b last:border-0 border-gray-100">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <Package size={16} className="text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                                    <p className="text-[10px] text-gray-400">SKU: {item.id}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="text-[10px] text-orange-500 font-medium">Stok: {item.stock}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!displayLowStock.length && <p className="text-xs text-gray-400 text-center py-10">Stok aman</p>}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition mt-1">
                            Restock Now
                        </button>
                    </div>
                </div>

                {/* Sales Ranking */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Peringkat Sales</h3>
                        <button className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                            <ExternalLink size={11} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {displayRanking.map((s, i) => (
                            <div key={s.id || i} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${i === 0 ? "bg-yellow-100 text-yellow-600" : i === 1 ? "bg-gray-200 text-gray-600" : "bg-orange-100 text-orange-600"}`}>
                                    {i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-700 truncate">{s.name}</p>
                                    <p className="text-[10px] text-gray-400">{fmt(s.revenue)}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-yellow-400" : i === 1 ? "bg-gray-400" : "bg-orange-400"}`} />
                            </div>
                        ))}
                        {!displayRanking.length && <p className="text-xs text-gray-400 text-center py-10">Belum ada data ranking</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── SALES PAGE ── */
function SalesPage({ allSales = [] }) {
    const displaySales = allSales;
    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Manajemen Akun Sales</h2>
                    <p className="text-xs text-gray-400">Kelola semua akun sales Anda</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                    + Tambah Akun Sales
                </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                                <th className="px-5 py-3 font-semibold uppercase tracking-wide">Nama</th>
                                <th className="px-5 py-3 font-semibold uppercase tracking-wide">Email</th>
                                <th className="px-5 py-3 font-semibold uppercase tracking-wide">Status</th>
                                <th className="px-5 py-3 font-semibold uppercase tracking-wide text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaySales.map(s => (
                                <tr key={s.id} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">{s.name[0]}</div>
                                            <span className="font-medium text-gray-800 text-sm">{s.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-gray-500">{s.email}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.role === "admin" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-green-50 text-green-700 border border-green-200"}`}>{s.role || "sales"}</span>
                                    </td>
                                    <td className="px-5 py-3.5 text-center">
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold mr-3">Edit</button>
                                        <button className="text-red-500 hover:text-red-700 text-xs font-semibold">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── WILAYAH PAGE ── */
function WilayahPage() {
    const stores = [
        { id: 1, code: "JKT-01 / TK-001", region: "DKI Jakarta", name: "Toko Abadi Jaya", target: 500000000, current: 350000000, status: "On Track" },
        { id: 2, code: "SBY-02 / TK-002", region: "Jawa Timur", name: "Toko Makmur Sentosa", target: 400000000, current: 200000000, status: "At Risk" },
        { id: 3, code: "BDG-03 / TK-003", region: "Jawa Barat", name: "Toko Berkah Bersama", target: 450000000, current: 460000000, status: "Achieved" },
        { id: 4, code: "JKT-01 / TK-004", region: "DKI Jakarta", name: "Toko Maju Terus", target: 300000000, current: 310000000, status: "Achieved" },
    ];
    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Manajemen Wilayah & Outlet</h2>
                    <p className="text-xs text-gray-400">Pantau performa tiap wilayah dan outlet</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">+ Tambah Data</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                                {["Kode", "Wilayah", "Outlet", "Target Revenue", "Pencapaian", "Status", "Aksi"].map(h => (
                                    <th key={h} className="px-5 py-3 font-semibold uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map(s => {
                                const pct = Math.round((s.current / s.target) * 100);
                                return (
                                    <tr key={s.id} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition">
                                        <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{s.code}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{s.region}</td>
                                        <td className="px-5 py-3.5 font-medium text-gray-800 text-sm">{s.name}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-500">{fmt(s.target)}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 100 ? "#10b981" : pct >= 70 ? "#3b82f6" : "#ef4444" }} />
                                                </div>
                                                <span className="text-xs text-gray-500">{pct}%</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${s.status === "Achieved" ? "bg-green-50 text-green-700 border-green-200" : s.status === "On Track" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-red-50 text-red-700 border-red-200"}`}>{s.status}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold mr-3">Edit</button>
                                            <button className="text-red-500 hover:text-red-700 text-xs font-semibold">Hapus</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── STATISTIK PAGE ── */
function StatistikPage() {
    const [chartType, setChartType] = useState("bar");
    const data = [
        { name: "Jan", revenue: 400000000, target: 500000000 },
        { name: "Feb", revenue: 300000000, target: 450000000 },
        { name: "Mar", revenue: 550000000, target: 500000000 },
        { name: "Apr", revenue: 450000000, target: 600000000 },
        { name: "Mei", revenue: 600000000, target: 550000000 },
        { name: "Jun", revenue: 700000000, target: 650000000 },
    ];
    const pieData = [
        { name: "DKI Jakarta", value: 35 },
        { name: "Jawa Timur", value: 25 },
        { name: "Jawa Barat", value: 30 },
        { name: "Lainnya", value: 10 },
    ];
    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
    const fmtTooltip = v => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Visualisasi Statistik</h2>
                    <p className="text-xs text-gray-400">Analisis performa penjualan</p>
                </div>
                <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
                    {[["bar", "Bar"], ["line", "Line"], ["pie", "Pie"]].map(([v, l]) => (
                        <button key={v} onClick={() => setChartType(v)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${chartType === v ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                            {l}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-6 text-center">
                    {chartType === "bar" ? "Perbandingan Target vs Aktual" : chartType === "line" ? "Tren Pencapaian Revenue" : "Distribusi Revenue per Wilayah"}
                </h3>
                {chartType === "bar" && (
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={v => `${v / 1000000}M`} />
                            <Tooltip formatter={fmtTooltip} contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                            <Bar dataKey="revenue" name="Revenue Aktual" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="target" name="Target Revenue" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {chartType === "line" && (
                    <ResponsiveContainer width="100%" height={380}>
                        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={v => `${v / 1000000}M`} />
                            <Tooltip formatter={fmtTooltip} contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                            <Line type="monotone" dataKey="revenue" name="Revenue Aktual" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="target" name="Target Revenue" stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                {chartType === "pie" && (
                    <ResponsiveContainer width="100%" height={380}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={140} dataKey="value"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                labelLine={false}>
                                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

/* ── PROSES PENJUALAN PAGE ── */
function ProsesPenjualanPage({ allProspeks = [] }) {
    
    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Proses Penjualan (Prospek)</h2>
                    <p className="text-xs text-gray-400">Monitor semua pipeline penjualan</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">+ Tambah Prospek</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                                {["No", "Nama Sales", "Customer", "Nilai", "Tanggal", "Status", "Aksi"].map(h => (
                                    <th key={h} className="px-5 py-3 font-semibold uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayProspeks.map((item, i) => (
                                <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition">
                                    <td className="px-5 py-3.5 text-sm text-gray-400">{i + 1}</td>
                                    <td className="px-5 py-3.5 font-medium text-gray-800 text-sm">{item.sales?.name || "Unknown"}</td>
                                    <td className="px-5 py-3.5 text-sm text-gray-600">{item.nama}</td>
                                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{fmt(item.deal?.value || 0)}</td>
                                    <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString("id-ID")}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === "win" ? "bg-green-50 text-green-700 border-green-200" : item.status === "lose" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>{item.status || "Lead"}</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <button
                                            onClick={() => router.visit(`/prospeks/${item.id}`)}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                                        >
                                            Detail
                                        </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── PRODUK PAGE ── */
function ProdukPage({ allProducts = [] }) {
    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Katalog Produk</h2>
                    <p className="text-xs text-gray-400">Daftar produk yang tersedia</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">+ Tambah Produk</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProducts.map(p => (
                    <div key={p.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                                <ShoppingBag className="text-gray-400" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800">{p.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">Stok: {p.stock}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="font-bold text-blue-600">{fmt(p.price)}</span>
                            <button className="text-xs font-semibold text-gray-500 hover:text-blue-600">Detail</button>
                        </div>
                    </div>
                ))}
                {!allProducts.length && <p className="col-span-full text-center py-20 text-gray-400">Belum ada data produk</p>}
            </div>
        </div>
    );
}

/* ── DATABASE PELANGGAN PAGE ── */
function DatabasePelangganPage({ allProspeks = [], totalRevenue = 0 }) {
    // Derive unique customers from prospeks
    const customersMap = new Map();
    allProspeks.forEach(p => {
        const key = `${p.nama}-${p.no_hp}`;
        if (!customersMap.has(key)) {
            customersMap.set(key, {
                id: p.id,
                name: p.nama,
                phone: p.no_hp,
                email: "-", // No email in prospeks table yet
                lastPurchase: p.product_id ? "Product Purchase" : "Service",
                lastPurchaseDate: new Date(p.created_at).toLocaleDateString(),
                totalTransacted: p.deal?.status === 'win' ? (p.deal?.value || 0) : 0,
                ordersCount: p.deal?.status === 'win' ? 1 : 0,
                status: p.deal?.status === 'win' ? 'ACTIVE' : 'LEAD',
                avatar: p.nama[0]
            });
        } else {
            const existing = customersMap.get(key);
            if (p.deal?.status === 'win') {
                existing.totalTransacted += (p.deal?.value || 0);
                existing.ordersCount += 1;
                existing.status = 'ACTIVE';
            }
        }
    });

    const displayCustomers = Array.from(customersMap.values());

    const stats = [
        { label: 'TOTAL CUSTOMERS', value: displayCustomers.length.toLocaleString(), icon: <Users size={18} className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
        { label: 'TOTAL REVENUE', value: fmt(totalRevenue), icon: <ShoppingBag size={18} className="text-blue-500" />, bgColor: 'bg-blue-50' },
        { label: 'ACTIVE DEALS', value: allProspeks.filter(p => p.status !== 'win' && p.status !== 'lose').length, icon: <Star size={18} className="text-amber-500" />, bgColor: 'bg-amber-50' },
        { label: 'WON DEALS', value: allProspeks.filter(p => p.status === 'win').length, icon: <TrendingUp size={18} className="text-rose-500" />, bgColor: 'bg-rose-50' },
    ];

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-gray-200">
                    <button className="px-4 py-1.5 text-xs font-bold bg-gray-100 text-gray-800 rounded-md">Detailed</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-600">Compact</button>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#065f46] hover:bg-[#064e3b] text-white rounded-lg text-sm font-semibold transition shadow-md">
                        New Customer
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{stat.label}</p>
                            <h3 className="text-xl font-bold text-gray-800 mt-0.5">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Active Customers Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Customer Database</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact Information</th>
                                <th className="px-6 py-4">Last Activity</th>
                                <th className="px-6 py-4 text-right">Total Transacted</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {displayCustomers.map((customer, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold border border-indigo-200">
                                                {customer.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{customer.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">#{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-0.5">
                                            <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                                <span className="opacity-50">✉</span> {customer.email}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                                <span className="opacity-50">📞</span> {customer.phone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-xs font-bold text-gray-700">{customer.lastPurchase}</p>
                                                <p className="text-[10px] text-gray-400">{customer.lastPurchaseDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <p className="font-bold text-gray-800 text-sm">{fmt(customer.totalTransacted)}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">{customer.ordersCount} Orders</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                            customer.status === 'ACTIVE' 
                                            ? 'bg-green-50 text-green-600 border border-green-100' 
                                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                                        }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── PENGATURAN PAGE ── */
function PengaturanPage({ subPage }) {
    return (
        <div className="p-6 space-y-5 bg-gray-50 min-h-full">
            <div>
                <h2 className="text-lg font-bold text-gray-800">{subPage === "sistem" ? "Pengaturan Sistem" : "Profil Perusahaan"}</h2>
                <p className="text-xs text-gray-400">Kelola konfigurasi aplikasi</p>
            </div>
            {(!subPage || subPage === "profil") && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-lg space-y-5">
                    <h3 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Profil Perusahaan</h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Nama Perusahaan</label>
                        <input type="text" defaultValue="Gestion CRM"
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-400 transition" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Sistem</label>
                        <input type="email" defaultValue="admin@gestion.com"
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-400 transition" />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-sm">Simpan Profil</button>
                </div>
            )}
            {subPage === "sistem" && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-lg space-y-5">
                    <h3 className="font-semibold text-gray-700 text-sm border-b border-gray-100 pb-3">Preferensi Sistem</h3>
                    {[["Notifikasi Email", true], ["Dark Mode (Beta)", false]].map(([label, def]) => (
                        <div key={label} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={def} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                            </label>
                        </div>
                    ))}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-sm">Simpan Pengaturan</button>
                </div>
            )}
        </div>
    );
}

/* ── PAGE META ── */
const pageMeta = {
    dashboard: { title: "Store Overview", subtitle: "Here's how your store is performing today" },
    sales: { title: "Akun Sales", subtitle: "Kelola dan pantau akun sales" },
    wilayah: { title: "Wilayah & Outlet", subtitle: "Pantau performa tiap wilayah" },
    statistik: { title: "Statistik", subtitle: "Visualisasi data penjualan" },
    produk: { title: "Produk", subtitle: "Manajemen katalog produk" },
    prospek: { title: "Proses Penjualan", subtitle: "Pipeline dan prospek penjualan" },
    customers: { title: "Database Pelanggan", subtitle: "Kelola database dan riwayat transaksi pelanggan" },
    "pengaturan-profil": { title: "Pengaturan", subtitle: "Profil perusahaan" },
    "pengaturan-sistem": { title: "Pengaturan", subtitle: "Preferensi sistem" },
};

export default function Dashboard() {
    const [active, setActive] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const { props } = usePage();
    console.log("PRODUCTS:", props.products);

    const meta = pageMeta[active] || pageMeta.dashboard;

    const renderPage = () => {
        switch (active) {
            case "dashboard": return <DashboardPage {...props} />;
            case "sales": return <SalesPage {...props} />;
            case "wilayah": return <WilayahPage {...props} />;
            case "statistik": return <StatistikPage {...props} />;
            case "produk": return <ProdukPage {...props} />;
            case "prospek": return <ProsesPenjualanPage {...props} />;
            case "customers": return <DatabasePelangganPage {...props} />;
            case "pengaturan":
            case "pengaturan-profil": return <PengaturanPage subPage="profil" />;
            case "pengaturan-sistem": return <PengaturanPage subPage="sistem" />;
            default: return <DashboardPage {...props} />;
            
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar pageTitle={meta.title} pageSubtitle={meta.subtitle} />
                <main className="flex-1 overflow-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}