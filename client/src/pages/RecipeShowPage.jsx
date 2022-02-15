//import Comment from "../components/Comment";
import Card from "../components/Card";
import Comments from "../components/Comments";
import { useNavigate, useParams, Link } from "react-router-dom";


const RecipeShowPage = ({currentUser}) => {
    const { recipeID } = useParams();
    const navigate = useNavigate()

    return (
        <div>
            <Link to={"/recipes/new"}>Create a New Recipe</Link>
            <Card currentUser={currentUser} recipeID ={recipeID}/>
            <Comments currentUser={currentUser} recipeID ={recipeID} />
        </div>
    );
};

export default RecipeShowPage;
