import React from "react";
import "./Featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Search here' />
            </div>
            <button>Search</button>
          </div>
        
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
