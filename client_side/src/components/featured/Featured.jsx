import React, { useEffect, useState } from "react";
import "./Featured.css";
import { useNavigate } from "react-router-dom";

function Featured() {

  const [search , setSearch] = useState("")

  const navigate = useNavigate()

  const [categories,setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/categories",{
          method:'GET'
        }); 

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }


        const data = await response.json();
            
        setCategories(data.success);
      
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handelSubmit = ()=>{

   
    categories.map((cat)=>{
      (search == cat.name ? navigate(`/services/${cat._id}`) : "")
      console.log(cat.name)
    })
    
  
    //navigate(`/services/${search}`)

  }


  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          
          <div className="search">
           
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Search here' onChange={(e)=>{setSearch(e.target.value)}} />
            </div>
            <button onClick={handelSubmit}>Search</button>
           

          </div>
        
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
