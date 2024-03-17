import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.css";

function  CatCard({ card }) {
  return (
    <Link to="/service/12">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}

export default CatCard;