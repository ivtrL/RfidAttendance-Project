import { useState, createContext } from "react";

export const AuthContext = createContext({
  JWT: "" | null,
  isUserLogged: false | true,
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isUserLogged = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    console.log("foi");
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    JWT: token,
    isUserLogged: isUserLogged,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
