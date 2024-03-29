import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Messages.css";
import SideBar from "../../components/SideBar/SideBar";

const Messages = () => {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/conversations')
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setConversations(responseData.success);

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    console.log(conversations)
  })

  return (
    <div className="messages">
              <SideBar/>
      { isLoading ? "Loading" : error ? "Error" :
        conversations.length == 0 ? (
          <div className="container">
                
                <div className="title">
                  <h1>No Conversation Yet </h1>
                </div>

          </div>
      )
      : 
      (
               
        <div className="container">
                
                <div className="title">
                  <h1>Messages</h1>
                </div>
                <table>
                  <tr>
                    <th>{currentUser.role != "Client" ? "Buyer" : "Seller"}</th>
                    <th>Date</th>
                    <th>Last Msg</th>
                    <th>Action</th>
                  </tr>
                  {conversations.map((conver)=>(
                   
                  <tr className="active" key={conver._id}>
                    <td>{currentUser.role == "Client" ? conver.serviceProviderId.username : conver.clientId.username}</td>
                   
                    <td>{(conver.updatedAt)}</td>

                    <td>{(conver.lastMessage)}</td>

                    <td>
                      <Link to={`/message/${conver._id}`}>
                        <button>See More</button>
                      </Link>
                    </td>
                  </tr>
                
                ))}
                </table>
                
              </div>

                      
      
      ) }
    </div>
  );
};

export default Messages;
