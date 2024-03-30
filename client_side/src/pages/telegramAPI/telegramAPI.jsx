import React, { useState } from 'react'
import "./telegramAPI.css"
const telegramAPI = () => {
  const [success , setSuccess] = useState("")

  const handelSubmit = () =>{
    setSuccess("Thanks You for Trusting Us We will call you SOON!")
  }
  

  return (
    <>
      <div className="add">
      <div className="container">
        <h1>QUICK SERVICE</h1>
        <div className="sections">
          <div className="info">
            <form onSubmit={handelSubmit} >
            <label htmlFor="">Your Adress</label>
            <input
              type="text"
              placeholder="Type Your Adress Here"
            />
            <label htmlFor="">Your Phone Number</label>
            <input
              type="number"
              placeholder="Type Your Phone Number Here"
            />
           
            
            <label htmlFor="">Description</label>
            <textarea name="" id="" placeholder="Brief descriptions to introduce your problem" cols="0" rows="16"></textarea>
            {success && (
                  <div class="bar success">
                    <i class="ico">&#10004;</i> {success}
                  </div>
                )}
            <button>Send</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default telegramAPI;
