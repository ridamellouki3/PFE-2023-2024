import React from "react";
import './Side.css'
import { Link,useNavigate } from "react-router-dom";

function SideBarM() {
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
                <img src="" alt="" />
                <span className="nav-item">WorkUp</span>
                </Link>
                </li>
              <li> <Link className="aC link" to="/profile">
                <i className="fas fa-user"></i>
                <span className="nav-item">Profile</span>
                </Link>
              </li>
              <li>
                 <Link className="aC link" to="/allProviders">
                <i className="fas fa-laptop-code"></i>
                <span className="nav-item">All Providers</span>
                </Link>
              </li>
              <li><Link className="aC link" to="/addProvider">
                <i className="fas fa-wallet"></i>
                <span className="nav-item">Add New Service Provider</span>
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

export default SideBarM;