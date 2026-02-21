import { useNavigate } from '@tanstack/react-router'
import useStore from '../store/useStore'
import { motion } from 'framer-motion'

import BkashPersonalDetails from './BkashPersonalDetails'
import NagadPersonalDetails from './NagadPersonalDetails'
import RocketPersonalDetails from './RocketPersonalDetails'
import CellfinPersonalDetails from './CellfinPersonalDetails'
import UpayPersonalDetails from './UpayPersonalDetails'

import bkashImg from '/assets/bkash.png'
import nagadImg from '/assets/nagad.png'
import rocketImg from '/assets/rocket.png'
import upayImg from '/assets/upay.png'
import cellfinImg from '/assets/cellfin.png'

const getGatewayImage = (identifier: string) => {
    switch (identifier?.toLowerCase()) {
        case 'bkash': return bkashImg
        case 'nagad': return nagadImg
        case 'rocket': return rocketImg
        case 'upay': return upayImg
        case 'cellfin': return cellfinImg
        default: return bkashImg
    }
}

const PaymentModal = ({ gateways = [] }: { gateways?: any[] }) => {
    const {
        isModalOpen,
        closeModal,
        selectedPaymentMethod,
        modalPhase,
        // setModalPhase, // Unused
        selectedSubMethod,
        setSelectedSubMethod
    } = useStore()

    const navigate = useNavigate()

    if (!isModalOpen || !selectedPaymentMethod) return null

    // Filter gateways for the selected method
    const relevantGateways = gateways.filter(g =>
        g.identifier?.toLowerCase() === selectedPaymentMethod.id.toLowerCase() && g.status
    )

    const handleSelectGateway = (gateway: any) => {
        setSelectedSubMethod('personal') // Using 'personal' as a generic selected state for now

        // Generate a sample hash for the checkout URL
        const hash = 'bac303ad226facb3bbea00fcc5e2a078b1cd8284'
        navigate({
            to: '/checkout/mfs/$provider/$type/$hash',
            params: {
                provider: selectedPaymentMethod.id,
                type: gateway.id, // Using gateway ID as type
                hash
            }
        })
        closeModal()
    }

    const getBadgeColor = (subType: string) => {
        switch(subType?.toLowerCase()) {
            case 'personal': return 'bg-[#e2136e]'
            case 'agent': return 'bg-[#0057d0]'
            case 'merchant': return 'bg-[#bf2929]'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#00000080] flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-[90%] sm:w-[380px] bg-white p-[20px] rounded-lg border border-[#0057d0] shadow-lg shadow-[#00000030] dark:bg-black dark:border-white/20"
            >
                {modalPhase === 'selection' && (
                    <>
                        <div className="">
                            <h1 className="font-bangla text-[18px] text-slate-700 mb-6 pb-2 border-b border-b-[#e5eefa] font-[500] dark:text-white dark:border-b-white/10">Select Payment Option</h1>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mb-6 max-h-[300px] overflow-y-auto">
                            {relevantGateways.length > 0 ? (
                                relevantGateways.map((gateway) => (
                                    <motion.div
                                        key={gateway.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelectGateway(gateway)}
                                        className="card-input w-full ring-1 ring-[#0057d0]/10 rounded-md flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 bg-white dark:bg-black dark:ring-white/10 dark:hover:bg-white/5"
                                    >
                                        <img
                                            src={gateway.logo || getGatewayImage(gateway.identifier)}
                                            alt={gateway.displayName || gateway.name}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-slate-600 text-sm dark:text-gray-300 font-medium">
                                                {gateway.displayName || gateway.name}
                                                <span className={`${getBadgeColor(gateway.subType)} py-[2px] px-[8px] text-xs text-white rounded-full ml-2 capitalize`}>
                                                    {gateway.subType || 'Manual'}
                                                </span>
                                            </h2>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        // Fallback: navigate with type '1' for default behavior
                                        const hash = 'bac303ad226facb3bbea00fcc5e2a078b1cd8284'
                                        navigate({
                                            to: '/checkout/mfs/$provider/$type/$hash',
                                            params: {
                                                provider: selectedPaymentMethod.id,
                                                type: '1', // Default type for fallback
                                                hash
                                            }
                                        })
                                        closeModal()
                                    }}
                                    className="card-input w-full ring-1 ring-[#0057d0]/10 rounded-md flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 bg-white dark:bg-black dark:ring-white/10 dark:hover:bg-white/5"
                                >
                                    <img
                                        src={getGatewayImage(selectedPaymentMethod.id)}
                                        alt={selectedPaymentMethod.name}
                                        className="w-12 h-12 object-contain"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-slate-600 text-sm dark:text-gray-300 font-medium">
                                            {selectedPaymentMethod.name || selectedPaymentMethod.id}
                                            <span className="bg-gray-500 py-[2px] px-[8px] text-xs text-white rounded-full ml-2 capitalize">
                                                Default
                                            </span>
                                        </h2>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <button
                            onClick={closeModal}
                            className="w-full block text-center p-1 bg-[#0057d0]/10 rounded-md text-[#0057d0] font-medium cursor-pointer hover:bg-[#0057d0]/20 transition-colors dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                        >
                            Close
                        </button>
                    </>
                )}

                {modalPhase === 'details' && selectedSubMethod === 'personal' && (
                    <>
                        {selectedPaymentMethod.id === 'bkash' && <BkashPersonalDetails />}
                        {selectedPaymentMethod.id === 'nagad' && <NagadPersonalDetails />}
                        {selectedPaymentMethod.id === 'rocket' && <RocketPersonalDetails />}
                        {selectedPaymentMethod.id === 'cellfin' && <CellfinPersonalDetails />}
                        {selectedPaymentMethod.id === 'upay' && <UpayPersonalDetails />}
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default PaymentModal
