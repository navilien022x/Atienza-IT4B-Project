import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('toggles from its initial value', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current.isEnabled).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isEnabled).toBe(true)
  })
})
