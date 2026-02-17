import { useState } from 'react'
import useStore from '../store/useStore'
import { ChevronLeft } from 'lucide-react'
import CopyButton from './ui/CopyButton'

const NagadPersonalDetails = () => {
    const { setModalPhase } = useStore()
    const [trxId, setTrxId] = useState('')



    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button
                onClick={() => setModalPhase('selection')}
                className="flex items-center text-[#0057d0] mb-4 hover:underline text-sm font-bangla"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                পিছনে যান
            </button>

            <div className="text-center mb-6">
                <img src="/assets/nagad.png" alt="Nagad" className="h-12 mx-auto mb-2" />
                <h2 className="text-lg font-bold text-slate-800 font-bangla dark:text-white">RYZ PAY</h2>
                <div className="flex justify-center items-center gap-2 text-sm text-slate-500 font-bangla dark:text-gray-400">
                    <span>ইনভয়েস আইডিঃ</span>
                    <span className="font-semibold text-slate-700 dark:text-gray-300">7qwbSv7Cz4p9m5qURVZg</span>
                </div>
            </div>

            <div className="bg-[#f8faff] rounded-lg p-5 border border-[#0057d0]/10 mb-6 text-center dark:bg-black dark:border-white/10">
                <div className="text-3xl font-bold text-[#c90008] mb-1">৳ 2233</div>
                <div className="text-xs text-slate-500 font-bangla dark:text-gray-400">1.50% ফি যুক্ত হয়েছে</div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-white rounded-md border border-[#0057d0]/20 p-3 relative overflow-hidden group dark:bg-black dark:border-white/20">
                    <p className="text-xs text-slate-500 mb-1 font-bangla dark:text-gray-400">প্রাপক নম্বর (Personal)</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-700 tracking-wider dark:text-white">01762905013</span>
                        <CopyButton textToCopy="01762905013" className="bg-[#c90008] hover:bg-[#af0007] text-white" />
                    </div>
                </div>

                <div className="text-[13px] text-slate-600 leading-relaxed font-bangla space-y-2 dark:text-gray-300">
                    <p>১. *১৬৭# ডায়াল করে আপনার Nagad মেনুতে যান অথবা অ্যাপে যান।</p>
                    <p>২. <strong className="text-slate-800 dark:text-white">"Send Money"</strong> অপশনটি বেছে নিন।</p>
                    <p>৩. প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।</p>
                    <p>৪. টাকার পরিমাণ হিসেবে <strong className="text-[#c90008]">২২৩৩</strong> টাকা দিন।</p>
                    <p>৫. পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।</p>
                    <p>৬. এখন নিচের বক্সে আপনার <strong className="text-slate-800 dark:text-white">Transaction ID</strong> দিন এবং "VERIFY" বাটনে ক্লিক করুন।</p>
                </div>
            </div>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="ট্রান্সজেকশন আইডি দিন"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full p-3 border border-[#0057d0]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c90008]/30 text-left uppercase tracking-widest placeholder:font-bangla placeholder:tracking-normal dark:bg-[#111] dark:text-white dark:border-white/20 dark:placeholder-gray-500"
                />
                <button
                    disabled={!trxId}
                    className="w-full bg-[#c90008] text-white py-3 rounded-md font-bold font-bangla hover:bg-[#af0007] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                >
                    VERIFY
                </button>
            </div>
        </div>
    )
}

export default NagadPersonalDetails
