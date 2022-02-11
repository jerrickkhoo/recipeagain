import React from 'react'
import { useParams } from 'react-router-dom'
import seed from "./models/seed_recipes";


const SearchResults = (props) => {
const params = useParams()

const searchQuery = props.searchQuery
const setSearchQuery = props.setSearchQuery

// let searchArray = []

// for (let i = 0; i<seed.length; i++){
//   if(seed[i].name.toLowerCase() === {searchQuery}){
//     // searchArray.push(seed[i])  
//     // console.log(searchArray);
//     console.log(true)
//   } else{
//       console.log(false)
//   }
// }

let searchArray = seed.filter(function(recipe){
    console.log(recipe.name.toLowerCase().split(" "));
    return recipe.name.toLowerCase().split('') === searchQuery
})

console.log(searchArray)
  return (
    <div>
    </div>
  )
}

export default SearchResults;