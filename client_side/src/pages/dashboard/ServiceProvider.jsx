
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import SideBar from "../components/SideBar/SideBarServiceProider";
import Profile from "../Profile/Profile"
import AllServices from "../pages/AllServices/AllServices"
import AddServices from "../pages/AddNewService/AddNew"
import Orders from "../pages/Orders/Orders"
import Messages from "../pages/Messages/Messages"
import Message from "../pages/Message/Message"
import Settings from "../pages/Settings/Settings"
import '../App.css'

function App() {
  const Layout = () => {
    return (
      <div className="app">
      <div className="app-container">
        <div className="sidebar-container">
          <SideBar />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Profile />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/allservices",
          element: <AllServices />,
        },
        {
          path: "/addservices",
          element: <AddServices />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
