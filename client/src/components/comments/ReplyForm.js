import React from "react";
import axios from "axios";

const ReplyForm = ({ id, currentUser, children, setChildren,setReplyOpen }) => {
  const handleReplySubmit = async (event) => {
    event.preventDefault();
    // console.log("in submit");
    // console.log(event.target.comment.value);
    try {
      const res = await axios.post(`/api/replies/new/${id}`, {
        userId: currentUser._id,
        comment: event.target.comment.value,
      });
      console.log("new reply", res);
      event.target.comment.value = "";
      setChildren([...children, res.data.data]);
      setReplyOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="ui reply form"
      onSubmit={(event) => handleReplySubmit(event)}
    >
      <div className="field">
        <label htmlFor="name" />
        <input type="text" name="comment" placeholder="Enter your reply here" />
      </div>
      <input type="submit" value="Reply" />
    </form>
  );
};

export default ReplyForm;
