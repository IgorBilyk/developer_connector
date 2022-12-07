import React, { useState } from "react";
import axios from "axios";

import "../../../App.css";

import Comment from "./Comment";

const Comments = ({ comments, name, id }) => {
  console.log(id);
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState(null);
  const token = localStorage.getItem("token");
  const handleCommentBox = () => {
    setActive(!active);
  };
  const handleTextarea = (e) => {
    const value = e.target.value;
    if (!value.trim()) return false;
    setComment(value);
  };
  const handlePostForm = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/post/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      data: { comment },
    });
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3 className="comment-btn" onClick={handleCommentBox}>
          Leave A Comment
        </h3>
      </div>
      <form
        className={"form comment-form my-1" + ` ${active ? "active-form" : ""}`}
        onSubmit={handlePostForm}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          onChange={handleTextarea}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
      {comments.length > 0 ? (
        <Comment comments={comments} name={name} id={id} />
      ) : (
        "No comments"
      )}
    </div>
  );
};
export default Comments;
