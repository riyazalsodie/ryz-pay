import { useNavigate } from '@tanstack/react-router'
import useStore from '../store/useStore'
import bkashImg from '/assets/bkash.png'
import nagadImg from '/assets/nagad.png'
import rocketImg from '/assets/rocket.png'
import upayImg from '/assets/upay.png'
import cellfinImg from '/assets/cellfin.png'
import ibblImg from '/assets/650b4744ef1353-87739222-60070744.png' // IBBL

const PaymentGrid = ({ type }: { type: 'mobile_banking' | 'cards' | 'net_banking' }) => {
    const { openModal } = useStore()
    const navigate = useNavigate()

    const mobileOptions = [
        { id: 'bkash', name: 'bKash', img: bkashImg },
        { id: 'nagad', name: 'Nagad', img: nagadImg },
        { id: 'rocket', name: 'Rocket', img: rocketImg },
        { id: 'upay', name: 'Upay', img: upayImg },
        { id: 'cellfin', name: 'Cellfin', img: cellfinImg },
    ]

    const cardOptions = [
        { id: 'visa', name: 'Visa', img: '/assets/63e557be80f047-41431550-10926609.png' },
        { id: 'mastercard', name: 'Mastercard', img: '/assets/63e557be80f047-41431550-10926609.png' },
    ]

    const netOptions = [
        { id: 'ibbl', name: 'Islami Bank', img: ibblImg },
    ]

    let options = []
    if (type === 'mobile_banking') options = mobileOptions
    else if (type === 'cards') options = cardOptions
    else options = netOptions

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 pb-6">
            {options.map((option) => (
                <div
                    key={option.id}
                    onClick={() => {
                        // Generate a sample hash for the checkout URL
                        const hash = 'bac303ad226facb3bbea00fcc5e2a078b1cd8284'

                        // Special handling for MFS providers and banks - go to dedicated pages
                        if (option.id === 'ibbl') {
                            navigate({ to: '/checkout/ibbl' })
                        } else if (option.id === 'bkash' || option.id === 'nagad') {
                            openModal(option);
                        } else {
                            // Direct navigation for other MFS providers (Rocket, Upay, Cellfin)
                            navigate({ to: '/checkout/mfs/$provider/$type/$hash', params: { provider: option.id, type: '1', hash } })
                        }
                    }}
                    className="bank-img-div group cursor-pointer"
                >
                    <div className="w-full flex justify-center items-center rounded-md ring-1 ring-[#0057d0]/10 bg-white group-hover:ring-[#0057d0]/20 transition-all">
                        <img src={option.img} alt={option.name} className="bank-img" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PaymentGrid
