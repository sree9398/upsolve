import React from 'react'

export default function handleLogout() {
    localStorage.removeItem('token');
    alert('Logged out successfully');
  return (
    <div>logout</div>
  )
}

  