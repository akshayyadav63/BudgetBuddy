import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({ userId: null, username: '' });

  
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
    setUser({ userId: null, username: '' });
    localStorage.removeItem('user'); 
  };

  return (
    <UserContext.Provider value={{ userId: user.userId,username: user.username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
