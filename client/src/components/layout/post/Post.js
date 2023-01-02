import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = ({
  id,
  post_id,
  text,
  name,
  avatar,
  date,
  comments,
  likes,
  likePost,
  removePost,
}) => {
  const { _id } = JSON.parse(localStorage.getItem("data"));

  return (
    <section className="container-post">
      <div className="post bg-white p-1 my-1">
        <div>
          <a href={avatar}>
            <img className="round-img" src={avatar} alt="avatar" />
            <h4>{name}</h4>
            {id === _id && <span className="post-date">Your post</span>}
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {date.substring(0, 10)}</p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => likePost(post_id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{likes.length}</span>
          </button>
        </div>
        <div>
        <Link to={`/post/${post_id}`} className="btn btn-primary">
           Comment
          </Link>
          <Link to={`/post/${post_id}`} className="btn btn-primary">
            Comments <span className="comment-count">{comments.length}</span>
          </Link>
          

          {id === _id ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removePost(post_id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
export default Post;
