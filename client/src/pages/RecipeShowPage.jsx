//import Comment from "../components/Comment";
import Card from "../components/Card";
import Comments from "../components/Comments";
import { useNavigate, useParams, Link } from "react-router-dom";


const RecipeShowPage = ({currentUser}) => {
    const { recipeID } = useParams();
    const navigate = useNavigate()

    return (
        <div>
            
            <Card currentUser={currentUser} recipeID ={recipeID}/>
            <Comments currentUser={currentUser} recipeID ={recipeID} />
        </div>
    );
};

export default RecipeShowPage;
