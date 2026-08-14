import { useNavigate } from 'react-router'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-black text-orange-600 dark:text-orange-300">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-slate-800 dark:text-slate-100">Page Not Found</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate('/')}
            className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
