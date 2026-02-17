import { Link } from '@tanstack/react-router'
import { LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from '@tanstack/react-router'

export default function AdminSidebar() {
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        toast.success('Logged out successfully')
        router.navigate({ to: '/admin/login' })
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">A</span>
                    Admin
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link
                    to="/admin/dashboard"
                    activeProps={{ className: 'bg-blue-50 text-blue-600' }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                </Link>
                {/* Add more links here as we build them */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@secure.com</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
