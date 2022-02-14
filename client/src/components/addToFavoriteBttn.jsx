import axios from "axios"
import { useState } from "react";

const AddToFavoriteBttn = ({ recipeID, currentUser })=> {
    
    console.log(currentUser)

    const [fill, setFill] = useState('none')
    //get the list of all favourites of the current user
    const isfavoriteAlr = currentUser.favorites.includes(recipeID)
    if (isfavoriteAlr){
        setFill('yellow')
    }
   
    const handleClickFavorite = async() => {
        console.log('favourite clicked')
        if (isfavoriteAlr){
            await axios.put(`/api/${currentUser._id}/addFavorite`, {recipeID: recipeID})
        } else {
            await axios.put(`/api/${currentUser._id}/removeFavorite`, {recipeID: recipeID})
        }

    }

    return (
        <>
            <h4>Add/Remove Favourite</h4>
            <svg onClick={handleClickFavorite}
                fill={fill}
                height='40px'
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                </path>
            </svg>
        </>
    )
}

export default AddToFavoriteBttn