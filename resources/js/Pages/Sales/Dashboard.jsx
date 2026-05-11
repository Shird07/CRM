import { Head, usePage } from "@inertiajs/react";

import SalesLayout from "@/Layouts/SalesLayout";

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

export default function Dashboard() {

    const {
        totalProspek = 0,
        totalWin = 0,
        totalLose = 0,
        totalRevenue = 0,
        conversion = 0,
        reminders = [],
        chartData = [],
    } = usePage().props;

    return (
        <SalesLayout>

            <Head title="Sales Dashboard" />

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

                    <div className="mb-5">

                        <h2 className="text-lg font-bold text-gray-800">
                            Sales Analytics
                        </h2>

                        <p className="text-sm text-gray-400">
                            Grafik closing bulanan
                        </p>

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

        </SalesLayout>
    );
}