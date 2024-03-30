import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllProviders.css";
import SideBar from "../../components/SideBar/SideBar";

function AllProviders() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);



  const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users/service-Providers")
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setProviders(responseData.serviceProviders);
        console.log(providers)

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
  }; 


  
  const fetchService = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/services/My-Services/")//////////////////////////////////////////////////////////////////////////////////////////
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setServices(responseData.services);
      console.log(services)

    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setIsLoading(false);
    }
}; 


  useEffect(() => {
    
    fetchData()
    fetchService()
    console.log(services)
    
  }, []);

  const handelClick =async (e,id)=>{
    e.preventDefault()
    console.log("Hello "+id)
    setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/deleteByManager/${id}`,{
          method : "DELETE"
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        console.log(response.json())

       

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }

  }

  return (
    <div className="myGigs">
      <SideBar/>
      <div>
      <div className="container">
        <div className="title">
          <h1>All Provider </h1>
         
            <Link className="addNewProider"
            to="/addProvider">
              <button>Add New Service Provider</button>
            </Link>
          
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {providers.map((provider)=>(
          <tr key={provider._id}>
            <td>
              <img
                className="image"
                src={ "http://localhost:4000/" + provider.img}
                alt=""
              />
            </td>
            <td>{provider.username}</td>
            <td>{provider.email}</td>
            <td>
              <img className="delete" src="./img/delete.png" 
              onClick={(e)=>{handelClick(e,provider._id)}}
              alt="" />
            </td>
          </tr>
          ))}
         
        </table>
      </div>





      <div className="container">
        <div className="title">
          <h1>All Services </h1>
         
            <Link className="addNewProider"
            to="/addService">
              <button>Add New Service </button>
            </Link>
          
        </div>
        <table>
          <tr>
            <th>Image</th>  
            <th>Title</th>
            <th>Provider Name</th>
            <th>Price</th>
            <th>Stars</th>
            <th>Sales</th>
          </tr>
          {services.map((service)=>(
          <tr key={service._id}>
            <td>
              <img
                className="image"
                src={ "http://localhost:4000/" + service.cover}
                alt=""
              />
            </td>
            <td>{service.title}</td>
            <td>{service.userId.username}</td>
            <td>{service.price}</td>

            <td>{service.totalStars}</td>
            <td>{service.sales}</td>

          
          </tr>
          ))}
         
        </table>
      </div>
      </div>

      
    </div>
    
  );
}

export default AllProviders;
