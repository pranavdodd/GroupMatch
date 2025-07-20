import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const login = t => { localStorage.setItem('token', t); setToken(t); };
  const logout = () => { localStorage.removeItem('token'); setToken(null); };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
