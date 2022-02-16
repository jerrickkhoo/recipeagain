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

  const handleSubmit = async (event, type, index) => {
    event.preventDefault();
    console.log("in submit");
    console.log(event.target.comment.value);
    if (type === "comment") {
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
    } else {
      try {
        const res = await axios.post(
          `/api/replies/new/${comments[index]._id}`,
          {
            userId: currentUser._id,
            comment: event.target.comment.value,
          }
        );
        console.log("new reply", res);
        event.target.comment.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ui comments">
      <h3 className="ui dividing header" id='font'>Comments</h3>
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
        mode={"comment"}
      />
    </div>
  );
};

export default Comments;
