import React, { useState } from "react"
import "./Register.css"
import {Link} from "react-router-dom"
function Register() {

  const [gender , SetGender] = useState("");

  
  return (
    <>
    <div className="add">
      <div className="container">
        <h1>Register Here</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Type Your Name Here"
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Type Your Email Here"
            />
            <label >Gender</label>

            <div className="gender">
            <div  className="gender1">
            <label>Male </label>
            <input
              type="checkbox"
              name="gender"
            />
            </div>

            <div  className="gender2">
            <label>Female </label>
            <input
              type="checkbox"
              name="gender"

            />
            </div>
            </div> 
            <label htmlFor="">Role</label>
            <select name="cats" id="cats">
              <option value="design">Client</option>
              <option value="web">Servicer Provider</option>
              <option value="animation">Manager</option>
            </select>
            <label htmlFor="">Change Image</label>
            <input type="file"  />
           
            <button>Create</button>
            <span className="noaccount"> Already have an account<Link className="linkr" to="/login"> Login here  </Link> </span>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register


