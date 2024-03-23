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

   
  return (

    <div className="gig">
          {isLoading ? "Loading..." : error ? "Something's Wrong" : (service && (

      <div className="container">
        <div className="left">
          <span className="breadcrumbs"> </span>
          <h4>{service.desc}</h4>
          <h1>{service.title}<span className="priceService">{service.price}$</span></h1>
          <div className="user">
            <img
              className="pp"
              src={service.userId.img ? service.userId.img :  "http://localhost:4000/" + service.userId.img }
              alt=""
            />
            <span>{service.userId.username}</span>
            <div className="stars">

            {Array(service.starNumber).fill().map((_, i) => (
           <img src="/img/star.png" alt="" key={i} />
              ))}

              <span>{service.starNumber} </span>
            </div>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img
              src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </Slider>
          <h2>About This Service</h2>
          <p>
            I use an AI program to create images based on text prompts. This
            means I can help you to create a vision you have through a textual
            description of your scene without requiring any reference images.
            Some things I've found it often excels at are: Character portraits
            (E.g. a picture to go with your DnD character) Landscapes (E.g.
            wallpapers, illustrations to compliment a story) Logos (E.g. Esports
            team, business, profile picture) You can be as vague or as
            descriptive as you want. Being more vague will allow the AI to be
            more creative which can sometimes result in some amazing images. You
            can also be incredibly precise if you have a clear image of what you
            want in mind. All of the images I create are original and will be
            found nowhere else. If you have any questions you're more than
            welcome to send me a message.
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
                    <div className="item">
                      <span className="title">From  :</span>
                      <span className="desc">{service.userId.country}</span>
                    </div>

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
                    <div className="item">
                      <span className="title">Languages :</span>
                      <span className="desc">English </span>
                    </div>
                   
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
