import React from "react";
import { Link } from "react-router-dom";

const CommentForm = ({ currentUser, handleSubmit}) => {
  
  return currentUser !== undefined && currentUser !== "" ? (
    <form
      className="ui reply form"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="field">
        <label htmlFor="name" />
        <input
          type="text"
          name="comment"
          placeholder="Enter your comment here"
        />
      </div>
      <input type="submit" value="Add Comment" />
    </form>
  ) : (
    <div>
      Please <Link to="/login">log in</Link> to be able to post a comment.
    </div>
  );
};

export default CommentForm;
