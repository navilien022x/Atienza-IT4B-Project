import { useCallback, useState } from 'react'

interface ToggleHookResult {
  isEnabled: boolean
  toggle: () => void
  setEnabled: (value: boolean) => void
}

export function useToggle(initialValue = false): ToggleHookResult {
  const [isEnabled, setIsEnabled] = useState<boolean>(initialValue)

  const toggle = useCallback((): void => {
    setIsEnabled((currentValue) => !currentValue)
  }, [])

  const setEnabled = useCallback((value: boolean): void => {
    setIsEnabled(value)
  }, [])

  return { isEnabled, toggle, setEnabled }
}
