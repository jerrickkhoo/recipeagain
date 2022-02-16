import React from "react";
import { Link } from "react-router-dom";

const CommentForm = ({ currentUser, handleSubmit, mode,index }) => {
  if (mode === "comment") {
    return currentUser !== undefined && currentUser !== "" ? (
      <form
        className="ui reply form"
        onSubmit={(event) => handleSubmit(event, "comment")}
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
  } else {
    return (
      <form
        className="ui reply form"
        onSubmit={(event) => handleSubmit(event, "reply", index)}
      >
        <div className="field">
          <label htmlFor="name" />
          <input
            type="text"
            name="comment"
            placeholder="Enter your reply here"
          />
        </div>
        <input type="submit" value="Reply" />
      </form>
    );
  }
};

export default CommentForm;
