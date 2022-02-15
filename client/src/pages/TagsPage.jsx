import { useParams } from "react-router-dom";

const TagsPage = () => {
    const { tagID } = useParams();
    //fetch all recipes and search for recipeID that has tags array that contain the tagID
    return (
        <div>
           <h1>Tags Page</h1>
        </div>
    );
};

export default TagsPage;
