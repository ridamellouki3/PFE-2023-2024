
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import SideBar from "../../components/SideBar/SideBarClient";
import Profile from "../Profile/Profile";
import Orders from "../orders/Orders"
import Messages from "../messages/Messages"
import Message from "../message/Message"
import Settings from "../Settings/Settings"
import "./dashboard.css"

function Client() {
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
        
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Client;
