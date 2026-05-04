import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart3,
    Plus,
    Download,
    Search,
    Bell,
    Settings,
    HelpCircle,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    ShoppingCart,
    Star,
    ArrowLeftRight,
    LogOut
} from 'lucide-react';

const CustomerDatabase = () => {
    const [activeTab, setActiveTab] = useState('Customers');
    const [viewMode, setViewMode] = useState('Detailed');

    const stats = [
        { label: 'TOTAL CUSTOMERS', value: '2,543', change: '+12%', icon: <Users size={20} className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
        { label: 'AVG. TRANSACTIONS', value: 'Rp 8.4M', change: '+5.4%', icon: <ShoppingCart size={20} className="text-blue-500" />, bgColor: 'bg-blue-50' },
        { label: 'LOYALTY MEMBERS', value: '842', change: null, icon: <Star size={20} className="text-amber-500" />, bgColor: 'bg-amber-50' },
        { label: 'RECENT RETURNS', value: '14', change: null, icon: <ArrowLeftRight size={20} className="text-rose-500" />, bgColor: 'bg-rose-50' },
    ];

    const customers = [
        {
            id: 'CUST-88219',
            name: 'Andi Dermawan',
            email: 'andi.der@gmail.com',
            phone: '+62 812-3456-7890',
            lastPurchase: 'Galaxy S24 Ultra',
            lastPurchaseDate: 'Ordered 2 days ago',
            totalTransacted: 'Rp 21.450.000',
            ordersCount: '3 Orders total',
            status: 'ACTIVE',
            avatar: 'https://i.pravatar.cc/150?u=andi',
            deviceIcon: '📱'
        },
        {
            id: 'CUST-88102',
            name: 'Siti Pertiwi',
            email: 'siti.p@perusahaan.co.id',
            phone: '+62 811-9988-7766',
            lastPurchase: 'iPhone 15 Pro Max',
            lastPurchaseDate: 'Ordered 1 week ago',
            totalTransacted: 'Rp 48.900.000',
            ordersCount: '8 Orders total',
            status: 'ACTIVE',
            avatar: 'https://i.pravatar.cc/150?u=siti',
            deviceIcon: '📱'
        },
        {
            id: 'CUST-87654',
            name: 'Budi Kusuma',
            email: 'budi.k@yahoo.com',
            phone: '+62 856-7788-9900',
            lastPurchase: 'Pixel 8 Pro',
            lastPurchaseDate: 'Ordered 3 months ago',
            totalTransacted: 'Rp 16.200.000',
            ordersCount: '1 Order total',
            status: 'INACTIVE',
            avatar: 'https://i.pravatar.cc/150?u=budi',
            deviceIcon: '📱'
        }
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-slate-400 flex flex-col border-r border-slate-800">
                <div className="p-6">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
                        <span className="text-emerald-500">MOBILE</span>CRM
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">B2B Enterprise</p>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1">
                    {[
                        { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                        { name: 'Inventory', icon: <Package size={18} /> },
                        { name: 'Customers', icon: <Users size={18} />, active: true },
                        { name: 'Sales Reports', icon: <BarChart3 size={18} /> },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active
                                    ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500 -ml-4 pl-[calc(1rem+4px)]'
                                    : 'hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mb-6">
                        Quick Sale
                    </button>
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            <Settings size={18} />
                            Settings
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <div className="relative w-96">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search customer name, ID, or phone..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                            <Settings size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                            <HelpCircle size={20} />
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Title and Top Actions */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Database</h1>
                            <p className="text-slate-500 mt-1 font-medium">Manage your client relationships and sales history.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                                <Download size={18} />
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#065f46] hover:bg-[#064e3b] text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-emerald-900/10">
                                <Plus size={18} />
                                New Customer
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-xl ${stat.bgColor} transition-transform group-hover:scale-110`}>
                                        {stat.icon}
                                    </div>
                                    {stat.change && (
                                        <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                                            {stat.change}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Active Customers</h2>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode('Detailed')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'Detailed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Detailed
                                </button>
                                <button
                                    onClick={() => setViewMode('Compact')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === 'Compact' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Compact
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-8 py-5">Customer</th>
                                        <th className="px-8 py-5">Contact Information</th>
                                        <th className="px-8 py-5">Last Purchase</th>
                                        <th className="px-8 py-5 text-right">Total Transacted</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {customers.map((customer, i) => (
                                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 group-hover:border-emerald-200 transition-colors">
                                                        <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{customer.name}</p>
                                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">#{customer.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                        <span className="text-slate-400 opacity-70">✉</span>
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                        <span className="text-slate-400 opacity-70">📞</span>
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg shadow-inner">
                                                        {customer.deviceIcon}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-700">{customer.lastPurchase}</p>
                                                        <p className="text-[11px] text-slate-400 font-medium">{customer.lastPurchaseDate}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <p className="font-black text-slate-900">{customer.totalTransacted}</p>
                                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">{customer.ordersCount}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${customer.status === 'ACTIVE'
                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs text-slate-400 font-medium tracking-tight">
                                Showing <span className="text-slate-900 font-bold">1-3</span> of <span className="text-slate-900 font-bold">2,543</span> customers
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 disabled:opacity-30 transition-all" disabled>
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                                    1
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                    2
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                    3
                                </button>
                                <span className="text-slate-300 mx-1">...</span>
                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CustomerDatabase;
