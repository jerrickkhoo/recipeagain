import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import RatingButton from "./Rating";
import axios from "axios";
import AddToFavoriteBttn from "./addToFavoriteBttn";
import dayjs from "dayjs";

const Card = ({ currentUser, recipeID }) => {
  //const { recipeID } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});

  const fetchCurrentRecipe = async () => {
    const foundRecipe = await axios.get(`/api/recipes/${recipeID}`);
    //console.log(foundRecipe.data.data)
    setCurrentRecipe(foundRecipe.data.data);
  };
  useEffect(() => {
    fetchCurrentRecipe();
  }, []);

  const ingredients = currentRecipe?.ingredients?.map((item, index) => {
    return (
      <ul className="unorderedList" key={index}>
        <li>
          <h3>
            {item?.name} - {item?.quantity} {item?.units}
          </h3>
        </li>
      </ul>
    );
  });
  // const comments = currentRecipe.comments.map((item, index) => {
  //   return (
  //     <div key={index} className="ui relaxed divided list">
  //       <div className="item">
  //         <div className="content">
  //           <p className="header">{item.author}</p>
  //           <div className="description">
  //             {item.createTime}
  //             <br />
  //             {item.content}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  const steps = currentRecipe?.steps?.map((item, index) => {
    return (
      <ol key={index}>
        <h3>{item}</h3>
      </ol>
    );
  });

  const tags = currentRecipe?.tags?.map((item, index) => {
    return (
      <h2><Link to={`/tags/${item}`}>{item}</Link></h2>
    )
  });

  console.log('currentUser',currentUser)
  //TODO: check if currentUser.id ===currentRecipe author else do not render link edit
  return (
    <div>
      <div className="cardHeader">
        <img className="headerBackground" src={currentRecipe?.image} alt="" />
        <div className="headerText">
          <h1 id="cardName">{currentRecipe?.name}</h1>
          <h3>Created by {currentRecipe?.author?.username}</h3>
          <h3>Created on {dayjs(currentRecipe?.createdAt).format("DD-MMM-YYYY")}</h3>
          <h2 id="cardDescription">{currentRecipe?.description}</h2>
          <h2>Servings: {currentRecipe?.servings}</h2>
        </div>
      </div>

      <div className="cardContent">
        <Link to={`/recipes/${recipeID}/edit`}>Edit</Link>
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
