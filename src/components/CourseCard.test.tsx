import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CourseCard from './CourseCard'
import type { FoodItem } from '../types'

describe('CourseCard', () => {
  it('shows the unavailable status for an unavailable food item', () => {
    const foodItem: FoodItem = {
      id: 'meal-1',
      name: 'Tofu Bowl',
      description: 'Crispy tofu with rice',
      price: 120,
      category: 'Lunch',
      available: false,
    }

    render(<CourseCard foodItem={foodItem} />)

    expect(screen.getByText('Unavailable')).toBeInTheDocument()
  })
})
