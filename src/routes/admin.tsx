import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import AdminSidebar from '../components/AdminSidebar'

export const Route = createFileRoute('/admin')({
    component: AdminLayout,
    beforeLoad: async ({ location }) => {
        // Skip check for login page to avoid infinite loop if it were nested (it's not, but good practice)
        // Actually /admin/login is a sibling or child. If child, we need to be careful.
        // Here /admin is the parent. /admin/login should probably be separate or excluded.
        // However, typically login is public. 
        // If I make /admin a layout for all /admin/* routes, then /admin/login will be protected if I'm not careful.
        // I should check if the path is login.

        if (location.pathname.includes('/login')) return

        try {
            const session = await authClient.getSession();
            if (!session.data || session.data.user.role !== 'admin') {
                throw redirect({ to: '/admin/login' })
            }
        } catch (e) {
            // If session fetch fails (e.g. no internet), redirect to login? 
            // Or if redirect throws (it's how TanStack Router works).
            if (e instanceof Response || (typeof e === 'object' && e !== null && 'to' in e)) throw e;
            throw redirect({ to: '/admin/login' })
        }
    }
})

function AdminLayout() {
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
