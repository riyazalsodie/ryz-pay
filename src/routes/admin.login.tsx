import { useState } from 'react'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { toast } from 'sonner'
import { Loader2, ShieldCheck, Lock, Mail } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
  beforeLoad: async () => {
    // If already logged in as admin, redirect to admin dashboard
    try {
      const session = await authClient.getSession();
      if (session.data?.user.role === 'admin') {
        throw redirect({ to: '/admin/dashboard' })
      }
    } catch (e) {
      // Ignore fetch errors here, let the login page handle it
    }
  }
})

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({})
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Client-side validation
    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0]
      })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      })

      if (error) {
        if (error.status === 429) {
          toast.error("Too many login attempts. Please try again later.")
        } else {
          toast.error(error.message || 'Invalid credentials')
        }
      } else {
        toast.success('Admin login successful')
        router.navigate({ to: '/admin/dashboard' })
      }
    } catch (err) {
      toast.error('Connection error. Please check your internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all outline-none`}
                placeholder="admin@secure.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all outline-none`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center transform active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            End-to-end encrypted session
          </p>
        </div>
      </div>
    </div>
  )
}
