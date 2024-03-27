import React from "react";
import './Side.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SideBarSP() {

  const currentUser = (localStorage.getItem("currentUser") != "undefined" ? JSON.parse(localStorage.getItem("currentUser")) : null )

    
  const navigate = useNavigate();
  const logout = async (e) =>{
    e.preventDefault();
    const response = await fetch('/api/auth/logout',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
    }
    })
    const json = await response.json();
    console.log(json);
    if(!response.ok){
      console.log(json);
    }else{
      localStorage.removeItem("currentUser"); 
      navigate('/');
    }
    
  }
    return (    
        
        <div className="containerr">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
          <nav>
            <ul>
              <li><Link className="aC link logoC" to="/">
                <img src={"http://localhost:4000/"+currentUser.img} alt="" />
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
              
              
              <li><div className="aC link logout" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="nav-item">Log out</span>
                </div></li>
            </ul>
          </nav>
      
          <section className="main">
           
          </section>
        </div>
      
    
    );
}

export default SideBarSP;