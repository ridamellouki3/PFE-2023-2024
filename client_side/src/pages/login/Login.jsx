import React, { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(null);

  const navigate = useNavigate();

  const handelSubmit = async (e)=>{
      e.preventDefault() 
      
      const response = await fetch('/api/auth/login',{
        method:'POST',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type':'application/json'
      }
      })
      const json = await response.json();
      console.log(json);
      if(!response.ok){
        setError(json.error)
      }else{
        localStorage.setItem("currentUser",JSON.stringify(json.success));
        navigate('/');
        setEmail('');
        setPassword('');
        setError(null);
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
         onChange={e=>setEmail(e.target.value)}
       />
       <label htmlFor="">Password</label>
       <input type="password" name="password"  placeholder="Password"
           onChange={e=>setPassword(e.target.value)}
       />
       <button>LOGIN </button>
       {error && (
        <div class="bar error">{error}</div>
       )}
       </form>
       <span className="noaccount"> Don't have an account<Link className="linkr" to="/register"> Register here  </Link> </span>
     </div>
   </div>
  </div>
  </div>
  )
}

export default Login


