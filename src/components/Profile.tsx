import { Headphones, FileText, FileSpreadsheet } from 'lucide-react'
import { motion } from 'framer-motion'
import useStore, { TabType } from '../store/useStore'
import clsx from 'clsx'

const Profile = () => {
    const { activeTab, setActiveTab } = useStore()

    const tabs: { id: TabType, icon: any, label: string, activeLabel: string }[] = [
        { id: 'support', icon: Headphones, label: 'সাপোর্ট', activeLabel: 'Support' },
        { id: 'faq', icon: FileText, label: 'তথ্যাদি', activeLabel: 'FAQ' }, // Label translation approx
        { id: 'transactions', icon: FileSpreadsheet, label: 'বিস্তারিত', activeLabel: 'Transactions' },
    ]

    return (
        <div className="flex flex-col items-center mt-7 mb-6 sm:mb-3 sm:flex-row w-full">
            <div className="mb-4 sm:mr-8">
                <img
                    src="/assets/logo.webp"
                    alt="RYZ PAY"
                    className="w-24 sm:w-[85px] rounded-full overflow-hidden object-cover ring-1 ring-[#0057d0]/10 cursor-pointer transition-all duration-300 hover:scale-105"
                />
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="mb-4 sm:mb-3">
                    <h3 className="font-semibold text-xl text-[#0057d0] sm:text-[#6D7F9A] dark:text-white">RYZ PAY</h3>
                    {/* Note: Original text color seems to be gray, but maybe blue on active? Sticking to design analysis */}
                </div>
                <div className="flex gap-4">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        const Icon = tab.icon
                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "section-btn flex items-center justify-center sm:justify-start",
                                    isActive ? "active text-[#0057d0] dark:text-blue-400" : "text-[#6D7F9A] dark:text-gray-400"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Icon className={clsx("w-5 h-5", isActive ? "text-[#0057d0] dark:text-blue-400" : "text-[#94A9C7] dark:text-gray-500")} />
                                <span className={clsx(
                                    "hidden sm:block text-[14px] ml-3 font-bangla",
                                    isActive ? "text-[#0057d0] dark:text-blue-400" : "text-[#879ab6] dark:text-gray-400"
                                )}>
                                    {tab.label}
                                </span>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile
