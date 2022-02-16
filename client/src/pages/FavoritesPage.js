import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const FavoritesPage = ({ currentUser }) => {
  const navigate = useNavigate()
  const [favRecipes, setFavRecipes] = useState([])
  //const [status, setStatus] = useState('') 

  const fetchFavRecipes = async () => {
    //setStatus('pending')
    console.log('currentUser', currentUser)
    try {
      const foundFavRecipes = await axios.get(`/api/users/${currentUser._id}/favorite`)
      setFavRecipes(foundFavRecipes.data.data.favorites)
      //setStatus('success') //FIXME: set status states cause infinite calls
    } catch (error) {
      console.log(error)
      //setStatus('error')
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else
      fetchFavRecipes()
  }, [currentUser, favRecipes])

  console.log('favRecipes', favRecipes)

  const handleClickRvFav = async (recipeID) => {
    console.log('removedrecipeID', recipeID)
    await axios.put(`/api/users/${currentUser._id}/removeFavorite`, { recipeID: recipeID })
    setFavRecipes(favRecipes.filter((fav) => fav !== recipeID))
  }

  const favArray = favRecipes?.map((fav, i) => {
    return (
      <div key={i}>
        <li>
          <Link to={`/recipes/${fav._id}`}><h4>{fav.name}</h4></Link>
          <button onClick={() => handleClickRvFav(fav._id)}>Remove Favorite</button>
          <p>{fav.description}</p>
          <div>
            <img src={fav.image} alt='' width='500px'></img>
          </div>
        </li><br /><br />
      </div>
    )
  })



  return (
    <div>
      <h1>Hello {currentUser.username?.charAt(0).toUpperCase() + currentUser.username?.slice(1)}!</h1>
      <h2>Below are your Favorite recipes:</h2>
{/*     
        {({status}==='success')?
        <> */}
        {(favRecipes.length > 0) ?
          <div>
            <ol>{favArray}</ol>
          </div>
          :
          <h2>You do not have any favorite recipes at the moment</h2>
          }
        {/* </>
        : {status}
        } */}
      
    </div>
  );

};

export default FavoritesPage;
