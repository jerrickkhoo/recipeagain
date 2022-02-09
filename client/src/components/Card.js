import React from "react";
import seed from "./models/seed_recipes";
import { useState } from "react";
import { useParams } from "react-router";
import "./Card.css";

const Card = () => {
  const params = useParams();
  console.log(params);
  const [recipe, setRecipe] = useState(seed[params?.id]);

  const ingredients = recipe.ingredients.map((item, index) => {
    return (
      <ul className="unorderedList" key={index}>
        <li>
          <h3>
            {item?.name} - {item?.quantity}
          </h3>
        </li>
      </ul>
    );
  });

  const comments = recipe.comments.map((item, index) => {
    return (
      <div key={index} className="ui relaxed divided list">
        <div className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            <p className="header">{item.author}</p>
            <div className="description">
              {item.createTime}
              <br />
              {item.content}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const steps = recipe?.steps.map((item, index) => {
    return (
      <ol key={index}>
        <h3>{item}</h3>
      </ol>
    );
  });

  return (
    <div className="singleCard">
      <div className="ui card">
        <p className="image">
          <img src={recipe?.imageURL} alt={recipe?.originalURL} />
        </p>
        <div className="content">
          <div>
            <span>
              <i className="users icon"></i>Rating: {recipe?.rating}
            </span>
            {/* <div class="meta">
          <h4></h4>
        </div> */}
            <span className="right floated star">
              <i className="star icon large"></i>
              Favorite
            </span>
          </div>
          <h1>{recipe?.name}</h1>
          <h3>{recipe?.description}</h3>
          <h3>Servings: {recipe?.servings}</h3> <h2>Ingredients:</h2>
          {ingredients}
          <h2>Steps:</h2>
          {steps}
          <h3>Comments...</h3>
          {comments}
        </div>
      </div>
    </div>

    // {/* // <div style={{ textAlign: "center" }}>
    //   <h1>{recipe?.name}</h1>
    //   <h3>{recipe?.description}</h3>
    //   <h3>Servings: {recipe?.servings}</h3>
    //   <button>
    //     {" "}
    //     <i class="heart outline like icon huge"></i>
    //   </button>

    //   <h3>Rating: {recipe?.rating}</h3>
    //   <img src={recipe?.imageURL} alt={recipe?.originalURL} />
    //   <h2>Ingredients</h2>
    //   {ingredients}
    //   <h2>Steps:</h2>
    //   {steps}
    // </div> */}
  );
};

export default Card;
