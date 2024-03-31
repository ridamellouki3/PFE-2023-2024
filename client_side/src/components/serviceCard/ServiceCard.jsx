import React from 'react'
import './ServiceCard.css'
import { Link } from 'react-router-dom';

const ServiceCard =  ({ item }) => {
  return (
    <Link to={`/services/single/${item._id}`} className="link">
{      console.log(item)
}      <div className="gigCard">
        <img src={"http://localhost:4000/" + item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img   src={ "http://localhost:4000/" + item.userId.img }
                       alt="" />
            <span>{item.userId.username}</span>
          </div>
         
          <p>{item.desc.length < 40 ? item.desc : item.desc.substr(0,40)+"......"}</p>
          <div className="star">
            <span>{!Number(item.totalStars/item.starNumber) ? 0 :item.totalStars/item.starNumber}</span>
            <span>  {Array(!Number(item.totalStars/item.starNumber) ? 0 :item.totalStars/item.starNumber).fill().map((_, i) => (
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
              
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default ServiceCard
