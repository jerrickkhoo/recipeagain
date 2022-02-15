import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ currentUser, recipeID }) => {
  console.log(currentUser);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getAllComments = async (recipeID) => {
      const res = await axios
        .post("/api/comments/", { recipeId: recipeID })
        .catch((err) => console.log(err));
    //   console.log("get comments", res);
      if (res !== undefined) {
        setComments(res.data.data);
      }
    };
    getAllComments(recipeID);
  }, []);
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      <div className="comment">
        <a className="avatar">
          {/* <img src="/images/avatar/small/matt.jpg" /> */}
        </a>
        <div className="content">
          <a className="author">{currentUser?.username}</a>
          <div className="metadata">
            <span className="date">Today at 5:42PM</span>
          </div>
          <div className="text">How artistic!</div>
          <div className="actions">
            <a className="reply">Reply</a>
          </div>
        </div>
      </div>

      {comments.map((comment) => {
          console.log(comment);
        return (
          <>
            <div className="comment" key={comment._id}>
              <a className="avatar">
                {/* <img src="/images/avatar/small/matt.jpg" /> */}
              </a>
              <div className="content">
                <a className="author">{comment?.userId?.username}</a>
                <div className="metadata">
                  <span className="date">Today at 5:42PM</span>
                </div>
                <div className="text">{comment.comment}</div>
                <div className="actions">
                  <a className="reply">Reply</a>
                </div>
              </div>
            </div>
          </>
        );
      })}

      <form className="ui reply form">
        <div className="field">
          <textarea></textarea>
        </div>
        <div className="ui blue labeled submit icon button">
          <i className="icon edit"></i> Add Reply
        </div>
      </form>
    </div>
  );
};

export default Comments;
