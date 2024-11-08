// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email, newPassword });
      setMessage('Password reset successfully');
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}
    
export default ResetPassword;
