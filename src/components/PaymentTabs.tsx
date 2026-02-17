
import useStore from '../store/useStore'
import clsx from 'clsx'

const PaymentTabs = () => {
    const { activeTab, setActiveTab } = useStore()

    // const isMobile = ... // Unused logic

    return (
        <div className="flex w-full justify-between bg-[#0057d0] text-white overflow-hidden rounded-md mb-6">
            <button
                onClick={() => setActiveTab('mobile_banking')}
                className={clsx(
                    "w-full py-1.5 text-center text-[12px] sm:text-[15px] transition-all duration-300 font-bangla",
                    activeTab === 'mobile_banking' ? "bg-[#004cb7]" : "hover:bg-[#0057d0]/80"
                )}
            >
                মোবাইল ব্যাংকিং
            </button>
            <button
                onClick={() => setActiveTab('net_banking')}
                className={clsx(
                    "w-full py-1.5 text-center text-[12px] sm:text-[15px] transition-all duration-300 font-bangla border-l border-white/10",
                    activeTab === 'net_banking' ? "bg-[#004cb7]" : "hover:bg-[#0057d0]/80"
                )}
            >
                নেট ব্যাংকিং
            </button>
        </div>
    )
}

export default PaymentTabs
