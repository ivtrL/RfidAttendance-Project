import { createContext } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isUserLogged: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
