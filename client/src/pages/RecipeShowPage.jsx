//import Comment from "../components/Comment";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";

const RecipeShowPage = ({currentUser}) => {
    const { recipeID } = useParams();
    const navigate = useNavigate()

    return (
        <div>
            <Card currentUser={currentUser} recipeID ={recipeID}/>
            {/* <Comment recipeID ={recipeID} > */}
        </div>
    );
};

export default RecipeShowPage;
