import React from "react";
import "./Quick.css";
import { Link } from "react-router-dom";

function Quick() {
  return (
    <div className="Quicked">
      <div className="container">
        <div className="left">
         <h1> Fix it Quickly , <br /> Let Us Help you</h1>
         <Link className="link" to="telegramAPI"> 
         <button >Quick Service</button>
         </Link>
        </div>
        <div className="right">
          <img src="./img/quick.png" />
        </div>
      </div>
    </div>
  );
}

export default Quick;
