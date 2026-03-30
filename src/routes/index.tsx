import { createFileRoute } from '@tanstack/react-router'
import Switch from '../components/Switch'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: Homepage,
})

function Homepage() {
  const asciiArt = `
 ██▀███      ██▓   ▓██   ██▓    ▄▄▄         ▒███████▒
▓██ ▒ ██▒   ▓██▒    ▒██  ██▒   ▒████▄       ▒ ▒ ▒ ▄▀░
▓██ ░▄█ ▒   ▒██▒     ▒██ ██░   ▒██  ▀█▄     ░ ▒ ▄▀▒░ 
▒██▀▀█▄     ░██░     ░ ▐██▓░   ░██▄▄▄▄██      ▄▀▒   ░
░██▓ ▒██▒   ░██░     ░ ██▒▓░    ▓█   ▓██▒   ▒███████▒
░ ▒▓ ░▒▓░   ░▓        ██▒▒▒     ▒▒   ▓▒█░   ░▒▒ ▓░▒░▒
  ░▒ ░ ▒░    ▒ ░    ▓██ ░▒░      ▒   ▒▒ ░   ░░▒ ▒ ░ ▒
  ░░   ░     ▒ ░    ▒ ▒ ░░       ░   ▒      ░ ░ ░ ░ ░
   ░         ░      ░ ░              ░  ░     ░ ░    
                    ░ ░                     ░         
  `

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] transition-colors duration-700 overflow-hidden font-mono selection:bg-blue-500/30 touch-none fixed inset-0">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/15" />
      </div>

      <div className="fixed top-8 right-8 z-50">
        <Switch />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[95vw]"
      >
        <div className="relative w-full flex justify-center">
          <pre className="relative text-[min(1.5vw,10px)] sm:text-[min(1.2vw,12px)] leading-tight text-neutral-800 dark:text-neutral-200 whitespace-pre drop-shadow-sm font-bold text-center">
            {asciiArt}
          </pre>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] tracking-[0.6em] uppercase text-neutral-400 dark:text-neutral-500 font-medium"
          >
            developed by
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
