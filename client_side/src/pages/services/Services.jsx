import React, { useEffect, useRef, useState } from "react";
import "./Services.css";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import { useParams } from "react-router-dom";

function Services() {
  
  const { id } = useParams(); 

      
  const [services, setServices] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log(id)
      //65da33c51b372b48dba8ad73
      try {
        const response = await fetch(`/api/services/ServicesByCategorie/${id}`,{
          method:'GET'
        }); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }


        const data = await response.json();
            setServices(data.services);
            
            console.log(data.error);

            console.log(services);


      } catch (err) {
        setError(err.message);
        console.log(error)
        console.log(err.message)
      } 
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  

  
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with  AI artists
        </p>
        <div className="menu">
        
        </div>
        <div className="cards">
          { isLoading ? "Loading" : error ? "Somethings Wrong" : 
         (services.length == 0 ? "NO SERVICE IN THIS CATEGORY YET": services.map((card) => (
            <ServiceCard key={card._id} item={card} />
          )))
          }
        </div>
      </div>
    </div>
  );
}

export default Services;