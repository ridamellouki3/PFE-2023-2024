import React, { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [username,setUsername]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(null);

  const navigate = useNavigate();

  const handelSubmit = async (e)=>{
    e.preventDefault()  //To not refrech the page
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login",{
      username ,
      password
    },
    { //allow cookie
      withCredentials: true 
    }
    ); 
    localStorage.setItem("currentUser",JSON.stringify(res.data));
     console.log(res.data)
      navigate("/")
      console.log(res)

    } catch (error) {
      //setError(error.response.data)
      console.log(error)
    }
   

  }

  return (
    <div className="add">

  <div className="container">
   <h1>Login Here </h1>
   <div className="sections">
     <div className="info">
      <form onSubmit={handelSubmit}>
       <label htmlFor="">Email</label>
       <input
         type="email"
         placeholder="Type Your Name Here"
         name="email"
         onClick={e=>setUsername(e.target.value)}
       />
       <label htmlFor="">Password</label>
       <input type="password" name="password"  placeholder="Password"
           onClick={e=>setPassword(e.target.value)}
       />
       <button>LOGIN </button>
       {error && error}
       </form>
       <span className="noaccount"> Don't have an account<Link className="linkr" to="/register"> Register here  </Link> </span>
     </div>
   </div>
  </div>
  </div>
  )
}

export default Login


