import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Simple hash function using SHA-256
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const hashedPassword = await hashPassword(password);
    
    if (users[username] && users[username].password === hashedPassword) {
      const userData = { username };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      return { success: false, message: 'User already exists' };
    }
    
    const hashedPassword = await hashPassword(password);
    users[username] = { password: hashedPassword };
    localStorage.setItem('users', JSON.stringify(users));
    
    const userData = { username };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
