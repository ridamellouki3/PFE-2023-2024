import React from "react";
import './Side.css'
import { Link } from "react-router-dom";
import SideBarC from "./SideBarC";
import SideBarSP from "./SideBarSP";
import SideBarM from "./SideBarM";
import Navbar from "../navbar/Navbar";


function SideBar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    
    return (    
        <>
        
        {currentUser.role =='Manager' &&(
            <SideBarM/>
        )}
        {currentUser.role =='Service Provider' &&(
            <SideBarSP/>
        )}
        {currentUser.role =='Client' &&(
            <SideBarC/>
        )}
        
        
        </>
      
    
    );
}

export default SideBar;