import React, { useState } from 'react'
import useStore from '../store/useStore'
import { ChevronLeft, X } from 'lucide-react'
import CopyButton from './ui/CopyButton'

const PaymentDetailsPage = ({ dynamicData }: { dynamicData?: { transaction: any, gateway: any } }) => {
    const {
        selectedPaymentMethod,
        setView,
    } = useStore()

    const [trxId, setTrxId] = useState('')

    if (!selectedPaymentMethod && !dynamicData) return null

    let brandColor = '#0057d0'
    let feeStr = '0%'
    let total = '2200'
    let recipientNumber = '01762905013'
    let instructions: string[] = []
    let invoiceId = '7qwbSv7Cz4p9m5qURVZg'
    let subType = 'Personal'

    if (dynamicData) {
        const { transaction, gateway } = dynamicData
        total = transaction.amount.toString()
        invoiceId = transaction.id
        recipientNumber = gateway.config?.number || gateway.config?.phone || '01762905013'
        
        // Calculate dynamic fee
        const fixedFee = gateway.fixedCharge || 0
        const percentFee = gateway.percentCharge || 0
        if (fixedFee > 0 || percentFee > 0) {
            const calculatedFee = fixedFee + (transaction.amount * (percentFee / 100))
            const finalTotal = transaction.amount + calculatedFee
            total = finalTotal.toFixed(2)
            feeStr = percentFee > 0 ? `${percentFee}%` : `৳${fixedFee}`
        }

        // Use custom instructions if provided, otherwise fallback to template
        subType = gateway.subType || 'Personal'
        if (gateway.instructions) {
            instructions = gateway.instructions.split('\n').filter((l: string) => l.trim().length > 0)
        } else {
            const providerName = gateway.displayName || gateway.name || 'Gateway'
            const action = subType === 'merchant' ? 'Payment' : subType === 'agent' ? 'Cash Out' : 'Send Money'
            instructions = [
                `*২৪৭# ডায়াল করে আপনার ${providerName} মেনুতে যান অথবা অ্যাপে যান।`,
                `\"${action}\" অপশনটি বেছে নিন।`,
                'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                `টাকার পরিমাণ হিসেবে ${total} টাকা দিন।`,
                'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                'এখন নিচের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
            ]
        }

        const providerId = gateway.identifier?.toLowerCase() || 'bkash'
        switch (providerId) {
            case 'bkash': brandColor = '#e2136e'; break;
            case 'nagad': brandColor = '#c90008'; break;
            case 'rocket': brandColor = '#89288f'; break;
            case 'cellfin': brandColor = '#00803d'; break;
            case 'upay': brandColor = '#0054a6'; break;
        }
    } else if (selectedPaymentMethod) {
        invoiceId = '7qwbSv7Cz4p9m5qURVZg'
        switch (selectedPaymentMethod.id) {
            case 'bkash':
                brandColor = '#e2136e'
                feeStr = '2.00%'
                total = '2244'
                instructions = [
                    '*২৪৭# ডায়াল করে আপনার bKash মেনুতে যান অথবা অ্যাপে যান।',
                    '\"Send Money\" অপশনটি বেছে নিন।',
                    'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                    'টাকার পরিমাণ হিসেবে ২২৪৪ টাকা দিন।',
                    'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                    'এখন নিচের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
                ]
                break
            case 'nagad':
                brandColor = '#c90008'
                feeStr = '1.50%'
                total = '2233'
                instructions = [
                    '*১৬৭# ডায়াল করে আপনার Nagad মেনুতে যান অথবা অ্যাপে যান।',
                    '\"Send Money\" অপশনটি বেছে নিন।',
                    'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                    'টাকার পরিমাণ হিসেবে ২২৩৩ টাকা দিন।',
                    'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                    'এখন নিচের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
                ]
                break
            // ... (rest could be added but focusing on dynamic path)
            default:
                brandColor = '#0057d0'
                total = '2200'
        }
    }

    const imgSrc = dynamicData ? (dynamicData.gateway.logo || `/assets/${dynamicData.gateway.identifier}.png`) : selectedPaymentMethod?.img
    const providerNameStr = dynamicData ? (dynamicData.gateway.displayName || dynamicData.gateway.name) : selectedPaymentMethod?.name

    return (
        <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center animate-in fade-in duration-500">
            <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black dark:to-black pointer-events-none"></div>

            <div className="up-container max-w-md overflow-hidden mx-auto p-8 relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap bg-[#fbfcff] dark:bg-black dark:border dark:border-white/10 dark:shadow-none">

                {/* Full Nav */}
                <div className="w-full h-12 shadow-md shadow-[#0057d0]/5 rounded-lg overflow-hidden flex justify-between items-center p-5 bg-white sm:bg-[#fbfcff]  sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mb-6 dark:bg-black dark:border-b dark:border-white/10 dark:ring-0 dark:shadow-none">
                    <div>
                        <button onClick={() => setView('dashboard')}>
                            <ChevronLeft className="w-5 h-5 text-[#94A9C7] hover:text-[#6D7F9A] transition-colors" />
                        </button>
                    </div>
                    <div className="flex items-center gap-5">
                        <X className="w-5 h-5 text-[#94A9C7] cursor-pointer hover:text-[#6D7F9A]" onClick={() => setView('dashboard')} />
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center mb-6">
                        <div className="w-full h-20 mb-4 sm:mt-0 flex justify-center items-center">
                            <img src={imgSrc} alt={providerNameStr || 'Payment'} className="h-full object-contain" />
                        </div>

                        <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg px-5 py-3 sm:h-[85px] flex items-center sm:w-[70%] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 dark:bg-black dark:border dark:border-white/10 dark:shadow-none dark:ring-0">
                            <div className="w-[75px] h-[75px] flex justify-center items-center mr-4 ring-1 ring-[#0057d0]/10 rounded-full overflow-hidden dark:ring-white/10">
                                <img src="/assets/logo.webp" alt="RYZ PAY" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-[#6D7F9A] dark:text-gray-300">RYZ PAY</h3>
                                <span className="text-[#94a9c7] text-sm font-bangla">ইনভয়েস আইডিঃ</span>
                                <p className="text-[#6D7F9A] text-sm dark:text-gray-400">{invoiceId}</p>
                            </div>
                        </div>

                        <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg py-3 px-2 sm:h-[85px] flex flex-col sm:items-center sm:justify-center sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mt-3 sm:w-[25%] sm:mt-0 text-center dark:bg-black dark:border dark:border-white/10 dark:shadow-none dark:ring-0">
                            <h1 className="text-xl sm:text-2xl font-semibold text-[#6D7F9A] dark:text-white">৳ {total}</h1>
                            {feeStr !== '0%' && (
                                <span className="text-xs text-red-600 font-medium mt-1 font-bangla">{feeStr} ফি যুক্ত হয়েছে</span>
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden mb-6" style={{ backgroundColor: brandColor }}>
                        <div className="p-6 text-center">
                            <h2 className="mb-4 font-semibold text-white font-bangla text-lg">ট্রান্সজেকশন আইডি দিন</h2>
                            <input
                                type="text"
                                placeholder="ট্রান্সজেকশন আইডি দিন"
                                value={trxId}
                                onChange={(e) => setTrxId(e.target.value)}
                                className="font-bangla appearance-none w-full text-[15px] rounded-[10px] bg-white shadow-inner px-5 py-3.5 placeholder-[#94A9C7] focus:outline-none focus:ring-2 focus:ring-white/20 text-center uppercase tracking-widest dark:bg-[#111] dark:text-white dark:border dark:border-white/10 dark:placeholder-gray-500"
                                maxLength={16}
                            />
                        </div>

                        <div className="px-6 pb-6">
                            <div className="w-full bg-white/10 rounded-lg p-4 mb-4">
                                <p className="text-white/80 text-xs mb-1 font-bangla capitalize">প্রাপক নম্বর ({subType})</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-white tracking-wider">{recipientNumber}</span>
                                    <CopyButton textToCopy={recipientNumber} className="bg-white/20 hover:bg-white/30 text-white" />
                                </div>
                            </div>

                            <ul className="text-white/90 text-[13px] font-bangla">
                                {instructions.map((inst, i) => (
                                    <React.Fragment key={i}>
                                        <li className="flex gap-3 py-3">
                                            <div className="w-1.5 h-1.5 mt-1.5 bg-white rounded-full flex-shrink-0"></div>
                                            <div dangerouslySetInnerHTML={{
                                                __html: inst.replace(/\"(.*?)\"/g, '<span class="text-yellow-300 font-semibold">$1</span>')
                                                    .replace(/(\d{11,12})/g, '<span class="text-yellow-300 font-semibold">$1</span>')
                                                    .replace(/(Transaction ID)/g, '<span class="text-yellow-300 font-semibold">$1</span>')
                                                    .replace(/(VERIFY)/g, '<span class="text-yellow-300 font-semibold">$1</span>')
                                            }} />
                                        </li>
                                        {i < instructions.length - 1 && (
                                            <div className="h-[1px] w-full bg-white/10"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        disabled={!trxId}
                        style={{ backgroundColor: brandColor }}
                        className="w-full text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/10"
                    >
                        VERIFY
                    </button>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-[#0057d0]/5 flex justify-center opacity-50 dark:border-white/10">
                    <img src="/assets/logo.webp" alt="RYZ PAY" className="h-6" />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsPage
