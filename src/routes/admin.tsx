import { createFileRoute, Outlet, redirect, useLocation, useRouter } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import AdminSidebar from '../components/AdminSidebar'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/admin')({
    component: AdminLayout,
    beforeLoad: async ({ location }) => {
        if (typeof window === 'undefined') return

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
    const router = useRouter()
    const { data: session, isPending, error } = authClient.useSession()
    const [isChecking, setIsChecking] = useState(true)

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

    if (location.pathname.includes('/login')) {
        return <Outlet />
    }

    if (isPending || isChecking) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        )
    }

    if (!session || session.user.role !== 'admin') {
        return null
    }

    return (
        <div className="flex h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-white/30">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0A0A0A] p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}
