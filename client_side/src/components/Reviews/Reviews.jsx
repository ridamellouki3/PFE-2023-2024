import React, { useEffect, useState } from 'react'
import "./Reviews.css"
import Review from '../Review/Review'
import { useParams } from 'react-router-dom'



const Reviews = ({serviceId})=> {

  console.log(serviceId)

  const currentUser = (localStorage.getItem("currentUser") != "undefined" ? JSON.parse(localStorage.getItem("currentUser")) : null )

  const userId = currentUser?._id 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  const [desc, setDescr] = useState("");
  const [star, setStar] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/reviews/${serviceId}`); //${serviceId}


        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setReviews(responseData.reviews);

      } catch (err) {
        setError(err.message);
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);



  useEffect(()=>{
    console.log(reviews)
  },[reviews])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(star)
    console.log(desc)

    

    console.log(JSON.stringify({serviceId,star,desc}))
    const response = await fetch("/api/reviews/", {
      method: "POST",
      body: JSON.stringify({serviceId,star,desc}),
      headers:{
        'Content-Type':'application/json'
    }
    });


    const json = await response.json();
    
  };

  return (


        <div className="reviews">
                    
                    {isLoading ? (
  "Loading..."
) : error ? (
  "Erroorrr"
) : (
  <>
   
    {reviews.length > 0 && (
      <div>     { console.log(reviews)}

        <h2>Reviews</h2>
        {reviews.map((review) => (
          <Review key={review._id} review={review} /> 
        ))}
      </div>
    )}
  
    {currentUser ?  currentUser.role =='Client' &&(
      <div className="add">
      <h3>Add a review</h3>
      <form action="" className="addForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Write your opinion" onChange={(e)=>setDescr(e.target.value)}/>
        <select name="" id="" onChange={(e)=>setStar(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button>Send</button>
      </form>
    </div>) : ""
    }
  </>
)}


        </div>

         

);

}

export default Reviews
