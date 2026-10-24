import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore'

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { token, user, logout } = useAuthStore()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Orders', path: '/orders' },
    { label: 'AI Assistant', path: '/ai-assistant' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-2xl font-black text-orange-700 transition hover:text-orange-800 dark:text-orange-200 dark:hover:text-orange-100"
            >
              🍜 Campus Food
            </button>

            {/* Desktop Navigation */}
            <div className="hidden gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-orange-600 text-white dark:bg-orange-500'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {token ? (
                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="text-right">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Account type</p>
                      <p className="text-sm font-semibold capitalize text-slate-800 dark:text-slate-100">
                        {user?.role === 'student' ? '👤 Student' : '🏪 Vendor'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="space-y-2 border-t border-slate-200 py-4 dark:border-slate-700 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full rounded-lg px-4 py-2 text-left text-sm font-semibold transition ${
                    isActive(item.path)
                      ? 'bg-orange-600 text-white dark:bg-orange-500'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-600 dark:text-slate-400 sm:px-6 lg:px-8">
          <p>© 2026 Campus Food Pre-Order System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
