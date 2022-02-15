import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router";

const AddToFavoriteBttn = ({ recipeID, currentUser }) => {

    const [currFavorites, setCurrFavorites] = useState(currentUser.favorites)

    const [fill, setFill] = useState((currFavorites?.includes(recipeID)) ? 'yellow' : 'none')

    const navigate = useNavigate();
    console.log('currentUser.favorites',currentUser.favorites)
    // console.log('recipeID',currentUser.favorites.includes(recipeID))

    const handleClickFavorite = async () => {
        console.log('favourite clicked')
        if (!currentUser) {
            alert('Please login to add to favorites')
            navigate('/login')
        }
        console.log('isfavoriteAlr',currFavorites?.includes(recipeID))
        if (!currFavorites?.includes(recipeID)) {
            await axios.put(`/api/users/${currentUser._id}/addFavorite`, { recipeID: recipeID })
                .then(response => { 
                    setFill('yellow') 
                    setCurrFavorites([...currFavorites,recipeID])
                })
        } else {
            await axios.put(`/api/users/${currentUser._id}/removeFavorite`, { recipeID: recipeID })
                .then(response => {
                    setFill('none')
                    setCurrFavorites(currFavorites.filter((fav)=>fav!== recipeID))
                })
        }
    }

    const toggleHover = () => {
        if (fill === 'none') {
            setFill("yellow")
        } else setFill('none')
    }

    return (
        <>
            <h4>Add/Remove Favourite</h4>
            <svg onClick={handleClickFavorite}
                fill={fill}
                // onMouseEnter={toggleHover}
                // onMouseLeave={toggleHover}
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