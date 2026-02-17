import { createFileRoute, Outlet, redirect, useLocation } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import AdminSidebar from '../components/AdminSidebar'

export const Route = createFileRoute('/admin')({
    component: AdminLayout,
    beforeLoad: async ({ location }) => {
        if (location.pathname.includes('/login')) return

        try {
            const session = await authClient.getSession();
            if (!session.data || session.data.user.role !== 'admin') {
                throw redirect({ to: '/admin/login' })
            }
        } catch (e) {
            if (e instanceof Response || (typeof e === 'object' && e !== null && 'to' in e)) throw e;
            throw redirect({ to: '/admin/login' })
        }
    }
})

function AdminLayout() {
    const location = useLocation()

    // If on login page, render only the outlet content without the sidebar layout
    if (location.pathname.includes('/login')) {
        return <Outlet />
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
