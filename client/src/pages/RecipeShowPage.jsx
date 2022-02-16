//import Comment from "../components/Comment";
import Card from "../components/Card";
import Comments from "../components/comments/Comments";
import { useNavigate, useParams, Link } from "react-router-dom";


const RecipeShowPage = ({currentUser, isLoggedIn}) => {
    const { recipeID } = useParams();
    const navigate = useNavigate()

    return (
        <div style={{textAlign:'center'}}>
            
            <Card currentUser={currentUser} recipeID ={recipeID} isLoggedIn={isLoggedIn}/>
            <div className='comments'>

            <Comments currentUser={currentUser} recipeID ={recipeID} />
            </div>
        </div>
    );
};

export default RecipeShowPage;
