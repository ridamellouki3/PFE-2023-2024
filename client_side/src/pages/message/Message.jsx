import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar"
import "./Message.css";

const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const {id} = useParams()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/messages/${id}`)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setMessages(responseData.messages);

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
    
  }, [id]);


  useEffect(()=>{
    console.log(messages)

  },[])

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = e.target[0].value
    console.log(newMessage)
    try{
    const response = await fetch("/api/messages/", {
      method: "POST",
      body: JSON.stringify({conversationId:id,message:newMessage}),
      headers:{
        'Content-Type':'application/json'
    }
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    }catch(err){
      console.log(err)
    }
    fetchData();

    e.target[0].value=""

  };

  return (
    <div className="message">
      <SideBar/>
      {isLoading ? "Loading.." : error ? "Error" :
      <div className="container">
        
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> John Doe
        </span>
        <div className="messages">
          { messages.map((msg)=>
            <div className={currentUser._id === msg.userId._id ? "owner item" :"item"} key={msg._id}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
              {msg.message}
            </p>
          </div>
          )
          }
        </div>
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
        
      </div>}
    </div>
  );
};

export default Message;
