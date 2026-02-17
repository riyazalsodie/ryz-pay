import React from 'react'
import { useLocation } from '@tanstack/react-router'
import Header from './Header'
import Profile from './Profile'
import PaymentTabs from './PaymentTabs'
import PaymentGrid from './PaymentGrid'
import SupportSection from './SupportSection'
import TransactionDetails from './TransactionDetails'
import FAQSection from './FAQSection'
import Footer from './Footer'
import PaymentModal from './PaymentModal'
import useStore from '../store/useStore'
import { Route } from '../routes/index'

const Layout = () => {
    const { paymentMethods } = Route.useLoaderData()
    const { activeTab } = useStore()

    const renderContent = () => {
        switch (activeTab) {
            case 'mobile_banking':
                return <PaymentGrid type="mobile_banking" methods={paymentMethods} />

            case 'net_banking':
                return <PaymentGrid type="net_banking" methods={paymentMethods} />
            case 'support':
                return <SupportSection />
            case 'transactions':
                return <TransactionDetails />
            case 'faq':
                return <FAQSection />
            default:
                return <PaymentGrid type="mobile_banking" methods={paymentMethods} />
        }
    }

    return (
        <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center font-sans">
            <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-blue-100 pointer-events-none"></div>

            <div className="up-container max-w-md overflow-hidden mx-auto p-8 relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap bg-[#fbfcff]">
                <Header />
                <Profile />
                <PaymentTabs />

                <div className="overflow-auto p-0.5 mt-2 w-full pb-7 sm:pb-0 min-h-[300px]">
                    {renderContent()}
                </div>

                <Footer />
            </div>

            <PaymentModal />
        </div>
    )
}

export default Layout
