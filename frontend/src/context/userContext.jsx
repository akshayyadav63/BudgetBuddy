import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({ userId: null, name: '' });

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser({ userId: null, name: '' });
    localStorage.removeItem('user'); 
  };

  return (
    <UserContext.Provider value={{ userId: user.userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
