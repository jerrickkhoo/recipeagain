import React from "react";
import seed from "./models/seed_recipes";
import { useState } from "react";
import { useParams } from "react-router";


const Card = () => {
  const params = useParams()
  const [recipe, setRecipe] = useState(seed[params.id]);
  
const ingredients = recipe.ingredients.map((item)=>{
  return(
  <ul>
    <li>
      <h3>{item.name} - {item.quantity}</h3>
    </li>
  </ul>
  )
})

const steps = recipe.steps.map((item) => {
  return (
    <ol>
      <h3>{item}</h3>
    </ol>
  );
});


  return (
    <div style={{textAlign: "center"}}>
      <h1>{recipe.name}</h1>
      <h3>{recipe.description}</h3>
      <h3>Servings: {recipe.servings}</h3>
      <h3>Rating: {recipe.rating}</h3>
      <img src={recipe.imageURL} alt={recipe.originalURL} />
      <h2>Ingredients</h2>
      {ingredients}
      <h2>Steps:</h2>
      {steps}
    </div>
  );
};

export default Card;
