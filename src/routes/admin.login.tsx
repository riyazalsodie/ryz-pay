import { useState, useEffect } from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
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
      router.navigate({ to: '/admin/dashboard' })
    }
  }, [session, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(null)

    // Client-side validation
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
             await router.invalidate()
             router.navigate({ to: '/admin/dashboard' })
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
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F172A] to-[#0F172A]" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 shadow-lg shadow-blue-500/20 group">
            <ShieldCheck className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="admin@ryzpay.com"
              />
            </div>
            {errors?.email && <p className="text-red-400 text-xs pl-1">{errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors?.password && <p className="text-red-400 text-xs pl-1">{errors.password[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">→</div>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Protected by RyzPay Security • <span className="text-blue-400">256-bit Encryption</span>
          </p>
        </div>
      </div>
    </div>
  )
}
