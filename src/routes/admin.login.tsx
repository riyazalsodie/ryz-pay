import { useState, useEffect } from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved, faLock, faEnvelope, faEyeSlash, faEye, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { z } from 'zod'

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
  beforeLoad: async () => {
    if (typeof window === 'undefined') return

    try {
      const session = await authClient.getSession();
      if (session.data?.user.role === 'admin') {
        throw redirect({ to: '/admin/dashboard' })
      }
    } catch (e) {
      if (e instanceof Response || (typeof e === 'object' && e !== null && 'to' in e)) throw e;
    }
  },
})

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password is required"),
})

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] } | null>(null)
  const router = useRouter()
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (session?.user.role === 'admin') {
      window.location.href = '/admin/dashboard'
    }
  }, [session])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(null)

    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setLoading(true)

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      }, {
        onSuccess: async () => {
             toast.success('Admin login successful')
             window.location.href = '/admin/dashboard'
        },
        onError: (ctx) => {
            if (ctx.error.status === 429) {
                toast.error("Too many login attempts. Please try again later.")
            } else {
                toast.error(ctx.error.message || 'Invalid credentials')
            }
        }
      })
    } catch (err) {
      toast.error('Connection error. Please check your internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-[#0A0A0A] to-[#0A0A0A]" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-lg group">
            <FontAwesomeIcon icon={faShieldHalved} className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative group">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                placeholder="admin@ryzpay.com"
              />
            </div>
            {errors?.email && <p className="text-red-400 text-xs pl-1">{errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">Forgot password?</a>
            </div>
            <div className="relative group">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5" /> : <FontAwesomeIcon icon={faEye} className="w-5 h-5" />}
              </button>
            </div>
            {errors?.password && <p className="text-red-400 text-xs pl-1">{errors.password[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3.5 rounded-xl shadow-lg shadow-white/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-xs">→</div>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Protected by RyzPay Security • <span className="text-white/60">256-bit Encryption</span>
          </p>
        </div>
      </div>
    </div>
  )
}
