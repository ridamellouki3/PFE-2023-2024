import React from 'react'
import './ServiceCard.css'
import { Link } from 'react-router-dom';

const ServiceCard =  ({ item }) => {
  return (
    <Link to={`/services/single/${item._id}`} className="link">
      <div className="gigCard">
        <img src={"http://localhost:4000/" + item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img   src={ item.userId.googleId ? item.userId.img :  "http://localhost:4000/" + item.userId.img }
                       alt="" />
            <span>{item.userId.username}</span>
          </div>
          {console.log(item)}
          <p>{item.desc}</p>
          <div className="star">
            <span>{item.starNumber}</span>
            <span>  {Array(item.starNumber).fill().map((_, i) => (
           <img src="/img/star.png" alt="" key={i} />
              ))}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="/img/coin.png" alt="" />
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
