import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyServices.css";
import SideBar from "../../components/SideBar/SideBar";

function MyServices() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
    

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/services//My-Services/")
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setServices(responseData);

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
    
  }, []);


  return (
    <div className="myGigs">
      <SideBar/>
      <div className="container">
        <div className="title">
          <h1>My Services</h1>
          
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </td>
            <td>Stunning concept art</td>
            <td>59.<sup>99</sup></td>
            <td>13</td>
            <td>
              <img className="delete" src="./img/delete.png" alt="" />
            </td>
          </tr>
          
        </table>
      </div>
    </div>
  );
}

export default MyServices;
