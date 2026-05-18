import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1>👥 Employee Management</h1>
        <div className="navbar-actions">
          <span>Welcome, {user?.name}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
