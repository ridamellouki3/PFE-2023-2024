
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import SideBar from "../../components/SideBar/SideBarManager";
import Profile from "../Profile/Profile"

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
          path: "/profile",
          element: <Profile />,
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
