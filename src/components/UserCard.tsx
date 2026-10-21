import type { ChangeEvent } from 'react'
import type { User } from '../types/index'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
  variant?: 'default' | 'compact'
}

function UserCard({ user, onSelect, variant = 'default' }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user)
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('Note:', e.target.value)
  }

  const isCompact = variant === 'compact'

  return (
    <article
      className={[
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900',
        isCompact ? 'space-y-3' : 'space-y-4',
      ].join(' ')}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">Student profile</p>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Role: {user.role}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-orange-400 dark:bg-orange-400 dark:text-slate-950 dark:hover:bg-orange-300"
        >
          Select this profile
        </button>
        <input
          onChange={handleNoteChange}
          placeholder="Quick note"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-orange-500 dark:focus:ring-orange-900/60"
        />
      </div>
    </article>
  )
}

export default UserCard