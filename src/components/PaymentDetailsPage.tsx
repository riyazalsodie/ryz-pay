import React, { useState } from 'react'
import useStore from '../store/useStore'
import { Copy, CheckCircle2, ChevronLeft, X } from 'lucide-react'
// import Header from './Header' // Unused

const PaymentDetailsPage = () => {
    const {
        selectedPaymentMethod,
        setView,
        // selectedSubMethod, // Unused
        // setSelectedSubMethod // Unused
    } = useStore()

    const [trxId, setTrxId] = useState('')
    const [copied, setCopied] = useState(false)

    if (!selectedPaymentMethod) return null

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Determine brand colors and details based on method
    let brandColor = '#0057d0'
    // let brandHover = '#004cb7' // Unused
    let fee = '0%'
    let total = '2200'
    let recipientNumber = '01762905013'
    let instructions: string[] = []

    switch (selectedPaymentMethod.id) {
        case 'bkash':
            brandColor = '#e2136e'
            // brandHover = '#c91062'
            fee = '2.00%'
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
            // brandHover = '#af0007'
            fee = '1.50%'
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
        case 'rocket':
            brandColor = '#89288f'
            // brandHover = '#6c1e70'
            fee = '1.50%'
            total = '2233'
            recipientNumber = '017629050134'
            instructions = [
                '*৩২২# ডায়াল করে আপনার Rocket মেনুতে যান অথবা অ্যাপে যান।',
                '\"Send Money\" অপশনটি বেছে নিন।',
                'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                'টাকার পরিমাণ হিসেবে ২২৩৩ টাকা দিন।',
                'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                'এখন নিচের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
            ]
            break
        case 'cellfin':
            brandColor = '#00803d'
            // brandHover = '#016e35'
            fee = '0%'
            total = '2200'
            instructions = [
                'প্রথমে আপনার ফোনের CELLFIN অ্যাপে প্রবেশ করুন।',
                '\"Fund Transfer\" অপশনটি বেছে নিন।',
                'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                'টাকার পরিমাণ হিসেবে ২২০০ টাকা দিন।',
                'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                'এখন উপরের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
            ]
            break
        case 'upay':
            brandColor = '#0054a6'
            // brandHover = '#00468a'
            fee = '1.50%'
            total = '2233'
            instructions = [
                '*২৬৮# ডায়াল করে আপনার Upay মেনুতে যান অথবা অ্যাপে যান।',
                '\"Send Money\" অপশনটি বেছে নিন।',
                'প্রাপক নম্বর হিসেবে উপরের নম্বরটি দিন।',
                'টাকার পরিমাণ হিসেবে ২২৩৩ টাকা দিন।',
                'পিন দিয়ে লেনদেন সম্পন্ন করুন এবং একটি নিশ্চিতকরণ মেসেজ পাবেন।',
                'এখন নিচের বক্সে আপনার Transaction ID দিন এবং \"VERIFY\" বাটনে ক্লিক করুন।'
            ]
            break
    }

    return (
        <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center animate-in fade-in duration-500">
            <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-blue-100 pointer-events-none"></div>

            <div className="up-container max-w-md overflow-hidden mx-auto p-8 relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap bg-[#fbfcff]">

                {/* Full Nav */}
                <div className="w-full h-12 shadow-md shadow-[#0057d0]/5 rounded-lg overflow-hidden flex justify-between items-center p-5 bg-white sm:bg-[#fbfcff]  sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mb-6">
                    <div>
                        <button onClick={() => setView('dashboard')}>
                            <ChevronLeft className="w-5 h-5 text-[#94A9C7] hover:text-[#6D7F9A] transition-colors" />
                        </button>
                    </div>
                    <div className="flex items-center gap-5">
                        <svg width="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer hover:opacity-70">
                            <path d="M5.39719 7.97288L4.88063 9.5H3.5625L5.77362 3.5625H7.29837L9.5 9.5H8.11419L7.59762 7.97288H5.39719ZM7.33756 7.09888L6.53125 4.69775H6.47306L5.66675 7.09888H7.33875H7.33756Z" fill="#94A9C7"></path>
                            <path d="M0 2.375C0 1.74511 0.250223 1.14102 0.695621 0.695621C1.14102 0.250223 1.74511 0 2.375 0L10.6875 0C11.3174 0 11.9215 0.250223 12.3669 0.695621C12.8123 1.14102 13.0625 1.74511 13.0625 2.375V5.9375H16.625C17.2549 5.9375 17.859 6.18772 18.3044 6.63312C18.7498 7.07852 19 7.68261 19 8.3125V16.625C19 17.2549 18.7498 17.859 18.3044 18.3044C17.859 18.7498 17.2549 19 16.625 19H8.3125C7.68261 19 7.07852 18.7498 6.63312 18.3044C6.18772 17.859 5.9375 17.2549 5.9375 16.625V13.0625H2.375C1.74511 13.0625 1.14102 12.8123 0.695621 12.3669C0.250223 11.9215 0 11.3174 0 10.6875V2.375ZM2.375 1.1875C2.06006 1.1875 1.75801 1.31261 1.53531 1.53531C1.31261 1.75801 1.1875 2.06006 1.1875 2.375V10.6875C1.1875 11.0024 1.31261 11.3045 1.53531 11.5272C1.75801 11.7499 2.06006 11.875 2.375 11.875H10.6875C11.0024 11.875 11.3045 11.7499 11.5272 11.5272C11.7499 11.3045 11.875 11.0024 11.875 10.6875V2.375C11.875 2.06006 11.7499 1.75801 11.5272 1.53531C11.3045 1.31261 11.0024 1.1875 10.6875 1.1875H2.375ZM10.8514 13.0566C11.0806 13.414 11.3287 13.7489 11.5995 14.0612C10.7112 14.744 9.61281 15.2499 8.3125 15.5954C8.52388 15.8531 8.84806 16.3495 8.97156 16.625C10.3075 16.1987 11.4416 15.6227 12.3987 14.8509C13.3214 15.6406 14.4638 16.2343 15.8781 16.5989C16.036 16.2972 16.3697 15.7997 16.625 15.542C15.2891 15.2416 14.1823 14.7179 13.2763 14.0173C14.0849 13.1302 14.7274 12.0567 15.2012 10.7433H16.625V9.5H13.0625V10.7433H13.9709C13.5933 11.7456 13.0922 12.5792 12.4604 13.2727C12.2859 13.0868 12.1214 12.8918 11.9676 12.6884C11.6325 12.9033 11.2485 13.0299 10.8514 13.0566Z" fill="#6D7F9A"></path>
                        </svg>
                        <X className="w-5 h-5 text-[#94A9C7] cursor-pointer hover:text-[#6D7F9A]" onClick={() => setView('dashboard')} />
                    </div>
                </div>

                <div className="w-full">
                    {/* Brand Image Header */}
                    <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center mb-6">
                        <div className="w-full h-20 mb-4 sm:mt-0 flex justify-center items-center">
                            <img src={selectedPaymentMethod.img} alt={selectedPaymentMethod.name} className="h-full object-contain" />
                        </div>

                        <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg px-5 py-3 sm:h-[85px] flex items-center sm:w-[70%] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10">
                            <div className="w-[55px] h-[55px] p-1.5 flex justify-center items-center mr-4 ring-1 ring-[#0057d0]/10 rounded-full">
                                <img src="/assets/63e557be80f047-41431550-10926609.png" alt="Amar Host" className="w-[80%]" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-[#6D7F9A]">Amar Host</h3>
                                <span className="text-[#94a9c7] text-sm font-bangla">ইনভয়েস আইডিঃ</span>
                                <p className="text-[#6D7F9A] text-sm font-mono">7qwbSv7Cz4p9m5qURVZg</p>
                            </div>
                        </div>

                        <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg py-3 px-2 sm:h-[85px] flex flex-col sm:items-center sm:justify-center sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mt-3 sm:w-[25%] sm:mt-0 text-center">
                            <h1 className="text-xl sm:text-2xl font-semibold text-[#6D7F9A]">৳ {total}</h1>
                            {fee !== '0%' && (
                                <span className="text-xs text-red-600 font-medium mt-1 font-bangla">{fee} ফি যুক্ত হয়েছে</span>
                            )}
                        </div>
                    </div>

                    {/* Instruction Block */}
                    <div className="rounded-lg overflow-hidden mb-6" style={{ backgroundColor: brandColor }}>
                        <div className="p-6 text-center">
                            <h2 className="mb-4 font-semibold text-white font-bangla text-lg">ট্রান্সজেকশন আইডি দিন</h2>
                            <input
                                type="text"
                                placeholder="ট্রান্সজেকশন আইডি দিন"
                                value={trxId}
                                onChange={(e) => setTrxId(e.target.value)}
                                className="font-bangla appearance-none w-full text-[15px] rounded-[10px] bg-white shadow-inner px-5 py-3.5 placeholder-[#94A9C7] focus:outline-none focus:ring-2 focus:ring-white/20 text-center font-mono uppercase tracking-widest"
                                maxLength={16}
                            />
                        </div>

                        <div className="px-6 pb-6">
                            <div className="w-full bg-white/10 rounded-lg p-4 mb-4">
                                <p className="text-white/80 text-xs mb-1 font-bangla">প্রাপক নম্বর (Personal)</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-white font-mono tracking-wider">{recipientNumber}</span>
                                    <button
                                        onClick={() => handleCopy(recipientNumber)}
                                        className="bg-white/20 text-white p-1.5 rounded-md hover:bg-white/30 transition-colors"
                                    >
                                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
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
                                                    .replace(/(২২\d{2})/g, '<span class="text-yellow-300 font-semibold">$1</span>')
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

                <div className="w-full mt-8 pt-6 border-t border-[#0057d0]/5 flex justify-center opacity-50">
                    <img src="/assets/rz_logo.png" alt="Powered by" className="h-6" />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsPage
