import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentDiv from "./CommentDiv";
import CommentForm from "./CommentForm";

const Comments = ({ currentUser, recipeID }) => {
  // console.log(currentUser);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = async (recipeID) => {
      try {
        const res = await axios.get(`/api/comments/${recipeID}`);
        // console.log("get comments", res);
        setComments(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments(recipeID);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("in submit");
    // console.log(event.target.comment.value);
    try {
      const res = await axios.post("/api/comments/new", {
        userId: currentUser._id,
        recipeId: recipeID,
        comment: event.target.comment.value,
      });
      console.log("new comment", res);
      setComments([...comments, res.data.data]);
      event.target.comment.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {comments.map((comment, index) => {
        // console.log(comment);
        // getReplies(comment._id);
        return (
          <CommentDiv
            comment={comment}
            currentUser={currentUser}
            setComments={setComments}
            comments={comments}
            index={index}
          />
        );
      })}
      <CommentForm
        handleSubmit={handleSubmit}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Comments;
