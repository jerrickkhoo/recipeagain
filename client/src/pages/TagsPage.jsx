import { useParams } from "react-router-dom";

const TagsPage = () => {
    const { tagID } = useParams();

    return (
        <div>
           <h1>Tags Page</h1>
        </div>
    );
};

export default TagsPage;
