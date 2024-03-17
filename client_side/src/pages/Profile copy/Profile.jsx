import React from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";

const Profile = () => {
  return (
    <div className="add">
         <SideBar/>
      <div className="container">
        <h1>Update Your Profile</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Type Your Name Here"
            />
            <label htmlFor="">Role</label>
            <select name="cats" id="cats">
              <option value="design">Client</option>
              <option value="web">Servicer Provider</option>
              <option value="animation">Manager</option>
            </select>
            <label htmlFor="">Change Image</label>
            <input type="file" />
            <label htmlFor="">Description</label>
            <textarea name="" id="" placeholder="Brief descriptions to introduce your self" cols="0" rows="16"></textarea>
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile ;
