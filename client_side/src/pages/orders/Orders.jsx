
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Orders.css";
import SideBar from "../../components/SideBar/SideBar";

const Orders = () => {
 
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
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





  const setNewConv = async (id) => {
    console.log(id)
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/conversations", {
      method: "POST",
      body: JSON.stringify({ to : id }),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const res = await response.json();

      console.log(res)
      navigate('/message/'+res.success[0]._id);
      
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

  const complete = async (e, id) =>{
    e.preventDefault()
    console.log("complete " + id)
    setIsLoading(true);
    setError(null);

    try {

      const response = await fetch(`/api/orders/compelete-order/${id}`, {
      method: "PATCH"
    });
    
    const res = response.json();
    console.log(res)
      
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

  
  const confirme = async (e,id) =>{
    e.preventDefault()
    console.log("confirm  " + id)
    setIsLoading(true);
    setError(null);

    try {

      const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH"
    });
    
    const res = response.json();
    console.log(res)
      
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
              <th>is Confirmed</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
            {
            orders.map((order)=>(
            <tr key={order._id}>             
              <td>
                <img
                  className="image"
                  src={  "http://localhost:4000/" + order.img }
                  alt=""
                />
              </td>
              <td>{order.title}</td>
              <td>{order.price}.<sup>99</sup></td>
             
              <td>{currentUser.role == "Client" ? order.isConfirmed == true ? "Confirmed" : "Not Confirmed" :
              order.isConfirmed != true ? ( <button onClick={(e)=>confirme(e,order._id)}> Confirme Now </button>)
              : ( <span> Confirmed </span> )   
              }</td>

              <td>{currentUser.role == "Client" ? order.isCompleteService == true ? "Completed" : "Not Completed" :
              order.isCompleteService != true ? ( <button onClick={(e)=>complete(e,order._id)}> Complete Now </button>)
              : ( <span> Commpleted </span> )   
              }</td>

               <td>
                <img className="message" src="./img/message.png" onClick={()=>{
                  (currentUser.role != "Client") ? setNewConv(order.clientId._id) : setNewConv(order.serviceProviderId._id)
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
