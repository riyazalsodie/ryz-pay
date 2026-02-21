import React, { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import CopyButton from './ui/CopyButton'
import useStore from '../store/useStore'

interface NagadMFSPageProps {
  onBack?: () => void
  onCancel?: () => void
  onVerify?: (transactionId: string, phoneNumber?: string) => void
  gateway?: any
}

const NagadMFSPage: React.FC<NagadMFSPageProps> = ({ onBack, onCancel, onVerify, gateway }) => {
  const [transactionId, setTransactionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language, setLanguage } = useStore()

  const recipientNumber = gateway?.config?.walletNumber || '01762905013'
  const amount = '2200'
  const invoiceId = '7qwbSv7Cz4p9m5qURVZg'
  const merchantName = gateway?.displayName || gateway?.name || 'RYZ PAY'

  const instructions = gateway?.instructions
  const subType = gateway?.subType || 'personal'



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transactionId) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (onVerify) {
        onVerify(transactionId, undefined)
      }
      setIsSubmitting(false)
    }, 1000)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'bangla' ? 'english' : 'bangla')
  }

  return (
    <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center bg-gradient-to-br from-[#f4f9ff] to-[#edf4ff] dark:from-black dark:to-black">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm dark:bg-black/50">
          <div className="bg-white rounded-lg p-8 shadow-2xl dark:bg-[#111] dark:border dark:border-white/10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#c90008] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 font-bangla dark:text-gray-300">যাচাই করা হচ্ছে...</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="up-container max-w-md overflow-hidden mx-auto p-8 sm:relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap dark:bg-black dark:border dark:border-white/10 dark:shadow-none">

        {/* Navigation Bar */}
        <div className="w-full h-12 shadow-md shadow-[#0057d0]/5 rounded-lg overflow-hidden flex justify-between items-center p-5 bg-white sm:bg-[#fbfcff] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 dark:bg-black dark:border-b dark:border-white/10 dark:ring-0 dark:shadow-none">
          <div>
            <button
              onClick={onBack}
              className="hover:opacity-70 transition-opacity"
              aria-label="Go back"
            >
              <svg width="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1Z" className="stroke-[#6D7F9A] dark:stroke-gray-400" strokeWidth="1.5" />
                <path d="M10.7749 12.9L7.3749 9.50002L10.7749 6.10002" className="stroke-[#94A9C7] dark:stroke-gray-500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={toggleLanguage}
              className="hover:opacity-70 transition-opacity"
              aria-label="Change language"
            >
              <svg width="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.39719 7.97288L4.88063 9.5H3.5625L5.77362 3.5625H7.29837L9.5 9.5H8.11419L7.59762 7.97288H5.39719ZM7.33756 7.09888L6.53125 4.69775H6.47306L5.66675 7.09888H7.33875H7.33756Z" className="fill-[#94A9C7] dark:fill-gray-400"></path>
                <path d="M0 2.375C0 1.74511 0.250223 1.14102 0.695621 0.695621C1.14102 0.250223 1.74511 0 2.375 0L10.6875 0C11.3174 0 11.9215 0.250223 12.3669 0.695621C12.8123 1.14102 13.0625 1.74511 13.0625 2.375V5.9375H16.625C17.2549 5.9375 17.859 6.18772 18.3044 6.63312C18.7498 7.07852 19 7.68261 19 8.3125V16.625C19 17.2549 18.7498 17.859 18.3044 18.3044C17.859 18.7498 17.2549 19 16.625 19H8.3125C7.68261 19 7.07852 18.7498 6.63312 18.3044C6.18772 17.859 5.9375 17.2549 5.9375 16.625V13.0625H2.375C1.74511 13.0625 1.14102 12.8123 0.695621 12.3669C0.250223 11.9215 0 11.3174 0 10.6875V2.375ZM2.375 1.1875C2.06006 1.1875 1.75801 1.31261 1.53531 1.53531C1.31261 1.75801 1.1875 2.06006 1.1875 2.375V10.6875C1.1875 11.0024 1.31261 11.3045 1.53531 11.5272C1.75801 11.7499 2.06006 11.875 2.375 11.875H10.6875C11.0024 11.875 11.3045 11.7499 11.5272 11.5272C11.7499 11.3045 11.875 11.0024 11.875 10.6875V2.375C11.875 2.06006 11.7499 1.75801 11.5272 1.53531C11.3045 1.31261 11.0024 1.1875 10.6875 1.1875H2.375ZM10.8514 13.0566C11.0806 13.414 11.3287 13.7489 11.5995 14.0612C10.7112 14.744 9.61281 15.2499 8.3125 15.5954C8.52388 15.8531 8.84806 16.3495 8.97156 16.625C10.3075 16.1987 11.4416 15.6227 12.3987 14.8509C13.3214 15.6406 14.4638 16.2343 15.8781 16.5989C16.036 16.2972 16.3697 15.7997 16.625 15.542C15.2891 15.2416 14.1823 14.7179 13.2763 14.0173C14.0849 13.1302 14.7274 12.0567 15.2012 10.7433H16.625V9.5H13.0625V10.7433H13.9709C13.5933 11.7456 13.0922 12.5792 12.4604 13.2727C12.2859 13.0868 12.1214 12.8918 11.9676 12.6884C11.6325 12.9033 11.2485 13.0299 10.8514 13.0566Z" fill="#6D7F9A"></path>
              </svg>
            </button>
            <button
              onClick={onCancel}
              className="hover:opacity-70 transition-opacity"
              aria-label="Cancel"
            >
              <X className="w-5 h-5 text-[#94A9C7] dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row flex-wrap sm:mt-5 sm:justify-between sm:items-center">
            {/* Logo */}
            <div className="w-full h-20 mb-4 sm:mt-0 flex justify-center items-center">
              <img
                src="/assets/nagad.png"
                alt="Nagad"
                className="h-[80%] object-contain"
              />
            </div>

            {/* Merchant Info */}
            <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg px-5 py-3 sm:h-[85px] flex items-center sm:w-[70%] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 dark:bg-black dark:border dark:border-white/10 dark:shadow-none dark:ring-0">
              <div className="w-[75px] h-[75px] flex justify-center items-center mr-4 ring-1 ring-[#0057d0]/10 rounded-full overflow-hidden dark:ring-white/10">
                <img
                  src="/assets/logo.webp"
                  alt={merchantName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#6D7F9A] dark:text-gray-300">{merchantName}</h3>
                <span className="text-[#94a9c7] text-sm font-bangla">ইনভয়েস আইডিঃ</span>
                <p className="text-[#6D7F9A] dark:text-gray-400 text-sm select-all">{invoiceId}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg py-3 px-2 sm:h-[85px] flex flex-col sm:items-center sm:justify-center sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mt-3 sm:w-[25%] sm:mt-0 dark:bg-black dark:border dark:border-white/10 dark:shadow-none dark:ring-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#6D7F9A] dark:text-white">৳ {amount}</h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-3">
            {/* Instructions Box */}
            <div className="bg-[#c90008] p-5 rounded-lg overflow-auto">
              {/* Transaction ID Input */}
              <div className="text-center mt-3">
                <h2 className="mb-3 font-semibold text-white font-bangla">
                  ট্রান্সজেকশন আইডি দিন
                </h2>
                <input
                  type="text"
                  name="transaction_id"
                  placeholder="ট্রান্সজেকশন আইডি দিন"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="font-bangla appearance-none w-full text-[15px] rounded-[10px] sm:bg-[#fbfcff] bg-white shadow shadow-[#0057d0]/5 px-5 py-3.5 placeholder-[#94A9C7] focus:outline-none focus:ring-1 focus:ring-white text-left uppercase tracking-widest dark:bg-[#111] dark:text-white dark:border dark:border-white/10 dark:placeholder-gray-500"
                  maxLength={16}
                  required
                />
              </div>

              {/* Phone Number Input (conditional) */
              /* {showPhoneNumber && (
                <div className="text-center mt-3">
                  <h2 className="mb-3 font-semibold text-white font-bangla">
                    ফোন নম্বর লিখুন
                  </h2>
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="ফোন নম্বর লিখুন"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="font-bangla appearance-none w-full text-[15px] rounded-[10px] sm:bg-[#fbfcff] bg-white shadow shadow-[#0057d0]/5 px-5 py-3.5 placeholder-[#94A9C7] focus:outline-none focus:ring-1 focus:ring-white text-left"
                    maxLength={12}
                  />
                </div>
              )} */}

              {/* Instructions */}
              <div className="mt-5">
                {instructions ? (
                  <div
                    className="text-slate-200 text-sm space-y-3 font-bangla [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: instructions }}
                  />
                ) : (
                  <ul className="text-slate-200 space-y-3">
                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        প্রথমে আপনার ফোনের Nagad অ্যাপে প্রবেশ করুন।
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        <span className="text-yellow-300 font-semibold ml-1">{subType === 'merchant' ? '"Payment"' : '"Send Money"'}</span> -এ ক্লিক করুন।
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="sm:w-[90%] font-bangla">
                        প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুনঃ
                        <span className="text-yellow-300 font-semibold ml-1">{recipientNumber}</span>
                        <CopyButton textToCopy={recipientNumber} />
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        টাকার পরিমাণঃ <span className="text-yellow-300 font-semibold ml-1">{amount}</span>
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        নিশ্চিত করতে এখন আপনার Nagad মোবাইল মেনু পিন লিখুন।
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        সবকিছু ঠিক থাকলে, আপনি Nagad থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
                      </p>
                    </li>

                    <hr className="border-[#af0007] my-3" />

                    <li className="flex text-sm">
                      <div>
                        <span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span>
                      </div>
                      <p className="font-bangla">
                        এখন উপরের বক্সে আপনার
                        <span className="text-yellow-300 font-semibold ml-1">Transaction ID</span> দিন এবং নিচের
                        <span className="text-yellow-300 font-semibold ml-1">VERIFY</span> বাটনে ক্লিক করুন।
                      </p>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!transactionId || isSubmitting}
                className="bg-[#c90008] hover:bg-[#af0007] disabled:opacity-50 disabled:cursor-not-allowed block rounded-[10px] px-4 py-3.5 text-center font-semibold text-white transition-colors w-full shadow-lg shadow-[#c90008]/20"
              >
                {isSubmitting ? 'VERIFYING...' : 'VERIFY'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NagadMFSPage
