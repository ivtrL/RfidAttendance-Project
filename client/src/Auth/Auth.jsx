import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const isAuthenticated = !!admin;

  const navigate = useNavigate();

  if (!isAuthenticated) navigate("/");

  async function SignIn({ email, password }) {
    const response = await axios.post("http://localhost:3333/login", {
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

  async function SignOut() {
    setAdmin(null);
    navigate("/");
  }

  async function CreateUser({ username, email, gender }) {
    const response = await axios.post("http://localhost:3333/create_user", {
      username,
      email,
      gender,
    });
    if (response.data.status === "Success") return response.data.users;
    else return response.data.status;
  }

  async function getUserList() {
    const response = await axios.get("http://localhost:3333/users");
    if (response.data.status === "Success") return response.data.users;
    else return response.data;
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        SignIn,
        getUserList,
        CreateUser,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
