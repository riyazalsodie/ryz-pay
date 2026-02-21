import { Link, useRouter } from '@tanstack/react-router'
import { 
    LayoutDashboard, 
    LogOut, 
    CreditCard, 
    Users, 
    FileText, 
    Link as LinkIcon, 
    BarChart3, 
    Settings, 
    MessageSquare, 
    Smartphone, 
    Shield, 
    Activity,
    Wallet
} from 'lucide-react'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'

export default function AdminSidebar() {
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        toast.success('Logged out successfully')
        router.navigate({ to: '/admin/login' })
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
        { icon: CreditCard, label: 'Payments', to: '/admin/payments' },
        { icon: Wallet, label: 'Gateways', to: '/admin/gateways' },
        { icon: Users, label: 'Customers', to: '/admin/customers' },
        { icon: FileText, label: 'Invoices', to: '/admin/invoices' },
        { icon: LinkIcon, label: 'Payment Links', to: '/admin/links' },
        { icon: BarChart3, label: 'Reports', to: '/admin/reports' },
        { icon: Settings, label: 'Brand Settings', to: '/admin/settings' },
    ]

    const automationItems = [
        { icon: MessageSquare, label: 'SMS Data', to: '/admin/sms' },
        { icon: Smartphone, label: 'Devices', to: '/admin/devices' },
    ]

    const adminItems = [
        { icon: Shield, label: 'Activities', to: '/admin/activities' },
        { icon: Activity, label: 'Billing', to: '/admin/billing' },
    ]

    return (
        <aside className="w-64 bg-[#111827] border-r border-gray-800 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">P</span>
                    paymently
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
                {menuItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        activeProps={{ className: 'bg-blue-600/10 text-blue-500 border-r-2 border-blue-500' }}
                        inactiveProps={{ className: 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200' }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg transition-all duration-200 text-sm font-medium"
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </Link>
                ))}

                <div className="pt-4 mt-4 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    MFS Automation
                </div>
                {automationItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        activeProps={{ className: 'bg-blue-600/10 text-blue-500 border-r-2 border-blue-500' }}
                        inactiveProps={{ className: 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200' }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg transition-all duration-200 text-sm font-medium"
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </Link>
                ))}

                <div className="pt-4 mt-4 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administration
                </div>
                {adminItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        activeProps={{ className: 'bg-blue-600/10 text-blue-500 border-r-2 border-blue-500' }}
                        inactiveProps={{ className: 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200' }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg transition-all duration-200 text-sm font-medium"
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
