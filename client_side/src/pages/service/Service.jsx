import React, { useEffect, useState } from "react";
import "./Service.css";
import { Slider } from "infinite-react-carousel/lib";
import Reviews from "../../components/Reviews/Reviews";
import { useParams } from "react-router-dom";

function Service() {

  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [service, setService] = useState(null);

  const date = new Date().toISOString();
  const [success, setSuccess] = useState(null);

  const currentUser = (localStorage.getItem("currentUser") != "undefined" ? JSON.parse(localStorage.getItem("currentUser")) : null )
  
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/services/single/${id}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setService(responseData.service);
      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);



  const createOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/orders/create-payment/${id}`,{
        method : "POST",
        headers:{
          'Content-Type':'application/json'
      }
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setSuccess(responseData.clientSecret);
      console.log(success)
    } catch (err) {
      setError(err.message);
      console.log(err)
    } 
  };


   
  return (

    <div className="gig">
          {isLoading ? "Loading..." : error ? "Something's Wrong" : (service && (

      <div className="container">
        <div className="left">
          <span className="breadcrumbs"> </span>
          
          <h1>{service.title}<span className="priceService">{service.price}$</span></h1>
          <div className="user">
            <img
              className="pp"
              src={"http://localhost:4000/" + service.userId.img }
              alt=""
            />
            <span>{service.userId.username}</span>
            <div className="stars">

            {Array(!Number(service.totalStars/service.starNumber) ? 0 :service.totalStars/service.starNumber).fill().map((_, i) => (
           <img src="/img/star.png" alt="" key={i} />
              ))}

              <span>{!Number(service.totalStars/service.starNumber) ? 0 :service.totalStars/service.starNumber} </span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img
              src= { "http://localhost:4000/" + service.cover }
              alt=""
            />
            
          </Slider>
          { currentUser?.role == "Client" ?
          <form onSubmit={createOrder}>
          <button type="submit" className="orderService">Order now </button>
          </form> : ""}
                {success && (
                  <div className="bar success">
                    <i className="ico">&#10004;</i> Ordered Successfully
                  </div>
                )}        
          
          <h2>About This Service</h2>
          <p>
           {service.desc}
          </p>
          <div className="box">
                  <div className="items">
                  <div className="item">
                      
                      {
                      service.userId.verified && (
                        <>                        <span>Verified</span> 
                      <img src="/img/verified.png" className="verified"/>    
                      </>
                      )
                    }
                    </div>
                    {(service.userId.country) && (
                      <div className="item">
                      <span className="title">From  :</span>
                      <span className="desc">{service.userId.country}</span>
                    </div>
                       )}
                    <div className="item">
                      <span className="title">Member since :</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Gender: </span>
                      <span className="desc">{service.userId.gender}</span>
                    </div>
                    <div className="item">
                      <span className="title">Email :</span>
                      <span className="desc">{service.userId.email}</span>
                    </div>
                    {(service.userId.phone) && (
                      <div className="item">
                      <span className="title">Phone :</span>
                      <span className="desc">{service.userId.phone} </span>
                    </div>
                    )}
                   
                  </div>
                            <hr />
             </div>
         
          <Reviews serviceId={id}/>
        </div>
        
      </div>))}
    </div>
    
  );
}

export default Service;
