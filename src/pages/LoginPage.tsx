import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore, type UserRole } from '../store/authStore'

const demoAccounts: Record<string, { password: string; role: UserRole }> = {
  'demo@example.com': { password: 'password123', role: 'student' },
  'vendor@example.com': { password: 'vendor123', role: 'vendor' },
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    // Check if account exists in demo accounts
    const account = demoAccounts[email.toLowerCase()]
    if (!account || account.password !== password) {
      setError('Invalid email or password')
      return
    }

    // Simulate login
    const token = btoa(`${email}:${password}`)
    login(token, account.role)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-black text-orange-700 dark:text-orange-200">Campus Food</h1>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Sign In</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Enter your credentials to access your account
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-500 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-500 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Sign In
          </button>
        </form>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-center text-xs font-semibold text-slate-700 dark:text-slate-300">Demo Accounts:</p>
          <div className="space-y-2">
            <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-500/10">
              <p className="text-xs font-semibold text-orange-900 dark:text-orange-300">Student Account</p>
              <p className="mt-1 text-xs text-orange-800 dark:text-orange-200">
                Email: <span className="font-mono">demo@example.com</span>
              </p>
              <p className="text-xs text-orange-800 dark:text-orange-200">
                Password: <span className="font-mono">password123</span>
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-500/10">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">Vendor Account</p>
              <p className="mt-1 text-xs text-blue-800 dark:text-blue-200">
                Email: <span className="font-mono">vendor@example.com</span>
              </p>
              <p className="text-xs text-blue-800 dark:text-blue-200">
                Password: <span className="font-mono">vendor123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
