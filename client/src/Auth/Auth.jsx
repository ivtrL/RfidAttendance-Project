import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(false);
  const isAuthenticated = !!admin;
  const [userList, setUserList] = useState([]);
  const [logsList, setLogsList] = useState([]);
  const [devicesList, setDevicesList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

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
    const response = await axios.post("http://localhost:3333/users/create", {
      username,
      email,
      gender,
    });
    if (response.data.status === "Success") setUserList(response.data.users);
    else console.log(response.data.status);
  }

  async function getUserList() {
    const response = await axios.get("http://localhost:3333/users");
    if (response.data.status === "Success") setUserList(response.data.users);
    else console.log(response.data);
  }

  async function getLogsList() {
    const response = await axios.get("http://localhost:3333/logs");
    if (response.data.status === "Success") setLogsList(response.data.logs);
    else console.log(response.data);
  }

  async function getDevicesList() {
    const response = await axios.get("http://localhost:3333/devices");
    if (response.data.status === "Success")
      setDevicesList(response.data.devices);
    else console.log(response.data);
  }

  async function addDeviceToList({ username }) {
    const response = await axios.post("http://localhost:3333/devices/create", {
      username,
    });
    if (response.data.status === "Success")
      setDevicesList(response.data.devices);
    else console.log(response.data);
  }

  async function removeDeviceFromList({ uuid }) {
    const response = await axios.post(
      "http://localhost:3333/devices/remove",
      uuid
    );
    if (response.data.status === "Success")
      setDevicesList(response.data.devices);
    else console.log(response.data);
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        userList,
        logsList,
        devicesList,
        SignIn,
        getUserList,
        getLogsList,
        getDevicesList,
        addDeviceToList,
        removeDeviceFromList,
        CreateUser,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
