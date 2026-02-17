import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CopyButtonProps {
    textToCopy: string
    className?: string
}

const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        toast.success("Number copied to clipboard")

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={cn(
                "px-2 py-0.5 mx-2 rounded-md inline-flex items-center transition-all duration-300",
                copied
                    ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                    : "bg-[#00000040] hover:bg-[#00000060] text-white", // Default style matches existing MFS pages usually
                // Override default bg if provided in className, but keep transition logic
                className
            )}
        >
            <div className="relative w-4 h-4 mr-1 flex items-center justify-center">
                <AnimatePresence mode='wait'>
                    {copied ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Check className="w-3 h-3" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="copy"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Copy className="w-3 h-3" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className={cn("text-xs sm:text-sm", copied ? "font-medium" : "")}>
                {copied ? "Copied" : "Copy"}
            </span>
        </button>
    )
}

export default CopyButton
