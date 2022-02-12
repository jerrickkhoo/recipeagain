import React from 'react'
import { useParams } from 'react-router-dom'
import seed from "./models/seed_recipes";
import { Rating } from "semantic-ui-react";



const SearchResults = (props) => {
const params = useParams()

const searchQuery = props.searchQuery
const setSearchQuery = props.setSearchQuery


let foundRecipes = seed.filter(function(recipe){
    // return recipe.name.toLowerCase() === searchQuery
    return recipe.name.toLowerCase().split(' ').includes(searchQuery)
})

let recipeIndex = seed.filter(function (recipe) {
  // return recipe.name.toLowerCase() === searchQuery
  return seed.indexOf(recipe.name.toLowerCase().split(" ").includes(searchQuery));
});




const searchRecipes = foundRecipes.map((item, index) => {
  return (
    <div className="homediv">
      {/* <Link to={"/recipe/" + recipeIndex[index]} key={index}> */}
      <div className="ui card">
        <div className="image">
          <img src={item?.imageURL} alt={item?.originalURL} />
        </div>
        <div className="content" id="homeContent">
          <div className="header">{item?.name}</div>
          <div className="meta">
            <div>Servings: {item?.servings}</div>
            <Rating icon="star" defaultRating={item?.rating} maxRating={5} />
            <div>{item?.description}</div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
});
  return (
    <div className='home'>
    <div className='randomCards'>
        {searchRecipes}
    </div>
    </div>
  )
}

export default SearchResults;