import React, { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import "../../../App.css";

import Comment from "./Comment";

import { loadingTime } from "../../../config";

const Comments = ({ comments, name, id, userId, avatar, handleClick }) => {
  const profileData = useSelector((state) => state.register);

  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const refreshToken = localStorage.getItem("refreshToken");
  const userData = JSON.parse(localStorage.getItem("data"));
  const { userAvatar = avatar, userName = name, _id } = userData;
  const handleCommentBox = () => {
    setActive(!active);
  };
  //Handle input change
  const handleTextarea = (e) => {
    const value = e.target.value;
    setComment(value);
  };
  //Submit form with comment
  const handlePostForm = (e) => {
    e.preventDefault();
    axios.patch(
      `http://localhost:5000/post/comments/${id}`,
      { comment, userName, userAvatar, _id },
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    setComment("");
    setTimeout(() => handleClick(), loadingTime);
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
          value={comment}
          onChange={handleTextarea}
          style={{ overflow: "auto", resize: "none" }}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
      <div className="container-comments">
        Comments:
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <Comment
                user_id={_id}
                comment={comment}
                key={comment._id}
                text={comment.text}
                postId={id}
                id={comment._id}
                name={comment.name}
                avatar={comment.avatar}
                handleClick={handleClick}
              />
            );
          })
        ) : (
          <h5>
            This post has't any comment yet! Feel free to leave the first one
            &#128515;
          </h5>
        )}
      </div>
    </div>
  );
};
export default Comments;
