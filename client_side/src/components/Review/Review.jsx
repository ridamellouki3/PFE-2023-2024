import React from 'react'
import "./Review.css"


const Review = ({review})=> {
  return (
     
    <div className="item">
        {console.log(review)}
        <div className="user">
          <img
            className="pp"
            src=  {review.userId.googleId ? review.userId.img :  "http://localhost:4000/" + review.userId.im}
                        alt=""
          /> 
          <div className="info">
            <span>{review.userId?.username ? review.userId.username : "" }</span>
            <div className="country">
              
              <span>{review.userId.country}</span>
            </div>
          </div>
        </div>
        <div className="stars">
        {Array(review.star).fill().map((_, i) => (
           <img src="/img/star.png" alt="" key={i} />
              ))}
         
          <span>{review.star}</span>
        </div>
        <p>
          {review.desc}
        </p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
    </div>
  )
}

export default Review
