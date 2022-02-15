import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Comments = ({ currentUser, recipeID }) => {
  // console.log(currentUser);
  const [comments, setComments] = useState([]);
  const [replyOpen, setReplyOpen] = useState([]);

  useEffect(() => {
    const getAllComments = async (recipeID) => {
      try {
        const res = await axios.post("/api/comments/", { recipeId: recipeID });
        // console.log("get comments", res);
        setComments(res.data.data);
        setReplyOpen(res.data.data.map(() => false));
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments(recipeID);
  }, []);

  const parseDate = (timestamp) => {
    if (dayjs().$D === dayjs(timestamp).$D) {
      return `Today at ${dayjs(timestamp).format("h.mma")}`;
    } else {
      return `${dayjs(timestamp).format("DD-MMM")} at ${dayjs(timestamp).format(
        "h.mma"
      )}`;
    }
  };

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

  const getReplies = async (id, depth = 0) => {
    if (depth === 0) {
      try {
        const res = await axios.get(`/api/replies/${id}`);
        if (res.data.data.length !== 0) {
          //res.data.data is an array of replies
          res.data.data.map((reply, index) => {

          });
          return
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
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {comments.map((comment, index) => {
        // console.log(comment);
        // getReplies(comment._id);
        return (
          <>
            <div className="comment" key={comment._id}>
              <a className="avatar">
                {/* <img src="/images/avatar/small/matt.jpg" /> */}
              </a>
              <div className="content">
                <a className="author">{comment?.userId?.username}</a>
                <div className="metadata">
                  <span className="date">{parseDate(comment.updatedAt)}</span>
                </div>
                <div className="text">{comment.comment}</div>
                <div className="actions">
                  <a
                    className="reply"
                    onClick={() =>
                      setReplyOpen(
                        replyOpen.map((ele, i) => (i === index ? !ele : ele))
                      )
                    }
                  >
                    Reply
                  </a>
                  {replyOpen[index] ? (
                    currentUser !== undefined && currentUser !== "" ? (
                      <form
                        className="ui reply form"
                        onSubmit={(event) =>
                          handleSubmit(event, "reply", index)
                        }
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
                    ) : (
                      <div>
                        Please <Link to="/login">log in</Link> to be able to
                        post a reply.
                      </div>
                    )
                  ) : null}
                </div>
                {"reply"}
              </div>
            </div>
          </>
        );
      })}
      {currentUser !== undefined && currentUser !== "" ? (
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
      )}
    </div>
  );
};

export default Comments;
