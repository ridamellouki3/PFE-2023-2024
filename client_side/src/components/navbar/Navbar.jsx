import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState(false);



  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  
 
  const currentUser= JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Youuuuuurs</span>
          </Link>
          <span className="dot"></span>
        </div>
        <div className="links">
         
          {!currentUser?.isSeller && (
            <>
            <Link className="link" to="/telegramAPI">
            <span>Quick Service</span>
            </Link>
          
          </>
          )}
          {currentUser ? (
            <Link  className="link" to="/dashboard">
            <div className="user" >
              <img
                src={ currentUser.img || "img/noavatar.png"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              
            </div>
            </Link>
          ) : (
            <>
              <Link className="link" to="/login">
              <span>Sign in</span>
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
              <a href="/api/auth/google">
                <img src="./img/google.jpeg" alt="" className="google"/>
              </a>

            </>
          )}
        </div>
      </div>
      {(active) && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
