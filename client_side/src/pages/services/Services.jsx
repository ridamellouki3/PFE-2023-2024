import React, { useEffect, useRef, useState } from "react";
import "./Services.css";
import { cards } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import { useParams } from "react-router-dom";

function Services() {
  
  const { id } = useParams(); // Extract ID from route parameters

      
  const [services, setServices] = useState([]); // To store fetched services data
  const [isLoading, setIsLoading] = useState(false); // To indicate loading state
  const [error, setError] = useState(null); // To capture any errors


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("api/services/ServicesByCategorie/65da33c51b372b48dba8ad73",{
          method:'GET'
        }); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        console.log(services);


        const data = await response.json();
        console.log(data.services);

        setServices(data.services);
        console.log(services);


      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
        
        </div>
        <div className="cards">
          { isLoading ? "Loading" : error ? "Somethings Wrong" : 
          services.map((card) => (
            <ServiceCard key={card.id} item={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;