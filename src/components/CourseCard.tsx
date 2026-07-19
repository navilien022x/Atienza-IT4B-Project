import type { FoodItem } from '../types/index'

interface CourseCardProps {
  foodItem: FoodItem
  label?: string
}

function CourseCard({ foodItem, label = 'Featured meal' }: CourseCardProps) {
  return (
    <div className="course-card card">
      <p className="card-label">{label}</p>
      <h3>{foodItem.name}</h3>
      <p>{foodItem.description}</p>
      <p className="meta">Category: {foodItem.category}</p>
      <p className="meta">Price: ₱{foodItem.price}</p>
      <p className="pill">{foodItem.available ? 'Available now' : 'Unavailable'}</p>
    </div>
  )
}

export default CourseCard