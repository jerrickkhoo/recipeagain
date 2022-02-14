import React from "react";
import seed from "./models/seed_recipes";
import { useState } from "react";
import { useParams } from "react-router";
import "./Card.css";
import RatingButton from "./Rating";

const Card = () => {
  const params = useParams();
  console.log(params);
  const [recipe, setRecipe] = useState(seed[params?.id]);

  const ingredients = recipe.ingredients.map((item, index) => {
    return (
      <ul className="unorderedList" key={index}>
        <li>
            <h3>{item?.name} - {item?.quantity}</h3>
        </li>
      </ul>
    );
  });

  const comments = recipe.comments.map((item, index) => {
    return (
      <div key={index} className="ui relaxed divided list">
        <div className="item">
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
  
    <div>
      <div className="cardHeader">
        <img
          className="headerBackground"
          src={recipe?.imageURL}
          alt={recipe?.originalURL}
        />
        <div className="headerText">
          <h1 id="cardName">{recipe?.name}</h1>
          
          <h2 id="cardDescription">{recipe?.description}</h2>
          <h2>Servings: {recipe?.servings}</h2>
        </div>
      </div>
      <div className='cardContent'>
        <h2>Ingredients:</h2>
        {ingredients}
        <h2>Steps:</h2>
        {steps}
        <RatingButton />
        <h3>Comments</h3>
        {comments}
      </div>
    </div>

  );
};

export default Card;
