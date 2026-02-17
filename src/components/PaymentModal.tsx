import { useNavigate } from '@tanstack/react-router'
import useStore from '../store/useStore'
import { motion } from 'framer-motion'

import BkashPersonalDetails from './BkashPersonalDetails'
import NagadPersonalDetails from './NagadPersonalDetails'
import RocketPersonalDetails from './RocketPersonalDetails'
import CellfinPersonalDetails from './CellfinPersonalDetails'
import UpayPersonalDetails from './UpayPersonalDetails'

const PaymentModal = () => {
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

    const handleSelectSubMethod = (sub: 'personal' | 'live') => {
        setSelectedSubMethod(sub)

        if (sub === 'personal') {
            // Generate a sample hash for the checkout URL (same as in PaymentGrid)
            const hash = 'bac303ad226facb3bbea00fcc5e2a078b1cd8284'
            navigate({
                to: '/checkout/mfs/$provider/$type/$hash',
                params: {
                    provider: selectedPaymentMethod.id,
                    type: '1',
                    hash
                }
            })
            closeModal()
        }
        // Live option is currently empty/disabled as per request
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#00000080] flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-[90%] sm:w-[380px] bg-white p-[20px] rounded-lg border border-[#0057d0] shadow-lg shadow-[#00000030]"
            >
                {modalPhase === 'selection' && (
                    <>
                        <div className="">
                            <h1 className="font-bangla text-[18px] text-slate-700 mb-6 pb-2 border-b border-b-[#e5eefa] font-[500]">Select Payment Option</h1>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSelectSubMethod('personal')}
                                className="card-input w-full ring-1 ring-[#0057d0]/10 rounded-md flex flex-col justify-center items-center h-[70px] cursor-pointer hover:bg-gray-50 bg-white"
                            >
                                <h2 className="mt-2 text-center text-slate-600 text-sm">
                                    {selectedPaymentMethod.name} <span className="bg-[#e2136e] py-[2px] px-[8px] text-xs text-white rounded-full ml-1">Personal</span>
                                </h2>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSelectSubMethod('live')}
                                className="card-input w-full ring-1 ring-[#0057d0]/10 rounded-md flex flex-col justify-center items-center h-[70px] cursor-pointer hover:bg-gray-50 bg-white"
                            >
                                <h2 className="mt-2 text-center text-slate-600 text-sm">
                                    {selectedPaymentMethod.name} Payment <span className="bg-[#bf2929] py-[2px] px-[8px] text-xs text-white rounded-full ml-1">Live</span>
                                </h2>
                            </motion.div>
                        </div>

                        <button
                            onClick={closeModal}
                            className="w-full block text-center p-1 bg-[#0057d0]/10 rounded-md text-[#0057d0] font-medium cursor-pointer hover:bg-[#0057d0]/20 transition-colors"
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
