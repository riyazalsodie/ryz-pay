
import Header from './Header'
import Profile from './Profile'
import PaymentTabs from './PaymentTabs'
import PaymentGrid from './PaymentGrid'
import SupportSection from './SupportSection'
import TransactionDetails from './TransactionDetails'
import FAQSection from './FAQSection'
import Footer from './Footer'
import PaymentModal from './PaymentModal'
import { useLoaderData } from '@tanstack/react-router'
import useStore from '../store/useStore'
import Switch from './Switch'

const Layout = () => {
    const { paymentMethods, gateways } = useLoaderData({ from: '/' })
    const { activeTab } = useStore()

    const activeGateways = gateways?.filter((g: any) => g.status) || []
    const hasAnyGateways = activeGateways.length > 0

    const renderContent = () => {
        if (!hasAnyGateways) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">No gateways are available</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Please contact support for assistance</p>
                </div>
            )
        }

        switch (activeTab) {
            case 'mobile_banking':
                return <PaymentGrid type="mobile_banking" gateways={gateways} methods={paymentMethods} />

            case 'net_banking':
                return <PaymentGrid type="net_banking" methods={paymentMethods} gateways={gateways} />
            case 'support':
                return <SupportSection />
            case 'transactions':
                return <TransactionDetails />
            case 'faq':
                return <FAQSection />
            default:
                return <PaymentGrid type="mobile_banking" methods={paymentMethods} gateways={gateways} />
        }
    }

    return (
        <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center font-sans">
            <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black dark:to-black
                bg-[length:24px_24px] bg-[radial-gradient(#0057d0_1px,transparent_1px)] opacity-30 dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] dark:opacity-40"></div>

            <div className="flex flex-col items-center w-full max-w-md mx-auto relative">
                <div className="up-container w-full overflow-hidden p-8 relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap bg-[#fbfcff] dark:bg-black dark:border dark:border-white/10 dark:shadow-none">
                    <Header />
                    <Profile />
                    <PaymentTabs />

                    <div className="overflow-auto p-0.5 mt-2 w-full pb-7 sm:pb-0 min-h-[300px]">
                        {renderContent()}
                    </div>

                    <Footer />
                </div>
                <div className="text-[10px] text-[#0057d0]/40 font-bold tracking-[0.2em] uppercase mt-4 mb-8 text-center w-full dark:text-gray-500 flex flex-col items-center gap-4">
                    RYZ PAY Developed BY R ! Y 4 Z
                    <Switch />
                </div>
            </div>

            <PaymentModal gateways={gateways} />
        </div>
    )
}

export default Layout
