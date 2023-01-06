import React, { useState } from "react";
import "../../../App.css";

const Comment = ({
  text,
  name,
  id,
  user_id,
  avatar,
  handleClick,
  comment,
  postId,
}) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const time = comment.date.slice(11, 16);

  const removeComment = async () => {
    await fetch(`http://localhost:5000/post/${postId}/comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    handleClick();
  };
  const current_user_id = JSON.parse(localStorage.getItem("data"))._id;
  console.log(user_id, current_user_id);
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={`http:${avatar}`} alt="avatar" />

            <h4>{name}</h4>
          </a>
        </div>

        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            {comment.date.slice(0, 10)} : {time}{" "}
          </p>
          {current_user_id !== user_id ? (
            ""
          ) : (
            <button className="btn btn-danger" onClick={removeComment}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
