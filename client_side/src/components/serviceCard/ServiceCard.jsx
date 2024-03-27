import React from 'react'
import './ServiceCard.css'
import { Link } from 'react-router-dom';

const ServiceCard =  ({ item }) => {
  return (
    <Link to={`/services/single/${item._id}`} className="link">
      <div className="gigCard">
        <img src={"http://localhost:4000/" + "cover-1709022667597-639855455.jpg"} alt="" />
        <div className="info">
          <div className="user">
            <img src="/img/heart.png"  alt="" />
            <span>{item.userId.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span> {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default ServiceCard
