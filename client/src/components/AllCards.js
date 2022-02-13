import React from "react";
// import { useState } from "react";
// import seed from "./models/seed_recipes";
import { Link } from "react-router-dom";

// console.log(seed);

const AllCards = (props) => {
  // const [recipe, setRecipe] = useState(seed);
  // console.log(recipe);
  console.log(props);
  // const cards = props.recipes.map((item, index) => {
  return (
    <Link to={`/recipe/${props.key}`}>
      <div className="ui card">
        <div className="image">
          <img src={props?.imageURL} alt={props?.originalURL} />
        </div>
        <div className="content">
          <div className="header">{props?.name}</div>
          <div className="meta">
            <div>Servings: {props?.servings}</div>
            <div>Rating:{props?.rating} </div>
          </div>
        </div>
      </div>
    </Link>
  );
  // });

  // return <div style={{ textAlign: "center" }}>{cards}</div>;
};

export default AllCards;
