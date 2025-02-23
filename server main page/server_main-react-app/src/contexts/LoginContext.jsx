import React, { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../services/authService';

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isValid = await verifyToken();
      if (isValid) {
        setIsLoggedIn(true);
        setUserInfo({
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email')
        });
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
