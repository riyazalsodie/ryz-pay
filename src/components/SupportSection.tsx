
import phoneImg from '/assets/phone-call.png'
import messengerImg from '/assets/messenger.png'
import whatsappImg from '/assets/whatsapp.png'
import emailImg from '/assets/email.png'
import { motion } from 'framer-motion'

const SupportSection = () => {
    const contacts = [
        { id: 'phone', label: 'আমাদের সাথে সরাসরি কথা বলতে এখানে ক্লিক করুন।', img: phoneImg, href: 'tel:+8809613825013' },
        { id: 'messenger', label: 'মেসেঞ্জারে লাইভ চ্যাটের জন্য এখানে ক্লিক করুন।', img: messengerImg, href: 'https://m.me/ryzpay' },
        { id: 'whatsapp', label: 'হোয়াটসঅ্যাপে লাইভ চ্যাটের জন্য এখানে ক্লিক করুন।', img: whatsappImg, href: 'https://wa.me/+8801406155756' },
        { id: 'email', label: 'আমাদের সাপোর্টে ইমেইল করতে এখানে ক্লিক করুন।', img: emailImg, href: 'mailto:info@ryzpay.com' },
    ]

    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between pb-6">
            {contacts.map((contact) => (
                <a
                    key={contact.id}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-[48%] mb-4"
                >
                    <motion.div
                        className="support-div"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <img src={contact.img} alt={contact.id} className="w-7 mr-3" />
                        <span className="text-sm text-[#485263] font-bangla">{contact.label}</span>
                    </motion.div>
                </a>
            ))}
        </div>
    )
}

export default SupportSection
