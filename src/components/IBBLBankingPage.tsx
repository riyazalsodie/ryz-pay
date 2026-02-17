import React, { useState } from 'react'
import { X, Copy, CheckCircle2, Upload } from 'lucide-react'

interface IBBLBankingPageProps {
  onBack?: () => void
  onCancel?: () => void
  onSubmit?: (file: File) => void
}

const IBBLBankingPage: React.FC<IBBLBankingPageProps> = ({ onBack, onCancel, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [_language, setLanguage] = useState<'bangla' | 'english'>('bangla')

  const amount = '2200'
  const invoiceId = '7qwbSv7Cz4p9m5qURVZg'
  const merchantName = 'Amar Host'
  const bankAccountName = 'Amar Host Ltd.'
  const bankAccountNumber = '20502130100209900'
  const bankBranch = 'Gulshan Circle-1'
  const bankRouting = '125261828'

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsSubmitting(true)

    setTimeout(() => {
      if (onSubmit) {
        onSubmit(file)
      }
      setIsSubmitting(false)
    }, 1500)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bangla' ? 'english' : 'bangla')
  }

  return (
    <div className="w-full min-h-screen sm:h-auto sm:p-12 sm:flex sm:items-center sm:justify-center bg-gradient-to-br from-[#f4f9ff] to-[#edf4ff]">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#28a745] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 font-bangla">আপলোড করা হচ্ছে...</p>
            </div>
          </div>
        </div>
      )}

      <div className="up-container max-w-md overflow-hidden mx-auto p-8 sm:relative sm:bg-white sm:rounded-lg sm:shadow-lg sm:shadow-[#0057d0]/10 sm:min-w-[650px] sm:flex sm:flex-wrap">

        <div className="w-full h-12 shadow-md shadow-[#0057d0]/5 rounded-lg overflow-hidden flex justify-between items-center p-5 bg-white sm:bg-[#fbfcff] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10">
          <div>
            <button onClick={onBack} className="hover:opacity-70 transition-opacity" aria-label="Go back">
              <svg width="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1Z" stroke="#6D7F9A" strokeWidth="1.5" />
                <path d="M10.7749 12.9L7.3749 9.50002L10.7749 6.10002" stroke="#94A9C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={toggleLanguage} className="hover:opacity-70 transition-opacity" aria-label="Change language">
              <svg width="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.39719 7.97288L4.88063 9.5H3.5625L5.77362 3.5625H7.29837L9.5 9.5H8.11419L7.59762 7.97288H5.39719ZM7.33756 7.09888L6.53125 4.69775H6.47306L5.66675 7.09888H7.33875H7.33756Z" fill="#94A9C7"></path>
                <path d="M0 2.375C0 1.74511 0.250223 1.14102 0.695621 0.695621C1.14102 0.250223 1.74511 0 2.375 0L10.6875 0C11.3174 0 11.9215 0.250223 12.3669 0.695621C12.8123 1.14102 13.0625 1.74511 13.0625 2.375V5.9375H16.625C17.2549 5.9375 17.859 6.18772 18.3044 6.63312C18.7498 7.07852 19 7.68261 19 8.3125V16.625C19 17.2549 18.7498 17.859 18.3044 18.3044C17.859 18.7498 17.2549 19 16.625 19H8.3125C7.68261 19 7.07852 18.7498 6.63312 18.3044C6.18772 17.859 5.9375 17.2549 5.9375 16.625V13.0625H2.375C1.74511 13.0625 1.14102 12.8123 0.695621 12.3669C0.250223 11.9215 0 11.3174 0 10.6875V2.375ZM2.375 1.1875C2.06006 1.1875 1.75801 1.31261 1.53531 1.53531C1.31261 1.75801 1.1875 2.06006 1.1875 2.375V10.6875C1.1875 11.0024 1.31261 11.3045 1.53531 11.5272C1.75801 11.7499 2.06006 11.875 2.375 11.875H10.6875C11.0024 11.875 11.3045 11.7499 11.5272 11.5272C11.7499 11.3045 11.875 11.0024 11.875 10.6875V2.375C11.875 2.06006 11.7499 1.75801 11.5272 1.53531C11.3045 1.31261 11.0024 1.1875 10.6875 1.1875H2.375ZM10.8514 13.0566C11.0806 13.414 11.3287 13.7489 11.5995 14.0612C10.7112 14.744 9.61281 15.2499 8.3125 15.5954C8.52388 15.8531 8.84806 16.3495 8.97156 16.625C10.3075 16.1987 11.4416 15.6227 12.3987 14.8509C13.3214 15.6406 14.4638 16.2343 15.8781 16.5989C16.036 16.2972 16.3697 15.7997 16.625 15.542C15.2891 15.2416 14.1823 14.7179 13.2763 14.0173C14.0849 13.1302 14.7274 12.0567 15.2012 10.7433H16.625V9.5H13.0625V10.7433H13.9709C13.5933 11.7456 13.0922 12.5792 12.4604 13.2727C12.2859 13.0868 12.1214 12.8918 11.9676 12.6884C11.6325 12.9033 11.2485 13.0299 10.8514 13.0566Z" fill="#6D7F9A"></path>
              </svg>
            </button>
            <button onClick={onCancel} className="hover:opacity-70 transition-opacity" aria-label="Cancel">
              <X className="w-5 h-5 text-[#94A9C7]" />
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col sm:flex-row flex-wrap sm:mt-5 sm:justify-between sm:items-center">
            <div className="w-full h-20 mb-4 sm:mt-0 flex justify-center items-center">
              <img src="/assets/650b4744ef1353-87739222-60070744.png" alt="Islami Bank" className="h-[80%] object-contain" />
            </div>

            <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg px-5 py-3 sm:h-[85px] flex items-center sm:w-[70%] sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10">
              <div className="w-[55px] h-[55px] p-1.5 flex justify-center items-center mr-4 ring-1 ring-[#0057d0]/10 rounded-full">
                <img src="/assets/63e557be80f047-41431550-10926609.png" alt={merchantName} className="w-[80%]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#6D7F9A]">{merchantName}</h3>
                <span className="text-[#94a9c7] text-sm font-bangla">ইনভয়েস আইডিঃ</span>
                <p className="text-[#6D7F9A] text-sm select-all font-mono">{invoiceId}</p>
              </div>
            </div>

            <div className="bg-white shadow shadow-[#0057d0]/5 rounded-lg py-3 px-2 sm:h-[85px] flex flex-col sm:items-center sm:justify-center sm:shadow-none sm:ring-1 sm:ring-[#0057d0]/10 mt-3 sm:w-[25%] sm:mt-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#6D7F9A]">৳ {amount}</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="bg-[#28a745] p-5 rounded-lg overflow-auto">
              {/* Account Details */}
              <div className="text-white mb-6">
                <h2 className="mb-3 font-semibold text-lg font-bangla text-center border-b border-white/20 pb-2">ব্যাংক একাউন্ট তথ্য</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-80">Account Name:</span>
                    <span className="font-semibold font-mono">{bankAccountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Account Number:</span>
                    <div className="flex items-center">
                      <span className="font-semibold font-mono mr-2">{bankAccountNumber}</span>
                      <button type="button" onClick={() => handleCopy(bankAccountNumber)}>
                        {copied ? <CheckCircle2 className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white/70 hover:text-white" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Branch:</span>
                    <span className="font-semibold">{bankBranch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Routing No:</span>
                    <span className="font-semibold font-mono">{bankRouting}</span>
                  </div>
                </div>
              </div>


              <div className="text-center mt-3">
                <h2 className="mb-3 font-semibold text-white font-bangla">পেমেন্ট স্লিপ আপলোড করুন</h2>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/30 border-dashed rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-white mb-2" />
                    <p className="mb-1 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-white/70">PNG, JPG or PDF</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                  />
                </label>
                {file && (
                  <div className="mt-2 text-white text-sm font-medium bg-white/20 py-1 px-3 rounded-full inline-block">
                    Selected: {file.name}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <ul className="text-slate-100 space-y-3">
                  <li className="flex text-sm">
                    <div><span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span></div>
                    <p className="font-bangla">আপনার ইন্টারনেট ব্যাংকিং বা ব্রাঞ্চ থেকে উপরের একাউন্টে টাকা পাঠান।</p>
                  </li>
                  <hr className="border-white/20 my-3" />
                  <li className="flex text-sm">
                    <div><span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span></div>
                    <p className="font-bangla">টাকার পরিমাণঃ <span className="text-yellow-300 font-semibold ml-1">{amount}</span></p>
                  </li>
                  <hr className="border-white/20 my-3" />
                  <li className="flex text-sm">
                    <div><span className="inline-block w-1.5 h-1.5 mr-2 bg-white rounded-full mb-0.5"></span></div>
                    <p className="font-bangla">
                      লেনদেন সম্পন্ন হলে পেমেন্ট স্লিপের ছবি বা স্ক্রিনশট আপলোড করুন এবং
                      <span className="text-yellow-300 font-semibold ml-1">VERIFY</span> বাটনে ক্লিক করুন।
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                disabled={!file || isSubmitting}
                className="bg-[#28a745] hover:bg-[#218838] disabled:opacity-50 disabled:cursor-not-allowed block rounded-[10px] px-4 py-3.5 text-center font-semibold text-white transition-colors w-full shadow-lg shadow-[#28a745]/20"
              >
                {isSubmitting ? 'UPLOADING...' : 'VERIFY'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IBBLBankingPage
