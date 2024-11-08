import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [redirectPath, setRedirectPath] = useState('/');
  const handleLogin = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    // console.log("username in authcontext",username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, handleLogin, handleLogout ,redirectPath,setRedirectPath}}>
      {children}
    </AuthContext.Provider>
  );
};
