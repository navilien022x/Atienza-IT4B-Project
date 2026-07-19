import type { ChangeEvent } from 'react'
import type { User } from '../types/index'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user)
  }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('Note:', e.target.value)
  }

  return (
    <div className="user-card card">
      <p className="card-label">Student profile</p>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className="meta">Role: {user.role}</p>
      <p className="meta">Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={handleClick}>Select this profile</button>
      <input onChange={handleNoteChange} placeholder="Quick note" />
    </div>
  )
}

export default UserCard