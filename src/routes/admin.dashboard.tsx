import { createFileRoute } from '@tanstack/react-router'
import { 
    Search, 
    Bell, 
    Filter, 
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    AlertCircle,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react'
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts'

export const Route = createFileRoute('/admin/dashboard')({
    component: AdminDashboard,
})

const data = [
    { name: '12 AM', total: 0, success: 0, pending: 0 },
    { name: '4 AM', total: 0, success: 0, pending: 0 },
    { name: '8 AM', total: 0, success: 0, pending: 0 },
    { name: '12 PM', total: 0, success: 0, pending: 0 },
    { name: '4 PM', total: 0, success: 0, pending: 0 },
    { name: '8 PM', total: 0, success: 0, pending: 0 },
    { name: '11 PM', total: 0, success: 0, pending: 0 },
]

const pieData = [
    { name: 'bKash', value: 400 },
    { name: 'Nagad', value: 300 },
    { name: 'Rocket', value: 300 },
    { name: 'Upay', value: 200 },
]

const COLORS = ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B']

const recentPayments = [
    { id: 'TRX-987123', customer: 'John Doe', gateway: 'bKash', amount: '500.00', date: '2024-03-20', status: 'completed' },
    { id: 'TRX-987124', customer: 'Jane Smith', gateway: 'Nagad', amount: '1200.00', date: '2024-03-20', status: 'pending' },
    { id: 'TRX-987125', customer: 'Mike Johnson', gateway: 'Rocket', amount: '350.00', date: '2024-03-19', status: 'failed' },
    { id: 'TRX-987126', customer: 'Sarah Wilson', gateway: 'bKash', amount: '2500.00', date: '2024-03-19', status: 'completed' },
    { id: 'TRX-987127', customer: 'Tom Brown', gateway: 'Upay', amount: '150.00', date: '2024-03-18', status: 'completed' },
]

function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 w-64"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">CTRL+K</div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white cursor-pointer">
                        SA
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                    title="Total Payments" 
                    value="0" 
                    color="blue"
                />
                <StatsCard 
                    title="Pending Payments" 
                    value="0" 
                    color="red"
                />
                <StatsCard 
                    title="Unpaid Invoices" 
                    value="0" 
                    color="yellow"
                />
                <StatsCard 
                    title="Pending SMS Data" 
                    value="0" 
                    color="green"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Payment Statistics</h3>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }}
                                    itemStyle={{ color: '#F3F4F6' }}
                                />
                                <Area type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm text-gray-400">All payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            <span className="text-sm text-gray-400">Successful</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="text-sm text-gray-400">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Payment By Gateway</h3>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center relative">
                        {pieData.every(d => d.value === 0) ? (
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full border-4 border-gray-800 mx-auto mb-4"></div>
                                <p className="text-gray-500 text-sm">No Data</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-24 h-24 rounded-full bg-gray-900/50"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Payments Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Latest Payments</h3>
                    <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-800/50 border-b border-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Gateway</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Transaction ID</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {recentPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{payment.customer}</td>
                                    <td className="px-6 py-4 text-gray-300">{payment.gateway}</td>
                                    <td className="px-6 py-4 text-white font-medium">৳ {payment.amount}</td>
                                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{payment.id}</td>
                                    <td className="px-6 py-4 text-gray-400">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={payment.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatsCard({ title, value, color }: { title: string, value: string, color: 'blue' | 'red' | 'yellow' | 'green' }) {
    const colorStyles = {
        blue: 'border-b-blue-500',
        red: 'border-b-red-500',
        yellow: 'border-b-yellow-500',
        green: 'border-b-green-500',
    }

    return (
        <div className={`bg-gray-900 border border-gray-800 rounded-xl p-6 border-b-2 ${colorStyles[color]} hover:translate-y-[-2px] transition-transform duration-200`}>
            <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        failed: 'bg-red-500/10 text-red-500 border-red-500/20',
    }

    const icons = {
        completed: CheckCircle2,
        pending: Clock,
        failed: XCircle,
    }

    const Icon = icons[status as keyof typeof icons] || AlertCircle

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium capitalize ${styles[status as keyof typeof styles] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </div>
    )
}
