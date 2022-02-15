import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({ currentUser }) => {
  const navigate = useNavigate()
  const [favRecipes,setFavRecipes]=useState([])
g
  const fetchFavRecipes =  async ()=>{
        const foundFavRecipes = await axios.get()
        setFavRecipes()
  }

  useEffect(() => {
    if (!currentUser || currentUser === {}) {
      navigate('/login')
    } else 
    fetchFavRecipes()
  }
  , [currentUser])

  // console.log('currentUser', currentUser.favorites)
  //const hasFav = (currentUser?.favorites?.length > 0 ? true : false)


  const favArray = currentUser.favorites?.map((fav,i) => {
    return (
      <div>
        {fav}
      </div>
    )
  })
  return (
    <div>
      <h1>Hello {currentUser.username?.charAt(0).toUpperCase() + currentUser.username?.slice(1)}!</h1>
      {(currentUser?.favorites?.length > 0) ?
      <div>
        <h2>Below are your Favorite recipes:</h2>
        {favArray}
      </div>
        :
        <h2>You dont have any favorite recipes at the moment</h2>}


    </div>
  );

};

export default FavoritesPage;
