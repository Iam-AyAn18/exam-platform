import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = useCallback((name, role) => {
    const user = {
      id: Date.now(),
      name: name,
      role: role // 'admin' or 'student'
    };
    setCurrentUser(user);
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const isAuthenticated = currentUser !== null;

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        loginUser, 
        logoutUser, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
