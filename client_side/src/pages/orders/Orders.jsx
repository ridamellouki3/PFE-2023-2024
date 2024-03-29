
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Orders.css";
import SideBar from "../../components/SideBar/SideBar";

const Orders = () => {
 
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newConv , setNewConv] = useState("")
  const navigate = useNavigate()


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


  const handelclick =async () =>{

    setIsLoading(true);
    setError(null);

    try {
     const response = await fetch("/api/conversations", {
      method: "POST",
      body:"65f5abed7f1e0f919cd4e518",
      headers:{
        'Content-Type':'application/json'
    }
    });


      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

    

    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }
 
  return (
    <div className="orders">
      <SideBar/>
       { isLoading ?  "Loading" : error ? "Error " : 
       orders.length == 0 ? (
        <div className="container">

              <div className="title">
                <h1>No Orders Yet </h1>
              </div>

        </div>
        )  :
         (


            <div className="container">
               { console.log(orders)}

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
            {
            orders.map((order)=>(
            <tr key={order._id}>             
              <td>
                <img
                  className="image"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>{order.title}</td>
              <td>{order.price}.<sup>99</sup></td>
              <td>
                <img className="message" src="./img/message.png" onClick={()=>{
                  (currentUser.role == "Service Provider") ? setNewConv(order.clientId._id): setNewConv(order.serviceProviderId)
                }} />
              </td>
            </tr>
             ))}
            </tbody>
          </table>
      </div>
         
        
       )
     }
    </div>
  );
};

export default Orders;
