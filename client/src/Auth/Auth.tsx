import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Admin, Device, Login, User, UserLog } from "../types";

interface AuthContext {
  admin?: boolean | Admin;
  isAuthenticated?: boolean;
  userList?: User[];
  logsList?: UserLog[];
  devicesList?: Device[];
  SignIn?: (props: Login) => Promise<void>;
  getUserList?: () => Promise<void>;
  getLogsList?: () => Promise<void>;
  getDevicesList?: () => Promise<void>;
  addDeviceToList?: (props: { username: string }) => Promise<void>;
  removeDeviceFromList?: (props: { uuid: string }) => Promise<void>;
  CreateUser?: (props: User) => Promise<void>;
  SignOut?: () => Promise<void>;
  createLogs?: (props: UserLog) => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({});

function AuthProvider({ children }: React.PropsWithChildren) {
  const [admin, setAdmin] = useState<boolean | Admin>(false);
  const isAuthenticated = !!admin;
  const [userList, setUserList] = useState<User[]>([]);
  const [logsList, setLogsList] = useState<UserLog[]>([]);
  const [devicesList, setDevicesList] = useState<Device[]>([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) navigate("/");
  // }, [isAuthenticated, navigate]);

  async function SignIn({ email, password }: Login) {
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
    setAdmin(false);
    navigate("/");
  }
  async function CreateUser({ username, email, gender }: User) {
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

  async function addDeviceToList({ username }: { username: string }) {
    const response = await axios.post("http://localhost:3333/devices/create", {
      username,
    });
    if (response.data.status === "Success")
      setDevicesList(response.data.devices);
    else console.log(response.data);
  }

  async function removeDeviceFromList({ uuid }: { uuid: string }) {
    const response = await axios.post("http://localhost:3333/devices/remove", {
      uuid,
    });
    if (response.data.status === "Success")
      setDevicesList(response.data.devices);
    else console.log(response.data);
  }

  // FOR TESTING WITHOUT DATABASE AND ARDUINO CONNECTION

  async function createLogs(data: UserLog) {
    const response = await axios.post(
      "http://localhost:3333/logs/create",
      data
    );
    if (response.data.status === "Success") setLogsList(response.data.logs);
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
        createLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
