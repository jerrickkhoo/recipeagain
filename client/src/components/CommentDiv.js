import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import CommentForm from "./CommentForm";
import axios from "axios";

const CommentDiv = ({ comment, currentUser, handleSubmit,setComments,comments,index }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const parseDate = (timestamp) => {
    if (dayjs().$D === dayjs(timestamp).$D) {
      return `Today at ${dayjs(timestamp).format("h.mma")}`;
    } else {
      return `${dayjs(timestamp).format("DD-MMM")} at ${dayjs(timestamp).format(
        "h.mma"
      )}`;
    }
  };

  const handleEdit = async (event,id) => {
    event.preventDefault();
    try {
        const res = await axios.put(`/api/comments/${id}`, {
          comment: event.target.comment.value,
        });
        console.log("edited comment", res);
        setComments(comments.map((ele,i)=>index === i ? res.data.data : ele));
        setEditOpen(false);
      } catch (error) {
        console.log(error);
      }
  };

  const getReplies = async (id, depth = 0) => {
    if (depth === 0) {
      try {
        const res = await axios.get(`/api/replies/${id}`);
        if (res.data.data.length !== 0) {
          //res.data.data is an array of replies
          return res.data.data.map((reply, index) => {
            return (
              <CommentDiv
                comment={reply}
                currentUser={currentUser}
                handleSubmit={handleSubmit}
              />
            );
          });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }

    return "reply";
  };

  return (
    <>
      <div className="comment" key={comment._id}>
        <a className="avatar">
          {/* <img src="/images/avatar/small/matt.jpg" /> */}
        </a>
        <div className="content">
          <a className="author">{comment?.userId?.username}</a>
          <div className="metadata">
            <span className="date"><ReactMarkdown>{`${parseDate(comment.updatedAt)} ${comment?.edited ? "*edited*" : ""}`}</ReactMarkdown></span>
          </div>
          {editOpen ? (
            <>
              <form
                className="ui reply form"
                onSubmit={(event) => handleEdit(event,comment._id)}
              >
                <div className="field">
                  <label htmlFor="name" />
                  <input
                    type="text"
                    name="comment"
                    defaultValue={`${comment.comment}`}
                  />
                </div>
                <input type="submit" value="Edit" />
              </form>
            </>
          ) : (
            <>
              <div className="text">
                <ReactMarkdown>{comment.comment}</ReactMarkdown>
              </div>
              <div className="actions">
                {currentUser !== undefined && currentUser !== "" ? (
                  <a className="reply" onClick={() => setReplyOpen(!replyOpen)}>
                    Reply
                  </a>
                ) : null}
                {currentUser !== undefined &&
                currentUser._id === comment.userId._id ? (
                  <>
                    <a className="reply" onClick={() => setEditOpen(!editOpen)}>
                      Edit
                    </a>
                    <a className="reply" onClick={() => console.log("delete")}>
                      Delete
                    </a>
                  </>
                ) : null}
                {replyOpen ? (
                  <CommentForm
                    handleSubmit={handleSubmit}
                    currentUser={currentUser}
                    mode={"reply"}
                  />
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentDiv;
