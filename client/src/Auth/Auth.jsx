import { createContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const isAuthenticated = false;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
