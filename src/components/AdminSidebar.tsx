import { Link, useRouter } from '@tanstack/react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faRightFromBracket, faCreditCard, faUsers, faFile, faLink, faChartBar, faGear, faComment, faMobile, faShield, faWallet, faBolt } from '@fortawesome/free-solid-svg-icons'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function AdminSidebar() {
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        toast.success('Logged out successfully')
        router.navigate({ to: '/admin/login' })
    }

    const menuItems = [
        { icon: faGauge, label: 'Dashboard', to: '/admin/dashboard' },
        { icon: faCreditCard, label: 'Payments', to: '/admin/payments' },
        { icon: faWallet, label: 'Gateways', to: '/admin/gateways' },
        { icon: faUsers, label: 'Customers', to: '/admin/customers' },
        { icon: faFile, label: 'Invoices', to: '/admin/invoices' },
        { icon: faLink, label: 'Payment Links', to: '/admin/links' },
        { icon: faChartBar, label: 'Reports', to: '/admin/reports' },
        { icon: faGear, label: 'Brand Settings', to: '/admin/settings' },
    ]

    const automationItems = [
        { icon: faComment, label: 'SMS Data', to: '/admin/sms' },
        { icon: faMobile, label: 'Devices', to: '/admin/devices' },
    ]

    const adminItems = [
        { icon: faShield, label: 'Activities', to: '/admin/activities' },
        { icon: faBolt, label: 'Billing', to: '/admin/billing' },
    ]

    const menuVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut"
            }
        })
    }

    return (
        <aside className="w-64 bg-[#0A0A0A] border-r border-white/10 hidden md:flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-black text-lg font-bold">R</span>
                    </div>
                    RYZ PAY
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {menuItems.map((item, i) => (
                    <motion.div
                         key={item.to}
                         custom={i}
                         initial="hidden"
                         animate="visible"
                         variants={menuVariants}
                         whileHover={{ scale: 1.02, x: 4 }}
                         whileTap={{ scale: 0.98 }}
                     >
                         <Link
                             to={item.to}
                            activeProps={{
                                className: 'bg-white text-black font-semibold border-l-2 border-white'
                            }}
                            inactiveProps={{
                                className: 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg text-sm font-medium border-l-2 border-transparent w-full"
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-[18px] h-[18px]" />
                            <span>{item.label}</span>
                        </Link>
                    </motion.div>
                ))}

                <div className="pt-4 mt-4 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    MFS Automation
                </div>
                {automationItems.map((item, i) => (
                    <motion.div
                        key={item.to}
                        custom={i + menuItems.length}
                        initial="hidden"
                        animate="visible"
                        variants={menuVariants}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to={item.to}
                            activeProps={{
                                className: 'bg-white text-black font-semibold border-l-2 border-white'
                            }}
                            inactiveProps={{
                                className: 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg text-sm font-medium border-l-2 border-transparent w-full"
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-[18px] h-[18px]" />
                            <span>{item.label}</span>
                        </Link>
                    </motion.div>
                ))}

                <div className="pt-4 mt-4 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administration
                </div>
                {adminItems.map((item, i) => (
                    <motion.div
                        key={item.to}
                        custom={i + menuItems.length + automationItems.length}
                        initial="hidden"
                        animate="visible"
                        variants={menuVariants}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to={item.to}
                            activeProps={{
                                className: 'bg-white text-black font-semibold border-l-2 border-white'
                            }}
                            inactiveProps={{
                                className: 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg text-sm font-medium border-l-2 border-transparent w-full"
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-[18px] h-[18px]" />
                            <span>{item.label}</span>
                        </Link>
                    </motion.div>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-[18px] h-[18px]" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
