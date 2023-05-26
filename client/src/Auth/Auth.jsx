import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState({} | null);
  const isAuthenticated = !!admin;

  const navigate = useNavigate();

  async function SignIn({ email, password }) {
    const response = await axios.post("http://localhost:8800/login", {
      email,
      password,
    });
    if (response.data.status === "Success") {
      setAdmin(response.data.admin);
      navigate("/home");
    } else {
      alert(response.data.status);
    }
  }

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
