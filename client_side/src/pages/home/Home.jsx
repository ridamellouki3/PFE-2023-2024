import React from "react";
import "./Home.css";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards1,cards2,cards3, projects } from "../../data";
import Quick from "../../components/Quick/Quick";

function Home() {
  return (
    <div className="home">
      <Featured />
      <div className="Category">
      <h1 className="hr">  Gardening </h1>
      <hr />
      </div>
     <Slide slidesToShow={5} arrowsScroll={5}>
        {cards1.map((card) => (
          <CatCard key={card.id} card={card} />
        ))
        }
      </Slide>  
      
      <div className="Category">
      <h1 className="CatTitle"> House Cleaner  </h1>
      <hr />
      </div>
      <Slide slidesToShow={5} arrowsScroll={3}>
        {cards2.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> 

      <div className="Category">
      <h1 className="hr"> Personal Trainer  </h1>
      <hr />
      </div>
      <Slide slidesToShow={5} arrowsScroll={2}>
        {cards3.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> 
      

      <Quick/>
      
    </div>
  );
}

export default Home;
