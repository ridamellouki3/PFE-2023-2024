import React, { useEffect, useState } from "react";
import "./addService.css";

import SideBar from "../../components/SideBar/SideBar";

const addService = () => {


  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categorieId, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");



  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [providerName , setProviderName] = useState("");


  const handleImage = (e) => {
    setCover(e.target.files[0]);
    console.log(cover);

  };


  const fetchDataProvider = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users/service-Providers")
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setProviders(responseData.serviceProviders);
        console.log(providers)

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
  }; 


  useEffect(()=>{
    fetchDataProvider()
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("categorie", categorieId);
      formData.append("price", price);
      formData.append("cover", cover);
      formData.append("userId", providerName);
      
      
      console.log(categorieId)

      const response = await fetch("/api/services", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log("Result")
      setSuccess(json.success)
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setSuccess("Error");
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
    };
    fetchData();
  }, []);


  return (
    <div className="add">
         <SideBar/>
     {isLoading ? "Loading.." : error ? "Errrooorr" :
     (
      <div className="container">
        
        <h1>Add New Service</h1>
        <div className="sections">
          <div className="info">
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Service Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="">Category</label>
            
           
            <select name="cats" id="cats" onChange={(e) => setCategory(e.target.value)}>
                 <option value="">-- Select a Category --</option>
                 {categories.map((cat) => (
                 <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
           </select>

           <label htmlFor="">Service Provider Name</label>
            
           
            <select name="providerName" id="providerName" onChange={(e) => setProviderName(e.target.value)}>
                 <option value="">-- Select a Provider --</option>
                 {providers.map((cat) => (
                 <option key={cat._id} value={cat._id}>{cat.username}</option>
                  ))}
           </select>

            
            <label htmlFor="">Cover Image</label>
            <input type="file" onChange={handleImage} />
            <label htmlFor="">Price</label>
            <input type="number" onChange={(e) => {
                    setPrice(e.target.value);
                  }}/>
            
            <label htmlFor="">Description</label>
            <textarea
             name="" id="" placeholder="Brief descriptions to introduce your service to customers" 
             cols="0" rows="16"
             onChange={(e) => {
              setDesc(e.target.value);
            }}
            ></textarea>
            {error && <div className="bar error">{error} </div>}
                {success && (
                  <div class="bar success">
                    <i class="ico">&#10004;</i> {success}
                  </div>
                )}
            <button>Add Service</button>
          </form>
          </div>
         
        </div>
      </div>)}
    </div>
  );
};

export default addService;

