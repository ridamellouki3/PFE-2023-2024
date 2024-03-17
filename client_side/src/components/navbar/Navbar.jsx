import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Cookies from 'js-cookie';

function Navbar() {
  const [active, setActive] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = Cookies.get('accessToken');
        console.log(username);
        const response = await fetch('/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const json = await response.json();
        setCategories(json.success);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">WORK UP</span>
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
            <Link className="link" to="/dashboard">
              <div className="user">
                <img
                  src={"http://localhost:4000/" + currentUser.img || "img/noavatar.png"}
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
                <img src="./img/google.jpeg" alt="" className="google" />
              </a>
            </>
          )}
        </div>
      </div>
      {active && (
        <>
          <hr />
          <div className="menu">
            {categories.map(cat => (
              <Link key={cat._id} className="link menuLink" to="/">
                {cat.name}
              </Link>
            ))}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
