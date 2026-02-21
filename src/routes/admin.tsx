import { createFileRoute, Outlet, redirect, useLocation, useRouter } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import AdminSidebar from '../components/AdminSidebar'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/admin')({
    component: AdminLayout,
    beforeLoad: async ({ location }) => {
        // Skip session check on server-side rendering to avoid issues with missing cookies
        if (typeof window === 'undefined') return

        if (location.pathname.includes('/login')) return

        try {
            const session = await authClient.getSession();
            if (!session.data || session.data.user.role !== 'admin') {
                throw redirect({ to: '/admin/login' })
            }
        } catch (e) {
            if (e instanceof Response || (typeof e === 'object' && e !== null && 'to' in e)) throw e;
            // On client side, we can redirect
            throw redirect({ to: '/admin/login' })
        }
    }
})

function AdminLayout() {
    const location = useLocation()
    const router = useRouter()
    const { data: session, isPending, error } = authClient.useSession()
    const [isChecking, setIsChecking] = useState(true)

    // Handle client-side protection for initial load if SSR skipped the check
    useEffect(() => {
        if (!isPending) {
            if (location.pathname.includes('/login')) {
                setIsChecking(false)
                return
            }

            if (!session || session.user.role !== 'admin') {
                router.navigate({ to: '/admin/login' })
            }
            setIsChecking(false)
        }
    }, [session, isPending, location.pathname, router])

    // If on login page, render only the outlet content without the sidebar layout
    if (location.pathname.includes('/login')) {
        return <Outlet />
    }

    // Show loading state while checking session
    if (isPending || isChecking) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0F172A] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        )
    }

    // Double check session before rendering protected layout
    if (!session || session.user.role !== 'admin') {
        return null // Will redirect in useEffect
    }

    return (
        <div className="flex h-screen bg-[#0F172A] text-gray-100 font-sans selection:bg-blue-500/30">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F172A] p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
