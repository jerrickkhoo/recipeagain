import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import "./CommentDiv.css";

const CommentDiv = ({ comment, currentUser, setComments, comments, index, mode="comment" }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const parseDate = (timestamp) => {
    if (dayjs().$D === dayjs(timestamp).$D) {
      return `Today at ${dayjs(timestamp).format("h.mma")}`;
    } else {
      return `${dayjs(timestamp).format("DD-MMM")} at ${dayjs(timestamp).format(
        "h.mma"
      )}`;
    }
  };

  const handleEdit = async (event, id) => {
    event.preventDefault();
    const URL = mode==="reply" ? `/api/replies/${id}`  : `/api/comments/${id}`;
    try {
      const res = await axios.put(URL, {
        comment: event.target.comment.value,
      });
      console.log("edited comment", res);
      setComments(
        comments.map((ele, i) => (index === i ? res.data.data : ele))
      );
      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const URL = mode==="reply" ? `/api/replies/delete/${id}`  : `/api/comments/delete/${id}`;
    try {
      const res = await axios.put(URL, {
        comment: "*deleted comment*",
      });
      console.log("deleted comment", res);
      setComments(
        comments.map((ele, i) => (index === i ? res.data.data : ele))
      );
      setEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getReplies = async (id) => {
      try {
        const res = await axios.get(`/api/replies/${id}`);
        if (res.data.data.length !== 0) {
          setChildren(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReplies(comment._id);
  }, []);
  console.log("is deleted",comment.deleted);
  return (
    <>
      <div className="comment" key={comment._id}>
        <a className="avatar">
          {/* <img src="/images/avatar/small/matt.jpg" /> */}
        </a>
        <div className="content">
          <a className="author">{comment?.userId?.username}</a>
          <div className="metadata">
            <span className="date">
              <ReactMarkdown>{`${parseDate(comment.updatedAt)} ${
                comment?.edited ? "*edited*" : ""
              }`}</ReactMarkdown>
            </span>
          </div>
          {/* //!Edit Comment */}
          {editOpen ? (
            <>
              <form
                className="ui reply form"
                onSubmit={(event) => handleEdit(event, comment._id)}
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
                <button className="cancel-button" value="Cancel" onClick={()=>setEditOpen(!editOpen)}>Cancel</button>
              </form>
            </>
          ) : (
            // !Comment content
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
                {(currentUser !== undefined &&
                currentUser._id === comment?.userId?._id ) && !comment.deleted ? (
                  <>
                    <a className="reply" onClick={() => setEditOpen(!editOpen)}>
                      Edit
                    </a>
                    <a className="reply" onClick={() => handleDelete(comment._id)}>
                      Delete
                    </a>
                  </>
                ) : null}
                {replyOpen ? (
                  <ReplyForm
                    id={comment._id}
                    currentUser={currentUser}
                    children={children}
                    setChildren={setChildren}
                    setReplyOpen={setReplyOpen}
                  />
                ) : null}
              </div>
            </>
          )}
        </div>
        {children.length !== 0 ? (
          <div class="comments">
            {children.map((comment, index) => {
              return (
                <CommentDiv
                  comment={comment}
                  currentUser={currentUser}
                  setComments={setChildren}
                  comments={children}
                  index={index}
                  mode={"reply"}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CommentDiv;
