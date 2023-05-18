import Home from "./routes/Home";
import Devices from "./routes/Devices";
import Logs from "./routes/Logs";
import Users from "./routes/Users";
import Login from "./routes/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/logs",
      element: <Logs />,
    },
    {
      path: "/devices",
      element: <Devices />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
