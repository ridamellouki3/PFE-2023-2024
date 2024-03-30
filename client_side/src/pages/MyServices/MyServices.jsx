import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyServices.css";
import SideBar from "../../components/SideBar/SideBar";

function MyServices() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);



  const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/services/My-Services/")
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData)
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
    
  }, []);

  
  const handleClick = async (e) => {
    e.preventDefault;
    try {

      const response = await fetch(`/api/services/${e}`, {
        method: "DELETE",
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        console.log(error)
      }else{
        fetchData()
      } 

    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(currentUser.img)

  return (
    <div className="myServices">
      <SideBar/>
      { isLoading ? "Loading " : error ? "Error" :
        (  services.length == 0 ? "Nothings" :
        <div className="container">
        <div className="title">
          <h1>My Services</h1>
          <Link className="addNewProider"
            to="/add">
              <button>Add New Service</button>
            </Link>
          
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          
            {services.map((service)=>(
            <tr key={service._id} >
            <td>
              <img
                className="image"
                src={ "http://localhost:4000/" + service.cover}
                alt=""
              />
            </td>
            <td>{service.title}</td>
            <td>{service.price}<sup>99</sup></td>
            <td>{service.sales}</td>
            <td>
              <img className="delete" src="./img/delete.png" onClick={()=>handleClick(service._id)} />
            </td>
            
          </tr>
          ))}
        </table>
      </div>
      )}
    </div>
  );
}

export default MyServices;
