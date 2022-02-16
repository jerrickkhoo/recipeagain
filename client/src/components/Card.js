import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import RatingButton from "./Rating";
import axios from "axios";
import AddToFavoriteBttn from "./addToFavoriteBttn";
import dayjs from "dayjs";
import joi from "joi"

const Card = ({ currentUser, recipeID }) => {
  //const { recipeID } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [currentUserisAuthor, setCurrentUserisAuthor] =useState(false)

  const fetchCurrentRecipe = async () => {
    const foundRecipe = await axios.get(`/api/recipes/${recipeID}`);
    const foundAuthor = foundRecipe.data.data.author._id
    //console.log('test',foundRecipe.data.data.author._id===currentUser._id)
    setCurrentRecipe(foundRecipe.data.data);
    setCurrentUserisAuthor(foundAuthor===currentUser._id)
  };

  useEffect(() => {
    fetchCurrentRecipe();
  }, []);

  const ingredients = currentRecipe?.ingredients?.map((item, index) => {
    return (
      <ul className="unorderedList" key={index}>
        <li>
          <h3>
            {item?.name} {item?.quantity} {item?.units}
          </h3>
        </li>
      </ul>
    );
  });

  const steps = currentRecipe?.steps?.map((item, index) => {
    return (
      <ol key={index}>
        <h3>{item}</h3>
      </ol>
    );
  });

  const tags = currentRecipe?.tags?.map((item, index) => {
    return (
      <h2 key={index}><Link to={`/tags/${item}`}>{item}</Link></h2>
    )
  });

  console.log('currentUser', currentUser)

  return (
    <div>
      <div className="cardHeader">
        <img className="headerBackground" src={currentRecipe?.image} alt="" />
        <div className="headerText">
          <h1 id="cardName">{currentRecipe?.name}</h1>
          <h3>Created by {currentRecipe?.author?.username}</h3>
          <h3>Created on {dayjs(currentRecipe?.createdAt).format("DD-MMM-YYYY")}</h3>
          <h2 id="cardDescription">{currentRecipe?.description}</h2>
          <h3>Servings: {currentRecipe?.servings}</h3>
          <h3>Duration: {Number.isInteger(currentRecipe?.duration/60)? (currentRecipe?.duration/60):(currentRecipe?.duration/60).toFixed(1)} hr</h3>
        </div>
      </div>

      <div className="cardContent">
        {(currentUserisAuthor)
        && <div>
          <Link to={`/recipes/${recipeID}/edit`}>Edit</Link><br/>
        </div> 
        }

        <div>
          <Link to={"/recipes/new"}>Create a New Recipe</Link>
        </div>

        <AddToFavoriteBttn recipeID={recipeID} currentUser={currentUser} />
        <h2>Ingredients:</h2>
        {ingredients}
        <h2>Steps:</h2>
        {steps}
        <RatingButton currentUser={currentUser} />
        <h2>Want more? See our related tags below</h2>
        {tags}
      </div>
    </div>
  );
};

export default Card;
