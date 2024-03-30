import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import { useParams } from "react-router-dom";

function AllServices() {
  


      
  const [services, setServices] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
     
      try {
        const response = await fetch("/api/services/All-Services",{
          method:'GET'
        }); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }


        const data = await response.json();
         
        setServices(data.services);
            

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
  }, []);
  

  
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Youuuurs Services  </span>
        <h1>AnyWhere AnyTime</h1>
        <p>
          Explore the boundaries of art and technology 
        </p>
        <div className="menu">
        
        </div>
        <div className="cards">
          { isLoading ? "Loading" : error ? "Somethings Wrong" : 
         (services.length == 0 ? "NO SERVICE YET": services.map((card) => (
            <ServiceCard key={card._id} item={card} />
          )))
          }
        </div>
      </div>
    </div>
  );
}

export default AllServices;