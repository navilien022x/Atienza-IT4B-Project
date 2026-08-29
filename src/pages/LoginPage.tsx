import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { useAuthStore, type UserRole } from '../store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema, type LoginFormValues } from '@/schemas/loginSchema'

const demoAccounts: Record<string, { password: string; role: UserRole }> = {
  'demo@example.com': { password: 'password123', role: 'student' },
  'vendor@example.com': { password: 'vendor123', role: 'vendor' },
}

export function LoginPage() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    setError('')

    const account = demoAccounts[values.email.toLowerCase()]
    if (!account || account.password !== values.password) {
      setError('Invalid email or password')
      return
    }

    const token = btoa(`${values.email}:${values.password}`)
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              className={errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
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
