import React, { useState } from 'react'
import './Profile.css'
import SideBar from '../../components/SideBar/SideBar';

const Profile = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [resp , setResp] = useState("");
  const [img, setImage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);


  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(img);

  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("gender", gender);
      formData.append("pass", password);
      formData.append("desc", desc);
      formData.append("country", country);
      formData.append("phone", phone);
      formData.append("img", img);

      const response = await fetch("/api/users/updatePofile", {
        method: "PATCH",
        body: formData,

      });

      const json = await response.json();
      setResp(json.successfull)
      console.log(json.user);

      if (!response.ok) {
        setError(json.error);
        setSuccess(null);
      } else {
        setSuccess(json.success);
        setError(null);
        setUsername("");
        setPassword("");
        setImage(null);
        setDesc("");
        setPhone("");
        setCountry("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <>
      <div className="add">
        <SideBar/>

        <div className="container">
          <h1>Update Your Profile Here</h1>
          <div className="sections">
            <div className="info">
              <form onSubmit={handleSubmit}>
                <label htmlFor="">User Name</label>
                <input
                  type="texhandet"
                  placeholder="Update Your UserName Here"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="Password"
                  value={password}
                  placeholder='Update Your Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <label htmlFor="">Country</label>
                <input
                  type="password"
                  name="country"
                  value={country}
                  placeholder='Update Your Country'
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />

                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder='Update Your Phone'
                  onChange={(e) => {
                    setPhone(e.target.value);
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
                <label htmlFor="">Description</label>
                <textarea
                
                  type="desc"
                  name="Password"
                  value={desc}
                  placeholder='Describe your self'
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                
                <label htmlFor="">Upload Image</label>
                <input type="file"  onChange={handleImage} />
                {error && <div class="bar error">{error} </div>}
                {resp && (
                  <div class="bar success">
                    <i class="ico">&#10004;</i> {resp}
                  </div>
                )}
                
                <button>Update</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
