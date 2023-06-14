import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Devices from "./routes/Devices";
import Logs from "./routes/Logs";
import Users from "./routes/Users";
import Login from "./routes/Login";
import AuthProvider from "./Auth/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
