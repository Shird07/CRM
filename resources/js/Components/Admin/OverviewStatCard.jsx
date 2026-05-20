import { useState, useMemo } from 'react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
    Maximize2, Minimize2, BarChart3, LineChart as LineChartIcon,
    PieChart as PieChartIcon, AreaChart as AreaChartIcon,
} from 'lucide-react';

const PERIODS = [
    { value: 'hari_ini', label: 'Hari Ini' },
    { value: 'minggu_ini', label: 'Minggu Ini' },
    { value: 'bulan_ini', label: 'Bulan Ini' },
];

const CHART_OPTIONS = [
    { value: 'line', label: 'Line', icon: LineChartIcon },
    { value: 'bar', label: 'Bar', icon: BarChart3 },
    { value: 'area', label: 'Area', icon: AreaChartIcon },
    { value: 'pie', label: 'Pie', icon: PieChartIcon },
];

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

function ChartRenderer({ chartType, data, dataKeys, height }) {
    const xKey = data[0]?.date !== undefined ? 'date' : 'name';

    if (!data.length) {
        return (
            <div className="flex items-center justify-center text-xs text-gray-400" style={{ height }}>
                Belum ada data untuk periode ini
            </div>
        );
    }

    if (chartType === 'pie') {
        const pieKey = dataKeys[0]?.key ?? 'value';
        return (
            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={pieKey}
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={height > 220 ? 90 : 70}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(v) => Number(v).toLocaleString('id-ID')} />
                </PieChart>
            </ResponsiveContainer>
        );
    }

    const common = {
        data,
        margin: { top: 8, right: 8, left: -16, bottom: 0 },
    };

    const axis = (
        <>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 11 }}
                formatter={(v) => Number(v).toLocaleString('id-ID')}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
        </>
    );

    if (chartType === 'bar') {
        return (
            <ResponsiveContainer width="100%" height={height}>
                <BarChart {...common}>
                    {axis}
                    {dataKeys.map((dk) => (
                        <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        );
    }

    if (chartType === 'area') {
        return (
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart {...common}>
                    {axis}
                    {dataKeys.map((dk) => (
                        <Area
                            key={dk.key}
                            type="monotone"
                            dataKey={dk.key}
                            name={dk.name}
                            stroke={dk.color}
                            fill={dk.color}
                            fillOpacity={0.15}
                            strokeWidth={2}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart {...common}>
                {axis}
                {dataKeys.map((dk) => (
                    <Line
                        key={dk.key}
                        type="monotone"
                        dataKey={dk.key}
                        name={dk.name}
                        stroke={dk.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default function OverviewStatCard({
    title,
    description,
    dataByPeriod = {},
    dataKeys = [{ key: 'value', name: 'Nilai', color: '#3b82f6' }],
    defaultPeriod = 'bulan_ini',
    defaultChartType = 'line',
    allowedCharts = ['line', 'bar', 'area', 'pie'],
    formatSummary,
    summaryByPeriod,
    customMetrics,
    customDataByPeriod,
    className = '',
    expanded: expandedProp,
    onExpandChange,
}) {
    const chartChoices = CHART_OPTIONS.filter((c) => allowedCharts.includes(c.value));

    const [period, setPeriod] = useState(defaultPeriod);
    const [chartType, setChartType] = useState(
        () => chartChoices.find((c) => c.value === defaultChartType)?.value ?? chartChoices[0]?.value ?? 'line',
    );
    const [expandedInternal, setExpandedInternal] = useState(false);
    const expanded = expandedProp !== undefined ? expandedProp : expandedInternal;
    const [customMetric, setCustomMetric] = useState(customMetrics?.[0]?.key ?? '');

    const toggleExpand = () => {
        if (onExpandChange) {
            onExpandChange();
        } else {
            setExpandedInternal((v) => !v);
        }
    };

    const data = useMemo(() => {
        if (customMetrics?.length && customDataByPeriod) {
            return customDataByPeriod[customMetric]?.[period] ?? [];
        }
        return dataByPeriod[period] ?? [];
    }, [customMetrics, customDataByPeriod, customMetric, dataByPeriod, period]);

    const summary = summaryByPeriod?.[period] ?? formatSummary?.(data, period);

    const chartHeight = expanded ? 380 : 220;

    return (
        <div
            className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col transition-all duration-300 w-full min-h-0 ${
                expanded ? 'ring-2 ring-blue-100 shadow-md' : ''
            } ${className}`}
        >
            <div className="flex flex-wrap items-start justify-between gap-2 p-4 border-b border-gray-100">
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                    {description && <p className="text-[11px] text-gray-400 mt-0.5">{description}</p>}
                    {summary && <p className="text-xs font-medium text-blue-600 mt-1">{summary}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                    {customMetrics?.length > 0 && (
                        <select
                            value={customMetric}
                            onChange={(e) => setCustomMetric(e.target.value)}
                            className="text-[11px] border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-[140px]"
                        >
                            {customMetrics.map((m) => (
                                <option key={m.key} value={m.key}>{m.label}</option>
                            ))}
                        </select>
                    )}
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="text-[11px] border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {PERIODS.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                    <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                        className="text-[11px] border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="Tipe visualisasi"
                    >
                        {chartChoices.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={toggleExpand}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                        title={expanded ? 'Perkecil' : 'Perbesar'}
                    >
                        {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>
            <div className="p-4 flex-1 w-full" style={{ minHeight: chartHeight }}>
                <ChartRenderer
                    chartType={chartType}
                    data={data}
                    dataKeys={dataKeys}
                    height={chartHeight}
                />
            </div>
        </div>
    );
}
