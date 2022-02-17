//import Comment from "../components/Comment";
import Card from "../components/Card";
import Comments from "../components/comments/Comments";
import {  useParams } from "react-router-dom";


const RecipeShowPage = ({currentUser, isLoggedIn}) => {
    const { recipeID } = useParams();


    return (
        <div style={{textAlign:'center'}}>
            
            <Card currentUser={currentUser} recipeID ={recipeID} isLoggedIn={isLoggedIn}/>
            <div id='comments-container-container'>
            <Comments currentUser={currentUser} recipeID ={recipeID} />
            </div>
        </div>
    );
};

export default RecipeShowPage;
