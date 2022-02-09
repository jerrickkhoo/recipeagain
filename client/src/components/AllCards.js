import React from "react";
import { useState } from "react";
import seed from "./models/seed_recipes";
import { Link } from "react-router-dom";

// console.log(seed);

const AllCards = () => {
  const [recipe, setRecipe] = useState(seed);
  console.log(recipe);
  const cards = recipe.map((item, index) => {
    return (
      <Link to={"/recipe/" + index}>
        <div className="ui card" >
          <a className="image" href="#">
            <img src={item.imageURL} alt={item.originalURL} />
          </a>
          <div className="content">
            <a className="header" href="#">
              {item.name}
            </a>
            <div className="meta">
              <a>Servings: {item.servings}</a>
              <a>Rating: {item.rating}</a>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div style={{textAlign: "center"}}>
      {cards}
    </div>
  );
};

export default AllCards;
