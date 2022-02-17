import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const FavoritesPage = ({ currentUser, allRecipes }) => {
  const navigate = useNavigate();
  const [favRecipes, setFavRecipes] = useState([]);
  const [ratings, setRatings] = useState({});
  const [status, setStatus] = useState("");

  //const [status, setStatus] = useState('')

  const reducer = (prev, curr, index, array) => prev + curr.rating;
  useEffect(() => {
    if (allRecipes !== undefined && allRecipes?.length !== 0) {
      let returnObj = {};
      for (const recipe of allRecipes) {
        console.log(recipe);
        if (recipe?.ratings?.length !== 0 && recipe?.ratings) {
          returnObj[`${recipe._id}`] =
            recipe.ratings.reduce(reducer, 0) / recipe.ratings.length;
        }
      }
      setRatings(returnObj);
    }
  }, [allRecipes]);

  const fetchFavRecipes = async () => {
    //setStatus('pending')
    console.log("currentUser", currentUser);
    setStatus("pending");

    try {
      const foundFavRecipes = await axios.get(
        `/api/users/${currentUser._id}/favorite`
      );
      setStatus("complete");

      console.log("foundFavRecipes", foundFavRecipes.data.data);
      setFavRecipes(foundFavRecipes.data.data.favorites);
      //setStatus('success') //FIXME: set status states cause infinite calls
    } catch (error) {
      console.log(error);
      //setStatus('error')
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else fetchFavRecipes();
  }, []);

  console.log("favRecipes", favRecipes);

  const handleClickRvFav = async (recipeID) => {
    console.log("removedrecipeID", recipeID);
    await axios.put(`/api/users/${currentUser._id}/removeFavorite`, {
      recipeID: recipeID,
    });
    setFavRecipes(favRecipes.filter((fav) => fav._id !== recipeID));
  };

  const favArray = favRecipes?.map((item, index) => {
    return (
      <div className="homediv" key={index}>
        <Link to={"/recipes/" + item?._id}>
          <div className="ui card">
            <div
              className="image"
              style={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "100% 100%",
              }}
            ></div>
            <div className="content" id="homeContent">
              <div
                className="header"
                style={{
                  fontFamily: "Josefin Sans, sans-serif",
                  textAlign: "center",
                }}
              >
                {item?.name}
              </div>
              <div className="meta" style={{ textAlign: "center" }}>
                <div>Servings: {item?.servings}</div>
                <Rating
                  icon="star"
                  rating={ratings[`${item?._id}`] ?? 0}
                  maxRating={5}
                  disabled
                />
                <div>{item?.description}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  if (status === "pending") {
    return "LOADING";
  }

  if (status === "error") {
    return "NO DATA FOUND";
  }

  return (
    <div style={{ backgroundColor: "lightyellow", paddingBottom: "100%" }}>
      <div id="homebanner">
        <h1 className="titles">
          Hello{" "}
          {currentUser.username?.charAt(0).toUpperCase() +
            currentUser.username?.slice(1)}
          ! Here are your favourites
        </h1>
      </div>

      {/*     
        {({status}==='success')?
        <> */}
      {favRecipes.length > 0 ? (
        <div className="randomCards">{favArray}</div>
      ) : (
        <div>
          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>
          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>

          <h1 className="titles" style={{ textAlign: "center" }}>
            ...
          </h1>
          <h1 className="titles" style={{ textAlign: "center" }}>
            Awww. Do you hate food?
          </h1>
        </div>
      )}
      {/* </>
        : {status}
        } */}
    </div>
  );
};

export default FavoritesPage;
