

import { motion } from 'framer-motion'

const TransactionDetails = () => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-md shadow-[#0057d0]/5 pb-6"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div className="px-5 py-4 sm:py-0 text-center rounded-lg bg-[#e5efff] sm:bg-transparent text-[#0057d0] font-semibold mb-4">
                <h2 className="font-bangla sm:py-4">লেনদেনের বিস্তারিত</h2>
            </div>
            <ul className="py-4 px-5 sm:mb-5 space-y-3">
                <li className="flex justify-between text-sm text-[#6D7F9A] sm:text-base font-semibold">
                    <p className="font-bangla">ইনভয়েসঃ</p>
                    <p>Muhammad Riyaz</p>
                </li>
                <hr className="my-3 sm:my-1.5 border-[#6D7F9A]/10" />
                <li className="flex justify-between text-sm text-[#6D7F9A]">
                    <p className="font-bangla">পরিমাণঃ</p>
                    <p>2200.00 BDT</p>
                </li>
                <hr className="my-3 sm:my-1.5 border-[#6D7F9A]/10" />
                <li className="flex justify-between text-sm text-[#6D7F9A]">
                    <p className="font-semibold font-bangla">মোট প্রদেয় পরিমাণঃ</p>
                    <p className="font-semibold text-[#0057d0]">2200.00 BDT</p>
                </li>
            </ul>
        </motion.div>
    )
}

export default TransactionDetails
