import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [img, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("img", img);

      const response = await fetch("/api/auth/registre", {
        method: "POST",
        body: formData,

      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setSuccess(null);
      } else {
        setSuccess(json.success);
        setError(null);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setImage(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="add">
        <div className="container">
          <h1>Register Here</h1>
          <div className="sections">
            <div className="info">
              <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Type Your Name Here"
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
                  placeholder="Type Your Email Here"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="Password"
                  value={password}
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
                <label htmlFor="">Role</label>
                <select
                  name="cats"
                  id="cats"
                  onClick={(e) => {
                    setRole(e.target.value);
                    console.log(e.target.value);
                  }}
                  required
                >
                  <option></option>
                  <option value="Client">Client</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Manager">Manager</option>
                </select>
                <label htmlFor="">Upload Image</label>
                <input type="file" onChange={handleImage} />
                <img src={img} alt="" />
                {error && <div className="bar error">{error} </div>}
                {success && (
                  <div class="bar success">
                    <i class="ico">&#10004;</i> {success}
                  </div>
                )}
                <button>Registre</button>
              </form>

              <span className="noaccount">
                {" "}
                Already have an account
                <Link className="linkr" to="/login">
                  {" "}
                  Login here{" "}
                </Link>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
