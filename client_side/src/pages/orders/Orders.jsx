import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import SideBar from "../../components/SideBar/SideBar";

const Orders = () => {
 
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/orders')
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setOrders(responseData.orders);

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="orders">
      <SideBar/>
      
        <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
          <table>
            <tbody>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
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
              <td>Maria Anders</td>
              <td>
                <img className="message" src="./img/message.png" alt="" />
              </td>
            </tr>
            
            </tbody>
          </table>
      </div>
     
    </div>
  );
};

export default Orders;
