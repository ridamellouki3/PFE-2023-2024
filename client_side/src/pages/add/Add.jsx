import React, { useEffect, useState } from "react";
import "./Add.css";
import SideBar from "../../components/SideBar/SideBar";

const add = () => {

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categorieId, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleImage = (e) => {
    setCover(e.target.files[0]);
    console.log(cover);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("categorieId", categorieId);
      formData.append("price", price);
      formData.append("cover", cover);
      
      console.log(categorieId)

      const response = await fetch("/api/services", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setSuccess(null);
      }
    } catch (error) {
      console.log(error.message);
    }

  };


useEffect(()=>{
 console.log(categorieId)
},[])

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
                 <option key={cat._id} value={cat._id}>{cat.name}</option>
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
            <button>Create</button>
          </form>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default add;
