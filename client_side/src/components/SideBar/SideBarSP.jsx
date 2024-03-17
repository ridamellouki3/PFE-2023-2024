import React from "react";
import './Side.css'
import { Link } from "react-router-dom";


function SideBarSP() {
    
    
    return (    
        
        <div className="containerr">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
          <nav>
            <ul>
              <li><Link className="aC link logoC" to="/">
                <img src="" alt="" />
                <span className="nav-item">Youuuurs</span>
                </Link>
                </li>
              <li> <Link className="aC link" to="/profile">
                <i className="fas fa-user"></i>
                <span className="nav-item">Profile</span>
                </Link>
              </li>
              <li>
                 <Link className="aC link" to="/myservices">
                <i className="fas fa-laptop-code"></i>
                <span className="nav-item">All Services</span>
                </Link>
              </li>
              <li><Link className="aC link" to="/add">
                <i className="fas fa-wallet"></i>
                <span className="nav-item">Add New Service</span>
              </Link></li>
              <li><Link className="aC link" to="/orders">
                <i className="fas fa-chart-bar"></i>
                <span className="nav-item">Orders</span>
              </Link></li>
              <li><Link className="aC link" to="/messages">
                <i className="fas fa-tasks"></i>
                <span className="nav-item">Messages</span>
              </Link></li>
              <li><Link className="aC link" to="/settings">
                <i className="fas fa-cog"></i>
                <span className="nav-item">Settings</span>
              </Link></li>
              
              <li><Link className="aC link logout" to="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span className="nav-item">Log out</span>
                </Link></li>
            </ul>
          </nav>
      
          <section className="main">
           
          </section>
        </div>
      
    
    );
}

export default SideBarSP;