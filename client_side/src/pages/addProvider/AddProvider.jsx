import React, { useEffect, useState } from 'react'
import './AddProvider.css'
import SideBar from '../../components/SideBar/SideBar';

const AddProvider = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [img, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  
  
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categorieId, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
 

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(img);

  };



  const handleSubmitServieProvider = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("img", img);
      formData.append("password", password);


      const response = await fetch("/api/users/createUser", {
        method: "POST",
        body: formData,

      });

      const json = await response.json();
      console.log(json);
      setSuccess(json)

      if (!response.ok) {
        setError(json.error);
        setSuccess("");
      } else {
        setSuccess(json);
        setError(null);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setImage(null);
        console.log("Success")
      }
    } catch (error) {
      console.log(error.message);
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await fetch('/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const json = await response.json();

        setCategories(json.success);


      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  }, []);

  


  return (
    <>
      <div className="add">
        <SideBar/>

        <div className="container">
          <h1>Add New Service Provider</h1>
          <div className="sections">
            <div className="info">
              <form onSubmit={handleSubmitServieProvider}>
                <label htmlFor="">Name</label>
                <input
                  type="texhandet"
                  placeholder="Provider Name Here"
                  name="Name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={email}
                  placeholder="Provider Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Provider Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label>Gender</label>

                <div className="gender">
                  <div className="gender1">
                    <label>Male </label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onClick={(e) => {
                        setGender(e.target.value);
                        console.log(gender);
                      }}
                    />
                  </div>

                  <div className="gender2">
                    <label>Female </label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onClick={(e) => {
                        setGender(e.target.value);
                        console.log(gender);
                      }}
                    />
                  </div>
                </div>
                
                <label htmlFor="">Upload Image</label>
                <input type="file" 
                 onChange={handleImage}
                />
                {error && <div className="bar error">{error} </div>}
                {success && (
                  <div className="bar success">
                    <i className="ico">&#10004;</i> {success}
                  </div>
                )}

                <button>Submit</button>
              </form>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProvider;
