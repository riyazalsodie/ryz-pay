import { useNavigate } from '@tanstack/react-router'
import useStore from '../store/useStore'
import bkashImg from '/assets/bkash.png'
import nagadImg from '/assets/nagad.png'
import rocketImg from '/assets/rocket.png'
import upayImg from '/assets/upay.png'
import cellfinImg from '/assets/cellfin.png'
import ibblImg from '/assets/650b4744ef1353-87739222-60070744.png' // IBBL

import { motion } from 'framer-motion'

const PaymentGrid = ({ type, methods = [] }: { type: 'mobile_banking' | 'net_banking', methods?: any[] }) => {
    const { openModal } = useStore()
    const navigate = useNavigate()

    const mobileOptions = methods.filter(m => m.active).map(m => ({
        id: m.name.toLowerCase(),
        name: m.name,
        img: `/assets/${m.icon}`
    }))

    // Fallback if none (or simple manual filter for demonstration)
    const netOptions = [
        { id: 'ibbl', name: 'Islami Bank', img: ibblImg },
    ]

    let options = []
    if (type === 'mobile_banking') {
        options = mobileOptions.length > 0 ? mobileOptions : [
            { id: 'bkash', name: 'bKash', img: bkashImg },
            { id: 'nagad', name: 'Nagad', img: nagadImg },
            { id: 'rocket', name: 'Rocket', img: rocketImg },
            { id: 'upay', name: 'Upay', img: upayImg },
            { id: 'cellfin', name: 'Cellfin', img: cellfinImg },
        ]
    } else {
        options = netOptions
    }

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 pb-6">
            {options.map((option) => (
                <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const hash = 'bac303ad226facb3bbea00fcc5e2a078b1cd8284'
                        if (option.id === 'ibbl') {
                            navigate({ to: '/checkout/ibbl' })
                        } else if (option.id === 'bkash' || option.id === 'nagad') {
                            openModal(option);
                        } else {
                            navigate({ to: '/checkout/mfs/$provider/$type/$hash', params: { provider: option.id, type: '1', hash } })
                        }
                    }}
                    className="bank-img-div group cursor-pointer"
                >
                    <div className="w-full flex justify-center items-center rounded-md ring-1 ring-[#0057d0]/10 bg-white group-hover:ring-[#0057d0]/20 transition-all overflow-hidden h-16 sm:h-20 dark:bg-black dark:ring-white/10 dark:group-hover:ring-white/30">
                        <motion.img
                            src={option.img}
                            alt={option.name}
                            className="w-18 sm:w-20 h-auto object-contain"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default PaymentGrid
