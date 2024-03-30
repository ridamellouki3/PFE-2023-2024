import "./app.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Service from "./pages/service/Service";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyServices from "./pages/MyServices/MyServices";
import AllProviders from "./pages/AllProviders/AllProviders";
import SideBar from "./components/SideBar/SideBar";
import AddProvider from "./pages/addProvider/AddProvider";
import Profile from "./pages/Profile/Profile";
import TelegramAPI from "./pages/telegramAPI/telegramAPI"
import Services from "./pages/services/Services";
import BootUs from "./pages/bootUs/BootUs";
import AboutUs from "./pages/aboutUs/AboutUs";
import AddService from "./pages/addForProvider/addService"
import AllServices from "./pages/allServices/AllServices";

function App() {



  const Layout = () => {
    return (
      <div className="app">
        
              <Navbar />
              <Outlet />
              <Footer />
        
       
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
          element: <Home />,
        },
        {
          path: "/services/single/:id",
          element: <Service />,
        }, 
        {
          path: "/services/:id",
          element: <Services />,
        }, 
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/bootUs",
          element: <BootUs/>,
        },
      
        {
          path: "/aboutUs",
          element: <AboutUs/>,
        },
        {
          path: "/telegramAPI",
          element: <TelegramAPI />,
        },
      ],
    },
    
    {
      path: "/dashboard",
      element: <SideBar />,
    },
    {
      path: "/myServices",
      element: <MyServices />,
    },
    {
      path: "/addService",
      element: <AddService/>,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/allServices",
      element: <AllServices />,
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
      path: "/add",
      element: <Add />,
    },
    {
      path: "/allProviders",
      element: <AllProviders/>,
    },
    {
      path: "/addProvider",
      element: <AddProvider/>,
    },
    {
      path: "/profile",
      element: <Profile/>,
    },
   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
