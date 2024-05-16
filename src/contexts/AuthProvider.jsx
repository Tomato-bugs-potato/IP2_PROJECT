import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const login = () => {
    setUserLoggedIn(true);
  };

  const logout = () => {
    setUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
