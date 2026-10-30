import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the schema error and does not send a request for invalid input', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
