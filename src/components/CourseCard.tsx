import type { FoodItem } from '../types/index'

interface CourseCardProps {
  foodItem: FoodItem
  label?: string
  variant?: 'default' | 'compact'
}

function CourseCard({ foodItem, label = 'Featured meal', variant = 'default' }: CourseCardProps) {
  const isCompact = variant === 'compact'

  return (
    <article
      className={[
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900',
        isCompact ? 'space-y-3' : 'space-y-4',
      ].join(' ')}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">{label}</p>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{foodItem.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{foodItem.description}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Category: {foodItem.category}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Price: ₱{foodItem.price}</p>
      </div>
      <span
        className={[
          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
          foodItem.available
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
        ].join(' ')}
      >
        {foodItem.available ? 'Available now' : 'Unavailable'}
      </span>
    </article>
  )
}

export default CourseCard