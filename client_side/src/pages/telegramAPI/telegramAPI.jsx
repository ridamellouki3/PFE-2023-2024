import React from 'react'
import "./telegramAPI.css"
const telegramAPI = () => {
  return (
    <>
      <div className="add">
      <div className="container">
        <h1>QUICK SERVICE</h1>
        <div className="sections">
          <div className="info">
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
            <label htmlFor="">Choose A service </label>
            <select name="cats" id="cats">
              <option value="design">Client</option>
              <option value="web">Servicer Provider</option>
              <option value="animation">Manager</option>
            </select>
            
            <label htmlFor="">Description</label>
            <textarea name="" id="" placeholder="Brief descriptions to introduce your problem" cols="0" rows="16"></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default telegramAPI;
